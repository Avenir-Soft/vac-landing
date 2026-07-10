import { AnimatePresence, motion } from 'framer-motion'
import { Check, Globe } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import { LANGS, LANG_LABELS, type Lang } from '../i18n/language'

/**
 * Переключатель языка интерфейса (RU / EN / UZ).
 * Русский по умолчанию; выбор сохраняется в localStorage через useLanguage.
 */
const SWITCH_LABEL: Record<Lang, string> = {
	ru: 'Сменить язык',
	en: 'Change language',
	uz: 'Tilni o‘zgartirish',
}

const LanguageSwitcher = () => {
	const { lang, setLanguage } = useLanguage()
	const [isOpen, setIsOpen] = useState(false)
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!isOpen) return

		const handleClickOutside = (event: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setIsOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [isOpen])

	const handleSelect = (next: Lang) => {
		setLanguage(next)
		setIsOpen(false)
	}

	return (
		<div ref={containerRef} className='relative'>
			<button
				type='button'
				onClick={() => setIsOpen(prev => !prev)}
				className='liquid-button liquid-button-nav gap-1.5 px-3 py-2 text-sm font-semibold'
				aria-label={SWITCH_LABEL[lang]}
				aria-haspopup='true'
				aria-expanded={isOpen}
			>
				<Globe size={18} />
				<span>{LANG_LABELS[lang].short}</span>
			</button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: 8, scale: 0.96 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 8, scale: 0.96 }}
						transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
						className='absolute top-full right-0 z-40 mt-2 w-[168px] rounded-[20px] border border-slate-200 bg-white/96 p-2 shadow-[0_22px_46px_-30px_rgba(20,24,30,0.28)] backdrop-blur-xl dark:border-slate-700/80 dark:bg-[#26282d]/96 dark:shadow-[0_22px_46px_-30px_rgba(3,10,20,0.78)]'
					>
						<div className='space-y-1'>
							{LANGS.map(item => (
								<button
									key={item}
									type='button'
									onClick={() => handleSelect(item)}
									className='liquid-button liquid-button-panel flex w-full items-center justify-between px-3 py-2.5 text-left'
								>
									<span className='text-sm font-semibold text-slate-900 dark:text-white'>
										{LANG_LABELS[item].full}
									</span>
									{item === lang && (
										<Check className='h-4 w-4 text-amber-500' />
									)}
								</button>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default LanguageSwitcher
