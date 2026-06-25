export type Theme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'vac-theme'
export const THEME_EVENT = 'vac-theme-change'

// Тёмная тема убрана — на сайте только одна тема (светлые карточки на графите).
export const getStoredTheme = (): Theme => 'light'

export const applyTheme = (_theme: Theme = 'light') => {
	if (typeof document === 'undefined') return

	const root = document.documentElement
	root.classList.remove('dark')
	root.dataset.theme = 'light'
	root.style.colorScheme = 'light'
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
