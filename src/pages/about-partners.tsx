import {
	Building2,
	Factory,
	GraduationCap,
	HeartPulse,
	Home,
	Landmark,
	ShoppingBag,
	type LucideIcon,
} from 'lucide-react'
import { Fragment } from 'react'
import Footer from '../components/Footer'
import NavbarForPages from '../components/NavbarForPages'

interface Partner {
	name: string
	logo: string
}

// Логотипы партнёров (как на макете). Файлы уже лежат в public/.
const partners: Partner[] = [
	{ name: 'Akfa', logo: '/akfa-logo.png' },
	{ name: 'MJ Developers', logo: '/mj-logo.jpg' },
	{ name: 'b&a contractors', logo: '/b&a-logo.png' },
	{ name: 'UNG Shurtan GKM', logo: '/Shurtan-logo.png' },
	{ name: 'Uzbekenergo', logo: '/uzenergo-logo.png' },
	{ name: 'Artel', logo: '/Artel-logo.jpg' },
	{ name: 'Lukoil', logo: '/lukoil-logo.svg' },
	{ name: 'Dream City Development', logo: '/dream-logo.png' },
	{ name: 'Discover Invest', logo: '/discover-logo.png' },
	{ name: 'Eriell', logo: '/Eriel-logo.jpg' },
	{ name: 'Enter Engineering', logo: '/Enter-logo.png' },
	{ name: 'Xalq Banki', logo: '/xalq-logo.png' },
	{ name: 'Genesys', logo: '/gen-logo.jpg' },
	{ name: 'Ozpromholodmontaj', logo: '/prom-logo.jpg' },
	{ name: 'Mimar', logo: '/Mimar-logo.png' },
	{ name: 'Mirankul Group', logo: '/Mirankul-logo1.png' },
]

interface ProjectRow {
	object: string
	org: string
	year: string
}

interface ProjectCategory {
	title: string
	icon: LucideIcon
	rows: ProjectRow[]
}

// Реализованные объекты (данные заказчика), сгруппированные по категориям.
const projectCategories: ProjectCategory[] = [
	{
		title: 'Промышленные объекты',
		icon: Factory,
		rows: [
			{ object: 'Типография', org: 'ООО «SAMO PRINT»', year: '2015' },
			{ object: '«Текстильная фабрика» в г. Андижан', org: 'СП ООО «Dream Production»', year: '2015' },
			{ object: 'Кандымский газоперерабатывающий завод', org: 'Enter Engineering Pte. Ltd', year: '2015' },
			{ object: '«Опорная база промысла на месторождении Джаркудук — янги кизилва»', org: 'Eriell GROUP', year: '2015' },
			{ object: 'Завод по производству оцинкованной стали', org: 'ООО «Master Qurilish Servis»', year: '2015' },
			{ object: '«Прядильная фабрика» при ООО ШГХК', org: 'ООО «Шуртанский газохимический комплекс»', year: '2016' },
			{ object: 'Узметкомбинат', org: 'АО «Узметкомбинат»', year: '2016' },
			{ object: 'Кандымский — Водозабор', org: 'Кандымский — Водозабор', year: '2016' },
			{ object: 'Фармацевтический завод', org: 'ООО «Plast Pharm Medikal»', year: '2016' },
			{ object: 'Мубарекский газоперерабатывающий завод', org: 'Enter Engineering Pte. Ltd', year: '2016' },
			{ object: 'Мебельная фабрика', org: 'ООО «ZANGIOTA IMKON MEB»', year: '2016' },
			{ object: 'Сырный цех', org: 'ООО «Texnoklimat»', year: '2017' },
			{ object: 'Мебельная фабрика Атлас', org: 'Мебельная фабрика — «АТЛАС»', year: '2018' },
			{ object: '«Текстильная фабрика» г. Самарканд', org: 'ООО «Digital Prime Textile»', year: '2018' },
			{ object: '«Текстильная фабрика» г. Бухара', org: 'СП ООО «SURHANCEMENTINVEST»', year: '2018' },
			{ object: '«Строительство ДКС на месторождении Учкыр», Бухарская область', org: 'ИП ООО «Теплоизоляционная Компания» /РФ/', year: '2019' },
			{ object: 'Изготовление и монтаж сети аспирационных воздуховодов', org: '«B&A Contractors SA»', year: '2019' },
			{ object: 'Реконструкция цеха АГМК', org: 'ООО «Shtar System»', year: '2020' },
			{ object: 'Завод по производству теплоизоляционных плит', org: 'ООО «TEPLOIZOLYATSIONNAYA KOMPANIYA»', year: '2020' },
			{ object: 'GTL-завод по производству жидкого синтетического топлива на базе очищенного метана', org: 'Enter Engineering Pte. LTD', year: '2019–2021' },
		],
	},
	{
		title: 'Объекты здравоохранения',
		icon: HeartPulse,
		rows: [
			{ object: 'Реконструкция здания «Медицинское управление МВД Республики Узбекистан»', org: 'ООО «ANKUR»', year: '2015' },
			{ object: 'Онкология в г. Ташкент', org: 'ООО «Платинум стандарт»', year: '2018' },
			{ object: 'Чуст — оздоровительный комплекс', org: 'ООО «Texnoklimat»', year: '2019' },
			{ object: 'Лечебные учреждения кардиологии и эндокринологии г. Карши', org: 'УП «Шуртангаз»', year: '—' },
			{ object: 'Специальная больница, предназначенная для борьбы с коронавирусом', org: 'ООО «Asian Monocerous Group»', year: '2020' },
			{ object: 'Специальная больница, предназначенная для борьбы с коронавирусом', org: 'Enter Engineering Pte. Ltd', year: '2020' },
			{ object: 'Медицинский склад, в г. Ташкент', org: 'ЧП «Асклепий»', year: '2021' },
		],
	},
	{
		title: 'Образовательные и научные объекты',
		icon: GraduationCap,
		rows: [
			{ object: 'Реконструкция системы вентиляции в Детском саду №197', org: 'Детский сад №197', year: '2014' },
			{ object: 'Корейский культурный центр в Ташкенте', org: 'ООО «FC Sehwa Construction»', year: '2018' },
			{ object: '«Ташкентский филиал Российского национального исследовательского ядерного университета — МИФИ»', org: 'ПУ NSGD — «EE Services Trading DMCC»', year: '2019' },
			{ object: '«Мультимедийный зал Ташкентского университета информационных технологий»', org: 'МЧЖ «L-R-B Construction»', year: '2019' },
			{ object: '«Сингапурский институт развития менеджмента» в г. Ташкент', org: 'ЧП «Саддинсо — Хабибулло»', year: '2020' },
		],
	},
	{
		title: 'Жилые объекты',
		icon: Home,
		rows: [
			{ object: 'Дом престарелых', org: 'ООО «Discover Invest»', year: '2018' },
			{ object: 'Жилой дом', org: 'ООО «Genesys»', year: '2019–2020' },
			{ object: 'Жилые дома в жилом комплексе Хувайдо', org: 'ООО «Discover Invest»', year: '2020' },
			{ object: 'Жилые дома на территории Ташкент СИТИ', org: 'ООО «Shtar System»', year: '2020' },
			{ object: 'Жилые дома в жилом комплексе Жинггох', org: 'ООО «HIGH LAND CITY»', year: '2020' },
		],
	},
	{
		title: 'Офисные объекты',
		icon: Building2,
		rows: [
			{ object: '«Центр бадминтона»', org: 'Федерация бадминтона Узбекистана', year: '2014' },
			{ object: 'Филиал Банка «Buyuk Ipak Yo’li»', org: 'ООО «DIRA SERVIS»', year: '2014' },
			{ object: '«Предприятия группы компании AKFA»', org: '«AKFA»', year: '2016' },
			{ object: 'АО «Узбекская республиканская товарно-сырьевая биржа»', org: 'АО «Узбекская республиканская товарно-сырьевая биржа»', year: '2017' },
		],
	},
	{
		title: 'Торговые комплексы',
		icon: ShoppingBag,
		rows: [
			{ object: '«ECO Bazar»', org: '«ECO Bazar»', year: '2019' },
			{ object: '«Compas»', org: 'Enter Engineering Pte. Ltd', year: '2020' },
		],
	},
	{
		title: 'Государственные стратегические объекты',
		icon: Landmark,
		rows: [
			{ object: 'Правительственный Аэропорт-3', org: 'ООО «Texnoklimat»', year: '2017' },
			{ object: 'Государственная резиденция Президента Республики Узбекистан «Ko’ksaroy»', org: '«NSGD-EE SERVICES & TRADING. DMCC»', year: '2018' },
			{ object: '«Многопрофильный ледовый дворец Хумо арена»', org: 'ООО «O’zpromholodmontaj»', year: '2019' },
			{ object: 'Здания обслуживания первых лиц и правительственных делегаций (Терминал-1, аэропортовый комплекс Ташкент Восточный)', org: '«B&A Contractors SA»', year: '2019' },
			{ object: 'Братский корпус. Монастырь г. Чирчик', org: '«NSGD-EE SERVICES & TRADING. DMCC»', year: '—' },
			{ object: 'Учебный корпус. Министерство обороны Республики Узбекистан', org: 'ООО «Voris Kelajak»', year: '2021' },
		],
	},
]

