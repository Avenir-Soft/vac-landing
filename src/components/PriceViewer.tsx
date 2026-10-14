import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import { useEffect, useRef, useState, type KeyboardEvent, type TouchEvent } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import type { Lang } from '../i18n/language'

const ru = {
	page: 'страница',
	prevPage: 'Предыдущая страница',
	nextPage: 'Следующая страница',
	openFull: 'Открыть страницу в полном размере',
	goToPage: (n: number) => `Перейти на страницу ${n}`,
}

const content: Record<Lang, typeof ru> = {
	ru,
	en: {
		page: 'page',
		prevPage: 'Previous page',
		nextPage: 'Next page',
		openFull: 'Open page in full size',
		goToPage: (n: number) => `Go to page ${n}`,
	},
	uz: {
		page: 'sahifa',
		prevPage: 'Oldingi sahifa',
		nextPage: 'Keyingi sahifa',
		openFull: 'Sahifani to‘liq o‘lchamda ochish',
		goToPage: (n: number) => `${n}-sahifaga o‘tish`,
	},
}

type Props = {
	pages: string[]
	title: string
}

const slide = {
	enter: (dir: number) => ({ x: dir * 48, opacity: 0 }),
	center: { x: 0, opacity: 1 },
	exit: (dir: number) => ({ x: dir * -48, opacity: 0 }),
}

/**
 * Прайс «как каталог»: на экране один лист целиком (по высоте окна),
 * листается стрелками, свайпом, клавишами ← → и номерами страниц.
 */
const PriceViewer = ({ pages, title }: Props) => {
	const { lang } = useLanguage()
	const t = content[lang]
	const [index, setIndex] = useState(0)
	const [dir, setDir] = useState(1)
	const touchStartX = useRef<number | null>(null)

	const count = pages.length
	const current = Math.min(index, Math.max(count - 1, 0))
	const src = pages[current]

	const go = (next: number) => {
		if (next < 0 || next >= count || next === current) return
		setDir(next > current ? 1 : -1)
		setIndex(next)
	}

	// Соседние листы грузим заранее — листание без задержки.
	useEffect(() => {
		for (const i of [current - 1, current + 1]) {
			if (pages[i]) new Image().src = pages[i]
		}
	}, [current, pages])

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'ArrowLeft') go(current - 1)
		else if (e.key === 'ArrowRight') go(current + 1)
	}
	const onTouchStart = (e: TouchEvent) => {
		touchStartX.current = e.touches[0].clientX
	}
	const onTouchEnd = (e: TouchEvent) => {
		if (touchStartX.current === null) return
		const delta = e.changedTouches[0].clientX - touchStartX.current
		if (delta > 50) go(current - 1)
		else if (delta < -50) go(current + 1)
		touchStartX.current = null
	}

	if (!src) return null

	const arrowClass =
		'absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-slate-900/70 text-white shadow-lg backdrop-blur transition hover:bg-slate-900 disabled:pointer-events-none disabled:opacity-0'

	return (
		<div
			className='outline-none'
			tabIndex={0}
			onKeyDown={onKeyDown}
			aria-roledescription='carousel'
			aria-label={title}
		>
			<div
				className='relative mx-auto overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700'
				// Лист A4 целиком помещается в окно по высоте.
				style={{
					width: 'min(100%, calc((100svh - 12rem) / 1.414))',
					aspectRatio: '210 / 297',
				}}
				onTouchStart={onTouchStart}
				onTouchEnd={onTouchEnd}
			>
				<AnimatePresence initial={false} custom={dir}>
					<motion.img
						key={src}
						src={src}
						alt={`${title} — ${t.page} ${current + 1}`}
						custom={dir}
						variants={slide}
						initial='enter'
						animate='center'
						exit='exit'
						transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
						draggable={false}
						className='absolute inset-0 h-full w-full select-none object-contain'
					/>
				</AnimatePresence>

				<a
					href={src}
					target='_blank'
					rel='noreferrer'
					className='absolute right-2 top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-slate-900/60 text-white backdrop-blur transition hover:bg-slate-900'
					aria-label={t.openFull}
					title={t.openFull}
				>
					<Maximize2 size={16} />
				</a>

				{count > 1 ? (
					<>
						<button
							type='button'
							onClick={() => go(current - 1)}
							disabled={current === 0}
							className={`${arrowClass} left-2`}
							aria-label={t.prevPage}
						>
							<ChevronLeft size={24} />
						</button>
						<button
							type='button'
							onClick={() => go(current + 1)}
							disabled={current === count - 1}
							className={`${arrowClass} right-2`}
							aria-label={t.nextPage}
						>
							<ChevronRight size={24} />
						</button>
					</>
				) : null}
			</div>

			{count > 1 ? (
				<div className='mt-3 flex flex-wrap items-center justify-center gap-1.5'>
					{pages.map((page, i) => (
						<button
							key={page}
							type='button'
							onClick={() => go(i)}
							aria-label={t.goToPage(i + 1)}
							aria-current={i === current ? 'page' : undefined}
							className={`h-8 min-w-8 rounded-lg px-2 text-sm font-semibold tabular-nums transition ${
								i === current
									? 'bg-sky-500 text-white'
									: 'bg-white text-slate-600 hover:bg-sky-50 hover:text-sky-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
							}`}
						>
							{i + 1}
						</button>
					))}
				</div>
			) : null}
		</div>
	)
}

export default PriceViewer
