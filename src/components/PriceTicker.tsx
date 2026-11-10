import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'
import type { Lang } from '../i18n/language'
import {
	localized,
	useSiteContent,
	type TickerContent,
	type TickerItem,
} from '../lib/siteContent'

// Бегущая строка цен «как на бирже»: едет справа налево, на наведении стоит.
// Позиции и цены редактируются в админке (вкладка «Бегущая строка»).

const ru = {
	badge: 'Цены',
	currency: 'сум',
	up: 'подорожало',
	down: 'подешевело',
	open: 'Открыть прайс-листы',
}

const content: Record<Lang, typeof ru> = {
	ru,
	en: {
		badge: 'Prices',
		currency: 'UZS',
		up: 'price up',
		down: 'price down',
		open: 'Open price lists',
	},
	uz: {
		badge: 'Narxlar',
		currency: 'so‘m',
		up: 'qimmatladi',
		down: 'arzonladi',
		open: 'Narxlar ro‘yxatini ochish',
	},
}

/** Скорость прокрутки, px в секунду — одинаковая при любой длине строки. */
const SPEED = 70

const formatPrice = (value: number) =>
	String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

const priceLabel = (item: TickerItem, lang: Lang) => {
	const unit = localized(item.unit, lang).trim()
	const currency = content[lang].currency
	return `${formatPrice(item.price)} ${unit ? `${currency}/${unit}` : currency}`
}

const Trend = ({ trend }: { trend: TickerItem['trend'] }) => {
	if (trend === 'none') return null
	return trend === 'up' ? (
		<span className='text-[0.7em] text-rose-400'>▲</span>
	) : (
		<span className='text-[0.7em] text-emerald-400'>▼</span>
	)
}

const Entry = ({ item, lang }: { item: TickerItem; lang: Lang }) => (
	<span className='flex shrink-0 items-center gap-2.5 pr-8 whitespace-nowrap'>
		<span className='h-1.5 w-1.5 rotate-45 bg-amber-400/80' />
		<span className='text-slate-300'>{localized(item.name, lang)}</span>
		<span className='font-display font-bold tabular-nums text-white'>
			{priceLabel(item, lang)}
		</span>
		<Trend trend={item.trend} />
	</span>
)

type ViewProps = {
	data: TickerContent
	/** В админке: без ссылки на прайсы и показывается даже выключенная строка. */
	preview?: boolean
}

export const PriceTickerView = ({ data, preview = false }: ViewProps) => {
	const { lang } = useLanguage()
	const t = content[lang]
	const viewportRef = useRef<HTMLDivElement>(null)
	const groupRef = useRef<HTMLDivElement>(null)
	// Сколько раз повторить список внутри половины ленты, чтобы она была шире экрана.
	const [reps, setReps] = useState(1)
	const [duration, setDuration] = useState(30)
	const items = data.items.filter(item => item.name.ru.trim())

	useLayoutEffect(() => {
		const viewport = viewportRef.current
		const group = groupRef.current
		if (!viewport || !group) return
		const measure = () => {
			const groupWidth = group.scrollWidth
			if (!groupWidth) return
			const setWidth = groupWidth / reps
			const needed = Math.max(1, Math.ceil(viewport.clientWidth / setWidth))
			if (needed !== reps) setReps(needed)
			else setDuration(groupWidth / SPEED)
		}
		measure()
		const observer = new ResizeObserver(measure)
		observer.observe(viewport)
		observer.observe(group)
		return () => observer.disconnect()
	}, [reps, items.length, lang])

	if (!items.length) return null

	const group = Array.from({ length: reps }, (_, r) =>
		items.map(item => <Entry key={`${r}-${item.id}`} item={item} lang={lang} />),
	)

	const strip = (
		<div className='price-ticker relative flex items-stretch overflow-hidden border-y border-white/10 bg-[#14161a] text-sm md:text-[0.95rem]'>
			<div className='relative z-10 flex shrink-0 items-center gap-2 bg-amber-400 px-3 font-display text-xs font-bold uppercase tracking-[0.18em] text-slate-950 md:px-4'>
				<span className='relative flex h-2 w-2'>
					<span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-slate-950/60' />
					<span className='relative inline-flex h-2 w-2 rounded-full bg-slate-950' />
				</span>
				{t.badge}
			</div>
			<div ref={viewportRef} className='price-ticker-viewport min-w-0 flex-1' aria-hidden='true'>
				<div
					className='price-ticker-track py-2.5 md:py-3'
					style={{ '--ticker-duration': `${duration}s` } as CSSProperties}
				>
					<div ref={groupRef} className='flex shrink-0 pl-6'>
						{group}
					</div>
					<div className='flex shrink-0 pl-6'>{group}</div>
				</div>
			</div>
			{/* Для скринридеров — список один раз, без бегущей копии. */}
			<ul className='sr-only'>
				{items.map(item => (
					<li key={item.id}>
						{localized(item.name, lang)} — {priceLabel(item, lang)}
						{item.trend === 'up' ? `, ${t.up}` : item.trend === 'down' ? `, ${t.down}` : ''}
					</li>
				))}
			</ul>
		</div>
	)

	if (preview) return strip
	return (
		<Link to='/prices' title={t.open} className='block'>
			{strip}
		</Link>
	)
}

/** Бегущая строка для сайта: берёт данные из админки, пока грузится — ничего. */
const PriceTicker = () => {
	const data = useSiteContent('ticker')
	if (!data || !data.enabled) return null
	return <PriceTickerView data={data} />
}

export default PriceTicker
