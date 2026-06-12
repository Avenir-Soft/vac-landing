export type Theme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'vac-theme'
export const THEME_EVENT = 'vac-theme-change'

export const getStoredTheme = (): Theme => {
	if (typeof window === 'undefined') return 'dark'

	// Графит (тёмная тема) — по умолчанию; светлая только если выбрана явно.
	const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
	return savedTheme === 'light' ? 'light' : 'dark'
}

export const applyTheme = (theme: Theme) => {
	if (typeof document === 'undefined') return

	const root = document.documentElement
	// Графит всегда: даже в «светлой» теме используем графитовую (тёмную) раскраску.
	root.classList.add('dark')
	root.dataset.theme = theme
	root.style.colorScheme = 'dark'
}

export const setTheme = (theme: Theme) => {
	if (typeof window === 'undefined') return

	window.localStorage.setItem(THEME_STORAGE_KEY, theme)
	applyTheme(theme)
	window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: theme }))
}

export const initializeTheme = () => {
	applyTheme(getStoredTheme())
}
