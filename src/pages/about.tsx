import { CheckCircle2, Factory, Users, Workflow } from 'lucide-react'
import schema from '../assets/diagram.png'
import founderPhoto from '../assets/founder-usmanov.png'
import teamUsmanov from '../assets/team/00-usmanov.png'
import teamKarimov from '../assets/team/01-karimov.png'
import teamKasymova from '../assets/team/02-kasymova.png'
import teamPak from '../assets/team/03-pak.png'
import teamKasimov from '../assets/team/04-kasimov.png'
import teamMamatkulov from '../assets/team/05-mamatkulov.png'
import teamMirzayarov from '../assets/team/06-mirzayarov.png'
import teamHodjimatova from '../assets/team/07-hodjimatova.png'
import Footer from '../components/Footer'
import NavbarForPages from '../components/NavbarForPages'

const team = [
	{ name: 'Усманов Музаффар', photo: teamUsmanov },
	{ name: 'Каримов Азизбек', photo: teamKarimov },
	{ name: 'Касымова Малика', photo: teamKasymova },
	{ name: 'Пак Ирина', photo: teamPak },
	{ name: 'Касимов Хожиакбар', photo: teamKasimov },
	{ name: 'Мамткулов Отабек', photo: teamMamatkulov },
	{ name: 'Мирзаяров Махкам', photo: teamMirzayarov },
	{ name: 'Ходжиматова Садокат', photo: teamHodjimatova },
]

const About = () => {
	return (
		<div className='min-h-screen'>
			<NavbarForPages />

			<section className='relative flex min-h-screen min-h-[100svh] items-center overflow-hidden px-4 pt-32 pb-14'>
				<div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.16),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0),rgba(226,234,242,0.62))] dark:bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.1),transparent_26%),linear-gradient(180deg,rgba(9,16,27,0),rgba(4,8,15,0.48))]'></div>
				<div className='section-shell relative z-10'>
					<div className='grid items-stretch gap-6 lg:grid-cols-[0.9fr_1.1fr]'>
						<div className='surface-card overflow-hidden p-3'>
							<div className='relative h-full min-h-[460px] overflow-hidden rounded-[22px] bg-slate-100 dark:bg-slate-950'>
								<img
									src={founderPhoto}
									alt='Основатель VAC.UZ М. К. Усманов'
									className='h-full min-h-[460px] w-full object-cover grayscale'
								/>
								<div className='absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/86 via-slate-950/52 to-transparent p-6 text-white'>
									<p className='text-xl font-bold'>М. К. Усманов</p>
									<p className='mt-1 text-xs uppercase tracking-[0.22em] text-slate-200'>
										Основатель VAC.UZ
									</p>
								</div>
							</div>
						</div>

						<div className='surface-card p-6 md:p-8'>
							<h1 className='mt-4 text-2xl font-bold leading-tight text-slate-950 md:text-3xl dark:text-white'>
								Обращение основателя VAC.UZ
							</h1>
							<div className='mt-6 space-y-4 text-sm leading-7 text-slate-700 md:text-base dark:text-slate-300'>
								<p>
									Уважаемые партнеры и коллеги! Благодарим каждого за вклад в
									становление, укрепление и развитие VAC.UZ.
								</p>
								<p>
									За 12 лет VAC.UZ выросла из небольшого производства
									воздуховодов в динамично развивающуюся компанию с большим
									производственным заводом.
								</p>
								<p>
									Наши ценности - открытость, объективность, конфиденциальность
									информации и индивидуальный подход к каждому клиенту.
								</p>
								<p>
									На производственном заводе применяются передовые технологии и
									современное оборудование, что позволяет выпускать продукцию
									высокого качества и работать с проектами любой сложности.
								</p>
								<p className='font-bold text-slate-950 dark:text-white'>
									Мы стремимся предоставлять партнерам продукт и сервис мирового
									стандарта.
								</p>
							</div>

						
							<div className='mt-7 border-t border-slate-200 pt-5 dark:border-slate-800'>
								<p className='text-sm font-bold text-slate-950 dark:text-white'>
									С уважением, основатель VAC.UZ - М. К. Усманов
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className='px-4 py-10'>
				<div className='section-shell'>
					<div className='mb-8 flex items-center gap-3'>
						<div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950'>
							<Users size={20} />
						</div>
						<div>
							<p className='text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400'>
								Команда
							</p>
							<h2 className='mt-1 text-2xl font-bold text-slate-950 md:text-3xl dark:text-white'>
								Наша команда
							</h2>
						</div>
					</div>

					<div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4'>
						{team.map(member => (
							<div key={member.name} className='surface-card overflow-hidden p-3'>
								<div className='overflow-hidden rounded-[20px] bg-slate-100 dark:bg-slate-950'>
									<img
										src={member.photo}
										alt={member.name}
										className='aspect-[3/4] w-full object-cover'
										loading='lazy'
									/>
								</div>
								<p className='px-1 pt-3 pb-1 text-sm font-semibold text-slate-900 dark:text-white'>
									{member.name}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className='px-4 py-10'>
				<div className='section-shell'>
					<div className='grid gap-5 lg:grid-cols-[1.05fr_0.95fr]'>
						<div className='surface-card p-5 md:p-6'>
							<div className='flex items-center gap-3'>
								<div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950'>
									<Factory size={20} />
								</div>
								<div>
									<p className='text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400'>
										Производство
									</p>
									<h2 className='mt-1 text-xl font-bold text-slate-950 dark:text-white'>
										Производство и инженерная комплектация
									</h2>
								</div>
							</div>

							<div className='mt-5 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]'>
								<div className='rounded-[22px] border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-950/30'>
									<p className='text-sm leading-6 text-slate-700 dark:text-slate-300'>
										Производство оснащено необходимым оборудованием для серийных
										и индивидуальных заказов. Команда помогает с подбором,
										спецификацией и комплектацией объекта.
									</p>
									<p className='mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300'>
										Главный принцип работы: понятные сроки, прозрачная
										коммуникация и аккуратное выполнение технических заданий.
									</p>
								</div>

								<div className='rounded-[22px] border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950/45'>
									<div className='flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white'>
										<Workflow size={18} />
									</div>
									<h3 className='mt-3 text-base font-semibold text-slate-950 dark:text-white'>
										Миссия компании
									</h3>
									<p className='mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300'>
										Развивать рынок качественной вентиляции через понятный
										сервис, чёткие сроки и профессиональный подход.
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

						<div className='surface-card p-5 md:p-6'>
							<p className='text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400'>
								Схема работы
							</p>
							<h2 className='mt-2 text-xl font-bold text-slate-950 dark:text-white'>
								Схема взаимодействий
							</h2>
							<div className='mt-4 overflow-hidden rounded-[22px] border border-slate-200 p-3 dark:border-slate-800 dark:bg-slate-950/35'>
								<img src={schema} alt='Схема взаимодействий' className='w-full rounded-xl' />
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
