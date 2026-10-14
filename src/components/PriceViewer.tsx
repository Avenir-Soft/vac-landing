import { Maximize2, X } from 'lucide-react'
import { useEffect, useRef, useState, type RefObject } from 'react'
import { createPortal } from 'react-dom'
import { useLanguage } from '../hooks/useLanguage'
import type { Lang } from '../i18n/language'

const ru = {
	page: 'страница',
	openFull: 'Открыть в полном размере',
	close: 'Закрыть',
	goToPage: (n: number) => `Перейти на страницу ${n}`,
}

const content: Record<Lang, typeof ru> = {
	ru,
	en: {
		page: 'page',
		openFull: 'Open in full size',
		close: 'Close',
		goToPage: (n: number) => `Go to page ${n}`,
	},
	uz: {
		page: 'sahifa',
		openFull: 'To‘liq o‘lchamda ochish',
		close: 'Yopish',
		goToPage: (n: number) => `${n}-sahifaga o‘tish`,
	},
}

type Props = {
	pages: string[]
	title: string
}

const GAP = 12

type PageRefs = RefObject<(HTMLImageElement | null)[]>

// Текущая — последняя страница, верх которой уже прокручен до середины окна.
// Внизу прокрутки — всегда последняя (она может не дойти до середины окна).
const visiblePage = (box: HTMLDivElement, refs: PageRefs, count: number) => {
	if (box.scrollTop + box.clientHeight >= box.scrollHeight - 2) return count - 1
	const mark = box.scrollTop + box.clientHeight / 2
	let found = 0
	refs.current.forEach((img, i) => {
		if (img && img.offsetTop <= mark) found = i
	})
	return found
}

/** Полноэкранный просмотр: те же страницы крупно, тоже с прокруткой. */
const PagesModal = ({
	pages,
	title,
	start,
	onClose,
}: Props & { start: number; onClose: () => void }) => {
	const { lang } = useLanguage()
	const t = content[lang]
	const [current, setCurrent] = useState(start)
	const scrollRef = useRef<HTMLDivElement>(null)
	const pageRefs = useRef<(HTMLImageElement | null)[]>([])

	useEffect(() => {
		const box = scrollRef.current
		const img = pageRefs.current[start]
		if (box && img) box.scrollTop = img.offsetTop - 16
		box?.focus()
	}, [start])

	useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose()
		}
		document.body.style.overflow = 'hidden'
		window.addEventListener('keydown', onKeyDown)
		return () => {
			document.body.style.overflow = ''
			window.removeEventListener('keydown', onKeyDown)
		}
	}, [onClose])

	const closeOnBackdrop = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) onClose()
	}

	return createPortal(
		<div
			role='dialog'
			aria-modal='true'
			aria-label={title}
			className='fixed inset-0 z-[10000] bg-slate-950/90 backdrop-blur-sm'
		>
			<div
				ref={scrollRef}
				tabIndex={-1}
				onScroll={() => {
					if (scrollRef.current)
						setCurrent(visiblePage(scrollRef.current, pageRefs, pages.length))
				}}
				onClick={closeOnBackdrop}
				className='relative h-full overflow-y-auto overscroll-contain outline-none [scrollbar-color:#0ea5e9_transparent]'
			>
				<div
					onClick={closeOnBackdrop}
					className='mx-auto flex max-w-4xl flex-col gap-4 px-3 py-16 sm:px-6'
				>
					{pages.map((page, i) => (
						<img
							key={page}
							ref={el => {
								pageRefs.current[i] = el
							}}
							src={page}
							alt={`${title} — ${t.page} ${i + 1}`}
							loading={Math.abs(i - start) < 2 ? 'eager' : 'lazy'}
							draggable={false}
							className='block aspect-[210/297] w-full rounded-lg bg-white object-contain shadow-2xl'
						/>
					))}
				</div>
			</div>

			<button
				type='button'
				onClick={onClose}
				className='fixed right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-white/20'
				aria-label={t.close}
			>
				<X size={22} />
			</button>
			{pages.length > 1 ? (
				<span className='pointer-events-none fixed bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-slate-900/80 px-4 py-1.5 text-sm font-semibold tabular-nums text-white backdrop-blur'>
					{current + 1} / {pages.length}
				</span>
			) : null}
		</div>,
		document.body,
	)
}

/**
 * Прайс «как PDF»: окно размером в один лист (по высоте экрана), внутри все
 * страницы друг под другом — листаются прокруткой со своим ползунком.
 */
const PriceViewer = ({ pages, title }: Props) => {
	const { lang } = useLanguage()
	const t = content[lang]
	const [current, setCurrent] = useState(0)
	const [modalStart, setModalStart] = useState<number | null>(null)
	const scrollRef = useRef<HTMLDivElement>(null)
	const pageRefs = useRef<(HTMLImageElement | null)[]>([])

	const count = pages.length
	if (!count) return null

	const onScroll = () => {
		if (scrollRef.current) setCurrent(visiblePage(scrollRef.current, pageRefs, count))
	}

	const goTo = (i: number) => {
		const box = scrollRef.current
		const img = pageRefs.current[i]
		if (box && img) box.scrollTo({ top: img.offsetTop - GAP, behavior: 'smooth' })
	}

	return (
		<div>
			<div
				className='relative mx-auto'
				// Окно = один лист A4, целиком помещается в экран по высоте.
				style={{ width: 'min(100%, calc((100svh - 12rem) / 1.414))' }}
			>
				<div
					ref={scrollRef}
					onScroll={onScroll}
					tabIndex={0}
					aria-label={title}
					className='relative flex aspect-[210/297] flex-col overflow-y-auto rounded-xl border border-slate-200 bg-slate-200/70 outline-none [scrollbar-color:#0ea5e9_transparent] dark:border-slate-700 dark:bg-slate-800/60'
					style={{ gap: GAP, padding: GAP }}
				>
					{pages.map((page, i) => (
						<img
							key={page}
							ref={el => {
								pageRefs.current[i] = el
							}}
							src={page}
							alt={`${title} — ${t.page} ${i + 1}`}
							loading={i < 2 ? 'eager' : 'lazy'}
							draggable={false}
							onClick={() => setModalStart(i)}
							className='block aspect-[210/297] w-full shrink-0 cursor-zoom-in rounded-lg bg-white object-contain shadow-sm'
						/>
					))}
				</div>

				<button
					type='button'
					onClick={() => setModalStart(current)}
					className='absolute right-5 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-slate-900/60 text-white backdrop-blur transition hover:bg-slate-900'
					aria-label={t.openFull}
					title={t.openFull}
				>
					<Maximize2 size={16} />
				</button>
				{count > 1 ? (
					<span className='pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-slate-900/70 px-3 py-1 text-xs font-semibold tabular-nums text-white backdrop-blur'>
						{current + 1} / {count}
					</span>
				) : null}
			</div>

			{count > 1 ? (
				<div className='mt-3 flex flex-wrap items-center justify-center gap-1.5'>
					{pages.map((page, i) => (
						<button
							key={page}
							type='button'
							onClick={() => goTo(i)}
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

			{modalStart !== null ? (
				<PagesModal
					pages={pages}
					title={title}
					start={modalStart}
					onClose={() => setModalStart(null)}
				/>
			) : null}
		</div>
	)
}

export default PriceViewer
