import { CheckCircle2, Factory, Workflow } from 'lucide-react'
import schema from '../assets/diagram.png'
import founderPhoto from '../assets/founder-usmanov.png'
import Footer from '../components/Footer'
import NavbarForPages from '../components/NavbarForPages'
import { Reveal } from '../components/motion/Reveal'
import { useLanguage } from '../hooks/useLanguage'
import type { Lang } from '../i18n/language'

const ru = {
	founderAlt: 'Основатель VAC.UZ М. К. Усманов',
	founderRole: 'Основатель VAC.UZ',
	founderName: 'М. К. Усманов',
	founderSignature: 'Музаффар Усманов',
	heading: 'Обращение основателя VAC.UZ',
	p1: 'За 12 лет работы мы изготовили тысячи километров воздуховодов и выполнили проекты для более чем 1500 клиентов. Наш путь начался не с производства, а с монтажа вентиляционных систем. Именно практический опыт помог мне понять, каким должен быть качественный воздуховод и что действительно важно для заказчика.',
	p2: 'Поэтому сегодня VAC.UZ специализируется на производстве воздуховодов, фасонных изделий и комплектующих для систем вентиляции. Мы знаем требования рынка не по учебникам, а по многолетней работе на реальных объектах.',
	p3: 'Прежде чем доверить компании свой проект, рекомендую познакомиться с её производством, людьми и принципами работы. Цена важна, но ещё важнее понимать, кто отвечает за качество, сроки и результат.',
	p4: 'Для меня репутация всегда была и остаётся важнее любого контракта.',
	signOff: 'Искренне ваш,',
	prodKicker: 'Производство',
	prodTitle: 'Производство и инженерная комплектация',
	prodP1: 'Производство оснащено необходимым оборудованием для серийных и индивидуальных заказов. Команда помогает с подбором, спецификацией и комплектацией объекта.',
	prodP2: 'Главный принцип работы: понятные сроки, прозрачная коммуникация и аккуратное выполнение технических заданий.',
	missionTitle: 'Миссия компании',
	missionText: 'Развивать рынок качественной вентиляции через понятный сервис, чёткие сроки и профессиональный подход.',
	bullets: [
		'Конкретное ценообразование без искусственного дефицита.',
		'Оптимизация монтажа вентиляционных систем.',
		'Популяризация центральной вентиляции взамен локальных решений.',
	],
	schemeKicker: 'Схема работы',
	schemeTitle: 'Схема взаимодействий',
	schemeAlt: 'Схема взаимодействий',
}

