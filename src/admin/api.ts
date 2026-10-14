import type { ContentKey } from '../lib/siteContent'

const ENDPOINT = '/api/admin.php'
const CHUNK_SIZE = 1024 * 1024

export class AuthError extends Error {}

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

	const res = await fetch(`${ENDPOINT}?${params}`, {
		credentials: 'same-origin',
		...init,
		headers: { 'X-Vac-Admin': '1', ...init.headers },
	})

	let body: ApiResponse
	try {
		body = await res.json()
	} catch {
		throw new Error(
			'API админки недоступно: сервер не выполнил /api/admin.php (нужен PHP на хостинге).',
		)
	}

	if (res.status === 401 && action !== 'login') {
		authListeners.forEach(listener => listener())
		throw new AuthError(body.error ?? 'Требуется вход')
	}
	if (!res.ok || !body.ok) {
		throw new Error(body.error ?? `Ошибка сервера (${res.status})`)
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

/**
 * Загружает файл кусками по 1 МБ — так не упираемся в лимиты PHP на хостинге.
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
		const chunk = blob.slice(index * CHUNK_SIZE, (index + 1) * CHUNK_SIZE)
		const body = await call(
			'upload',
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/octet-stream' },
				body: chunk,
			},
			{ kind, id, index, total },
		)
		onProgress?.((index + 1) / total)
		if (typeof body.url === 'string') url = body.url
	}
	if (!url) throw new Error('Сервер не вернул адрес файла')
	return url
}
