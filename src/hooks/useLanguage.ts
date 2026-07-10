import { useEffect, useState } from 'react'
import {
	LANG_EVENT,
	type Lang,
	getStoredLang,
	setLang as persistLang,
} from '../i18n/language'

/**
 * Доступ к текущему языку интерфейса с синхронизацией между компонентами.
 * Зеркалит useTheme: слушает кастомное событие смены языка и событие storage
 * (когда язык меняют в другой вкладке).
 */
export const useLanguage = () => {
	const [lang, setLangState] = useState<Lang>(() => getStoredLang())

	useEffect(() => {
		const handleLangChange = (event: Event) => {
			const customEvent = event as CustomEvent<Lang>
			if (customEvent.detail) {
				setLangState(customEvent.detail)
			} else {
				setLangState(getStoredLang())
			}
		}

		const handleStorageChange = (event: StorageEvent) => {
			if (event.key) {
				setLangState(getStoredLang())
			}
		}

		window.addEventListener(LANG_EVENT, handleLangChange)
		window.addEventListener('storage', handleStorageChange)

		return () => {
			window.removeEventListener(LANG_EVENT, handleLangChange)
			window.removeEventListener('storage', handleStorageChange)
		}
	}, [])

	const setLanguage = (nextLang: Lang) => {
		setLangState(nextLang)
		persistLang(nextLang)
	}

	return { lang, setLanguage }
}
