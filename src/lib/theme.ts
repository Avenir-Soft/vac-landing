export type Theme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'vac-theme'
export const THEME_EVENT = 'vac-theme-change'

export const getStoredTheme = (): Theme => {
	if (typeof window === 'undefined') return 'light'

	// Светлая тема — по умолчанию; графит (тёмная) только если выбран явно.
	const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
	return savedTheme === 'dark' ? 'dark' : 'light'
}

export const applyTheme = (theme: Theme) => {
	if (typeof document === 'undefined') return

	const root = document.documentElement
	root.classList.toggle('dark', theme === 'dark')
	root.dataset.theme = theme
	root.style.colorScheme = theme
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
