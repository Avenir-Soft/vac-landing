import { Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import email from '../assets/email-logo.png'
import facebook from '../assets/facebook-logo.png'
import logo from '../assets/logo(1).png'
import icon from '../assets/icon.png'
import instagram from '../assets/instagram-logo.png'
import telegram from '../assets/tg-logo.png'

export const Footer = () => {
	const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent)
	const { theme } = useTheme()
	const href = isMobile
		? 'mailto:info@vac.uz'
		: 'https://mail.google.com/mail/?view=cm&fs=1&to=info@vac.uz'
	const currentLogo = theme === 'dark' ? icon : logo

	return (
		<footer className='bg-[#2c2e33] pt-14 pb-6 text-white dark:bg-[#1c1d21]'>
			<div className='section-shell'>
				<div className='grid gap-10 lg:grid-cols-[1.2fr_0.7fr_1fr]'>
					<div>
						<div className='flex items-center gap-3'>
							<div className='flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/95 shadow-[0_14px_28px_-20px_rgba(15,23,42,0.35)] dark:border-slate-700 dark:bg-slate-900'>
								<img src={currentLogo} alt='VAC.UZ Logo' className='h-10 w-10 object-contain' />
							</div>
							<div>
								<span className='text-xl font-bold'>VAC.UZ</span>
							</div>
						</div>
						<p className='mt-5 max-w-md text-sm leading-7 text-slate-300'>
							Профессиональные решения для систем вентиляции любой сложности.
							Работаем с 2014 года и сопровождаем проекты от производства до
							комплектации.
						</p>
					</div>

					<div>
						<h4 className='text-sm font-semibold uppercase tracking-[0.22em] text-slate-400'>
							Разделы
						</h4>
						<div className='mt-5 space-y-3 text-sm text-slate-300'>
							<Link
								to='/calculator'
								className='block transition hover:text-white'
							>
								Калькулятор
							</Link>
							<Link to='/' className='block transition hover:text-white'>
								Главная
							</Link>
							<Link to='/catalog' className='block transition hover:text-white'>
								Каталог
							</Link>
							<Link to='/reference' className='block transition hover:text-white'>
								Справочники
							</Link>
							<Link to='/contacts' className='block transition hover:text-white'>
								Контакты
							</Link>
						</div>
					</div>

					<div>
						<h4 className='text-sm font-semibold uppercase tracking-[0.22em] text-slate-400'>
							Контакты
						</h4>
						<div className='mt-5 space-y-4 text-sm text-slate-300'>
							<a href='tel:+998909117272' className='flex items-start gap-3 transition hover:text-white'>
								<Phone size={18} className='mt-0.5 flex-shrink-0' />
								<span>+998 90 911-72-72</span>
							</a>
							<a
								href={href}
								target={!isMobile ? '_blank' : undefined}
								rel={!isMobile ? 'noopener noreferrer' : undefined}
								className='flex items-start gap-3 transition hover:text-white'
							>
								<Mail size={18} className='mt-0.5 flex-shrink-0' />
								<span>info@vac.uz</span>
							</a>
							<a
								href='https://maps.app.goo.gl/uC1G2n91MGPEzpBPA'
								target='_blank'
								rel='noopener noreferrer'
								className='flex items-start gap-3 transition hover:text-white'
							>
								<MapPin size={18} className='mt-0.5 flex-shrink-0' />
								<span>
									Узбекистан, г. Ташкент, Мирзо-Улугбекский р-он, Буюк Ипак Йули
									434
								</span>
							</a>

							<div className='flex gap-3 pt-2'>
								{[
									{ href: 'https://www.facebook.com/ventzavod', icon: facebook, label: 'Facebook' },
									{ href: 'https://www.instagram.com/vac.uz/', icon: instagram, label: 'Instagram' },
									{ href: 'https://t.me/ventzavod', icon: telegram, label: 'Telegram' },
									{ href, icon: email, label: 'Email' },
								].map(item => (
									<a
										key={item.label}
										href={item.href}
										target='_blank'
										rel='noopener noreferrer'
										className='flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/6 transition hover:-translate-y-0.5 hover:bg-white/12'
										aria-label={item.label}
									>
										<img src={item.icon} alt={item.label} className='h-5 w-5 object-contain' />
									</a>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='section-shell mt-10 border-t border-white/10 pt-6'>
				<div className='flex flex-col items-center justify-between gap-4 text-center text-xs text-slate-400 sm:text-sm md:flex-row md:text-left'>
					<p>&copy; 2026 VAC.UZ. Все права защищены.</p>
					<a
						href='https://avenir.uz/'
						target='_blank'
						rel='noopener noreferrer'
						className='text-slate-500 transition hover:text-white'
					>
						Designed by AVENIR
					</a>
				</div>
			</div>
		</footer>
	)
}

export default Footer
