import { useEffect, useState } from 'react'
import {
	THEME_EVENT,
	type Theme,
	getStoredTheme,
	setTheme as persistTheme,
} from '../lib/theme'

export const useTheme = () => {
	const [theme, setThemeState] = useState<Theme>(() => getStoredTheme())

	useEffect(() => {
		const handleThemeChange = (event: Event) => {
			const customEvent = event as CustomEvent<Theme>
			if (customEvent.detail) {
				setThemeState(customEvent.detail)
			} else {
				setThemeState(getStoredTheme())
			}
		}

		const handleStorageChange = (event: StorageEvent) => {
			if (event.key) {
				setThemeState(getStoredTheme())
			}
		}

		window.addEventListener(THEME_EVENT, handleThemeChange)
		window.addEventListener('storage', handleStorageChange)

		return () => {
			window.removeEventListener(THEME_EVENT, handleThemeChange)
			window.removeEventListener('storage', handleStorageChange)
		}
	}, [])

	const setTheme = (nextTheme: Theme) => {
		setThemeState(nextTheme)
		persistTheme(nextTheme)
	}

	const toggleTheme = () => {
		setTheme(theme === 'light' ? 'dark' : 'light')
	}

	return { theme, setTheme, toggleTheme }
}
