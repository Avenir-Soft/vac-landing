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
import { useLanguage } from '../hooks/useLanguage'
import type { Lang } from '../i18n/language'

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

interface ProjectRowMeta {
	// Годы не зависят от языка; названия организаций локализуются по языкам.
	org: Record<Lang, string>
	year: string
}

interface ProjectCategoryMeta {
	icon: LucideIcon
	rows: ProjectRowMeta[]
}

// Реализованные объекты (данные заказчика), сгруппированные по категориям.
// Иконки и годы не зависят от языка; переводимый текст (заголовки категорий,
// наименования объектов и названия организаций) локализуется.
const projectMeta: ProjectCategoryMeta[] = [
	{
		icon: Factory,
		rows: [
			{ org: { ru: 'ООО «SAMO PRINT»', en: 'SAMO PRINT LLC', uz: 'SAMO PRINT MChJ' }, year: '2015' },
			{ org: { ru: 'СП ООО «Dream Production»', en: 'Dream Production JV LLC', uz: 'Dream Production QK MChJ' }, year: '2015' },
			{ org: { ru: 'Enter Engineering Pte. Ltd', en: 'Enter Engineering Pte. Ltd', uz: 'Enter Engineering Pte. Ltd' }, year: '2015' },
			{ org: { ru: 'Eriell GROUP', en: 'Eriell GROUP', uz: 'Eriell GROUP' }, year: '2015' },
			{ org: { ru: 'ООО «Master Qurilish Servis»', en: 'Master Qurilish Servis LLC', uz: 'Master Qurilish Servis MChJ' }, year: '2015' },
			{ org: { ru: 'ООО «Шуртанский газохимический комплекс»', en: 'Shurtan Gas Chemical Complex LLC', uz: 'Shurtan gaz-kimyo majmuasi MChJ' }, year: '2016' },
			{ org: { ru: 'АО «Узметкомбинат»', en: 'Uzmetkombinat JSC', uz: 'Uzmetkombinat AJ' }, year: '2016' },
			{ org: { ru: 'Кандымский — Водозабор', en: 'Kandym — Water intake', uz: 'Qandim — Suv olish inshooti' }, year: '2016' },
			{ org: { ru: 'ООО «Plast Pharm Medikal»', en: 'Plast Pharm Medikal LLC', uz: 'Plast Pharm Medikal MChJ' }, year: '2016' },
			{ org: { ru: 'Enter Engineering Pte. Ltd', en: 'Enter Engineering Pte. Ltd', uz: 'Enter Engineering Pte. Ltd' }, year: '2016' },
			{ org: { ru: 'ООО «ZANGIOTA IMKON MEB»', en: 'ZANGIOTA IMKON MEB LLC', uz: 'ZANGIOTA IMKON MEB MChJ' }, year: '2016' },
			{ org: { ru: 'ООО «Texnoklimat»', en: 'Texnoklimat LLC', uz: 'Texnoklimat MChJ' }, year: '2017' },
			{ org: { ru: 'Мебельная фабрика — «АТЛАС»', en: 'Furniture factory — ATLAS', uz: 'Mebel fabrikasi — ATLAS' }, year: '2018' },
			{ org: { ru: 'ООО «Digital Prime Textile»', en: 'Digital Prime Textile LLC', uz: 'Digital Prime Textile MChJ' }, year: '2018' },
			{ org: { ru: 'СП ООО «SURHANCEMENTINVEST»', en: 'SURHANCEMENTINVEST JV LLC', uz: 'SURHANCEMENTINVEST QK MChJ' }, year: '2018' },
			{ org: { ru: 'ИП ООО «Теплоизоляционная Компания» /РФ/', en: 'Thermal Insulation Company FE LLC /RF/', uz: 'Issiqlik izolyatsiyasi kompaniyasi XK MChJ /RF/' }, year: '2019' },
			{ org: { ru: '«B&A Contractors SA»', en: 'B&A Contractors SA', uz: 'B&A Contractors SA' }, year: '2019' },
			{ org: { ru: 'ООО «Shtar System»', en: 'Shtar System LLC', uz: 'Shtar System MChJ' }, year: '2020' },
			{ org: { ru: 'ООО «TEPLOIZOLYATSIONNAYA KOMPANIYA»', en: 'TEPLOIZOLYATSIONNAYA KOMPANIYA LLC', uz: 'TEPLOIZOLYATSIONNAYA KOMPANIYA MChJ' }, year: '2020' },
			{ org: { ru: 'Enter Engineering Pte. LTD', en: 'Enter Engineering Pte. LTD', uz: 'Enter Engineering Pte. LTD' }, year: '2019–2021' },
		],
	},
	{
		icon: HeartPulse,
		rows: [
			{ org: { ru: 'ООО «ANKUR»', en: 'ANKUR LLC', uz: 'ANKUR MChJ' }, year: '2015' },
			{ org: { ru: 'ООО «Платинум стандарт»', en: 'Platinum Standard LLC', uz: 'Platinum Standard MChJ' }, year: '2018' },
			{ org: { ru: 'ООО «Texnoklimat»', en: 'Texnoklimat LLC', uz: 'Texnoklimat MChJ' }, year: '2019' },
			{ org: { ru: 'УП «Шуртангаз»', en: 'Shurtangaz UE', uz: 'Shurtangaz UK' }, year: '—' },
			{ org: { ru: 'ООО «Asian Monocerous Group»', en: 'Asian Monocerous Group LLC', uz: 'Asian Monocerous Group MChJ' }, year: '2020' },
			{ org: { ru: 'Enter Engineering Pte. Ltd', en: 'Enter Engineering Pte. Ltd', uz: 'Enter Engineering Pte. Ltd' }, year: '2020' },
			{ org: { ru: 'ЧП «Асклепий»', en: 'Asklepiy PE', uz: 'Asklepiy XK' }, year: '2021' },
		],
	},
	{
		icon: GraduationCap,
		rows: [
			{ org: { ru: 'Детский сад №197', en: 'Kindergarten No. 197', uz: '197-son bolalar bog‘chasi' }, year: '2014' },
			{ org: { ru: 'ООО «FC Sehwa Construction»', en: 'FC Sehwa Construction LLC', uz: 'FC Sehwa Construction MChJ' }, year: '2018' },
			{ org: { ru: 'ПУ NSGD — «EE Services Trading DMCC»', en: 'NSGD Unit — EE Services Trading DMCC', uz: 'NSGD bo‘limi — EE Services Trading DMCC' }, year: '2019' },
			{ org: { ru: 'МЧЖ «L-R-B Construction»', en: 'L-R-B Construction LLC', uz: 'L-R-B Construction MChJ' }, year: '2019' },
			{ org: { ru: 'ЧП «Саддинсо — Хабибулло»', en: 'Saddinso — Habibullo PE', uz: 'Saddinso — Habibullo XK' }, year: '2020' },
		],
	},
	{
		icon: Home,
		rows: [
			{ org: { ru: 'ООО «Discover Invest»', en: 'Discover Invest LLC', uz: 'Discover Invest MChJ' }, year: '2018' },
			{ org: { ru: 'ООО «Genesys»', en: 'Genesys LLC', uz: 'Genesys MChJ' }, year: '2019–2020' },
			{ org: { ru: 'ООО «Discover Invest»', en: 'Discover Invest LLC', uz: 'Discover Invest MChJ' }, year: '2020' },
			{ org: { ru: 'ООО «Shtar System»', en: 'Shtar System LLC', uz: 'Shtar System MChJ' }, year: '2020' },
			{ org: { ru: 'ООО «HIGH LAND CITY»', en: 'HIGH LAND CITY LLC', uz: 'HIGH LAND CITY MChJ' }, year: '2020' },
		],
	},
	{
		icon: Building2,
		rows: [
			{ org: { ru: 'Федерация бадминтона Узбекистана', en: 'Badminton Federation of Uzbekistan', uz: 'O‘zbekiston badminton federatsiyasi' }, year: '2014' },
			{ org: { ru: 'ООО «DIRA SERVIS»', en: 'DIRA SERVIS LLC', uz: 'DIRA SERVIS MChJ' }, year: '2014' },
			{ org: { ru: '«AKFA»', en: 'AKFA', uz: 'AKFA' }, year: '2016' },
			{ org: { ru: 'АО «Узбекская республиканская товарно-сырьевая биржа»', en: 'Uzbek Republican Commodity and Raw Materials Exchange JSC', uz: 'O‘zbekiston respublika tovar-xomashyo birjasi AJ' }, year: '2017' },
		],
	},
	{
		icon: ShoppingBag,
		rows: [
			{ org: { ru: '«ECO Bazar»', en: 'ECO Bazar', uz: 'ECO Bazar' }, year: '2019' },
			{ org: { ru: 'Enter Engineering Pte. Ltd', en: 'Enter Engineering Pte. Ltd', uz: 'Enter Engineering Pte. Ltd' }, year: '2020' },
		],
	},
	{
		icon: Landmark,
		rows: [
			{ org: { ru: 'ООО «Texnoklimat»', en: 'Texnoklimat LLC', uz: 'Texnoklimat MChJ' }, year: '2017' },
			{ org: { ru: '«NSGD-EE SERVICES & TRADING. DMCC»', en: 'NSGD-EE SERVICES & TRADING. DMCC', uz: 'NSGD-EE SERVICES & TRADING. DMCC' }, year: '2018' },
			{ org: { ru: 'ООО «O’zpromholodmontaj»', en: 'Ozpromholodmontaj LLC', uz: 'O‘zpromholodmontaj MChJ' }, year: '2019' },
			{ org: { ru: '«B&A Contractors SA»', en: 'B&A Contractors SA', uz: 'B&A Contractors SA' }, year: '2019' },
			{ org: { ru: '«NSGD-EE SERVICES & TRADING. DMCC»', en: 'NSGD-EE SERVICES & TRADING. DMCC', uz: 'NSGD-EE SERVICES & TRADING. DMCC' }, year: '—' },
			{ org: { ru: 'ООО «Voris Kelajak»', en: 'Voris Kelajak LLC', uz: 'Voris Kelajak MChJ' }, year: '2021' },
		],
	},
]

