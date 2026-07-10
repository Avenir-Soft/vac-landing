import { CheckCircle2, Factory, Workflow } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import type { Lang } from '../i18n/language'
import schema from '../assets/diagram.png'

const ru = {
	kicker: 'О компании',
	title: 'Коротко и понятно о производстве, подходе и взаимодействии',
	prodHeading: 'Производство и инженерная комплектация',
	para1:
		'Компания VAC специализируется на изготовлении воздуховодов и комплектующих для систем вентиляции и кондиционирования. Обслуживает строительные компании, проектные организации и монтажные подрядные группы.',
	para2:
		'Производство оснащено всем необходимым оборудованием для серийных и индивидуальных заказов. Работаем по чертежам, спецификациям и техническим заданиям.',
	missionLabel: 'Миссия компании',
	missionText:
		'Развивать рынок качественной вентиляции через понятный сервис, чёткие сроки и профессиональный подход к производству.',
	items: [
		'Конкретное ценообразование без искусственного дефицита.',
		'Оптимизация монтажа вентиляционных систем.',
		'Популяризация центральной вентиляции взамен локальных решений.',
	],
	schemeLabel: 'Схема работы',
	schemeTitle: 'Схема взаимодействий',
	schemeAlt: 'Схема взаимодействий',
	prodKicker: 'Производство',
	videoTitle: 'Видео с производственного цеха',
	videoNote:
		'Ролик запускается без звука. Звук можно включить вручную в плеере.',
}

const content: Record<Lang, typeof ru> = {
	ru,
	en: {
		kicker: 'About company',
		title: 'Briefly and clearly about our production, approach and collaboration',
		prodHeading: 'Manufacturing and engineering supply',
		para1:
			'VAC specializes in manufacturing air ducts and components for ventilation and air-conditioning systems. It serves construction companies, design bureaus and installation contractors.',
		para2:
			'Our production is equipped with everything needed for both serial and custom orders. We work to drawings, specifications and technical requirements.',
		missionLabel: 'Company mission',
		missionText:
			'To grow the market for quality ventilation through clear service, precise deadlines and a professional approach to production.',
		items: [
			'Concrete pricing without artificial scarcity.',
			'Optimization of ventilation system installation.',
			'Promoting central ventilation instead of local solutions.',
		],
		schemeLabel: 'Workflow',
		schemeTitle: 'Interaction diagram',
		schemeAlt: 'Interaction diagram',
		prodKicker: 'Manufacturing',
		videoTitle: 'Video from the production floor',
		videoNote:
			'The clip starts muted. You can turn the sound on manually in the player.',
	},
	uz: {
		kicker: 'Kompaniya haqida',
		title:
			'Ishlab chiqarish, yondashuv va hamkorlik haqida qisqa va tushunarli',
		prodHeading: 'Ishlab chiqarish va muhandislik ta’minoti',
		para1:
			'VAC kompaniyasi ventilyatsiya va konditsionerlash tizimlari uchun havo o‘tkazgichlar va butlovchi qismlar ishlab chiqarishga ixtisoslashgan. Qurilish kompaniyalari, loyihalash tashkilotlari va montaj pudrat guruhlariga xizmat ko‘rsatadi.',
		para2:
			'Ishlab chiqarish seriyali va yakka tartibdagi buyurtmalar uchun barcha zarur uskunalar bilan jihozlangan. Chizmalar, spetsifikatsiyalar va texnik topshiriqlar asosida ishlaymiz.',
		missionLabel: 'Kompaniya missiyasi',
		missionText:
			'Sifatli ventilyatsiya bozorini tushunarli xizmat, aniq muddatlar va ishlab chiqarishga professional yondashuv orqali rivojlantirish.',
		items: [
			'Sun’iy taqchilliksiz aniq narx belgilash.',
			'Ventilyatsiya tizimlari montajini optimallashtirish.',
			'Lokal yechimlar o‘rniga markaziy ventilyatsiyani ommalashtirish.',
		],
		schemeLabel: 'Ish sxemasi',
		schemeTitle: 'O‘zaro hamkorlik sxemasi',
		schemeAlt: 'O‘zaro hamkorlik sxemasi',
		prodKicker: 'Ishlab chiqarish',
		videoTitle: 'Ishlab chiqarish sexidan video',
		videoNote:
			'Rolik ovozsiz ishga tushadi. Ovozni pleyerda qo‘lda yoqishingiz mumkin.',
	},
}

