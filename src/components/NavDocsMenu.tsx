import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export const docsLinks = [
	{ label: 'Каталог', to: '/catalog' },
	{ label: 'Справочники', to: '/reference' },
	{ label: 'Прайс-лист', to: '/prices' },
]

export const docsPaths = docsLinks.map(l => l.to)

const EASE = [0.22, 1, 0.36, 1] as const

/** Десктоп: выпадающий список «Продукция» (framer-motion). */
export const NavDocsMenu = ({ active = false }: { active?: boolean }) => {
	const [open, setOpen] = useState(false)

	return (
		<div
			className='relative'
			onMouseEnter={() => setOpen(true)}
			onMouseLeave={() => setOpen(false)}
		>
			<button
				type='button'
				onFocus={() => setOpen(true)}
				aria-expanded={open}
				className={`liquid-button liquid-button-nav px-4 py-2 text-sm font-medium ${
					active ? 'liquid-button-active' : ''
				}`}
			>
				Продукция
				<ChevronDown
					className={`h-4 w-4 transition-transform duration-300 ${
						open ? 'rotate-180' : ''
					}`}
				/>
			</button>

			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0, y: 8 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 8 }}
						transition={{ duration: 0.2, ease: EASE }}
						className='absolute top-full left-1/2 z-30 w-[220px] -translate-x-1/2 pt-2'
					>
						<div className='rounded-[20px] border border-slate-200 bg-white/96 p-2 shadow-[0_22px_46px_-30px_rgba(20,24,30,0.28)] backdrop-blur-xl dark:border-slate-700/80 dark:bg-[#26282d]/96 dark:shadow-[0_22px_46px_-30px_rgba(3,10,20,0.78)]'>
							<div className='space-y-1'>
								{docsLinks.map(link => (
									<Link
										key={link.to}
										to={link.to}
										className='liquid-button liquid-button-panel block px-3 py-2.5 text-left'
									>
										<p className='text-sm font-semibold text-slate-900 dark:text-white'>
											{link.label}
										</p>
									</Link>
								))}
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

/** Мобильное меню: раскрывающийся блок «Продукция» (framer-motion). */
export const NavDocsMobile = ({ onNavigate }: { onNavigate: () => void }) => {
	const [open, setOpen] = useState(false)

	return (
		<div className='rounded-2xl border border-slate-200/80 bg-white/75 p-2 dark:border-slate-800 dark:bg-slate-900/70'>
			<button
				type='button'
				onClick={() => setOpen(!open)}
				aria-expanded={open}
				className='liquid-button liquid-button-panel justify-between px-4 py-3 text-left text-base font-medium'
			>
				<span className='flex items-center gap-2'>
					Продукция
				</span>
				<ChevronDown
					className={`h-4 w-4 transition-transform duration-300 ${
						open ? 'rotate-180' : ''
					}`}
				/>
			</button>

			<AnimatePresence initial={false}>
				{open && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: 'auto', opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.25, ease: EASE }}
						className='overflow-hidden'
					>
						<div className='mt-2 space-y-1 px-1 pb-1'>
							{docsLinks.map(link => (
								<Link
									key={link.to}
									to={link.to}
									onClick={onNavigate}
									className='liquid-button liquid-button-panel block px-3 py-2.5 text-left'
								>
									<p className='text-sm font-semibold text-slate-800 dark:text-white'>
										{link.label}
									</p>
								</Link>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
