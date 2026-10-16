import type { ContentKey } from '../lib/siteContent'

const ENDPOINT = '/api/admin.php'
const CHUNK_SIZE = 2 * 1024 * 1024
// Паузы перед повторами неудачного куска (сеть, лимит запросов хостинга).
const RETRY_DELAYS = [1000, 2000, 4000, 8000, 15000]

export class AuthError extends Error {}

/** Ошибка, после которой есть смысл повторить запрос. */
class RetryableError extends Error {}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const authListeners = new Set<() => void>()

/** Подписка на «сессия истекла» — админка показывает окно входа поверх редактора. */
export const onAuthLost = (listener: () => void) => {
	authListeners.add(listener)
	return () => {
		authListeners.delete(listener)
	}
}

type ApiResponse = { ok: boolean; error?: string; [key: string]: unknown }

const call = async (
	action: string,
	init: RequestInit = {},
	query: Record<string, string | number> = {},
): Promise<ApiResponse> => {
	const params = new URLSearchParams({ action })
	for (const [k, v] of Object.entries(query)) params.set(k, String(v))

	let res: Response
	try {
		res = await fetch(`${ENDPOINT}?${params}`, {
			credentials: 'same-origin',
			...init,
			headers: { 'X-Vac-Admin': '1', ...init.headers },
		})
	} catch {
		throw new RetryableError('Нет связи с сервером')
	}

	let body: ApiResponse
	try {
		body = await res.json()
	} catch {
		// Вместо JSON пришла страница хостинга: защита от частых запросов,
		// перегрузка или PHP не выполнился.
		throw new RetryableError(
			res.ok
				? 'Сервер ответил не JSON — проверьте, что на хостинге работает PHP'
				: `Хостинг отклонил запрос (код ${res.status})`,
		)
	}

	if (res.status === 401 && action !== 'login') {
		authListeners.forEach(listener => listener())
		throw new AuthError(body.error ?? 'Требуется вход')
	}
	if (!res.ok || !body.ok) {
		const message = body.error ?? `Ошибка сервера (${res.status})`
		if (res.status === 429 || res.status >= 500) throw new RetryableError(message)
		throw new Error(message)
	}
	return body
}

const postJson = (action: string, data: unknown) =>
	call(action, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	})

export const checkSession = async () =>
	(await call('session')).authenticated === true

export const login = (password: string) => postJson('login', { password })

export const logout = () => postJson('logout', {})

export const changePassword = (current: string, next: string) =>
	postJson('password', { current, next })

export const saveContent = (key: ContentKey, data: unknown) =>
	postJson('save', { key, data })

const randomId = () =>
	Array.from(crypto.getRandomValues(new Uint8Array(16)), b =>
		(b % 36).toString(36),
	).join('')

/** Повторяет запрос при временных сбоях; прочие ошибки пробрасывает сразу. */
const withRetry = async <T>(run: () => Promise<T>): Promise<T> => {
	for (let attempt = 0; ; attempt++) {
		try {
			return await run()
		} catch (error) {
			if (!(error instanceof RetryableError) || attempt >= RETRY_DELAYS.length) throw error
			await sleep(RETRY_DELAYS[attempt])
		}
	}
}

/**
 * Загружает файл кусками по 2 МБ — так не упираемся в лимиты PHP на хостинге.
 * Каждый кусок при сбое повторяется (сервер не запишет его дважды).
 * Возвращает публичный URL вида /uploads/<kind>/<имя>.
 */
export const uploadFile = async (
	blob: Blob,
	kind: 'gallery' | 'prices',
	onProgress?: (fraction: number) => void,
): Promise<string> => {
	const id = randomId()
	const total = Math.max(1, Math.ceil(blob.size / CHUNK_SIZE))
	let url = ''
	for (let index = 0; index < total; index++) {
		const offset = index * CHUNK_SIZE
		const chunk = blob.slice(offset, offset + CHUNK_SIZE)
		const body = await withRetry(() =>
			call(
				'upload',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/octet-stream' },
					body: chunk,
				},
				{ kind, id, index, total, offset },
			),
		)
		onProgress?.((index + 1) / total)
		if (typeof body.url === 'string') url = body.url
	}
	if (!url) throw new Error('Сервер не вернул адрес файла')
	return url
}
