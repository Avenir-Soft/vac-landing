import { Calculator, ChevronDown, Menu, Phone, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import icon from '../assets/icon.png'

const aboutLinks = [
	{
		label: 'О компании',
		to: '/about',
	},
	{
		label: 'Наши партнёры',
		to: '/about/partners',
	},
	{
		label: 'Фото галерея',
		to: '/about/gallery',
	},
]

const calcLinks = [
	{
		label: 'Инженерный расчёт',
		href: 'https://vac-calculator.uz',
		external: true,
	},
	{ label: 'Упрощённый расчёт', to: '/calculator' },
]

const navItems = [
	{ label: 'Калькулятор', type: 'calc' as const },
	{ label: 'О компании', type: 'about' as const },
	{ label: 'Каталог', to: '/catalog' },
	{ label: 'Прайс-лист', to: '/prices' },
	{ label: 'Контакты', to: '/contacts' },
]

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [isAboutOpen, setIsAboutOpen] = useState(false)
	const [isCalcOpen, setIsCalcOpen] = useState(false)
	const [scrolled, setScrolled] = useState(false)
	const currentLogo = icon

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 24)
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<header className='fixed top-0 left-0 right-0 z-50 px-4 pt-4 md:px-6'>
			<nav
				className={`mx-auto max-w-7xl rounded-[28px] border transition-all duration-500 ${
					scrolled
						? 'border-sky-100 bg-white/92 shadow-[0_18px_48px_-28px_rgba(35,82,140,0.18)] backdrop-blur-xl dark:border-slate-700/90 dark:bg-[#1a2b42]/88 dark:shadow-[0_20px_55px_-32px_rgba(8,18,33,0.68)]'
						: 'border-white/50 bg-white/70 backdrop-blur-md dark:border-slate-700/80 dark:bg-[#1a2b42]/74'
				}`}
			>
				<div className='px-5 py-4 md:px-6'>
					<div className='flex items-center justify-between gap-4'>
						<Link to='/' className='group flex min-w-0 items-center gap-3'>
							<div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-[0_14px_28px_-20px_rgba(15,23,42,0.35)] transition-transform duration-300 group-hover:scale-105 dark:border-slate-700 dark:bg-slate-900'>
								<img
									src={currentLogo}
									alt='VAC.UZ'
									className='h-9 w-9 object-contain'
								/>
							</div>
							<div className='flex h-11 items-center'>
								<h1 className='text-base font-bold leading-none text-slate-950 md:text-lg dark:text-white'>
									VAC.UZ
								</h1>
							</div>
						</Link>

						<div className='hidden items-center gap-1 lg:flex'>
							{navItems.map(item =>
								item.type === 'calc' ? (
									<div key={item.label} className='group relative'>
										<button
											type='button'
											className='liquid-button liquid-button-calculator px-4 py-2 text-sm font-semibold'
										>
											<Calculator className='h-4 w-4' />
											{item.label}
											<ChevronDown className='h-4 w-4 transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180' />
										</button>

										<div className='pointer-events-none invisible absolute top-full left-1/2 z-30 w-[230px] -translate-x-1/2 pt-2 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100'>
											<div className='translate-y-2 rounded-[20px] border border-amber-200 bg-white/96 p-2 shadow-[0_22px_46px_-30px_rgba(176,137,43,0.45)] backdrop-blur-xl transition-all duration-300 group-hover:translate-y-0 group-focus-within:translate-y-0 dark:border-amber-500/30 dark:bg-[#122033]/96 dark:shadow-[0_22px_46px_-30px_rgba(3,10,20,0.78)]'>
												<div className='space-y-1'>
													{calcLinks.map(link =>
														link.external ? (
															<a
																key={link.label}
																href={link.href}
																target='_blank'
																rel='noopener noreferrer'
																className='liquid-button liquid-button-panel block px-3 py-2.5 text-left'
															>
																<p className='text-sm font-semibold text-slate-900 dark:text-white'>
																	{link.label}
																</p>
															</a>
														) : (
															<Link
																key={link.label}
																to={link.to!}
																className='liquid-button liquid-button-panel block px-3 py-2.5 text-left'
															>
																<p className='text-sm font-semibold text-slate-900 dark:text-white'>
																	{link.label}
																</p>
															</Link>
														),
													)}
												</div>
											</div>
										</div>
									</div>
								) : item.type === 'about' ? (
									<div key={item.label} className='group relative'>
										<button
											type='button'
											className='liquid-button liquid-button-nav px-4 py-2 text-sm font-medium'
										>
											{item.label}
											<ChevronDown className='h-4 w-4 transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180' />
										</button>

										<div className='pointer-events-none invisible absolute top-full left-1/2 z-30 w-[210px] -translate-x-1/2 pt-2 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100'>
											<div className='translate-y-2 rounded-[20px] border border-sky-100 bg-white/96 p-2 shadow-[0_22px_46px_-30px_rgba(44,95,159,0.28)] backdrop-blur-xl transition-all duration-300 group-hover:translate-y-0 group-focus-within:translate-y-0 dark:border-slate-700/80 dark:bg-[#122033]/96 dark:shadow-[0_22px_46px_-30px_rgba(3,10,20,0.78)]'>
												<div className='space-y-1'>
													{aboutLinks.map(link => (
														<Link
															key={link.label}
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
										</div>
									</div>
								) : (
									<Link
										key={item.to}
										to={item.to!}
										className='liquid-button liquid-button-nav px-4 py-2 text-sm font-medium'
									>
										{item.label}
									</Link>
								),
							)}
						</div>

						<div className='flex items-center gap-2'>
							<a
								href='tel:+998909117272'
								className='liquid-button liquid-button-primary liquid-button-desktop-xl group px-4 py-2.5 text-sm font-semibold'
							>
								<Phone
									size={18}
									className='transition-transform group-hover:rotate-12'
								/>
								+998 90 911-72-72
							</a>

							<button
								onClick={() => setIsMenuOpen(!isMenuOpen)}
								className='liquid-button liquid-button-icon liquid-button-nav liquid-button-mobile'
								aria-label='Открыть меню'
							>
								{isMenuOpen ? <X size={22} /> : <Menu size={22} />}
							</button>
						</div>
					</div>

					{isMenuOpen && (
						<div className='mt-4 space-y-2 border-t border-slate-200/80 pt-4 animate-in fade-in slide-in-from-top-2 duration-300 lg:hidden dark:border-slate-800'>
							{navItems.map(item =>
								item.type === 'calc' ? (
									<div
										key={item.label}
										className='rounded-2xl border border-amber-200/80 bg-amber-50/60 p-2 dark:border-amber-500/25 dark:bg-amber-500/5'
									>
										<button
											type='button'
											onClick={() => setIsCalcOpen(!isCalcOpen)}
											className='liquid-button liquid-button-calculator justify-between px-3 py-2.5 text-left text-sm font-semibold'
										>
											<span className='flex items-center gap-2'>
												<Calculator className='h-4 w-4' />
												{item.label}
											</span>
											<ChevronDown
												className={`h-4 w-4 transition-transform duration-300 ${isCalcOpen ? 'rotate-180' : ''}`}
											/>
										</button>

										{isCalcOpen && (
											<div className='mt-2 space-y-1 px-1 pb-1'>
												{calcLinks.map(link =>
													link.external ? (
														<a
															key={link.label}
															href={link.href}
															target='_blank'
															rel='noopener noreferrer'
															onClick={() => {
																setIsCalcOpen(false)
																setIsMenuOpen(false)
															}}
															className='liquid-button liquid-button-panel block px-3 py-2.5 text-left'
														>
															<p className='text-sm font-semibold text-slate-800 dark:text-white'>
																{link.label}
															</p>
														</a>
													) : (
														<Link
															key={link.label}
															to={link.to!}
															onClick={() => {
																setIsCalcOpen(false)
																setIsMenuOpen(false)
															}}
															className='liquid-button liquid-button-panel block px-3 py-2.5 text-left'
														>
															<p className='text-sm font-semibold text-slate-800 dark:text-white'>
																{link.label}
															</p>
														</Link>
													),
												)}
											</div>
										)}
									</div>
								) : item.type === 'about' ? (
									<div
										key={item.label}
										className='rounded-2xl border border-slate-200/80 bg-white/75 p-2 dark:border-slate-800 dark:bg-slate-900/70'
									>
										<button
											type='button'
											onClick={() => setIsAboutOpen(!isAboutOpen)}
											className='liquid-button liquid-button-panel justify-between px-3 py-2.5 text-left text-sm font-medium'
										>
											<span>{item.label}</span>
											<ChevronDown
												className={`h-4 w-4 transition-transform duration-300 ${isAboutOpen ? 'rotate-180' : ''}`}
											/>
										</button>

										{isAboutOpen && (
											<div className='mt-2 space-y-1 px-1 pb-1'>
												{aboutLinks.map(link => (
													<Link
														key={link.label}
														to={link.to}
														onClick={() => {
															setIsAboutOpen(false)
															setIsMenuOpen(false)
														}}
														className='liquid-button liquid-button-panel block px-3 py-2.5 text-left'
													>
														<p className='text-sm font-semibold text-slate-800 dark:text-white'>
															{link.label}
														</p>
													</Link>
												))}
											</div>
										)}
									</div>
								) : (
									<Link
										key={item.to}
										to={item.to!}
										onClick={() => setIsMenuOpen(false)}
										className='liquid-button liquid-button-panel block px-4 py-3 text-sm font-medium'
									>
										{item.label}
									</Link>
								),
							)}
							<a
								href='tel:+998909117272'
								className='liquid-button liquid-button-primary mt-2 w-full px-4 py-3 font-semibold'
							>
								<Phone size={18} />
								+998 90 911-72-72
							</a>
						</div>
					)}
				</div>
			</nav>
		</header>
	)
}

export default Navbar
