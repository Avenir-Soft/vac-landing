import { CheckCircle2, Factory, Workflow } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import schema from '../assets/diagram.png'

export const AboutCompany = () => {
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
					<span className='section-kicker'>О компании</span>
					<h2 className='section-title mt-4'>
						Коротко и понятно о производстве, подходе и взаимодействии
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
									Производство и инженерная комплектация
								</h3>
							</div>
						</div>

						<div className='mt-5 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]'>
							<div className='rounded-[22px] border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-950/30'>
								<p className='text-sm leading-6 text-slate-700 dark:text-slate-300'>
									Компания VAC специализируется на изготовлении воздуховодов и
									комплектующих для систем вентиляции и кондиционирования.
									Обслуживает строительные компании, проектные организации и
									монтажные подрядные группы.
								</p>
								<p className='mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300'>
									Производство оснащено всем необходимым оборудованием для
									серийных и индивидуальных заказов. Работаем по чертежам,
									спецификациям и техническим заданиям.
								</p>
							</div>

							<div className='rounded-[22px] border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950/45'>
								<div className='flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white'>
									<Workflow size={18} />
								</div>
								<h4 className='mt-3 text-base font-semibold text-slate-950 dark:text-white'>
									Миссия компании
								</h4>
								<p className='mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300'>
									Развивать рынок качественной вентиляции через понятный сервис,
									чёткие сроки и профессиональный подход к производству.
								</p>
							</div>
						</div>

						<div className='mt-4 grid gap-3 md:grid-cols-3'>
							{[
								'Конкретное ценообразование без искусственного дефицита.',
								'Оптимизация монтажа вентиляционных систем.',
								'Популяризация центральной вентиляции взамен локальных решений.',
							].map(item => (
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
									Схема работы
								</p>
								<h3 className='mt-2 text-xl font-bold text-slate-950 dark:text-white'>
									Схема взаимодействий
								</h3>
							</div>
							
						</div>
						<div className='mt-4 overflow-hidden rounded-[22px] border border-slate-200  p-3 dark:border-slate-800 dark:bg-slate-950/35'>
							<img
								src={schema}
								alt='Схема взаимодействий'
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
								Производство
							</p>
							<h3 className='mt-2 text-2xl font-bold text-slate-950 dark:text-white'>
								Видео с производственного цеха
							</h3>
						</div>
						<p className='max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300'>
							Ролик запускается без звука. Звук можно включить вручную в плеере.
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
