import { Camera, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import banner3 from '../assets/banner3.jpg'
import banner5 from '../assets/banner5.jpg'
import banner7 from '../assets/banner7.jpg'
import Footer from '../components/Footer'
import NavbarForPages from '../components/NavbarForPages'

const galleryImages = [
	{ src: banner3, label: 'Изготовление воздуховодов' },
	{ src: banner5, label: 'Комплектующие и детали' },
	{ src: banner7, label: 'Рабочий процесс' },
]

const AboutGallery = () => {
	const [activeImage, setActiveImage] = useState<(typeof galleryImages)[number] | null>(null)

	useEffect(() => {
		if (!activeImage) return
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') setActiveImage(null)
		}
		document.body.style.overflow = 'hidden'
		window.addEventListener('keydown', onKeyDown)
		return () => {
			document.body.style.overflow = ''
			window.removeEventListener('keydown', onKeyDown)
		}
	}, [activeImage])

	return (
		<div className='min-h-screen'>
			<NavbarForPages />

			<section className='relative min-h-screen overflow-hidden px-4 pt-32 pb-20'>
				<div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.16),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0),rgba(226,234,242,0.62))] dark:bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.1),transparent_26%),linear-gradient(180deg,rgba(9,16,27,0),rgba(4,8,15,0.48))]'></div>
				<div className='section-shell relative z-10'>
					<div className='mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
						<div>
							<span className='section-kicker'>Фото галерея</span>
							<h1 className='mt-4 text-4xl font-bold leading-tight text-slate-950 md:text-5xl lg:text-6xl dark:text-white'>
								Производство, детали и рабочий процесс
							</h1>
							<p className='mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300'>
								Фотографии производства VAC.UZ, рабочих зон и элементов
								вентиляционных систем.
							</p>
						</div>
						<div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950'>
							<Camera size={26} />
						</div>
					</div>

					<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
						{galleryImages.map(item => (
							<button
								key={item.label}
								type='button'
								onClick={() => setActiveImage(item)}
								className='surface-card group overflow-hidden p-3 text-left transition duration-300 hover:-translate-y-1'
							>
								<img
									src={item.src}
									alt={item.label}
									className='aspect-[4/3] w-full rounded-[20px] object-cover transition duration-300 group-hover:scale-[1.02]'
								/>
								<p className='px-2 pt-3 text-sm font-semibold text-slate-800 dark:text-slate-100'>
									{item.label}
								</p>
							</button>
						))}
					</div>
				</div>
			</section>

			{activeImage ? (
				<div
					className='fixed inset-0 z-[10000] flex items-center justify-center bg-slate-950/88 p-4 backdrop-blur-sm'
					role='dialog'
					aria-modal='true'
					aria-label={activeImage.label}
					onClick={() => setActiveImage(null)}
				>
					<div className='relative w-full max-w-6xl' onClick={event => event.stopPropagation()}>
						<button
							type='button'
							onClick={() => setActiveImage(null)}
							className='absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20'
							aria-label='Закрыть фото'
						>
							<X size={22} />
						</button>
						<img
							src={activeImage.src}
							alt={activeImage.label}
							className='max-h-[82vh] w-full rounded-[22px] object-contain shadow-2xl'
						/>
						<p className='mt-3 text-center text-sm font-semibold text-white'>
							{activeImage.label}
						</p>
					</div>
				</div>
			) : null}

			<Footer />
		</div>
	)
}

export default AboutGallery
