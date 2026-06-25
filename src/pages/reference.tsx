import { BookOpen, Clock, Download, Eye, FileText } from 'lucide-react'
import Footer from '../components/Footer'
import NavbarForPages from '../components/NavbarForPages'
import { Reveal, Stagger, StaggerItem } from '../components/motion/Reveal'

type ReferenceDoc = {
	id: string
	title: string
	description: string
	badge: string
}

// Заглушка: настоящих файлов пока нет — карточки помечены «Скоро»,
// кнопки неактивны. Когда появятся PDF/XLSX, добавьте поле `src` и включите
// действия (см. страницу «Каталог» как образец).
const documents: ReferenceDoc[] = [
	{
		id: 'sizes',
		title: 'Справочник типоразмеров воздуховодов',
		description:
			'Стандартные сечения, диаметры и длины прямых участков и фасонных изделий.',
		badge: 'PDF · таблицы',
	},
	{
		id: 'norms',
		title: 'Нормы и стандарты (ГОСТ, СНиП)',
		description:
			'Действующие требования к проектированию и монтажу систем вентиляции.',
		badge: 'PDF · нормативы',
	},
	{
		id: 'aero',
		title: 'Таблицы аэродинамического расчёта',
		description:
			'Справочные значения для подбора сечений и расчёта потерь давления.',
		badge: 'XLSX · расчёт',
	},
	{
		id: 'fittings',
		title: 'Каталог фасонных изделий',
		description:
			'Отводы, переходы, тройники, врезки и заглушки с обозначениями.',
		badge: 'PDF · фасонина',
	},
]

const Reference = () => {
	return (
		<div>
			<NavbarForPages />
			<section className='relative min-h-screen overflow-hidden px-4 pt-32 pb-20'>
				<div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(149,172,197,0.25),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0),rgba(226,234,242,0.65))] dark:bg-[radial-gradient(circle_at_top_right,rgba(149,172,197,0.08),transparent_24%),linear-gradient(180deg,rgba(9,16,27,0),rgba(4,8,15,0.45))]'></div>
				<div className='section-shell relative z-10'>
					<div className='mx-auto max-w-5xl'>
						<div className='surface-card overflow-hidden'>
							<div className='border-b border-slate-200 bg-[#2c2e33] p-8 text-white md:p-10 dark:border-slate-800 dark:bg-[#1c1d21]'>
								<div className='flex h-16 w-16 items-center justify-center rounded-3xl border border-white/10 bg-white/8'>
									<BookOpen size={34} strokeWidth={1.7} />
								</div>
								<p className='mt-6 text-xs font-semibold uppercase tracking-[0.28em] text-slate-300'>
									Reference
								</p>
								<h1 className='mt-4 text-[clamp(2rem,1.4rem+3vw,3rem)] font-bold leading-tight'>
									Справочники VAC.UZ
								</h1>
								<p className='mt-5 max-w-2xl text-base leading-7 text-slate-300'>
									Технические справочники, нормативы и расчётные таблицы для
									проектирования вентиляции. Раздел наполняется — документы
									появятся в ближайшее время.
								</p>
							</div>
						</div>

						<Stagger className='mt-8 space-y-5' stagger={0.08}>
							{documents.map(doc => (
								<StaggerItem key={doc.id} className='surface-card overflow-hidden'>
									<div className='flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:p-8'>
										<div className='flex items-start gap-4'>
											<div className='flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200'>
												<FileText size={22} strokeWidth={1.8} />
											</div>
											<div>
												<div className='flex flex-wrap items-center gap-2'>
													<span className='section-kicker'>{doc.badge}</span>
													<span className='inline-flex items-center gap-1.5 rounded-full border border-amber-300/70 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300'>
														<Clock size={13} />
														Скоро
													</span>
												</div>
												<h2 className='mt-2 text-[clamp(1.2rem,1.05rem+0.7vw,1.5rem)] font-bold text-slate-950 dark:text-white'>
													{doc.title}
												</h2>
												<p className='mt-2 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300'>
													{doc.description}
												</p>
												<p className='mt-2 text-xs text-slate-400 dark:text-slate-500'>
													Документ готовится — скоро будет доступен для просмотра и
													скачивания.
												</p>
											</div>
										</div>

										<div className='flex w-full flex-col gap-2 md:w-52 md:flex-shrink-0'>
											<button
												type='button'
												disabled
												className='liquid-button liquid-button-panel w-full cursor-not-allowed justify-center px-4 py-3 text-sm font-semibold opacity-55 sm:py-2.5 sm:text-[13px]'
												aria-label={`${doc.title} — просмотр недоступен`}
											>
												<Eye size={16} />
												Просмотреть
											</button>
											<button
												type='button'
												disabled
												className='liquid-button liquid-button-panel w-full cursor-not-allowed justify-center px-4 py-3 text-sm font-semibold opacity-55 sm:py-2.5 sm:text-[13px]'
												aria-label={`${doc.title} — скачивание недоступно`}
											>
												<Download size={16} />
												Скачать
											</button>
										</div>
									</div>
								</StaggerItem>
							))}
						</Stagger>

						<Reveal className='surface-card mt-8 p-6 text-center md:p-8'>
							<p className='text-sm leading-6 text-slate-600 dark:text-slate-300'>
								Нужен конкретный справочник прямо сейчас? Напишите нам — пришлём
								актуальные материалы напрямую.
							</p>
							<a
								href='tel:+998909117272'
								className='liquid-button liquid-button-primary mt-4 inline-flex px-5 py-3 text-sm font-semibold'
							>
								+998 90 911-72-72
							</a>
						</Reveal>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	)
}

export default Reference
