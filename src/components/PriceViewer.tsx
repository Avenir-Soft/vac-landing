import { Maximize2 } from 'lucide-react'
import { useRef, useState } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import type { Lang } from '../i18n/language'

const ru = {
	page: 'страница',
	openFull: 'Открыть страницу в полном размере',
	goToPage: (n: number) => `Перейти на страницу ${n}`,
}

const content: Record<Lang, typeof ru> = {
	ru,
	en: {
		page: 'page',
		openFull: 'Open page in full size',
		goToPage: (n: number) => `Go to page ${n}`,
	},
	uz: {
		page: 'sahifa',
		openFull: 'Sahifani to‘liq o‘lchamda ochish',
		goToPage: (n: number) => `${n}-sahifaga o‘tish`,
	},
}

type Props = {
	pages: string[]
	title: string
}

const GAP = 12

/**
 * Прайс «как PDF»: окно размером в один лист (по высоте экрана), внутри все
 * страницы друг под другом — листаются прокруткой со своим ползунком.
 */
const PriceViewer = ({ pages, title }: Props) => {
	const { lang } = useLanguage()
	const t = content[lang]
	const [current, setCurrent] = useState(0)
	const scrollRef = useRef<HTMLDivElement>(null)
	const pageRefs = useRef<(HTMLImageElement | null)[]>([])

	const count = pages.length
	if (!count) return null

	// Текущая — последняя страница, верх которой уже прокручен до середины окна.
	const onScroll = () => {
		const box = scrollRef.current
		if (!box) return
		const mark = box.scrollTop + box.clientHeight / 2
		let found = 0
		pageRefs.current.forEach((img, i) => {
			if (img && img.offsetTop <= mark) found = i
		})
		// Внизу прокрутки — всегда последняя (она может не дойти до середины окна).
		if (box.scrollTop + box.clientHeight >= box.scrollHeight - 2) found = count - 1
		setCurrent(found)
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
							className='block aspect-[210/297] w-full shrink-0 rounded-lg bg-white object-contain shadow-sm'
						/>
					))}
				</div>

				<a
					href={pages[current]}
					target='_blank'
					rel='noreferrer'
					className='absolute right-5 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-slate-900/60 text-white backdrop-blur transition hover:bg-slate-900'
					aria-label={t.openFull}
					title={t.openFull}
				>
					<Maximize2 size={16} />
				</a>
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
		</div>
	)
}

export default PriceViewer
