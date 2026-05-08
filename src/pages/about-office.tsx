import { Building2, MapPin } from 'lucide-react'
import Footer from '../components/Footer'
import NavbarForPages from '../components/NavbarForPages'

const AboutOffice = () => {
	return (
		<div className='min-h-screen'>
			<NavbarForPages />

			<section className='relative min-h-screen overflow-hidden px-4 pt-32 pb-20'>
				<div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.16),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0),rgba(226,234,242,0.62))] dark:bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.1),transparent_26%),linear-gradient(180deg,rgba(9,16,27,0),rgba(4,8,15,0.48))]'></div>
				<div className='section-shell relative z-10'>
					<div className='surface-card overflow-hidden'>
						<div className='grid gap-0 lg:grid-cols-[0.85fr_1.15fr]'>
							<div className='bg-slate-950 p-8 text-white dark:bg-[#060b13]'>
								<div className='flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/8'>
									<Building2 size={28} />
								</div>
								<p className='mt-6 text-xs font-semibold uppercase tracking-[0.28em] text-slate-300'>
									Наш офис
								</p>
								<h1 className='mt-4 text-4xl font-bold leading-tight md:text-5xl'>
									Офис и производство в Ташкенте
								</h1>
								<p className='mt-5 max-w-md text-base leading-7 text-slate-300'>
									Можно приехать на встречу, обсудить проект, уточнить
									спецификацию и построить маршрут прямо по карте.
								</p>
								<a
									href='https://yandex.uz/maps/-/CLHAYE0~'
									target='_blank'
									rel='noopener noreferrer'
									className='liquid-button liquid-button-secondary mt-8 px-5 py-3 text-sm font-semibold'
								>
									<MapPin size={18} />
									Открыть маршрут
								</a>
							</div>

							<div className='p-4'>
								<div className='overflow-hidden rounded-[24px] border border-slate-200 dark:border-slate-800'>
									<iframe
										src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.3557667927794!2d69.3993295!3d41.344620299999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef790f7135cc9%3A0x7eb96f605ed1b198!2zVkFDLlVaIC0g0JPQvtC70L7QstC90L7QuSDQvtGE0LjRgSDQuCDRhtC10YU!5e0!3m2!1sru!2s!4v1765233041759!5m2!1sru!2s'
										width='100%'
										height='520'
										style={{ border: 0 }}
										allowFullScreen
										loading='lazy'
										referrerPolicy='no-referrer-when-downgrade'
									/>
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

export default AboutOffice
