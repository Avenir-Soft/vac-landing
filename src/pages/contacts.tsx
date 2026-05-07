import { Mail, MapPin, Phone } from 'lucide-react'
import emailLogo from '../assets/email-logo.png'
import facebookLogo from '../assets/facebook-logo.png'
import instagramLogo from '../assets/instagram-logo.png'
import telegramLogo from '../assets/tg-logo.png'
import Footer from '../components/Footer'
import NavbarForPages from '../components/NavbarForPages'

const Contacts = () => {
	const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent)
	const href = isMobile
		? 'mailto:info@vac.uz'
		: 'https://mail.google.com/mail/?view=cm&fs=1&to=info@vac.uz'

	const contacts = [
		{
			title: 'Телефон',
			value: '+998 90 911-72-72',
			href: 'tel:+998909117272',
			description: 'Звоните в рабочее время для быстрой консультации.',
			icon: Phone,
			external: false,
		},
		{
			title: 'Email',
			value: 'info@vac.uz',
			href,
			description: 'Подходит для коммерческих предложений и заявок.',
			icon: Mail,
			external: !isMobile,
		},
		{
			title: 'Адрес',
			value:
				'Узбекистан, г. Ташкент, Мирзо-Улугбекский р-он, Буюк Ипак Йули 434',
			href: 'https://yandex.uz/maps/-/CLHAYE0~',
			description: 'Открыть локацию и построить маршрут.',
			icon: MapPin,
			external: true,
		},
	]

	const socialLinks = [
		{
			label: 'Facebook',
			href: 'https://www.facebook.com/ventzavod',
			icon: facebookLogo,
		},
		{
			label: 'Instagram',
			href: 'https://www.instagram.com/vac.uz/',
			icon: instagramLogo,
		},
		{
			label: 'Telegram',
			href: 'https://t.me/ventzavod',
			icon: telegramLogo,
		},
		{
			label: 'Email',
			href,
			icon: emailLogo,
		},
	]

	return (
		<div className='min-h-screen'>
			<NavbarForPages />

			<section className='px-4 pt-28 pb-14'>
				<div className='section-shell text-center'>
					<span className='section-kicker'>Контакты</span>
					<h1 className='mt-4 text-4xl font-bold text-slate-950 md:text-5xl lg:text-6xl dark:text-white'>
						Контакты
					</h1>
					<p className='mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300'>
						Мы всегда рады ответить на ваши вопросы по продукции, расчёту заказа
						и комплектации объекта.
					</p>
				</div>
			</section>

			<section className='px-4 pb-20'>
				<div className='section-shell'>
					<div className='grid gap-6 lg:grid-cols-3'>
						{contacts.map(item => (
							<a
								key={item.title}
								href={item.href}
								target={item.external ? '_blank' : undefined}
								rel={item.external ? 'noopener noreferrer' : undefined}
								className='surface-card block p-8 transition duration-300 hover:-translate-y-1'
							>
								<div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950'>
									<item.icon size={26} />
								</div>
								<h3 className='mt-6 text-2xl font-bold text-slate-950 dark:text-white'>
									{item.title}
								</h3>
								<p className='mt-3 text-lg font-semibold leading-7 text-slate-800 dark:text-slate-100'>
									{item.value}
								</p>
								<p className='mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300'>
									{item.description}
								</p>
							</a>
						))}
					</div>

					<div className='mt-8 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]'>
						<div className='surface-card p-8'>
							<p className='text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400'>
								Социальные сети
							</p>
							<h3 className='mt-3 text-2xl font-bold text-slate-950 dark:text-white'>
								Мы в соцсетях и мессенджерах
							</h3>
							<p className='mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300'>
								Можно связаться с нами удобным для вас способом и следить за
								обновлениями компании.
							</p>

							<div className='mt-6 grid grid-cols-2 gap-3'>
								{socialLinks.map(item => (
									<a
										key={item.label}
										href={item.href}
										target='_blank'
										rel='noopener noreferrer'
										className='liquid-button liquid-button-panel justify-start px-4 py-4'
									>
										<img
											src={item.icon}
											alt={item.label}
											className='h-8 w-8 object-contain'
										/>
										<span className='text-sm font-semibold text-slate-800 dark:text-slate-100'>
											{item.label}
										</span>
									</a>
								))}
							</div>
						</div>

						<div className='surface-card overflow-hidden p-4'>
							<h2 className='px-4 pt-3 text-2xl font-bold text-slate-950 dark:text-white'>
								Мы на карте
							</h2>
							<p className='px-4 pt-3 text-sm leading-6 text-slate-600 dark:text-slate-300'>
								Офис и производство находятся в Ташкенте. По карте удобно
								построить маршрут для визита или отгрузки.
							</p>
							<div className='mt-5 overflow-hidden rounded-[24px] border border-slate-200 dark:border-slate-800'>
								<iframe
									src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.3557667927794!2d69.3993295!3d41.344620299999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef790f7135cc9%3A0x7eb96f605ed1b198!2zVkFDLlVaIC0g0JPQvtC70L7QstC90L7QuSDQvtGE0LjRgSDQuCDRhtC10YU!5e0!3m2!1sru!2s!4v1765233041759!5m2!1sru!2s'
									width='100%'
									height='390'
									style={{ border: 0 }}
									allowFullScreen
									loading='lazy'
									referrerPolicy='no-referrer-when-downgrade'
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	)
}

export default Contacts
