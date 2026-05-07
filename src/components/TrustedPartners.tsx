interface Partner {
	id: number
	name: string
	logo: string
}

const partners: Partner[] = [
	{ id: 1, name: 'Akfa', logo: '/akfa-logo.png' },
	{ id: 2, name: 'MJ Developers', logo: '/mj-logo.jpg' },
	{ id: 3, name: 'b&acountractors', logo: '/b&a-logo.png' },
	{ id: 4, name: 'Shurtan UNG', logo: '/Shurtan-logo.png' },
	{ id: 5, name: 'Uzbekenergo', logo: '/uzenergo-logo.png' },
	{ id: 6, name: 'Artel', logo: '/Artel-logo.jpg' },
	{ id: 7, name: 'Lukoil', logo: '/lukoil-logo.svg' },
	{ id: 8, name: 'DreamCity', logo: '/dream-logo.png' },
	{ id: 9, name: 'Discover', logo: '/discover-logo.png' },
	{ id: 10, name: 'Eriel', logo: '/Eriel-logo.jpg' },
	{ id: 11, name: 'Enter', logo: '/Enter-logo.png' },
	{ id: 12, name: 'Xalq Banki', logo: '/xalq-logo.png' },
	{ id: 13, name: 'Genesys', logo: '/gen-logo.jpg' },
	{ id: 14, name: 'Ozpromholodmontaj', logo: '/prom-logo.jpg' },
	{ id: 15, name: 'Mimar', logo: '/Mimar-logo.png' },
	{ id: 16, name: 'Mirankul', logo: '/Mirankul-logo1.png' },
	{ id: 17, name: 'Ecobazar', logo: '/ecobazar-logo.jpeg' },
	{ id: 18, name: 'Tashkent City Mall', logo: '/citymall-logo.png' },
	{ id: 19, name: 'Davr Bank', logo: '/davr-logo.png' },
]

const TrustedPartners = () => {
	return (
		<section className='py-10 md:py-14'>
			<div className='section-shell'>
				<div className='mb-6 max-w-3xl md:mb-8'>
					<span className='section-kicker'>Партнёры</span>
					<h2 className='section-title mt-4'>Нам доверяют крупные компании</h2>
				</div>

				<div className='partners-glass-shell rounded-[32px] p-4 md:p-6'>
					<div className='grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5'>
						{partners.map(partner => (
							<div
								key={partner.id}
								className='partner-logo-tile flex min-h-28 items-center justify-center px-6'
							>
								<img
									src={partner.logo}
									alt={partner.name}
									className='max-h-16 w-auto object-contain transition duration-300'
									draggable='false'
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}

export default TrustedPartners
