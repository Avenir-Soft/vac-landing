import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Download, ReceiptText } from 'lucide-react'
import { useState } from 'react'
import Footer from '../components/Footer'
import NavbarForPages from '../components/NavbarForPages'
import SharePdf from '../components/SharePdf'
import priceMain from '../assets/price-vac-2026.pdf?url'
import priceDealer from '../assets/price-vac-2026-d.pdf?url'
import priceMainPage1 from '../assets/prices/price-main-1.png'
import priceDealerPage1 from '../assets/prices/price-dealer-1.png'

type PriceDoc = {
	id: string
	title: string
	description: string
	src: string
	pages: string[]
	downloadName: string
	badge: string
}

const documents: PriceDoc[] = [
	{
		id: 'main',
		title: 'Прайс-лист VAC 2026',
		description: 'Актуальные цены на воздуховоды и фасонные изделия.',
		src: priceMain,
		pages: [priceMainPage1],
		downloadName: 'ПРАЙС-ЛИСТ-VAC-2026.pdf',
		badge: 'PDF · 2026',
	},
	{
		id: 'dealer',
		title: 'Прайс-лист VAC 2026 (Давальческий)',
		description: 'Расширенный прайс-лист для отправки заказчику.',
		src: priceDealer,
		pages: [priceDealerPage1],
		downloadName: 'ПРАЙС-ЛИСТ-VAC-2026-Д.pdf',
		badge: 'PDF · 2026',
	},
]

const PricesPage = () => {
	const [open, setOpen] = useState<string>('main')

	const download = (doc: PriceDoc) => {
		const link = document.createElement('a')
		link.href = doc.src
		link.download = doc.downloadName
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
	}

	return (
		<div>
			<NavbarForPages />
			<section className='relative min-h-screen overflow-hidden px-4 pt-32 pb-20'>
				<div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(149,172,197,0.25),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0),rgba(226,234,242,0.65))] dark:bg-[radial-gradient(circle_at_top_right,rgba(149,172,197,0.08),transparent_24%),linear-gradient(180deg,rgba(9,16,27,0),rgba(4,8,15,0.45))]'></div>
				<div className='section-shell relative z-10'>
					<div className='mx-auto max-w-5xl'>
						<div className='surface-card overflow-hidden'>
							<div className='border-b border-slate-200 bg-slate-950 p-8 text-white md:p-10 dark:border-slate-800 dark:bg-[#060b13]'>
								<div className='flex h-16 w-16 items-center justify-center rounded-3xl border border-white/10 bg-white/8'>
									<ReceiptText size={34} strokeWidth={1.7} />
								</div>
								<p className='mt-6 text-xs font-semibold uppercase tracking-[0.28em] text-slate-300'>
									Прайс-лист
								</p>
								<h1 className='mt-4 text-[clamp(2rem,1.4rem+3vw,3rem)] font-bold leading-tight'>
									Цены VAC.UZ 2026
								</h1>
								<p className='mt-5 max-w-2xl text-base leading-7 text-slate-300'>
									Актуальные прайс-листы на воздуховоды и фасонные изделия.
									Откройте раздел — прайс показан прямо на странице, рядом кнопка
									для скачивания PDF.
								</p>
							</div>
						</div>

						<div className='mt-8 space-y-4'>
							{documents.map(doc => {
								const isOpen = open === doc.id
								return (
									<div
										key={doc.id}
										className={`overflow-hidden rounded-3xl border ${
											isOpen
												? 'border-sky-200 bg-white dark:border-sky-800/60 dark:bg-slate-900'
												: 'border-slate-200 bg-white/70 dark:border-slate-800 dark:bg-slate-900/50'
										}`}
									>
										<button
											type='button'
											onClick={() => setOpen(isOpen ? '' : doc.id)}
											className='flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-5'
										>
											<span className='flex items-center gap-3'>
												<span
													className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
														isOpen
															? 'bg-sky-500 text-white'
															: 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
													}`}
												>
													<ReceiptText size={20} />
												</span>
												<span className='text-base font-semibold text-slate-900 md:text-lg dark:text-white'>
													{doc.title}
												</span>
											</span>
											<ChevronDown
												size={20}
												className={`shrink-0 text-slate-400 transition-transform duration-300 ${
													isOpen ? 'rotate-180' : ''
												}`}
											/>
										</button>

										<AnimatePresence initial={false}>
											{isOpen && (
												<motion.div
													key='body'
													initial={{ height: 0, opacity: 0 }}
													animate={{ height: 'auto', opacity: 1 }}
													exit={{ height: 0, opacity: 0 }}
													transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
													className='overflow-hidden'
												>
													<div className='border-t border-slate-100 p-4 md:p-6 dark:border-slate-800'>
														<div className='grid gap-6 md:grid-cols-[1fr_240px]'>
															{/* Прайс «как фото» */}
															<div className='order-2 space-y-3 rounded-2xl bg-slate-100 p-3 md:order-1 dark:bg-slate-950/40'>
																{doc.pages.map((page, i) => (
																	<img
																		key={i}
																		src={page}
																		alt={`${doc.title} — страница ${i + 1}`}
																		className='block w-full rounded-xl border border-slate-200 shadow-sm dark:border-slate-700'
																		loading='lazy'
																	/>
																))}
															</div>

															{/* Боковая панель — скачать */}
															<div className='order-1 md:order-2'>
																<div className='md:sticky md:top-28'>
																	<span className='section-kicker'>{doc.badge}</span>
																	<p className='mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300'>
																		{doc.description}
																	</p>
																	<button
																		type='button'
																		onClick={() => download(doc)}
																		className='liquid-button liquid-button-primary mt-4 w-full px-5 py-3 text-sm font-bold'
																	>
																		<Download size={18} />
																		Скачать PDF
																	</button>
																	<SharePdf
																		src={doc.src}
																		title={doc.title}
																		className='liquid-button liquid-button-panel mt-2 w-full px-5 py-3 text-sm font-bold'
																	/>
																</div>
															</div>
														</div>
													</div>
												</motion.div>
											)}
										</AnimatePresence>
									</div>
								)
							})}
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</div>
	)
}

export default PricesPage
