import { useEffect, useState } from 'react'
import type { Lang } from '../i18n/language'

// Редактируемый контент сайта (галерея, прайс-листы).
// Админка (/admin) сохраняет его в /content/<key>.json на сервере, сайт читает
// оттуда же. Пока файла нет (или PHP недоступен, например в `npm run dev`) —
// показываются значения по умолчанию ниже.

export type LocalizedText = Record<Lang, string>

export type GalleryContent = {
	photos: string[]
}

export type PriceDoc = {
	id: string
	title: LocalizedText
	description: LocalizedText
	badge: string
	pdf: string
	pages: string[]
	downloadName: string
}

export type PricesContent = {
	docs: PriceDoc[]
}

type ContentMap = {
	gallery: GalleryContent
	prices: PricesContent
}

export type ContentKey = keyof ContentMap

// Фото лежат в public/gallery (g-1.png … g-31.png, затем g-32.jpg … g-50.jpg).
const PNG_COUNT = 31
const JPG_COUNT = 19

const defaults: ContentMap = {
	gallery: {
		photos: [
			...Array.from({ length: PNG_COUNT }, (_, i) => `/gallery/g-${i + 1}.png`),
			...Array.from(
				{ length: JPG_COUNT },
				(_, i) => `/gallery/g-${PNG_COUNT + i + 1}.jpg`,
			),
		],
	},
	prices: {
		docs: [
			{
				id: 'main',
				title: {
					ru: 'Прайс-лист VAC 2026',
					en: 'VAC 2026 price list',
					uz: 'VAC 2026 narxlar ro‘yxati',
				},
				description: {
					ru: 'Актуальные цены на воздуховоды и фасонные изделия.',
					en: 'Current prices for air ducts and shaped products.',
					uz: 'Havo o‘tkazgichlar va fasonli mahsulotlar uchun dolzarb narxlar.',
				},
				badge: 'PDF · 2026',
				pdf: '/price-files/price-vac-2026.pdf',
				pages: Array.from(
					{ length: 13 },
					(_, i) => `/price-files/price-main-${i + 1}.webp`,
				),
				downloadName: 'ПРАЙС-ЛИСТ-VAC-2026.pdf',
			},
			{
				id: 'dealer',
				title: {
					ru: 'Прайс-лист VAC 2026 (Давальческий)',
					en: 'VAC 2026 price list (tolling)',
					uz: 'VAC 2026 narxlar ro‘yxati (davalcheskiy)',
				},
				description: {
					ru: 'Расширенный прайс-лист для отправки заказчику.',
					en: 'Extended price list for sending to the customer.',
					uz: 'Buyurtmachiga yuborish uchun kengaytirilgan narxlar ro‘yxati.',
				},
				badge: 'PDF · 2026',
				pdf: '/price-files/price-vac-2026-d.pdf',
				pages: ['/price-files/price-dealer-1.webp'],
				downloadName: 'ПРАЙС-ЛИСТ-VAC-2026-Д.pdf',
			},
		],
	},
}

export const defaultContent = <K extends ContentKey>(key: K): ContentMap[K] =>
	structuredClone(defaults[key])

const cache = new Map<ContentKey, Promise<unknown>>()

const isValid = (key: ContentKey, data: unknown): boolean => {
	if (!data || typeof data !== 'object') return false
	if (key === 'gallery') return Array.isArray((data as GalleryContent).photos)
	return Array.isArray((data as PricesContent).docs)
}

/** Загружает контент с сервера; при любой ошибке — значения по умолчанию. */
export const fetchContent = <K extends ContentKey>(
	key: K,
	{ fresh = false } = {},
): Promise<ContentMap[K]> => {
	if (fresh) cache.delete(key)
	let promise = cache.get(key) as Promise<ContentMap[K]> | undefined
	if (!promise) {
		promise = fetch(`/content/${key}.json`, { cache: 'no-cache' })
			.then(res => (res.ok ? res.json() : null))
			.then(data => (isValid(key, data) ? data : defaultContent(key)))
			// SPA-фолбэк хостинга отдаёт index.html вместо 404 — json() упадёт.
			.catch(() => defaultContent(key))
		cache.set(key, promise)
	}
	return promise
}

/** Контент для публичных страниц. `null`, пока идёт загрузка. */
export const useSiteContent = <K extends ContentKey>(
	key: K,
): ContentMap[K] | null => {
	const [data, setData] = useState<ContentMap[K] | null>(null)
	useEffect(() => {
		let alive = true
		fetchContent(key).then(result => {
			if (alive) setData(result)
		})
		return () => {
			alive = false
		}
	}, [key])
	return data
}

/** Текст на нужном языке; пустые en/uz подменяются русским. */
export const localized = (text: LocalizedText, lang: Lang) =>
	text[lang]?.trim() ? text[lang] : text.ru