interface CategoryText {
	title: string
	objects: string[]
}

const ru = {
	kicker: 'О компании',
	title: 'Наши партнёры',
	subtitle:
		'Нам доверяют крупные промышленные и строительные компании Узбекистана.',
	realizedHeading: 'Реализованные объекты',
	realizedSubtitle:
		'Мы выполняем работы как на сложных промышленных объектах, так и на бытовых.',
	thObject: 'Наименование объекта, работ, услуг',
	thOrg: 'Организация',
	thYear: 'Год реализации',
	orgLabel: 'Организация:',
	categories: [
		{
			title: 'Промышленные объекты',
			objects: [
				'Типография',
				'«Текстильная фабрика» в г. Андижан',
				'Кандымский газоперерабатывающий завод',
				'«Опорная база промысла на месторождении Джаркудук — янги кизилва»',
				'Завод по производству оцинкованной стали',
				'«Прядильная фабрика» при ООО ШГХК',
				'Узметкомбинат',
				'Кандымский — Водозабор',
				'Фармацевтический завод',
				'Мубарекский газоперерабатывающий завод',
				'Мебельная фабрика',
				'Сырный цех',
				'Мебельная фабрика Атлас',
				'«Текстильная фабрика» г. Самарканд',
				'«Текстильная фабрика» г. Бухара',
				'«Строительство ДКС на месторождении Учкыр», Бухарская область',
				'Изготовление и монтаж сети аспирационных воздуховодов',
				'Реконструкция цеха АГМК',
				'Завод по производству теплоизоляционных плит',
				'GTL-завод по производству жидкого синтетического топлива на базе очищенного метана',
			],
		},
		{
			title: 'Объекты здравоохранения',
			objects: [
				'Реконструкция здания «Медицинское управление МВД Республики Узбекистан»',
				'Онкология в г. Ташкент',
				'Чуст — оздоровительный комплекс',
				'Лечебные учреждения кардиологии и эндокринологии г. Карши',
				'Специальная больница, предназначенная для борьбы с коронавирусом',
				'Специальная больница, предназначенная для борьбы с коронавирусом',
				'Медицинский склад, в г. Ташкент',
			],
		},
		{
			title: 'Образовательные и научные объекты',
			objects: [
				'Реконструкция системы вентиляции в Детском саду №197',
				'Корейский культурный центр в Ташкенте',
				'«Ташкентский филиал Российского национального исследовательского ядерного университета — МИФИ»',
				'«Мультимедийный зал Ташкентского университета информационных технологий»',
				'«Сингапурский институт развития менеджмента» в г. Ташкент',
			],
		},
		{
			title: 'Жилые объекты',
			objects: [
				'Дом престарелых',
				'Жилой дом',
				'Жилые дома в жилом комплексе Хувайдо',
				'Жилые дома на территории Ташкент СИТИ',
				'Жилые дома в жилом комплексе Жинггох',
			],
		},
		{
			title: 'Офисные объекты',
			objects: [
				'«Центр бадминтона»',
				'Филиал Банка «Buyuk Ipak Yo’li»',
				'«Предприятия группы компании AKFA»',
				'АО «Узбекская республиканская товарно-сырьевая биржа»',
			],
		},
		{
			title: 'Торговые комплексы',
			objects: ['«ECO Bazar»', '«Compas»'],
		},
		{
			title: 'Государственные стратегические объекты',
			objects: [
				'Правительственный Аэропорт-3',
				'Государственная резиденция Президента Республики Узбекистан «Ko’ksaroy»',
				'«Многопрофильный ледовый дворец Хумо арена»',
				'Здания обслуживания первых лиц и правительственных делегаций (Терминал-1, аэропортовый комплекс Ташкент Восточный)',
				'Братский корпус. Монастырь г. Чирчик',
				'Учебный корпус. Министерство обороны Республики Узбекистан',
			],
		},
	] as CategoryText[],
}

