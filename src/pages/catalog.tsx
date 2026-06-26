import {
	ChevronDown,
	Download,
	ExternalLink,
	Eye,
	FileText,
} from 'lucide-react'
import { useState } from 'react'
import Footer from '../components/Footer'
import NavbarForPages from '../components/NavbarForPages'
import SharePdf from '../components/SharePdf'
import { Stagger, StaggerItem } from '../components/motion/Reveal'

type CatalogDoc = {
	id: string
	title: string
	description: string
	src: string
	downloadName: string
	badge: string
}

const documents: CatalogDoc[] = [
	{
		id: 'main',
		title: 'Полный каталог продукции',
		description:
			'Все позиции, технические характеристики и комплектующие в одном документе.',
		src: '/каталог.pdf',
		downloadName: 'vac-uz-katalog.pdf',
		badge: 'PDF · большой каталог',
	},
	{
		id: 'products',
		title: 'Краткий каталог продукции',
		description:
			'Сокращённая версия для быстрого ознакомления и отправки заказчику.',
		src: '/products-catalog.pdf',
		downloadName: 'products-catalog.pdf',
		badge: 'PDF · краткий обзор',
	},
]

const Catalog = () => {
	const [openId, setOpenId] = useState<string | null>(null)

	const handleDownload = (doc: CatalogDoc) => {
		const link = document.createElement('a')
		link.href = doc.src
		link.download = doc.downloadName
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
	}

	const toggle = (id: string) => {
		setOpenId(prev => (prev === id ? null : id))
	}

	return (
		<div>
			<NavbarForPages />
			<section className='relative min-h-screen overflow-hidden px-4 pt-32 pb-20'>
				<div className='section-shell relative z-10'>
					<div className='mx-auto max-w-5xl'>
						<div className='overflow-hidden rounded-3xl shadow-[0_10px_30px_-24px_rgba(18,40,67,0.16)] dark:shadow-[0_14px_36px_-30px_rgba(0,0,0,0.7)]'>
							<div className='bg-[#2c2e33] p-8 text-white md:p-10 dark:bg-[#1c1d21]'>
								<div className='flex h-16 w-16 items-center justify-center rounded-3xl border border-white/10 bg-white/8'>
									<FileText size={34} strokeWidth={1.7} />
								</div>
								<p className='mt-6 text-xs font-semibold uppercase tracking-[0.28em] text-slate-300'>
									Catalog
								</p>
								<h1 className='mt-4 text-[clamp(2rem,1.4rem+3vw,3rem)] font-bold leading-tight'>
									Каталог продукции VAC.UZ
								</h1>
								<p className='mt-5 max-w-2xl text-base leading-7 text-slate-300'>
									Просматривайте каталоги прямо на странице или скачивайте PDF —
									удобно для подбора решений и отправки коллегам.
								</p>
							</div>
						</div>

						<Stagger className='mt-8 space-y-5'>
							{documents.map(doc => {
								const isOpen = openId === doc.id
								return (
									<StaggerItem key={doc.id} className='surface-card overflow-hidden'>
										<div className='flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:p-8'>
											<div className='flex items-start gap-4'>
												<div className='flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200'>
													<FileText size={22} strokeWidth={1.8} />
												</div>
												<div>
													<span className='section-kicker'>{doc.badge}</span>
													<h2 className='mt-2 text-[clamp(1.2rem,1.05rem+0.7vw,1.5rem)] font-bold text-slate-950 dark:text-white'>
														{doc.title}
													</h2>
													<p className='mt-2 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300'>
														{doc.description}
													</p>
												</div>
											</div>

											<div className='flex w-full flex-col gap-2 md:w-52 md:flex-shrink-0'>
												<button
													type='button'
													onClick={() => toggle(doc.id)}
													className='liquid-button liquid-button-panel w-full justify-center px-4 py-3 text-sm font-semibold sm:py-2.5 sm:text-[13px]'
													aria-expanded={isOpen}
													aria-controls={`pdf-viewer-${doc.id}`}
												>
													<Eye size={16} />
													{isOpen ? 'Скрыть' : 'Просмотреть'}
													<ChevronDown
														size={15}
														className={`transition-transform duration-300 ${
															isOpen ? 'rotate-180' : ''
														}`}
													/>
												</button>
												<button
													type='button'
													onClick={() => handleDownload(doc)}
													className='liquid-button liquid-button-primary w-full justify-center px-4 py-3 text-sm font-bold sm:py-2.5 sm:text-[13px]'
												>
													<Download size={16} />
													Скачать
												</button>
												<SharePdf
													src={doc.src}
													title={doc.title}
													className='liquid-button liquid-button-panel w-full justify-center px-4 py-3 text-sm font-semibold sm:py-2.5 sm:text-[13px]'
												/>
											</div>
										</div>

										{isOpen && (
											<div
												id={`pdf-viewer-${doc.id}`}
												className='border-t border-slate-200 bg-slate-50 p-4 md:p-6 dark:border-slate-800 dark:bg-[#0a121d]'
											>
												<div className='mb-3 flex items-center justify-between gap-3'>
													<p className='text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400'>
														Просмотр онлайн
													</p>
													<a
														href={doc.src}
														target='_blank'
														rel='noopener noreferrer'
														className='inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 underline-offset-4 hover:underline dark:text-slate-400'
													>
														<ExternalLink size={14} />
														Открыть в новой вкладке
													</a>
												</div>
												<div className='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-inner dark:border-slate-800 dark:bg-[#1c1d21]'>
													<object
														data={doc.src}
														type='application/pdf'
														className='h-[80vh] min-h-[520px] w-full'
														aria-label={`${doc.title} (PDF)`}
													>
														<div className='p-8 text-center'>
															<p className='text-sm leading-6 text-slate-600 dark:text-slate-300'>
																Ваш браузер не поддерживает встроенный просмотр
																PDF.
															</p>
															<a
																href={doc.src}
																target='_blank'
																rel='noopener noreferrer'
																className='liquid-button liquid-button-primary mt-4 inline-flex px-5 py-3 text-sm font-semibold'
															>
																<ExternalLink size={18} />
																Открыть в новой вкладке
															</a>
														</div>
													</object>
												</div>
											</div>
										)}
								</StaggerItem>
							)
						})}
					</Stagger>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	)
}

export default Catalog
