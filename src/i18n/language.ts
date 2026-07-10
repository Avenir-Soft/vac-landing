// Языковая система сайта — русский по умолчанию, плюс английский и узбекский (латиница).
// Построена по образцу темы (src/lib/theme.ts): значение хранится в localStorage,
// синхронизация между компонентами через кастомное окно-событие + событие storage.

export type Lang = 'ru' | 'en' | 'uz'

export const LANGS: Lang[] = ['ru', 'en', 'uz']

export const DEFAULT_LANG: Lang = 'ru'

export const LANG_STORAGE_KEY = 'vac-lang'
export const LANG_EVENT = 'vac-lang-change'

/** Человекочитаемые подписи для переключателя. */
export const LANG_LABELS: Record<Lang, { short: string; full: string }> = {
	ru: { short: 'RU', full: 'Русский' },
	en: { short: 'EN', full: 'English' },
	uz: { short: 'UZ', full: 'O‘zbekcha' },
}

const isLang = (value: unknown): value is Lang =>
	value === 'ru' || value === 'en' || value === 'uz'

export const getStoredLang = (): Lang => {
	if (typeof window === 'undefined') return DEFAULT_LANG
	const stored = window.localStorage.getItem(LANG_STORAGE_KEY)
	return isLang(stored) ? stored : DEFAULT_LANG
}

export const applyLang = (lang: Lang = DEFAULT_LANG) => {
	if (typeof document === 'undefined') return
	document.documentElement.lang = lang
}

export const setLang = (lang: Lang) => {
	if (typeof window === 'undefined') return

	window.localStorage.setItem(LANG_STORAGE_KEY, lang)
	applyLang(lang)
	window.dispatchEvent(new CustomEvent(LANG_EVENT, { detail: lang }))
}

export const initializeLang = () => {
	applyLang(getStoredLang())
}
