import { BookOpen, Clock, Download, Eye, FileText } from 'lucide-react'
import Footer from '../components/Footer'
import NavbarForPages from '../components/NavbarForPages'
import { Reveal, Stagger, StaggerItem } from '../components/motion/Reveal'
import { useLanguage } from '../hooks/useLanguage'
import type { Lang } from '../i18n/language'

type ReferenceDoc = {
	id: string
}

// Заглушка: настоящих файлов пока нет — карточки помечены «Скоро»,
// кнопки неактивны. Когда появятся PDF/XLSX, добавьте поле `src` и включите
// действия (см. страницу «Каталог» как образец).
const documents: ReferenceDoc[] = [
	{ id: 'sizes' },
	{ id: 'norms' },
	{ id: 'aero' },
	{ id: 'fittings' },
]

const ru = {
	kicker: 'Reference',
	heroTitle: 'Справочники VAC.UZ',
	heroText:
		'Технические справочники, нормативы и расчётные таблицы для проектирования вентиляции. Раздел наполняется — документы появятся в ближайшее время.',
	soon: 'Скоро',
	preparing:
		'Документ готовится — скоро будет доступен для просмотра и скачивания.',
	view: 'Просмотреть',
	download: 'Скачать',
	viewUnavailable: 'просмотр недоступен',
	downloadUnavailable: 'скачивание недоступно',
	ctaText:
		'Нужен конкретный справочник прямо сейчас? Напишите нам — пришлём актуальные материалы напрямую.',
	docs: [
		{
			title: 'Справочник типоразмеров воздуховодов',
			description:
				'Стандартные сечения, диаметры и длины прямых участков и фасонных изделий.',
			badge: 'PDF · таблицы',
		},
		{
			title: 'Нормы и стандарты (ГОСТ, СНиП)',
			description:
				'Действующие требования к проектированию и монтажу систем вентиляции.',
			badge: 'PDF · нормативы',
		},
		{
			title: 'Таблицы аэродинамического расчёта',
			description:
				'Справочные значения для подбора сечений и расчёта потерь давления.',
			badge: 'XLSX · расчёт',
		},
		{
			title: 'Каталог фасонных изделий',
			description:
				'Отводы, переходы, тройники, врезки и заглушки с обозначениями.',
			badge: 'PDF · фасонина',
		},
	],
}

const content: Record<Lang, typeof ru> = {
	ru,
	en: {
		kicker: 'Reference',
		heroTitle: 'VAC.UZ reference guides',
		heroText:
			'Technical reference guides, regulations and calculation tables for ventilation design. The section is being filled in — documents will appear soon.',
		soon: 'Soon',
		preparing:
			'The document is being prepared — it will soon be available for viewing and download.',
		view: 'View',
		download: 'Download',
		viewUnavailable: 'preview unavailable',
		downloadUnavailable: 'download unavailable',
		ctaText:
			'Need a specific reference guide right now? Write to us — we will send the current materials directly.',
		docs: [
			{
				title: 'Air duct size reference guide',
				description:
					'Standard cross-sections, diameters and lengths of straight sections and shaped products.',
				badge: 'PDF · tables',
			},
			{
				title: 'Norms and standards (GOST, SNiP)',
				description:
					'Current requirements for the design and installation of ventilation systems.',
				badge: 'PDF · regulations',
			},
			{
				title: 'Aerodynamic calculation tables',
				description:
					'Reference values for selecting cross-sections and calculating pressure losses.',
				badge: 'XLSX · calculation',
			},
			{
				title: 'Catalog of shaped products',
				description:
					'Elbows, transitions, tees, taps and end caps with designations.',
				badge: 'PDF · fittings',
			},
		],
	},
	uz: {
		kicker: 'Ma’lumotnoma',
		heroTitle: 'VAC.UZ ma’lumotnomalari',
		heroText:
			'Ventilyatsiyani loyihalash uchun texnik ma’lumotnomalar, me’yorlar va hisob jadvallari. Bo‘lim to‘ldirilmoqda — hujjatlar tez orada paydo bo‘ladi.',
		soon: 'Tez orada',
		preparing:
			'Hujjat tayyorlanmoqda — tez orada ko‘rish va yuklab olish uchun mavjud bo‘ladi.',
		view: 'Ko‘rish',
		download: 'Yuklab olish',
		viewUnavailable: 'ko‘rish mavjud emas',
		downloadUnavailable: 'yuklab olish mavjud emas',
		ctaText:
			'Aynan bir ma’lumotnoma hozir kerakmi? Bizga yozing — dolzarb materiallarni to‘g‘ridan-to‘g‘ri yuboramiz.',
		docs: [
			{
				title: 'Havo o‘tkazgichlar o‘lchamlari ma’lumotnomasi',
				description:
					'To‘g‘ri qismlar va fasonli mahsulotlarning standart kesimlari, diametrlari va uzunliklari.',
				badge: 'PDF · jadvallar',
			},
			{
				title: 'Normalar va standartlar (GOST, SNiP)',
				description:
					'Ventilyatsiya tizimlarini loyihalash va o‘rnatishga oid amaldagi talablar.',
				badge: 'PDF · me’yorlar',
			},
			{
				title: 'Aerodinamik hisob jadvallari',
				description:
					'Kesimlarni tanlash va bosim yo‘qotishlarini hisoblash uchun ma’lumot qiymatlari.',
				badge: 'XLSX · hisob',
			},
			{
				title: 'Fasonli mahsulotlar katalogi',
				description:
					'Burilishlar, o‘tishlar, troyniklar, ulanishlar va tiqinlar belgilanishlari bilan.',
				badge: 'PDF · fasonli qismlar',
			},
		],
	},
}

