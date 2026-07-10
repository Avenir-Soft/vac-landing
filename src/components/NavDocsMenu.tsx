import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'
import type { Lang } from '../i18n/language'

// Пути стабильны и не зависят от языка — только подписи локализуются.
export const docsPaths = ['/prices', '/catalog', '/reference']

const ru = {
	products: 'Продукция',
	prices: 'Прайс-лист',
	catalog: 'Каталог',
	reference: 'Справочники',
}

const content: Record<Lang, typeof ru> = {
	ru,
	en: {
		products: 'Products',
		prices: 'Price list',
		catalog: 'Catalog',
		reference: 'Reference guides',
	},
	uz: {
		products: 'Mahsulotlar',
		prices: 'Narxlar ro‘yxati',
		catalog: 'Katalog',
		reference: 'Ma’lumotnomalar',
	},
}

const useDocsLinks = () => {
	const { lang } = useLanguage()
	const t = content[lang]
	return {
		title: t.products,
		links: [
			{ label: t.prices, to: '/prices' },
			{ label: t.catalog, to: '/catalog' },
			{ label: t.reference, to: '/reference' },
		],
	}
}

const EASE = [0.22, 1, 0.36, 1] as const

/** Десктоп: выпадающий список «Продукция» (framer-motion). */
export const NavDocsMenu = ({ active = false }: { active?: boolean }) => {
	const [open, setOpen] = useState(false)
	const { title, links } = useDocsLinks()

	return (
		<div
			className='relative'
			onMouseEnter={() => setOpen(true)}
			onMouseLeave={() => setOpen(false)}
		>
			<button
				type='button'
				tabIndex={-1}
				aria-expanded={open}
				className={`liquid-button liquid-button-nav px-4 py-2 text-sm font-medium ${
					active ? 'liquid-button-active' : ''
				}`}
			>
				{title}
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
								{links.map(link => (
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
	const { title, links } = useDocsLinks()

	return (
		<div className='rounded-2xl border border-slate-200/80 bg-white/75 p-2 dark:border-slate-800 dark:bg-slate-900/70'>
			<button
				type='button'
				onClick={() => setOpen(!open)}
				aria-expanded={open}
				className='liquid-button liquid-button-panel justify-between px-4 py-3 text-left text-base font-medium'
			>
				<span className='flex items-center gap-2'>
					{title}
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
							{links.map(link => (
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
