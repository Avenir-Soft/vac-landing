'use client'

import {
	ArrowRight,
	Award,
	Briefcase,
	Calculator,
	CheckCircle2,
	FileText,
	Phone,
	Users,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import banner1 from '../assets/banner1.jpg'
import banner2 from '../assets/banner2.jpg'
import banner3 from '../assets/banner3.jpg'
import banner4 from '../assets/banner4.jpg'
import banner5 from '../assets/banner5.jpg'
import banner6 from '../assets/banner6.jpg'
import banner7 from '../assets/banner7.jpg'
import banner8 from '../assets/banner8.jpg'
import { useCarousel } from '../hooks/useCarousel'
import Navbar from './Navbar'

const heroSlides = [
	banner1,
	banner2,
	banner3,
	banner4,
	banner5,
	banner6,
	banner7,
	banner8,
]

const stats = [
	{ icon: Briefcase, label: 'Проектов', value: 500, suffix: '+' },
	{ icon: Users, label: 'Клиентов', value: 350, suffix: '+' },
	{ icon: Award, label: 'Опыт', value: 11, suffix: ' лет' },
]

const AnimatedCounter = ({
	end,
	duration = 1600,
	suffix = '',
}: {
	end: number
	duration?: number
	suffix?: string
}) => {
	const [count, setCount] = useState(0)

	useEffect(() => {
		let startTime: number
		let animationFrame: number

		const animate = (currentTime: number) => {
			if (!startTime) startTime = currentTime
			const progress = Math.min((currentTime - startTime) / duration, 1)
			const eased = 1 - Math.pow(1 - progress, 4)
			setCount(Math.floor(eased * end))

			if (progress < 1) {
				animationFrame = requestAnimationFrame(animate)
			} else {
				setCount(end)
			}
		}

		animationFrame = requestAnimationFrame(animate)
		return () => cancelAnimationFrame(animationFrame)
	}, [duration, end])

	return (
		<span>
			{count}
			{suffix}
		</span>
	)
}

export const Header = () => {
	const { currentIndex } = useCarousel(heroSlides.length, 6800)

	return (
		<>
			<Navbar />

			<section className='relative min-h-[600px] overflow-hidden md:min-h-[580px]'>
				<div className='absolute inset-0'>
					{heroSlides.map((slide, index) => (
						<img
							key={slide}
							src={slide}
							alt='Производство воздуховодов'
							className={`hero-slide ${index === currentIndex ? 'hero-slide-active' : ''}`}
						/>
					))}
				</div>
				<div className='hero-liquid-glass'></div>
				<div className='hero-liquid-depth'></div>

				<div className='relative z-10 flex min-h-[600px] items-center px-4 pt-30 pb-6 md:min-h-[580px] md:px-6 md:pt-32'>
					<div className='mx-auto grid w-full max-w-6xl items-start gap-4 lg:grid-cols-[minmax(0,1fr)_300px]'>
						<div className='surface-card hero-glass-card relative overflow-hidden p-5 md:p-7 lg:p-8'>
							<div className='pointer-events-none absolute top-0 right-0 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(0,112,192,0.14),transparent_70%)] dark:bg-[radial-gradient(circle,rgba(56,189,248,0.12),transparent_70%)]'></div>
							<div className='relative z-10'>
								<div className='flex flex-wrap items-center gap-3'>
									<span className='section-kicker'>VAC.UZ</span>
									<div className='flex flex-wrap gap-2'>
										{['По чертежам', 'Под объект', 'Собственное производство'].map(item => (
											<span
												key={item}
												className='inline-flex items-center rounded-full border border-slate-200 bg-slate-50/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300'
											>
												{item}
											</span>
										))}
									</div>
								</div>

								<p className='mt-5 text-sm font-semibold uppercase tracking-[0.24em] text-sky-700 dark:text-sky-300'>
									Производство воздуховодов
								</p>
								<h1 className='mt-3 max-w-4xl text-[clamp(2.3rem,4.2vw,4.3rem)] font-bold leading-[0.94] text-slate-950 dark:text-white'>
									Воздуховоды и вентиляционные системы
									<span className='mt-2 block text-[clamp(1.35rem,2.2vw,2.2rem)] leading-[1.02] text-slate-500 dark:text-slate-300'>
										для строительных и промышленных объектов
									</span>
								</h1>
								<p className='mt-4 max-w-2xl text-[15px] leading-6 text-slate-600 md:text-base md:leading-7 dark:text-slate-300'>
									Изготавливаем воздуховоды и комплектующие для систем
									вентиляции и кондиционирования. Работаем по чертежам,
									спецификациям и техническим заданиям.
								</p>

								<div className='mt-5 grid gap-2 md:grid-cols-3'>
									{[
										'Подбор решений под объект',
										'Спецификация и комплектация',
										'Расчёт, каталог и консультация',
									].map(item => (
										<div
											key={item}
											className='rounded-2xl border border-slate-200 bg-slate-50/90 px-4 py-3 text-sm font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-950/45 dark:text-slate-300'
										>
											{item}
										</div>
									))}
								</div>

								<div className='mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap'>
									<a
										href='https://vac-calculator.uz/'
										target='_blank'
										rel='noopener noreferrer'
										className='liquid-button liquid-button-primary px-4 py-3 text-sm font-semibold'
									>
										<Calculator size={18} />
										Калькулятор
									</a>
									<Link
										to='/catalog'
										className='liquid-button liquid-button-secondary px-4 py-3 text-sm font-semibold'
									>
										<FileText size={18} />
										Каталог PDF
									</Link>
									<a
										href='/#products'
										className='liquid-button liquid-button-neutral px-4 py-3 text-sm font-semibold'
									>
										Продукция
										<ArrowRight size={18} />
									</a>
								</div>

								<div className='mt-5 grid gap-3 sm:grid-cols-3'>
									{stats.map(stat => (
										<div
											key={stat.label}
											className='rounded-2xl border border-slate-200 bg-slate-50/90 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/45'
										>
											<div className='flex items-center gap-2 text-slate-500 dark:text-slate-400'>
												<stat.icon className='h-4 w-4' />
												<p className='text-xs uppercase tracking-[0.2em]'>
													{stat.label}
												</p>
											</div>
											<div className='mt-2 text-2xl font-bold text-slate-950 dark:text-white'>
												<AnimatedCounter end={stat.value} suffix={stat.suffix} />
											</div>
										</div>
									))}
								</div>
							</div>
						</div>

						<div>
							<div className='surface-card hero-glass-card p-5 transition duration-300 hover:-translate-y-1'>
								<div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-600 text-white'>
									<Calculator size={20} />
								</div>
								<p className='mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400'>
									Онлайн калькулятор
								</p>
								<h2 className='mt-3 text-xl font-bold leading-tight text-slate-950 dark:text-white'>
									Рассчитать воздуховоды быстрее
								</h2>
								<p className='mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300'>
									Отдельный сервис для предварительного расчёта с быстрым
									переходом из первого экрана.
								</p>
								<div className='mt-4 space-y-2'>
									{[
										'Быстрый предварительный расчёт',
										'Удобно для клиента и менеджера',
										'Прямая связка с каталогом',
									].map(item => (
										<div key={item} className='flex items-start gap-3'>
											<CheckCircle2 className='mt-0.5 h-4 w-4 flex-shrink-0 text-sky-600 dark:text-sky-400' />
											<p className='text-sm leading-6 text-slate-700 dark:text-slate-300'>
												{item}
											</p>
										</div>
									))}
								</div>
								<a
									href='https://vac-calculator.uz/'
									target='_blank'
									rel='noopener noreferrer'
									className='liquid-button liquid-button-secondary mt-5 px-4 py-2.5 text-sm font-semibold'
								>
									Открыть калькулятор
									<ArrowRight size={16} />
								</a>
								<div className='mt-5 grid gap-3'>
									<Link
										to='/catalog'
										className='liquid-button liquid-button-panel justify-between px-4 py-3'
									>
										<span className='text-sm font-medium text-slate-800 dark:text-slate-100'>
											Скачать каталог
										</span>
										<FileText size={18} className='text-sky-600 dark:text-sky-400' />
									</Link>
									<a
										href='tel:+998909117272'
										className='liquid-button liquid-button-panel justify-between px-4 py-3'
									>
										<span className='text-sm font-medium text-slate-800 dark:text-slate-100'>
											Связаться с менеджером
										</span>
										<Phone size={18} className='text-sky-600 dark:text-sky-400' />
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default Header