export const AboutCompany = () => {
	const { lang } = useLanguage()
	const t = content[lang]
	const [isVisible, setIsVisible] = useState(false)
	const sectionRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) setIsVisible(true)
				})
			},
			{ threshold: 0.18 }
		)

		if (sectionRef.current) observer.observe(sectionRef.current)
		return () => {
			if (sectionRef.current) observer.unobserve(sectionRef.current)
		}
	}, [])

	return (
		<section id='about' ref={sectionRef} className='overflow-hidden py-10 md:py-14'>
			<div className='section-shell'>
				<div className='mb-6 max-w-3xl md:mb-8'>
					<span className='section-kicker'>{t.kicker}</span>
					<h2 className='section-title mt-4'>
						{t.title}
					</h2>
				</div>

				<div className='grid gap-5 lg:grid-cols-[1.05fr_0.95fr]'>
					<div
						className={`surface-card p-5 md:p-6 transition-all duration-700 ${
							isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
						}`}
					>
						<div className='flex items-center gap-3'>
							<div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-[#2c2e33] text-white dark:bg-white dark:text-slate-950'>
								<Factory size={20} />
							</div>
							<div>
								<p className='text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400'>
									VAC.UZ
								</p>
								<h3 className='mt-1 text-xl font-bold text-slate-950 dark:text-white'>
									{t.prodHeading}
								</h3>
							</div>
						</div>

						<div className='mt-5 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]'>
							<div className='rounded-[22px] border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-950/30'>
								<p className='text-sm leading-6 text-slate-700 dark:text-slate-300'>
									{t.para1}
								</p>
								<p className='mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300'>
									{t.para2}
								</p>
							</div>

							<div className='rounded-[22px] border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950/45'>
								<div className='flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white'>
									<Workflow size={18} />
								</div>
								<h4 className='mt-3 text-base font-semibold text-slate-950 dark:text-white'>
									{t.missionLabel}
								</h4>
								<p className='mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300'>
									{t.missionText}
								</p>
							</div>
						</div>

						<div className='mt-4 grid gap-3 md:grid-cols-3'>
							{t.items.map(item => (
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

					<div
						className={`surface-card p-5 md:p-6 transition-all duration-700 delay-100 ${
							isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
						}`}
					>
						<div className='flex items-center justify-between gap-4'>
							<div>
								<p className='text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400'>
									{t.schemeLabel}
								</p>
								<h3 className='mt-2 text-xl font-bold text-slate-950 dark:text-white'>
									{t.schemeTitle}
								</h3>
							</div>
							
						</div>
						<div className='mt-4 overflow-hidden rounded-[22px] border border-slate-200  p-3 dark:border-slate-800 dark:bg-slate-950/35'>
							<img
								src={schema}
								alt={t.schemeAlt}
								className='w-full rounded-xl'
							/>
						</div>
					</div>
				</div>

				<div
					className={`mt-8 transition-all duration-700 delay-150 ${
						isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
					}`}
				>
					<div className='mx-auto mb-4 flex max-w-5xl flex-col gap-2 md:flex-row md:items-end md:justify-between'>
						<div>
							<p className='text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400'>
								{t.prodKicker}
							</p>
							<h3 className='mt-2 text-2xl font-bold text-slate-950 dark:text-white'>
								{t.videoTitle}
							</h3>
						</div>
						<p className='max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300'>
							{t.videoNote}
						</p>
					</div>
					<div className='mx-auto overflow-hidden rounded-[26px] border border-slate-200 bg-[#2c2e33] shadow-[0_28px_70px_-44px_rgba(15,23,42,0.72)] md:max-w-2xl dark:border-slate-800'>
						<video
							src='/cex_oVadzxvV.mp4'
							className='aspect-[9/16] max-h-[760px] w-full object-cover'
							autoPlay
							muted
							loop
							playsInline
							controls
							preload='metadata'
						/>
					</div>
				</div>
			</div>
		</section>
	)
}

export default AboutCompany
