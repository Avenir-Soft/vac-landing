import { Factory } from 'lucide-react'
import Footer from '../components/Footer'
import NavbarForPages from '../components/NavbarForPages'

interface Partner {
	name: string
	logo: string
}

// Логотипы партнёров (как на макете). Файлы уже лежат в public/.
const partners: Partner[] = [
	{ name: 'Akfa', logo: '/akfa-logo.png' },
	{ name: 'Ozpromholodmontaj', logo: '/prom-logo.jpg' },
	{ name: 'b&a contractors', logo: '/b&a-logo.png' },
	{ name: 'Uzbekenergo', logo: '/uzenergo-logo.png' },
	{ name: 'Artel', logo: '/Artel-logo.jpg' },
	{ name: 'Lukoil', logo: '/lukoil-logo.svg' },
	{ name: 'Discover Invest', logo: '/discover-logo.png' },
	{ name: 'Eriell', logo: '/Eriel-logo.jpg' },
	{ name: 'Enter Engineering', logo: '/Enter-logo.png' },
	{ name: 'Genesys', logo: '/gen-logo.jpg' },
	{ name: 'MJ Developers', logo: '/mj-logo.jpg' },
	{ name: 'Mimar', logo: '/Mimar-logo.png' },
]

interface ProjectRow {
	object: string
	org: string
	year: string
}

// Реализованные объекты (данные заказчика).
const projects: ProjectRow[] = [
	{ object: 'Типография', org: 'ООО «SAMO PRINT»', year: '2015' },
	{ object: '«Текстильная фабрика» в г. Андижан', org: 'СП ООО «Dream Production»', year: '2015' },
	{ object: 'Кандымский газоперерабатывающий завод', org: 'Enter Engineering Pte Ltd', year: '2015' },
	{ object: 'Опорная база промысла на месторождении Джаркудук', org: 'Eriell GROUP', year: '2015' },
	{ object: 'Завод по производству оцинкованной стали', org: 'ООО «Master Qurilish Servis»', year: '2015' },
	{ object: '«Прядильная фабрика» при ООО ШГХК', org: 'АО «Шуртанский газохимический комплекс»', year: '2016' },
	{ object: 'Узметкомбинат', org: 'АО «Узметкомбинат»', year: '2016' },
	{ object: 'Кандымский — Водозабор', org: 'Кандымский — Водозабор', year: '2016' },
	{ object: 'Фармацевтический завод', org: 'ООО «Plast Pharm Medikal»', year: '2016' },
	{ object: 'Мубарекский газоперерабатывающий завод', org: 'ООО «ZANGIOTA IMXON MEB»', year: '2016' },
	{ object: 'Мебельная фабрика', org: 'ООО «Tenneklimat»', year: '2017' },
	{ object: 'Сырный цех', org: 'ООО «Tenneklimat»', year: '2017' },
	{ object: 'Мебельная фабрика «Атлас», г. Самарканд', org: 'Мебельная фабрика «АТЛАС»', year: '2018' },
	{ object: '«Текстильная фабрика» г. Бухара', org: 'ООО «Digital Prime Textile»', year: '2018' },
	{ object: '«Текстильная фабрика» г. Бухара', org: 'СП ООО «SURNANCEMENTINVEST»', year: '2019' },
	{ object: '«Строительство ДКС на месторождении Учкыр», Бухарская область', org: 'ИП ООО «Теплоизоляционная Компания» /РФ/', year: '2019' },
]

