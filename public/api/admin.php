<?php
// API админки vac.uz: вход, загрузка файлов, сохранение контента галереи и прайс-листов.
//
// Данные живут вне сборки, рядом с сайтом (httpdocs):
//   content/gallery.json, content/prices.json — читаются сайтом напрямую
//   uploads/gallery/*, uploads/prices/*       — загруженные файлы
// Деплой (git pull ветки deploy) эти папки не трогает: их нет в сборке.

declare(strict_types=1);

// Предупреждения PHP не должны ломать JSON-ответ.
ini_set('display_errors', '0');

const TOKEN_TTL = 12 * 3600;
const COOKIE_NAME = 'vac_admin';
const CHUNK_MAX = 4 * 1024 * 1024;
const FILE_MAX = 60 * 1024 * 1024;
const CONTENT_KEYS = ['gallery', 'prices'];
const UPLOAD_KINDS = ['gallery', 'prices'];

$SITE_ROOT = dirname(__DIR__);
$CONTENT_DIR = $SITE_ROOT . '/content';
$UPLOADS_DIR = $SITE_ROOT . '/uploads';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function respond(int $status, array $body): void
{
	http_response_code($status);
	echo json_encode($body, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
	exit;
}

function fail(int $status, string $message): void
{
	respond($status, ['ok' => false, 'error' => $message]);
}

function ensure_dir(string $dir): void
{
	if (!is_dir($dir) && !mkdir($dir, 0755, true) && !is_dir($dir)) {
		fail(500, 'Не удалось создать папку ' . basename($dir));
	}
}

function write_atomic(string $path, string $data): void
{
	ensure_dir(dirname($path));
	$tmp = $path . '.' . bin2hex(random_bytes(6)) . '.tmp';
	if (file_put_contents($tmp, $data, LOCK_EX) === false || !rename($tmp, $path)) {
		@unlink($tmp);
		fail(500, 'Не удалось записать ' . basename($path));
	}
}

// Служебные значения храним в .php-файлах: при прямом запросе из браузера
// файл исполнится и сразу выйдет, ничего не отдав. Читаем как текст, а не
// через include — иначе opcache отдаёт устаревшее значение после перезаписи.
const PHP_GUARD = "<?php exit; ?>\n";

function write_php_value(string $path, string $value): void
{
	write_atomic($path, PHP_GUARD . $value);
}

function read_php_value(string $path): ?string
{
	$raw = @file_get_contents($path);
	if ($raw === false || strncmp($raw, PHP_GUARD, strlen(PHP_GUARD)) !== 0) return null;
	$value = substr($raw, strlen(PHP_GUARD));
	return $value !== '' ? $value : null;
}

function password_hash_current(): string
{
	global $CONTENT_DIR;
	$override = read_php_value($CONTENT_DIR . '/.password.php');
	if ($override !== null) return $override;
	$config = require __DIR__ . '/config.php';
	return (string) $config['password_hash'];
}

function secret(): string
{
	global $CONTENT_DIR;
	$path = $CONTENT_DIR . '/.secret.php';
	$secret = read_php_value($path);
	if ($secret === null) {
		$secret = bin2hex(random_bytes(32));
		write_php_value($path, $secret);
	}
	return $secret;
}

function is_https(): bool
{
	return (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
		|| (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https');
}

function set_token_cookie(string $value, int $expires): void
{
	setcookie(COOKIE_NAME, $value, [
		'expires' => $expires,
		'path' => '/api/',
		'secure' => is_https(),
		'httponly' => true,
		'samesite' => 'Strict',
	]);
}

function issue_token(): void
{
	$expires = time() + TOKEN_TTL;
	$payload = (string) $expires;
	$sig = hash_hmac('sha256', $payload, secret());
	set_token_cookie($payload . '.' . $sig, $expires);
}

function is_authenticated(): bool
{
	$token = $_COOKIE[COOKIE_NAME] ?? '';
	if (!is_string($token) || !preg_match('/^(\d{10})\.([a-f0-9]{64})$/', $token, $m)) return false;
	if ((int) $m[1] < time()) return false;
	return hash_equals(hash_hmac('sha256', $m[1], secret()), $m[2]);
}

function require_auth(): void
{
	if (!is_authenticated()) fail(401, 'Требуется вход');
}

function read_json_body(): array
{
	$raw = file_get_contents('php://input');
	$data = json_decode($raw === false ? '' : $raw, true);
	if (!is_array($data)) fail(400, 'Некорректный JSON');
	return $data;
}

// ---- Защита от перебора пароля: 5 ошибок за 15 минут → блок на 15 минут.

function throttle_path(): string
{
	global $CONTENT_DIR;
	return $CONTENT_DIR . '/.throttle.php';
}

function throttle_load(): array
{
	$raw = read_php_value(throttle_path());
	$data = $raw === null ? [] : json_decode($raw, true);
	if (!is_array($data)) return [];
	$now = time();
	return array_filter($data, fn($entry) => is_array($entry) && ($entry['until'] ?? 0) > $now);
}

function client_key(): string
{
	return hash('sha256', (string) ($_SERVER['REMOTE_ADDR'] ?? ''));
}

function throttle_check(): void
{
	$entry = throttle_load()[client_key()] ?? null;
	if ($entry && $entry['count'] >= 5) {
		$minutes = (int) ceil(($entry['until'] - time()) / 60);
		fail(429, "Слишком много попыток. Попробуйте через {$minutes} мин.");
	}
}

function throttle_record(bool $success): void
{
	$data = throttle_load();
	$key = client_key();
	if ($success) {
		unset($data[$key]);
	} else {
		$entry = $data[$key] ?? ['count' => 0];
		$data[$key] = ['count' => $entry['count'] + 1, 'until' => time() + 15 * 60];
	}
	write_php_value(throttle_path(), json_encode($data));
}

// ---- Загрузка файлов кусками (обходит лимиты upload_max_filesize хостинга).

function detect_type(string $path): ?string
{
	$fh = fopen($path, 'rb');
	if (!$fh) return null;
	$head = (string) fread($fh, 16);
	fclose($fh);
	if (strncmp($head, "\xFF\xD8\xFF", 3) === 0) return 'jpg';
	if (strncmp($head, "\x89PNG\r\n\x1A\n", 8) === 0) return 'png';
	if (strncmp($head, 'RIFF', 4) === 0 && substr($head, 8, 4) === 'WEBP') return 'webp';
	if (strncmp($head, '%PDF-', 5) === 0) return 'pdf';
	return null;
}

function handle_upload(): void
{
	global $UPLOADS_DIR;
	require_auth();

	$kind = $_GET['kind'] ?? '';
	$id = $_GET['id'] ?? '';
	$index = (int) ($_GET['index'] ?? -1);
	$total = (int) ($_GET['total'] ?? 0);
	$offset = (int) ($_GET['offset'] ?? -1);
	if (!in_array($kind, UPLOAD_KINDS, true)) fail(400, 'Неизвестный тип загрузки');
	if (!is_string($id) || !preg_match('/^[a-z0-9]{16,64}$/', $id)) fail(400, 'Некорректный id загрузки');
	if ($total < 1 || $index < 0 || $index >= $total || $offset < 0) fail(400, 'Некорректный номер куска');

	$chunk = file_get_contents('php://input');
	if ($chunk === false || $chunk === '') fail(400, 'Пустой кусок файла');
	if (strlen($chunk) > CHUNK_MAX) fail(413, 'Кусок файла слишком большой');

	$tmpDir = $UPLOADS_DIR . '/.tmp';
	ensure_dir($tmpDir);
	$part = $tmpDir . '/' . $id . '.part';
	$done = $tmpDir . '/' . $id . '.done';

	// Клиент повторяет кусок, если не дождался ответа (сбой сети, лимит
	// запросов хостинга). Повтор не должен записать данные дважды.
	if (is_file($done)) {
		respond(200, ['ok' => true, 'url' => trim((string) file_get_contents($done))]);
	}
	clearstatcache(true, $part);
	$size = is_file($part) ? filesize($part) : 0;
	if ($offset === 0 && $index === 0) {
		$written = file_put_contents($part, $chunk, LOCK_EX);
	} elseif ($size === $offset) {
		$written = file_put_contents($part, $chunk, FILE_APPEND | LOCK_EX);
	} elseif ($size === $offset + strlen($chunk)) {
		$written = strlen($chunk); // этот кусок уже получен
	} else {
		fail(409, 'Загрузка прервана, начните заново');
	}
	if ($written === false) fail(500, 'Не удалось сохранить кусок файла — возможно, на хостинге закончилось место');
	clearstatcache(true, $part);
	if (filesize($part) > FILE_MAX) {
		@unlink($part);
		fail(413, 'Файл больше 60 МБ');
	}

	if ($index < $total - 1) respond(200, ['ok' => true]);

	$ext = detect_type($part);
	$allowed = $kind === 'gallery' ? ['jpg', 'png', 'webp'] : ['jpg', 'png', 'webp', 'pdf'];
	if ($ext === null || !in_array($ext, $allowed, true)) {
		@unlink($part);
		fail(415, 'Неподдерживаемый формат файла');
	}

	$dir = $UPLOADS_DIR . '/' . $kind;
	ensure_dir($dir);
	$name = date('Ymd') . '-' . bin2hex(random_bytes(6)) . '.' . $ext;
	if (!rename($part, $dir . '/' . $name)) fail(500, 'Не удалось сохранить файл');
	@chmod($dir . '/' . $name, 0644);

	$url = '/uploads/' . $kind . '/' . $name;
	@file_put_contents($done, $url);
	respond(200, ['ok' => true, 'url' => $url]);
}

// ---- Контент.

function validate_url($value): bool
{
	return is_string($value) && strlen($value) < 500 && preg_match('#^/[^\s<>"\'\\\\]*$#', $value) === 1;
}

function validate_text($value, int $max): bool
{
	return is_string($value) && strlen($value) <= $max;
}

function validate_localized($value): bool
{
	if (!is_array($value)) return false;
	foreach (['ru', 'en', 'uz'] as $lang) {
		if (!validate_text($value[$lang] ?? null, 6000)) return false;
	}
	return true;
}

function validate_gallery($data): ?array
{
	if (!is_array($data) || !isset($data['photos']) || !is_array($data['photos'])) return null;
	$photos = array_values($data['photos']);
	if (count($photos) > 1000) return null;
	foreach ($photos as $src) if (!validate_url($src)) return null;
	return ['photos' => $photos];
}

function validate_prices($data): ?array
{
	if (!is_array($data) || !isset($data['docs']) || !is_array($data['docs'])) return null;
	$docs = [];
	foreach (array_values($data['docs']) as $doc) {
		if (!is_array($doc)) return null;
		if (!is_string($doc['id'] ?? null) || !preg_match('/^[a-z0-9-]{1,64}$/', $doc['id'])) return null;
		if (!validate_localized($doc['title'] ?? null) || !validate_localized($doc['description'] ?? null)) return null;
		if (!validate_text($doc['badge'] ?? null, 100) || !validate_text($doc['downloadName'] ?? null, 200)) return null;
		if (!validate_url($doc['pdf'] ?? null)) return null;
		if (!is_array($doc['pages'] ?? null) || count($doc['pages']) > 200) return null;
		$pages = array_values($doc['pages']);
		foreach ($pages as $page) if (!validate_url($page)) return null;
		$docs[] = [
			'id' => $doc['id'],
			'title' => array_intersect_key($doc['title'], ['ru' => 1, 'en' => 1, 'uz' => 1]),
			'description' => array_intersect_key($doc['description'], ['ru' => 1, 'en' => 1, 'uz' => 1]),
			'badge' => $doc['badge'],
			'pdf' => $doc['pdf'],
			'pages' => $pages,
			'downloadName' => $doc['downloadName'],
		];
	}
	return ['docs' => $docs];
}

// Удаляет загруженные файлы, на которые больше не ссылается ни один контент.
// Свежие файлы (< 1 суток) не трогаем — они могут быть загружены, но ещё не сохранены.
function collect_garbage(): void
{
	global $CONTENT_DIR, $UPLOADS_DIR;
	$referenced = [];
	foreach (CONTENT_KEYS as $key) {
		$raw = @file_get_contents($CONTENT_DIR . '/' . $key . '.json');
		if ($raw === false) continue;
		$data = json_decode($raw, true);
		if (!is_array($data)) continue;
		array_walk_recursive($data, function ($value) use (&$referenced) {
			if (is_string($value) && strncmp($value, '/uploads/', 9) === 0) $referenced[$value] = true;
		});
	}
	$cutoff = time() - 86400;
	foreach (array_merge(UPLOAD_KINDS, ['.tmp']) as $kind) {
		foreach (glob($UPLOADS_DIR . '/' . $kind . '/*') ?: [] as $file) {
			if (!is_file($file) || filemtime($file) > $cutoff) continue;
			if (!isset($referenced['/uploads/' . $kind . '/' . basename($file)])) @unlink($file);
		}
	}
}

function handle_save(): void
{
	global $CONTENT_DIR;
	require_auth();
	$body = read_json_body();
	$key = $body['key'] ?? '';
	if (!in_array($key, CONTENT_KEYS, true)) fail(400, 'Неизвестный раздел');
	$data = $key === 'gallery' ? validate_gallery($body['data'] ?? null) : validate_prices($body['data'] ?? null);
	if ($data === null) fail(400, 'Некорректные данные');

	$json = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
	write_atomic($CONTENT_DIR . '/' . $key . '.json', $json);
	collect_garbage();
	respond(200, ['ok' => true]);
}

// ---- Роутинг.

$action = $_GET['action'] ?? '';
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'POST' && ($_SERVER['HTTP_X_VAC_ADMIN'] ?? '') !== '1') {
	// Защита от CSRF: кросс-доменная форма не может выставить свой заголовок.
	fail(403, 'Запрос отклонён');
}

switch ("$method $action") {
	case 'GET session':
		respond(200, ['ok' => true, 'authenticated' => is_authenticated()]);

	case 'POST login':
		throttle_check();
		$password = read_json_body()['password'] ?? '';
		$valid = is_string($password) && password_verify($password, password_hash_current());
		throttle_record($valid);
		if (!$valid) {
			sleep(1);
			fail(401, 'Неверный пароль');
		}
		issue_token();
		respond(200, ['ok' => true]);

	case 'POST logout':
		set_token_cookie('', time() - 3600);
		respond(200, ['ok' => true]);

	case 'POST upload':
		handle_upload();

	case 'POST save':
		handle_save();

	case 'POST password':
		require_auth();
		$body = read_json_body();
		$current = $body['current'] ?? '';
		$next = $body['next'] ?? '';
		if (!is_string($current) || !password_verify($current, password_hash_current())) fail(400, 'Текущий пароль неверный');
		if (!is_string($next) || strlen($next) < 8) fail(400, 'Новый пароль — минимум 8 символов');
		write_php_value($CONTENT_DIR . '/.password.php', password_hash($next, PASSWORD_DEFAULT));
		// Новый секрет — все прежние сессии выходят, текущей выдаём свежий токен.
		write_php_value($CONTENT_DIR . '/.secret.php', bin2hex(random_bytes(32)));
		issue_token();
		respond(200, ['ok' => true]);

	default:
		fail(404, 'Неизвестное действие');
}