const content: Record<Lang, typeof ru> = {
	ru,
	en: {
		founderAlt: 'Founder of VAC.UZ M. K. Usmanov',
		founderRole: 'Founder of VAC.UZ',
		founderName: 'M. K. Usmanov',
		founderSignature: 'Muzaffar Usmanov',
		heading: 'A message from the founder of VAC.UZ',
		p1: 'Over 12 years of work we have produced thousands of kilometers of air ducts and completed projects for more than 1500 clients. Our journey began not with manufacturing, but with the installation of ventilation systems. It was this hands-on experience that helped me understand what a quality air duct should be and what truly matters to the customer.',
		p2: 'That is why today VAC.UZ specializes in the production of air ducts, fittings and components for ventilation systems. We know the market requirements not from textbooks, but from years of work on real projects.',
		p3: 'Before entrusting a company with your project, I recommend getting to know its production, its people and its working principles. Price matters, but it is even more important to understand who is responsible for quality, deadlines and results.',
		p4: 'For me, reputation has always been and remains more important than any contract.',
		signOff: 'Sincerely yours,',
		prodKicker: 'Manufacturing',
		prodTitle: 'Manufacturing and engineering supply',
		prodP1: 'The production facility is equipped with the machinery needed for both serial and custom orders. The team assists with selection, specification and outfitting of the project.',
		prodP2: 'The main working principle: clear deadlines, transparent communication and careful execution of technical assignments.',
		missionTitle: 'Company mission',
		missionText: 'To develop the market for quality ventilation through clear service, precise deadlines and a professional approach.',
		bullets: [
			'Specific pricing without artificial scarcity.',
			'Optimization of ventilation system installation.',
			'Promotion of central ventilation instead of local solutions.',
		],
		schemeKicker: 'Workflow',
		schemeTitle: 'Interaction diagram',
		schemeAlt: 'Interaction diagram',
	},
	uz: {
		founderAlt: 'VAC.UZ asoschisi M. K. Usmanov',
		founderRole: 'VAC.UZ asoschisi',
		founderName: 'M. K. Usmanov',
		founderSignature: 'Muzaffar Usmanov',
		heading: 'VAC.UZ asoschisining murojaati',
		p1: 'Ish faoliyatimizning 12 yili davomida biz minglab kilometr havo o‘tkazgichlar ishlab chiqardik va 1500 dan ortiq mijoz uchun loyihalarni amalga oshirdik. Bizning yo‘limiz ishlab chiqarishdan emas, balki ventilyatsiya tizimlarini montaj qilishdan boshlangan. Aynan amaliy tajriba menga sifatli havo o‘tkazgich qanday bo‘lishi va buyurtmachi uchun nima haqiqatan ham muhimligini tushunishga yordam berdi.',
		p2: 'Shu sababli bugungi kunda VAC.UZ havo o‘tkazgichlar, fasonli buyumlar va ventilyatsiya tizimlari uchun butlovchi qismlar ishlab chiqarishga ixtisoslashgan. Biz bozor talablarini darsliklardan emas, balki real obyektlarda ko‘p yillik ish tajribasidan bilamiz.',
		p3: 'Kompaniyaga o‘z loyihangizni ishonib topshirishdan oldin, uning ishlab chiqarishi, xodimlari va ish tamoyillari bilan tanishishni tavsiya qilaman. Narx muhim, ammo sifat, muddat va natija uchun kim javob berishini tushunish yanada muhimroqdir.',
		p4: 'Men uchun obro‘ har doim har qanday shartnomadan muhimroq bo‘lgan va shunday bo‘lib qolmoqda.',
		signOff: 'Samimiy hurmat bilan,',
		prodKicker: 'Ishlab chiqarish',
		prodTitle: 'Ishlab chiqarish va muhandislik butlash',
		prodP1: 'Ishlab chiqarish seriyali va individual buyurtmalar uchun zarur uskunalar bilan jihozlangan. Jamoa tanlash, spetsifikatsiya va obyektni butlashda yordam beradi.',
		prodP2: 'Asosiy ish tamoyili: aniq muddatlar, shaffof muloqot va texnik topshiriqlarni puxta bajarish.',
		missionTitle: 'Kompaniya missiyasi',
		missionText: 'Sifatli ventilyatsiya bozorini tushunarli xizmat, aniq muddatlar va professional yondashuv orqali rivojlantirish.',
		bullets: [
			'Sun’iy tanqisliksiz aniq narx belgilash.',
			'Ventilyatsiya tizimlarini montaj qilishni optimallashtirish.',
			'Lokal yechimlar o‘rniga markaziy ventilyatsiyani ommalashtirish.',
		],
		schemeKicker: 'Ish sxemasi',
		schemeTitle: 'O‘zaro hamkorlik sxemasi',
		schemeAlt: 'O‘zaro hamkorlik sxemasi',
	},
}

