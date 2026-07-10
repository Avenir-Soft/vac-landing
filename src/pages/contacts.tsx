import { Mail, MapPin, Phone } from 'lucide-react'
import emailLogo from '../assets/email-logo.png'
import facebookLogo from '../assets/facebook-logo.png'
import instagramLogo from '../assets/instagram-logo.png'
import telegramLogo from '../assets/tg-logo.png'
import Footer from '../components/Footer'
import NavbarForPages from '../components/NavbarForPages'
import { Stagger, StaggerItem } from '../components/motion/Reveal'
import { useLanguage } from '../hooks/useLanguage'
import type { Lang } from '../i18n/language'

const ru = {
	kicker: 'Контакты',
	title: 'Контакты',
	heroText:
		'Мы всегда рады ответить на ваши вопросы по продукции, расчёту заказа и комплектации объекта.',
	phoneTitle: 'Телефон',
	phoneDesc: 'Звоните в рабочее время для быстрой консультации.',
	emailTitle: 'Email',
	emailDesc: 'Подходит для коммерческих предложений и заявок.',
	addressTitle: 'Адрес',
	addressValue:
		'Узбекистан, г. Ташкент, Мирзо-Улугбекский р-он, Буюк Ипак Йули 434',
	addressDesc: 'Открыть локацию и построить маршрут.',
	socialKicker: 'Социальные сети',
	socialTitle: 'Мы в соцсетях и мессенджерах',
	socialText:
		'Можно связаться с нами удобным для вас способом и следить за обновлениями компании.',
	mapTitle: 'Мы на карте',
	mapText:
		'Офис и производство находятся в Ташкенте. По карте удобно построить маршрут для визита или отгрузки.',
}

const content: Record<Lang, typeof ru> = {
	ru,
	en: {
		kicker: 'Contacts',
		title: 'Contacts',
		heroText:
			'We are always happy to answer your questions about products, order calculation and site configuration.',
		phoneTitle: 'Phone',
		phoneDesc: 'Call during working hours for a quick consultation.',
		emailTitle: 'Email',
		emailDesc: 'Suitable for commercial offers and requests.',
		addressTitle: 'Address',
		addressValue:
			'Uzbekistan, Tashkent, Mirzo-Ulugbek district, Buyuk Ipak Yuli 434',
		addressDesc: 'Open the location and build a route.',
		socialKicker: 'Social networks',
		socialTitle: 'We are on social networks and messengers',
		socialText:
			'You can contact us in a way convenient for you and follow the company updates.',
		mapTitle: 'We are on the map',
		mapText:
			'The office and production are located in Tashkent. The map makes it easy to build a route for a visit or shipment.',
	},
	uz: {
		kicker: 'Kontaktlar',
		title: 'Kontaktlar',
		heroText:
			'Mahsulotlar, buyurtma hisob-kitobi va obyektni butlash bo‘yicha savollaringizga javob berishdan doim mamnunmiz.',
		phoneTitle: 'Telefon',
		phoneDesc: 'Tezkor maslahat uchun ish vaqtida qo‘ng‘iroq qiling.',
		emailTitle: 'Email',
		emailDesc: 'Tijorat takliflari va so‘rovlar uchun mos.',
		addressTitle: 'Manzil',
		addressValue:
			'O‘zbekiston, Toshkent sh., Mirzo Ulug‘bek tumani, Buyuk Ipak Yo‘li 434',
		addressDesc: 'Manzilni ochish va marshrut qurish.',
		socialKicker: 'Ijtimoiy tarmoqlar',
		socialTitle: 'Biz ijtimoiy tarmoqlar va messenjerlardamiz',
		socialText:
			'Siz uchun qulay usulda biz bilan bog‘lanishingiz va kompaniya yangiliklarini kuzatib borishingiz mumkin.',
		mapTitle: 'Biz xaritada',
		mapText:
			'Ofis va ishlab chiqarish Toshkentda joylashgan. Xarita yordamida tashrif yoki jo‘natish uchun marshrut qurish qulay.',
	},
}

const Contacts = () => {
	const { lang } = useLanguage()
	const t = content[lang]
	const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent)
	const href = isMobile
		? 'mailto:info@vac.uz'
		: 'https://mail.google.com/mail/?view=cm&fs=1&to=info@vac.uz'

	const contacts = [
		{
			title: t.phoneTitle,
			value: '+998 90 911-72-72',
			href: 'tel:+998909117272',
			description: t.phoneDesc,
			icon: Phone,
			external: false,
		},
		{
			title: t.emailTitle,
			value: 'info@vac.uz',
			href,
			description: t.emailDesc,
			icon: Mail,
			external: !isMobile,
		},
		{
			title: t.addressTitle,
			value: t.addressValue,
			href: 'https://yandex.uz/maps/-/CLHAYE0~',
			description: t.addressDesc,
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
					<span className='section-kicker'>{t.kicker}</span>
					<h1 className='mt-4 text-[clamp(2.1rem,1.45rem+3.4vw,3.5rem)] font-bold leading-[1.05] text-white'>
						{t.title}
					</h1>
					<p className='mx-auto mt-4 max-w-2xl text-lg text-slate-300'>
						{t.heroText}
					</p>
				</div>
			</section>

			<section className='px-4 pb-20'>
				<div className='section-shell'>
					<Stagger className='grid gap-6 lg:grid-cols-3'>
						{contacts.map(item => (
							<StaggerItem key={item.title}>
							<a
								href={item.href}
								target={item.external ? '_blank' : undefined}
								rel={item.external ? 'noopener noreferrer' : undefined}
								className='surface-card block p-8 transition duration-300 hover:-translate-y-1'
							>
								<div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2c2e33] text-white dark:bg-white dark:text-slate-950'>
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
						</StaggerItem>
						))}
					</Stagger>

					<div className='mt-8 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]'>
						<div className='surface-card p-8'>
							<p className='text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400'>
								{t.socialKicker}
							</p>
							<h3 className='mt-3 text-2xl font-bold text-slate-950 dark:text-white'>
								{t.socialTitle}
							</h3>
							<p className='mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300'>
								{t.socialText}
							</p>

							<div className='mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2'>
								{socialLinks.map(item => (
									<a
										key={item.label}
										href={item.href}
										target='_blank'
										rel='noopener noreferrer'
										className='liquid-button liquid-button-panel min-w-0 justify-start px-3 py-3.5 sm:px-4'
									>
										<img
											src={item.icon}
											alt={item.label}
											className='h-6 w-6 shrink-0 object-contain'
										/>
										<span className='min-w-0 truncate text-sm font-semibold text-slate-800 dark:text-slate-100'>
											{item.label}
										</span>
									</a>
								))}
							</div>
						</div>

						<div className='surface-card overflow-hidden p-4'>
							<h2 className='px-4 pt-3 text-2xl font-bold text-slate-950 dark:text-white'>
								{t.mapTitle}
							</h2>
							<p className='px-4 pt-3 text-sm leading-6 text-slate-600 dark:text-slate-300'>
								{t.mapText}
							</p>
							<div className='mt-5 overflow-hidden rounded-[24px] border border-slate-200 dark:border-slate-800'>
								<iframe
									src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.3557667927794!2d69.3993295!3d41.344620299999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef790f7135cc9%3A0x7eb96f605ed1b198!2zVkFDLlVaIC0g0JPQvtC70L7QstC90L7QuSDQvtGE0LjRgSDQuCDRhtC10YU!5e0!3m2!1sru!2s!4v1765233041759!5m2!1sru!2s'
									className='block h-[280px] w-full sm:h-[390px]'
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