const content: Record<Lang, typeof ru> = {
	ru,
	en: {
		kicker: 'About company',
		title: 'Our partners',
		subtitle:
			'We are trusted by major industrial and construction companies of Uzbekistan.',
		realizedHeading: 'Completed projects',
		realizedSubtitle:
			'We carry out work both on complex industrial projects and on residential ones.',
		thObject: 'Name of object, works, services',
		thOrg: 'Organization',
		thYear: 'Year of completion',
		orgLabel: 'Organization:',
		categories: [
			{
				title: 'Industrial facilities',
				objects: [
					'Printing house',
					'"Textile factory" in Andijan',
					'Kandym gas processing plant',
					'"Field support base at the Jarkuduk — Yangi Kizilva deposit"',
					'Galvanized steel production plant',
					'"Spinning factory" at ShGKhK LLC',
					'Uzmetkombinat',
					'Kandym — Water intake',
					'Pharmaceutical plant',
					'Mubarek gas processing plant',
					'Furniture factory',
					'Cheese workshop',
					'Atlas furniture factory',
					'"Textile factory", Samarkand',
					'"Textile factory", Bukhara',
					'"Construction of a booster compressor station at the Uchkyr deposit", Bukhara region',
					'Fabrication and installation of an aspiration air-duct network',
					'Reconstruction of an AGMK workshop',
					'Thermal insulation board production plant',
					'GTL plant for producing liquid synthetic fuel from purified methane',
				],
			},
			{
				title: 'Healthcare facilities',
				objects: [
					'Reconstruction of the "Medical Directorate of the Ministry of Internal Affairs of the Republic of Uzbekistan" building',
					'Oncology center in Tashkent',
					'Chust — wellness complex',
					'Cardiology and endocrinology medical institutions in Karshi',
					'Special hospital designed to combat coronavirus',
					'Special hospital designed to combat coronavirus',
					'Medical warehouse in Tashkent',
				],
			},
			{
				title: 'Educational and research facilities',
				objects: [
					'Reconstruction of the ventilation system at Kindergarten No. 197',
					'Korean Cultural Center in Tashkent',
					'"Tashkent branch of the National Research Nuclear University MEPhI"',
					'"Multimedia hall of the Tashkent University of Information Technologies"',
					'"Singapore Institute of Management Development" in Tashkent',
				],
			},
			{
				title: 'Residential facilities',
				objects: [
					'Nursing home',
					'Residential building',
					'Residential buildings in the Huvaido residential complex',
					'Residential buildings on the Tashkent City territory',
					'Residential buildings in the Jinggoh residential complex',
				],
			},
			{
				title: 'Office facilities',
				objects: [
					'"Badminton center"',
					'Branch of "Buyuk Ipak Yo’li" Bank',
					'"Enterprises of the AKFA company group"',
					'JSC "Uzbek Republican Commodity and Raw Materials Exchange"',
				],
			},
			{
				title: 'Shopping complexes',
				objects: ['"ECO Bazar"', '"Compas"'],
			},
			{
				title: 'State strategic facilities',
				objects: [
					'Government Airport-3',
					'State residence of the President of the Republic of Uzbekistan "Ko’ksaroy"',
					'"Multipurpose ice palace Humo Arena"',
					'Buildings for servicing top officials and government delegations (Terminal-1, Tashkent Vostochny airport complex)',
					'Brethren building. Monastery in Chirchik',
					'Educational building. Ministry of Defense of the Republic of Uzbekistan',
				],
			},
		],
	},
	uz: {
		kicker: 'Kompaniya haqida',
		title: 'Hamkorlarimiz',
		subtitle:
			'Bizga O‘zbekistonning yirik sanoat va qurilish kompaniyalari ishonadi.',
		realizedHeading: 'Amalga oshirilgan obyektlar',
		realizedSubtitle:
			'Biz murakkab sanoat obyektlarida ham, maishiy obyektlarda ham ishlarni bajaramiz.',
		thObject: 'Obyekt, ishlar, xizmatlar nomi',
		thOrg: 'Tashkilot',
		thYear: 'Amalga oshirilgan yil',
		orgLabel: 'Tashkilot:',
		categories: [
			{
				title: 'Sanoat obyektlari',
				objects: [
					'Bosmaxona',
					'Andijon shahridagi "To‘qimachilik fabrikasi"',
					'Qandim gazni qayta ishlash zavodi',
					'"Jarquduq — Yangi Qizilva konidagi qazib olish tayanch bazasi"',
					'Ruxlangan po‘lat ishlab chiqarish zavodi',
					'ShGKhK MChJ qoshidagi "Yigiruv fabrikasi"',
					'Uzmetkombinat',
					'Qandim — Suv olish inshooti',
					'Farmatsevtika zavodi',
					'Muborak gazni qayta ishlash zavodi',
					'Mebel fabrikasi',
					'Pishloq sexi',
					'Atlas mebel fabrikasi',
					'Samarqand shahridagi "To‘qimachilik fabrikasi"',
					'Buxoro shahridagi "To‘qimachilik fabrikasi"',
					'"Uchqir konida DKS qurilishi", Buxoro viloyati',
					'Aspiratsiya havo o‘tkazgichlari tarmog‘ini tayyorlash va montaj qilish',
					'AGMK sexini rekonstruksiya qilish',
					'Issiqlik izolyatsiyasi plitalari ishlab chiqarish zavodi',
					'Tozalangan metan asosida suyuq sintetik yoqilg‘i ishlab chiqaruvchi GTL zavodi',
				],
			},
			{
				title: 'Sog‘liqni saqlash obyektlari',
				objects: [
					'"O‘zbekiston Respublikasi IIV Tibbiyot boshqarmasi" binosini rekonstruksiya qilish',
					'Toshkent shahridagi Onkologiya markazi',
					'Chust — sog‘lomlashtirish majmuasi',
					'Qarshi shahridagi kardiologiya va endokrinologiya davolash muassasalari',
					'Koronavirusga qarshi kurashish uchun mo‘ljallangan maxsus shifoxona',
					'Koronavirusga qarshi kurashish uchun mo‘ljallangan maxsus shifoxona',
					'Toshkent shahridagi tibbiy ombor',
				],
			},
			{
				title: 'Ta’lim va ilmiy obyektlar',
				objects: [
					'197-sonli bolalar bog‘chasida ventilyatsiya tizimini rekonstruksiya qilish',
					'Toshkentdagi Koreya madaniyat markazi',
					'"Rossiya milliy tadqiqot yadro universiteti — MIFI Toshkent filiali"',
					'"Toshkent axborot texnologiyalari universiteti multimedia zali"',
					'Toshkent shahridagi "Singapur menejmentni rivojlantirish instituti"',
				],
			},
			{
				title: 'Turar-joy obyektlari',
				objects: [
					'Keksalar uyi',
					'Turar-joy binosi',
					'Huvaydo turar-joy majmuasidagi yashash binolari',
					'Toshkent Siti hududidagi turar-joy binolari',
					'Jinggoh turar-joy majmuasidagi yashash binolari',
				],
			},
			{
				title: 'Ofis obyektlari',
				objects: [
					'"Badminton markazi"',
					'"Buyuk Ipak Yo’li" banki filiali',
					'"AKFA kompaniyalar guruhi korxonalari"',
					'"O‘zbekiston respublika tovar-xomashyo birjasi" AJ',
				],
			},
			{
				title: 'Savdo majmualari',
				objects: ['"ECO Bazar"', '"Compas"'],
			},
			{
				title: 'Davlat strategik obyektlari',
				objects: [
					'Hukumat Aeroporti-3',
					'O‘zbekiston Respublikasi Prezidentining "Ko’ksaroy" davlat qarorgohi',
					'"Ko‘p tarmoqli Humo Arena muzli saroyi"',
					'Yuqori mansabdor shaxslar va hukumat delegatsiyalariga xizmat ko‘rsatish binolari (Terminal-1, Toshkent Sharqiy aeroport majmuasi)',
					'Birodarlar korpusi. Chirchiq shahridagi monastir',
					'O‘quv korpusi. O‘zbekiston Respublikasi Mudofaa vazirligi',
				],
			},
		],
	},
}