const About = () => {
	const { lang } = useLanguage()
	const t = content[lang]

	return (
		<div className='min-h-screen'>
			<NavbarForPages />

			<section className='relative flex min-h-screen min-h-[100svh] items-center overflow-hidden px-4 pt-32 pb-14'>
				<div className='section-shell relative z-10'>
					<div className='grid items-stretch gap-6 lg:grid-cols-[0.9fr_1.1fr]'>
						<div className='surface-card overflow-hidden p-3'>
							<div className='relative h-full min-h-[340px] overflow-hidden rounded-[22px] bg-slate-100 sm:min-h-[460px] dark:bg-slate-950'>
								<img
									src={founderPhoto}
									alt={t.founderAlt}
									className='h-full min-h-[340px] w-full object-cover grayscale sm:min-h-[460px]'
								/>
								<div className='absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/86 via-slate-950/52 to-transparent p-6 text-white'>
									<p className='text-xl font-bold'>{t.founderName}</p>
									<p className='mt-1 text-xs uppercase tracking-[0.22em] text-slate-200'>
										{t.founderRole}
									</p>
								</div>
							</div>
						</div>

						<Reveal direction='left' className='surface-card p-6 md:p-8'>
							<h1 className='mt-4 text-[clamp(1.45rem,1.2rem+1.3vw,1.875rem)] font-bold leading-tight text-slate-950 dark:text-white'>
								{t.heading}
							</h1>
							<div className='mt-6 space-y-4 text-sm leading-7 text-slate-700 md:text-base dark:text-slate-300'>
								<p>{t.p1}</p>
								<p>{t.p2}</p>
								<p>{t.p3}</p>
								<p className='font-bold text-slate-950 dark:text-white'>
									{t.p4}
								</p>
							</div>

							<div className='mt-7 border-t border-slate-200 pt-5 dark:border-slate-800'>
								<p className='text-sm font-bold text-slate-950 dark:text-white'>
									{t.signOff}
									<br />
									{t.founderSignature}
								</p>
							</div>
						</Reveal>
					</div>
				</div>
			</section>

			<section className='px-4 py-10'>
				<div className='section-shell'>
					<div className='grid gap-5 lg:grid-cols-[1.05fr_0.95fr]'>
						<div className='surface-card p-5 md:p-6'>
							<div className='flex items-center gap-3'>
								<div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-[#2c2e33] text-white dark:bg-white dark:text-slate-950'>
									<Factory size={20} />
								</div>
								<div>
									<p className='text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400'>
										{t.prodKicker}
									</p>
									<h2 className='mt-1 text-xl font-bold text-slate-950 dark:text-white'>
										{t.prodTitle}
									</h2>
								</div>
							</div>

							<div className='mt-5 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]'>
								<div className='rounded-[22px] border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-950/30'>
									<p className='text-sm leading-6 text-slate-700 dark:text-slate-300'>
										{t.prodP1}
									</p>
									<p className='mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300'>
										{t.prodP2}
									</p>
								</div>

								<div className='rounded-[22px] border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950/45'>
									<div className='flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white'>
										<Workflow size={18} />
									</div>
									<h3 className='mt-3 text-base font-semibold text-slate-950 dark:text-white'>
										{t.missionTitle}
									</h3>
									<p className='mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300'>
										{t.missionText}
									</p>
								</div>
							</div>

							<div className='mt-4 grid gap-3 md:grid-cols-3'>
								{t.bullets.map(item => (
									<div
										key={item}
										className='rounded-[22px] border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950/45'
									>
										<CheckCircle2 className='h-5 w-5 text-slate-950 dark:text-white' />
										<p className='mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300'>
											{item}
										</p>
									</div>
								))}
							</div>
						</div>

						<div className='surface-card p-5 md:p-6'>
							<p className='text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400'>
								{t.schemeKicker}
							</p>
							<h2 className='mt-2 text-xl font-bold text-slate-950 dark:text-white'>
								{t.schemeTitle}
							</h2>
							<div className='mt-4 overflow-hidden rounded-[22px] border border-slate-200 p-3 dark:border-slate-800 dark:bg-slate-950/35'>
								<img src={schema} alt={t.schemeAlt} className='w-full rounded-xl' />
							</div>
						</div>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	)
}

export default About
