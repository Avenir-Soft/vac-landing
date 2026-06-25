import { AnimatePresence, motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

/** Переключатель светлой / графитовой темы с плавной сменой иконки. */
const ThemeToggle = () => {
	const { theme, toggleTheme } = useTheme()
	const isDark = theme === 'dark'

	return (
		<button
			type='button'
			onClick={toggleTheme}
			className='liquid-button liquid-button-icon liquid-button-nav'
			aria-label={isDark ? 'Включить светлую тему' : 'Включить тёмную тему'}
			title={isDark ? 'Светлая тема' : 'Тёмная тема'}
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