const Reference = () => {
	const { lang } = useLanguage()
	const t = content[lang]

	return (
		<div>
			<NavbarForPages />
			<section className='relative min-h-screen overflow-hidden px-4 pt-32 pb-20'>
				<div className='section-shell relative z-10'>
					<div className='mx-auto max-w-5xl'>
						<div className='overflow-hidden rounded-3xl shadow-[0_10px_30px_-24px_rgba(18,40,67,0.16)] dark:shadow-[0_14px_36px_-30px_rgba(0,0,0,0.7)]'>
							<div className='bg-[#2c2e33] p-8 text-white md:p-10 dark:bg-[#1c1d21]'>
								<div className='flex h-16 w-16 items-center justify-center rounded-3xl border border-white/10 bg-white/8'>
									<BookOpen size={34} strokeWidth={1.7} />
								</div>
								<p className='mt-6 text-xs font-semibold uppercase tracking-[0.28em] text-slate-300'>
									{t.kicker}
								</p>
								<h1 className='mt-4 text-[clamp(2rem,1.4rem+3vw,3rem)] font-bold leading-tight'>
									{t.heroTitle}
								</h1>
								<p className='mt-5 max-w-2xl text-base leading-7 text-slate-300'>
									{t.heroText}
								</p>
							</div>
						</div>

						<Stagger className='mt-8 space-y-5' stagger={0.08}>
							{documents.map((doc, i) => {
								const text = t.docs[i]
								return (
								<StaggerItem key={doc.id} className='surface-card overflow-hidden'>
									<div className='flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:p-8'>
										<div className='flex items-start gap-4'>
											<div className='flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200'>
												<FileText size={22} strokeWidth={1.8} />
											</div>
											<div>
												<div className='flex flex-wrap items-center gap-2'>
													<span className='section-kicker'>{text.badge}</span>
													<span className='inline-flex items-center gap-1.5 rounded-full border border-amber-300/70 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300'>
														<Clock size={13} />
														{t.soon}
													</span>
												</div>
												<h2 className='mt-2 text-[clamp(1.2rem,1.05rem+0.7vw,1.5rem)] font-bold text-slate-950 dark:text-white'>
													{text.title}
												</h2>
												<p className='mt-2 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300'>
													{text.description}
												</p>
												<p className='mt-2 text-xs text-slate-400 dark:text-slate-500'>
													{t.preparing}
												</p>
											</div>
										</div>

										<div className='flex w-full flex-col gap-2 md:w-52 md:flex-shrink-0'>
											<button
												type='button'
												disabled
												className='liquid-button liquid-button-panel w-full cursor-not-allowed justify-center px-4 py-3 text-sm font-semibold opacity-55 sm:py-2.5 sm:text-[13px]'
												aria-label={`${text.title} — ${t.viewUnavailable}`}
											>
												<Eye size={16} />
												{t.view}
											</button>
											<button
												type='button'
												disabled
												className='liquid-button liquid-button-panel w-full cursor-not-allowed justify-center px-4 py-3 text-sm font-semibold opacity-55 sm:py-2.5 sm:text-[13px]'
												aria-label={`${text.title} — ${t.downloadUnavailable}`}
											>
												<Download size={16} />
												{t.download}
											</button>
										</div>
									</div>
								</StaggerItem>
								)
							})}
						</Stagger>

						<Reveal className='surface-card mt-8 p-6 text-center md:p-8'>
							<p className='text-sm leading-6 text-slate-600 dark:text-slate-300'>
								{t.ctaText}
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