const AboutPartners = () => {
	const { lang } = useLanguage()
	const t = content[lang]

	const projectCategories = projectMeta.map((cat, ci) => ({
		title: t.categories[ci].title,
		icon: cat.icon,
		rows: cat.rows.map((row, ri) => ({
			object: t.categories[ci].objects[ri],
			org: row.org[lang],
			year: row.year,
		})),
	}))

	return (
		<div>
			<NavbarForPages />
			<section className='relative min-h-screen overflow-hidden px-4 pt-32 pb-20'>
				<div className='section-shell relative z-10'>
					<div className='mx-auto max-w-7xl'>
						<div className='mb-8 max-w-3xl'>
							<span className='section-kicker'>{t.kicker}</span>
							<h1 className='section-title mt-4'>{t.title}</h1>
							<p className='section-subtitle mt-4'>
								{t.subtitle}
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
									{t.realizedHeading}
								</h2>
								<p className='mt-3 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300'>
									{t.realizedSubtitle}
								</p>
							</div>

							{/* Десктоп: единая таблица (заголовок один раз сверху,
							    категории идут подряд полосами, колонки выровнены). */}
							<div className='hidden overflow-x-auto md:block'>
								<table className='w-full min-w-[680px] table-fixed text-left text-sm'>
									<colgroup>
										<col className='w-1/2' />
										<col className='w-[34%]' />
										<col className='w-[16%]' />
									</colgroup>
									<thead>
										<tr className='bg-sky-600 text-white'>
											<th className='px-4 py-3 font-semibold'>
												{t.thObject}
											</th>
											<th className='px-4 py-3 font-semibold'>{t.thOrg}</th>
											<th className='px-4 py-3 text-right font-semibold whitespace-nowrap'>
												{t.thYear}
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

							{/* Мобильные: каждая категория — полоса-заголовок, строки —
							    вертикальные карточки. Без горизонтального скролла. */}
							<div className='md:hidden'>
								{projectCategories.map(cat => (
									<div key={`m-${cat.title}`}>
										<div className='flex items-center gap-2 bg-[#2c2e33] px-4 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-white dark:bg-[#1c1d21]'>
											<cat.icon size={16} strokeWidth={1.9} className='shrink-0' />
											<span className='leading-tight'>{cat.title}</span>
										</div>
										<div className='divide-y divide-slate-100 dark:divide-slate-800/70'>
											{cat.rows.map((row, i) => (
												<div key={`m-${cat.title}-${i}`} className='px-4 py-4'>
													<div className='flex items-start justify-between gap-3'>
														<p className='font-semibold leading-snug text-slate-900 dark:text-white'>
															{row.object}
														</p>
														<span className='mt-0.5 shrink-0 rounded-full bg-sky-50 px-2.5 py-1 text-xs font-bold whitespace-nowrap text-sky-700 dark:bg-sky-500/10 dark:text-sky-300'>
															{row.year}
														</span>
													</div>
													<p className='mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300'>
														<span className='text-slate-400 dark:text-slate-500'>
															{t.orgLabel}{' '}
														</span>
														{row.org}
													</p>
												</div>
											))}
										</div>
									</div>
								))}
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