const AboutPartners = () => {
	return (
		<div>
			<NavbarForPages />
			<section className='relative min-h-screen overflow-hidden px-4 pt-32 pb-20'>
				<div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(149,172,197,0.25),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0),rgba(226,234,242,0.65))] dark:bg-[radial-gradient(circle_at_top_right,rgba(149,172,197,0.08),transparent_24%),linear-gradient(180deg,rgba(9,16,27,0),rgba(4,8,15,0.45))]'></div>
				<div className='section-shell relative z-10'>
					<div className='mx-auto max-w-7xl'>
						<div className='mb-8 max-w-3xl'>
							<span className='section-kicker'>О компании</span>
							<h1 className='section-title mt-4'>Наши партнёры</h1>
							<p className='section-subtitle mt-4'>
								Нам доверяют крупные промышленные и строительные компании
								Узбекистана.
							</p>
						</div>

						{/* Логотипы партнёров */}
						<div className='partners-glass-shell rounded-[32px] p-4 md:p-6'>
							<div className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4'>
								{partners.map(partner => (
									<div
										key={partner.name}
										className='partner-logo-tile flex min-h-28 items-center justify-center px-6'
									>
										<img
											src={partner.logo}
											alt={partner.name}
											className='max-h-16 w-auto object-contain'
											draggable='false'
											loading='lazy'
										/>
									</div>
								))}
							</div>
						</div>

						{/* Реализованные объекты */}
						<div className='surface-card mt-10 overflow-hidden'>
							<div className='border-b border-slate-200 p-6 md:p-8 dark:border-slate-800'>
								<h2 className='text-[clamp(1.45rem,1.2rem+1.3vw,1.875rem)] font-bold text-slate-950 dark:text-white'>
									Реализованные объекты
								</h2>
								<p className='mt-3 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300'>
									Мы выполняем работы как на сложных промышленных объектах, так и на
									бытовых.
								</p>
							</div>

							<div className='grid gap-0 md:grid-cols-[220px_1fr]'>
								{/* Категория */}
								<div className='flex items-center gap-3 border-b border-slate-200 bg-slate-950 p-6 text-white md:border-b-0 md:border-r dark:border-slate-800 dark:bg-[#060b13]'>
									<Factory size={26} strokeWidth={1.7} />
									<span className='text-sm font-bold uppercase tracking-[0.16em]'>
										Промышленные объекты
									</span>
								</div>

								{/* Таблица — десктоп */}
								<div className='hidden overflow-x-auto md:block'>
									<table className='w-full min-w-[620px] text-left text-sm'>
										<thead>
											<tr className='border-b border-slate-200 text-xs font-semibold uppercase tracking-[0.08em] text-slate-500 dark:border-slate-800 dark:text-slate-400'>
												<th className='px-4 py-3'>Наименование объекта, работ, услуг</th>
												<th className='px-4 py-3'>Организация</th>
												<th className='px-4 py-3 text-right whitespace-nowrap'>Год реализации</th>
											</tr>
										</thead>
										<tbody>
											{projects.map((row, i) => (
												<tr
													key={i}
													className='border-b border-slate-100 last:border-0 dark:border-slate-800/70'
												>
													<td className='px-4 py-3 font-semibold text-slate-900 dark:text-white'>
														{row.object}
													</td>
													<td className='px-4 py-3 text-slate-600 dark:text-slate-300'>
														{row.org}
													</td>
													<td className='px-4 py-3 text-right font-semibold text-sky-600 whitespace-nowrap dark:text-sky-300'>
														{row.year}
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>

								{/* Карточки — мобилка */}
								<div className='divide-y divide-slate-100 md:hidden dark:divide-slate-800/70'>
									{projects.map((row, i) => (
										<div key={i} className='p-4'>
											<div className='flex items-start justify-between gap-3'>
												<p className='text-sm font-semibold leading-5 text-slate-900 dark:text-white'>
													{row.object}
												</p>
												<span className='shrink-0 rounded-full bg-sky-50 px-2.5 py-1 text-xs font-bold text-sky-600 dark:bg-sky-500/10 dark:text-sky-300'>
													{row.year}
												</span>
											</div>
											<p className='mt-1.5 text-sm leading-5 text-slate-600 dark:text-slate-300'>
												{row.org}
											</p>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</div>
	)
}

export default AboutPartners