const AboutPartners = () => {
	return (
		<div>
			<NavbarForPages />
			<section className='relative min-h-screen overflow-hidden px-4 pt-32 pb-20'>
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

							{/* Единая таблица: заголовок один раз сверху, категории идут
							    подряд полосами, колонки выровнены (table-fixed). */}
							<div className='overflow-x-auto'>
								<table className='w-full min-w-[680px] table-fixed text-left text-sm'>
									<colgroup>
										<col className='w-1/2' />
										<col className='w-[34%]' />
										<col className='w-[16%]' />
									</colgroup>
									<thead>
										<tr className='bg-sky-600 text-white'>
											<th className='px-4 py-3 font-semibold'>
												Наименование объекта, работ, услуг
											</th>
											<th className='px-4 py-3 font-semibold'>Организация</th>
											<th className='px-4 py-3 text-right font-semibold whitespace-nowrap'>
												Год реализации
											</th>
										</tr>
									</thead>
									<tbody>
										{projectCategories.map(cat => (
											<Fragment key={cat.title}>
												<tr className='bg-[#2c2e33] text-white dark:bg-[#1c1d21]'>
													<td colSpan={3} className='px-4 py-2.5'>
														<span className='flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em]'>
															<cat.icon size={16} strokeWidth={1.9} />
															{cat.title}
														</span>
													</td>
												</tr>
												{cat.rows.map((row, i) => (
													<tr
														key={`${cat.title}-${i}`}
														className='border-b border-slate-100 align-top dark:border-slate-800/70'
													>
														<td className='px-4 py-3 font-semibold break-words text-slate-900 dark:text-white'>
															{row.object}
														</td>
														<td className='px-4 py-3 break-words text-slate-600 dark:text-slate-300'>
															{row.org}
														</td>
														<td className='px-4 py-3 text-right font-semibold text-sky-600 whitespace-nowrap dark:text-sky-300'>
															{row.year}
														</td>
													</tr>
												))}
											</Fragment>
										))}
									</tbody>
								</table>
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
