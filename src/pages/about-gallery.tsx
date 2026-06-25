import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import Footer from '../components/Footer'
import NavbarForPages from '../components/NavbarForPages'

// Фото лежат в public/gallery (g-1.png … g-30.png).
const GALLERY_COUNT = 30
const galleryImages = Array.from({ length: GALLERY_COUNT }, (_, i) => ({
	src: `/gallery/g-${i + 1}.png`,
	label: `Производство VAC.UZ — фото ${i + 1}`,
}))

const AboutGallery = () => {
	const [activeIndex, setActiveIndex] = useState<number | null>(null)
	const touchStartX = useRef<number | null>(null)

	const showPrev = () =>
		setActiveIndex(i =>
			i === null ? i : (i - 1 + galleryImages.length) % galleryImages.length,
		)
	const showNext = () =>
		setActiveIndex(i => (i === null ? i : (i + 1) % galleryImages.length))

	useEffect(() => {
		if (activeIndex === null) return
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') setActiveIndex(null)
			else if (event.key === 'ArrowLeft') showPrev()
			else if (event.key === 'ArrowRight') showNext()
		}
		document.body.style.overflow = 'hidden'
		window.addEventListener('keydown', onKeyDown)
		return () => {
			document.body.style.overflow = ''
			window.removeEventListener('keydown', onKeyDown)
		}
	}, [activeIndex])

	const onTouchStart = (e: React.TouchEvent) => {
		touchStartX.current = e.touches[0].clientX
	}
	const onTouchEnd = (e: React.TouchEvent) => {
		if (touchStartX.current === null) return
		const delta = e.changedTouches[0].clientX - touchStartX.current
		if (delta > 50) showPrev()
		else if (delta < -50) showNext()
		touchStartX.current = null
	}

	return (
		<div className='min-h-screen'>
			<NavbarForPages />

			<section className='relative min-h-screen overflow-hidden px-4 pt-32 pb-20'>
				<div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.16),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0),rgba(226,234,242,0.62))] dark:bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.1),transparent_26%),linear-gradient(180deg,rgba(9,16,27,0),rgba(4,8,15,0.48))]'></div>
				<div className='section-shell relative z-10'>
					<div className='mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
						<div>
							<span className='section-kicker'>Фото галерея</span>
							<h1 className='mt-4 text-[clamp(2.1rem,1.45rem+3.4vw,3.5rem)] font-bold leading-tight text-white'>
								Производство, детали и рабочий процесс
							</h1>
							<p className='mt-5 max-w-2xl text-base leading-7 text-slate-300'>
								Фотографии производства VAC.UZ, рабочих зон и элементов
								вентиляционных систем.
							</p>
						</div>
						
					</div>

					<div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
						{galleryImages.map((item, index) => (
							<button
								key={item.src}
								type='button'
								onClick={() => setActiveIndex(index)}
								className='surface-card group overflow-hidden p-2 transition duration-300 hover:-translate-y-1'
								aria-label={item.label}
							>
								<img
									src={item.src}
									alt={item.label}
									loading='lazy'
									className='aspect-[4/3] w-full rounded-[18px] object-cover transition duration-300 group-hover:scale-[1.03]'
								/>
							</button>
						))}
					</div>
				</div>
			</section>

			{activeIndex !== null ? (
				<div
					className='fixed inset-0 z-[10000] flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-sm'
					role='dialog'
					aria-modal='true'
					aria-label={galleryImages[activeIndex].label}
					onClick={() => setActiveIndex(null)}
				>
					<button
						type='button'
						onClick={event => {
							event.stopPropagation()
							showPrev()
						}}
						className='absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 md:left-6'
						aria-label='Предыдущее фото'
					>
						<ChevronLeft size={26} />
					</button>

					<div
						className='relative w-full max-w-6xl'
						onClick={event => event.stopPropagation()}
						onTouchStart={onTouchStart}
						onTouchEnd={onTouchEnd}
					>
						<button
							type='button'
							onClick={() => setActiveIndex(null)}
							className='absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20'
							aria-label='Закрыть фото'
						>
							<X size={22} />
						</button>
						<img
							src={galleryImages[activeIndex].src}
							alt={galleryImages[activeIndex].label}
							className='max-h-[82vh] w-full rounded-[22px] object-contain shadow-2xl'
						/>
						<p className='mt-3 text-center text-sm font-semibold tabular-nums text-white/80'>
							{activeIndex + 1} / {galleryImages.length}
						</p>
					</div>

					<button
						type='button'
						onClick={event => {
							event.stopPropagation()
							showNext()
						}}
						className='absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 md:right-6'
						aria-label='Следующее фото'
					>
						<ChevronRight size={26} />
					</button>
				</div>
			) : null}

			<Footer />
		</div>
	)
}

export default AboutGallery
