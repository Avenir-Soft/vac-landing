import { AnimatePresence, motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'
import { useTheme } from '../hooks/useTheme'
import type { Lang } from '../i18n/language'

const ru = {
	enableLight: 'Включить светлую тему',
	enableDark: 'Включить тёмную тему',
	lightTheme: 'Светлая тема',
	darkTheme: 'Тёмная тема',
}

const content: Record<Lang, typeof ru> = {
	ru,
	en: {
		enableLight: 'Switch to light theme',
		enableDark: 'Switch to dark theme',
		lightTheme: 'Light theme',
		darkTheme: 'Dark theme',
	},
	uz: {
		enableLight: 'Yorug‘ mavzuni yoqish',
		enableDark: 'Qorong‘u mavzuni yoqish',
		lightTheme: 'Yorug‘ mavzu',
		darkTheme: 'Qorong‘u mavzu',
	},
}

/** Переключатель светлой / графитовой темы с плавной сменой иконки. */
const ThemeToggle = () => {
	const { theme, toggleTheme } = useTheme()
	const { lang } = useLanguage()
	const t = content[lang]
	const isDark = theme === 'dark'

	return (
		<button
			type='button'
			onClick={toggleTheme}
			className='liquid-button liquid-button-icon liquid-button-nav'
			aria-label={isDark ? t.enableLight : t.enableDark}
			title={isDark ? t.lightTheme : t.darkTheme}
		>
			<AnimatePresence mode='wait' initial={false}>
				<motion.span
					key={isDark ? 'moon' : 'sun'}
					initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
					animate={{ opacity: 1, rotate: 0, scale: 1 }}
					exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
					transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
					className='flex items-center justify-center'
				>
					{isDark ? <Moon size={20} /> : <Sun size={20} />}
				</motion.span>
			</AnimatePresence>
		</button>
	)
}

export default ThemeToggle
