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
import DuctSystem from './DuctSystem'
import Navbar from './Navbar'

const stats = [
	{ icon: Briefcase, label: 'Проектов', value: 500, suffix: '+' },
	{ icon: Users, label: 'Клиентов', value: 404, suffix: '+' },
	{ icon: Award, label: 'Опыт', value: 12, suffix: ' лет' },
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

const LiveVisitors = () => {
	const [visitors, setVisitors] = useState(
		() => 34 + Math.floor(Math.random() * 13),
	)

	useEffect(() => {
		let timeoutId: number

		const scheduleUpdate = () => {
			timeoutId = window.setTimeout(
				() => {
					setVisitors(current => {
						const direction = Math.random() > 0.46 ? 1 : -1
						const step = 1 + Math.floor(Math.random() * 4)
						return Math.min(50, Math.max(30, current + direction * step))
					})
					scheduleUpdate()
				},
				60000,
			)
		}

		scheduleUpdate()
		return () => window.clearTimeout(timeoutId)
	}, [])

	return (
		<div
			className='mt-4 inline-flex items-center gap-3 rounded-2xl border border-sky-200/80 bg-white/82 px-4 py-3 shadow-[0_16px_34px_-28px_rgba(15,23,42,0.46)] backdrop-blur-md dark:border-sky-400/25 dark:bg-slate-950/40'
			aria-live='polite'
		>
			<span className='relative flex h-3 w-3'>
				<span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-55'></span>
				<span className='relative inline-flex h-3 w-3 rounded-full bg-sky-500'></span>
			</span>
			<div className='flex items-center gap-2'>
				<Users className='h-4 w-4 text-sky-600 dark:text-sky-300' />
				<p className='text-sm font-semibold text-slate-700 dark:text-slate-100'>
					Сейчас на сайте{' '}
					<span className='tabular-nums text-slate-950 dark:text-white'>
						{visitors}
					</span>{' '}
					посетителей
				</p>
			</div>
		</div>
	)
}

export const Header = () => {
	return (
		<>
			<Navbar />

			<section className='hero-section relative overflow-hidden min-h-screen'>
				<DuctSystem />

				<div className='relative z-10 flex min-h-[600px] items-center px-4 pt-30 pb-6 md:min-h-[580px] md:px-6 md:pt-32'>
					<div className='mx-auto grid w-full max-w-6xl items-start gap-4 lg:grid-cols-[minmax(0,1fr)_300px]'>
						<div className='surface-card hero-glass-card relative overflow-hidden p-5 md:p-7 lg:p-8'>
							<div className='pointer-events-none absolute top-0 right-0 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(0,112,192,0.14),transparent_70%)] dark:bg-[radial-gradient(circle,rgba(56,189,248,0.12),transparent_70%)]'></div>
							<div className='relative z-10'>
								<p className='mt-5 text-sm font-semibold uppercase tracking-[0.24em] text-sky-700 dark:text-sky-300'>
									Производство воздуховодов
								</p>
								<h1 className='mt-3 max-w-4xl text-[clamp(2.3rem,4.2vw,4.3rem)] font-bold leading-[0.94] text-slate-950 dark:text-white'>
									Воздуховоды и вентиляционные системы
									<span className='mt-2 block text-[clamp(1.35rem,2.2vw,2.2rem)] leading-[1.02] text-slate-500 dark:text-slate-300'>
										для строительных и промышленных объектов
									</span>
								</h1>

								<LiveVisitors />

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
							<div className='surface-card hero-glass-card p-5 transition'>
								<div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-600 text-white'>
									<Calculator size={20} />
								</div>
								<p className='mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400'>
									Онлайн калькулятор
								</p>
								<h2 className='mt-3 text-xl font-bold leading-tight text-slate-950 dark:text-white'>
									Рассчитать воздуховоды быстрее
								</h2>
								
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
								<Link
									to='/calculator'
									className='liquid-button liquid-button-secondary mt-5 px-4 py-2.5 text-sm font-semibold'
								>
									Открыть калькулятор
									<ArrowRight size={16} />
								</Link>
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
