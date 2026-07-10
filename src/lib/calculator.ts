// Расчёт площади воздуховодов и фасонных изделий.
// Формулы — геометрический расчёт развёртки (площади металла) для прямых
// участков и фасонных частей вентиляции. Реализованы как чистые функции:
// на вход — размеры в указанных единицах, на выходе — площадь одного изделия в м².

import type { Lang } from '../i18n/language'

export type DiagramKey =
	| 'ductRound'
	| 'ductRect'
	| 'elbow'
	| 'transition'
	| 'incut'
	| 'tee'
	| 'cap'
	| 'offset'
	| 'hood'

export interface CalcField {
	key: string
	label: string
	unit?: string
	type?: 'number' | 'select'
	options?: { label: string; value: string }[]
}

export interface CalcVariant {
	id: string
	label: string
	diagram: DiagramKey
	/** Имя файла-схемы в src/assets/calculator без расширения. */
	image?: string
	fields: CalcField[]
	/** Площадь одного изделия, м². Значения полей — как введено пользователем. */
	area: (v: Record<string, number>) => number
	note?: string
}

export interface CalcCategory {
	id: string
	label: string
	variants: CalcVariant[]
}

const MM = 'мм'
const M = 'м'
const qty = (v: Record<string, number>, key: string) => v[key] || 0

const ANGLE_OPTIONS = [
	{ label: '15°', value: '15' },
	{ label: '30°', value: '30' },
	{ label: '45°', value: '45' },
	{ label: '60°', value: '60' },
	{ label: '90°', value: '90' },
]

const f = (key: string, label: string, unit = MM): CalcField => ({
	key,
	label,
	unit,
})

export const CALC_CATEGORIES: CalcCategory[] = [
	{
		id: 'ductwork',
		label: 'Прямой участок',
		variants: [
			{
				id: 'round',
				label: 'Круглое сечение',
				diagram: 'ductRound',
				image: 'ductwork_round_correction',
				fields: [f('length', 'Длина L', M), f('diameter', 'Диаметр D')],
				area: v => (qty(v, 'length') * qty(v, 'diameter') * Math.PI) / 1000,
			},
			{
				id: 'rectangular',
				label: 'Прямоугольное сечение',
				diagram: 'ductRect',
				image: 'ductwork_rectangular_correction',
				fields: [
					f('width', 'Ширина A'),
					f('height', 'Высота B'),
					f('length', 'Длина L', M),
				],
				area: v =>
					(qty(v, 'length') * (qty(v, 'width') + qty(v, 'height')) * 2) / 1000,
			},
		],
	},
	{
		id: 'tap',
		label: 'Отвод',
		variants: [
			{
				id: 'round',
				label: 'Круглое сечение',
				diagram: 'elbow',
				image: 'tap_round_correction',
				fields: [
					f('diameter', 'Диаметр D'),
					{ key: 'angle', label: 'Угол α', type: 'select', options: ANGLE_OPTIONS },
				],
				area: v => {
					const d = qty(v, 'diameter')
					const angle = qty(v, 'angle')
					const ratio =
						angle === 90 ? 2 : angle === 60 ? 3 : angle === 45 ? 4 : angle === 30 ? 6 : 12
					const elementNumber = angle === 90 || angle === 60 ? 2 : 0
					const neck = (Math.PI / ratio) * (d / 2) / (elementNumber + 2) + 15
					const section = ((Math.PI / ratio) * d) / (elementNumber * 2 + 2)
					const s1 = (Math.PI * d) / 1000 * 0.1
					const s2 =
						(Math.PI *
							d *
							(2 * (neck + section / 2) + elementNumber * (neck + section))) /
						1000000
					return s1 + s2
				},
			},
			{
				id: 'rectangular',
				label: 'Прямоугольное сечение',
				diagram: 'elbow',
				image: 'tap_rectangular_correction',
				fields: [
					f('width', 'Ширина A'),
					f('height', 'Высота B'),
					{ key: 'angle', label: 'Угол α', type: 'select', options: ANGLE_OPTIONS },
				],
				area: v => {
					const w = qty(v, 'width') / 1000
					const h = qty(v, 'height') / 1000
					const a = qty(v, 'angle')
					return (
						(w + h) * 0.2 +
						(Math.PI * ((0.125 + w) * (0.125 + w) - 0.125 * 0.125) * a * 2) / 360 +
						(Math.PI * 0.125 * a * h) / 180 +
						(Math.PI * (0.125 + w) * a * h) / 180
					)
				},
			},
		],
	},
	{
		id: 'transition',
		label: 'Переход',
		variants: [
			{
				id: 'round_round',
				label: 'Круг → круг',
				diagram: 'transition',
				image: 'transition_round_round_correction',
				fields: [
					f('diameter', 'Диаметр D'),
					f('diameter1', 'Диаметр D1'),
					f('length', 'Длина L'),
				],
				area: v => {
					const d = qty(v, 'diameter') / 1000
					const d1 = qty(v, 'diameter1') / 1000
					const l = qty(v, 'length') / 1000
					return (
						Math.PI *
							Math.sqrt(l * l + ((d - d1) / 2) * ((d - d1) / 2)) *
							(d / 2 + d1 / 2) +
						Math.PI * d * 0.05 +
						Math.PI * d1 * 0.05
					)
				},
			},
			{
				id: 'rectangular_rectangular',
				label: 'Прямоуг. → прямоуг.',
				diagram: 'transition',
				image: 'transition_rectangular_rectangular',
				fields: [
					f('width', 'Ширина A'),
					f('height', 'Высота B'),
					f('width1', 'Ширина A1'),
					f('height1', 'Высота B1'),
					f('length', 'Длина L'),
				],
				area: v => {
					const w = qty(v, 'width') / 1000
					const w1 = qty(v, 'width1') / 1000
					const h = qty(v, 'height') / 1000
					const h1 = qty(v, 'height1') / 1000
					const l = qty(v, 'length') / 1000
					const rw = Math.sqrt(((h - h1) / 2) * ((h - h1) / 2) + l * l)
					const rh = Math.sqrt(((w - w1) / 2) * ((w - w1) / 2) + l * l)
					return (
						2 * ((w + w1) / 2) * rw +
						2 * ((h + h1) / 2) * rh +
						(2 * w1 + 2 * h1 + 2 * w + 2 * h) * 0.05
					)
				},
			},
			{
				id: 'round_rectangular',
				label: 'Круг → прямоуг.',
				diagram: 'transition',
				image: 'transition_round_rectangular_correction',
				note: 'Приближённый расчёт развёртки.',
				fields: [
					f('width', 'Ширина A'),
					f('height', 'Высота B'),
					f('diameter', 'Диаметр D'),
					f('length', 'Длина L'),
				],
				area: v => {
					const w = qty(v, 'width')
					const h = qty(v, 'height')
					const d = qty(v, 'diameter')
					const l = qty(v, 'length')
					const perimRect = 2 * (w + h)
					const perimCirc = Math.PI * d
					const slant = Math.sqrt(l * l + Math.pow((Math.max(w, h) - d) / 2, 2))
					const lateral = (((perimRect + perimCirc) / 2) * slant) / 1000000
					const collars = ((perimRect + perimCirc) / 1000) * 0.05
					return lateral + collars
				},
			},
		],
	},
	{
		id: 'incut',
		label: 'Врезка',
		variants: [
			{
				id: 'straight_round',
				label: 'Прямая, круглая',
				diagram: 'incut',
				image: 'incut_straight_round_correction',
				fields: [f('diameter', 'Диаметр D'), f('length', 'Длина L')],
				area: v =>
					((qty(v, 'diameter') + 0.02) * Math.PI * qty(v, 'length')) / 1000000,
			},
			{
				id: 'straight_rectangular',
				label: 'Прямая, прямоугольная',
				diagram: 'incut',
				image: 'incut_straight_rectangular_correction',
				fields: [
					f('width', 'Ширина A'),
					f('length', 'Длина L'),
					f('height', 'Высота B'),
				],
				area: v =>
					((qty(v, 'width') + qty(v, 'length') + 0.04) * 2 * qty(v, 'height')) /
					1000000,
			},
			{
				id: 'collar_round',
				label: 'С воротником, круглая',
				diagram: 'incut',
				image: 'incut_collar_round_correction',
				fields: [
					f('diameter', 'Диаметр воротника D'),
					f('diameter1', 'Диаметр врезки d'),
					f('length1', 'Длина воротника l1'),
				],
				area: v => {
					const diameter = qty(v, 'diameter')
					const diameter1 = qty(v, 'diameter1')
					const length1 = qty(v, 'length1')
					return (
						(diameter * Math.PI * length1) / 1000000 +
						((diameter1 * Math.PI) / 4 / 1000) * ((diameter + 100) / 1000)
					)
				},
			},
			{
				id: 'collar_rectangular',
				label: 'С воротником, прямоугольная',
				diagram: 'incut',
				image: 'incut_collar_rectangular_correction',
				fields: [
					f('width', 'Ширина A'),
					f('length', 'Длина L'),
					f('height', 'Высота B'),
					f('diameter', 'Диаметр врезки d'),
				],
				area: v =>
					((qty(v, 'width') + qty(v, 'length')) * 2 * qty(v, 'height') +
						(qty(v, 'diameter') * Math.PI) / 3 * (qty(v, 'width') + 100)) /
					1000000,
			},
		],
	},
	{
		id: 'tee',
		label: 'Тройник',
		variants: [
			{
				id: 'output_round_round',
				label: 'Круг + круглый отвод',
				diagram: 'tee',
				image: 'tee_output_round_round_correction',
				fields: [
					f('diameter', 'Магистраль D'),
					f('length', 'Длина L'),
					f('diameter1', 'Ответвление D1'),
					f('length1', 'Длина L1'),
				],
				area: v => {
					const d = qty(v, 'diameter') / 1000
					const d1 = qty(v, 'diameter1') / 1000
					const l = qty(v, 'length') / 1000
					const l1 = qty(v, 'length1') / 1000
					return Math.PI * d * l + Math.PI * d1 * l1
				},
			},
			{
				id: 'incut',
				label: 'Круг + прямоуг. врезка',
				diagram: 'tee',
				image: 'tee_incut_correction',
				fields: [
					f('diameter', 'Магистраль D'),
					f('length', 'Длина L'),
					f('width', 'Ширина врезки A'),
					f('height', 'Высота врезки B'),
					f('length1', 'Длина врезки L1'),
				],
				area: v => {
					const d = qty(v, 'diameter') / 1000
					const w = qty(v, 'width') / 1000
					const h = qty(v, 'height') / 1000
					const l = qty(v, 'length') / 1000
					const l1 = qty(v, 'length1') / 1000
					return Math.PI * d * l + (w + h) * 2 * l1
				},
			},
			{
				id: 'output_rectangular_round',
				label: 'Прямоуг. + круглый отвод',
				diagram: 'tee',
				image: 'tee_output_rectangular_round_correction',
				fields: [
					f('width', 'Магистраль A'),
					f('height', 'Магистраль B'),
					f('length', 'Длина L'),
					f('diameter', 'Ответвление D'),
					f('length1', 'Длина L1'),
				],
				area: v => {
					const w = qty(v, 'width') / 1000
					const h = qty(v, 'height') / 1000
					const l = qty(v, 'length') / 1000
					const d = qty(v, 'diameter') / 1000
					const l1 = qty(v, 'length1') / 1000
					return (w + h) * 2 * l + Math.PI * d * l1 - (Math.PI * d * d) / 4
				},
			},
			{
				id: 'output_rectangular_rectangular',
				label: 'Прямоуг. + прямоуг. отвод',
				diagram: 'tee',
				image: 'tee_output_rectangular_rectangular_correction',
				fields: [
					f('width', 'Магистраль A'),
					f('height', 'Магистраль B'),
					f('length', 'Длина L'),
					f('width1', 'Ответвление A1'),
					f('height1', 'Ответвление B1'),
					f('length1', 'Длина L1'),
				],
				area: v => {
					const w = qty(v, 'width') / 1000
					const h = qty(v, 'height') / 1000
					const l = qty(v, 'length') / 1000
					const w1 = qty(v, 'width1') / 1000
					const h1 = qty(v, 'height1') / 1000
					const l1 = qty(v, 'length1') / 1000
					return (w + h) * 2 * l + (w1 + h1) * 2 * l1 - w1 * h1
				},
			},
		],
	},
	{
		id: 'cap',
		label: 'Заглушка',
		variants: [
			{
				id: 'round',
				label: 'Круглая',
				diagram: 'cap',
				image: 'cap_round_correction',
				fields: [f('diameter', 'Диаметр D')],
				area: v => {
					const d = qty(v, 'diameter') / 1000
					return (Math.PI * d * d) / 4 + Math.PI * d * 0.05
				},
			},
			{
				id: 'rectangular',
				label: 'Прямоугольная',
				diagram: 'cap',
				image: 'cap_rectangular_correction',
				fields: [f('width', 'Ширина A'), f('height', 'Высота B')],
				area: v => {
					const w = qty(v, 'width') / 1000
					const h = qty(v, 'height') / 1000
					return w * h + (w + h) * 0.05
				},
			},
		],
	},
	{
		id: 'duck',
		label: 'Утка',
		variants: [
			{
				id: 'one',
				label: 'Одно смещение',
				diagram: 'offset',
				image: 'duck_one_correction',
				fields: [
					f('width', 'Ширина A'),
					f('height', 'Высота B'),
					f('length', 'Длина L'),
					f('shift', 'Сдвиг H'),
				],
				area: v => {
					const w = qty(v, 'width') / 1000
					const h = qty(v, 'height') / 1000
					const l = qty(v, 'length') / 1000
					const s = qty(v, 'shift') / 1000
					return 2 * (w * Math.sqrt(l * l + s * s) + h * l + 0.1 * (w + h))
				},
			},
			{
				id: 'two',
				label: 'Два смещения',
				diagram: 'offset',
				image: 'duck_two_correction',
				fields: [
					f('width', 'Ширина A'),
					f('height', 'Высота B'),
					f('length', 'Длина L'),
					f('shift', 'Сдвиг H'),
					f('shift1', 'Сдвиг H1'),
				],
				area: v => {
					const w = qty(v, 'width') / 1000
					const h = qty(v, 'height') / 1000
					const l = qty(v, 'length') / 1000
					const s = qty(v, 'shift') / 1000
					const s1 = qty(v, 'shift1') / 1000
					return (
						2 *
						(h * Math.sqrt(l * l + s1 * s1) +
							w * Math.sqrt(l * l + s * s) +
							0.1 * (w + h))
					)
				},
			},
		],
	},
	{
		id: 'hood',
		label: 'Вытяжные зонты',
		variants: [
			{
				id: 'canopy_sharp',
				label: 'Зонт остроугольный',
				diagram: 'hood',
				image: 'canopy_sharp_correction',
				fields: [
					f('width', 'Низ A'),
					f('height', 'Низ B'),
					f('width1', 'Верх A1'),
					f('height1', 'Верх B1'),
					f('shift', 'Высота H'),
				],
				area: v => {
					const w = qty(v, 'width') / 1000
					const h = qty(v, 'height') / 1000
					const w1 = qty(v, 'width1') / 1000
					const h1 = qty(v, 'height1') / 1000
					const s = qty(v, 'shift') / 1000
					const sa = Math.sqrt(((h - h1) / 2) * ((h - h1) / 2) + s * s)
					const sb = Math.sqrt(((w - w1) / 2) * ((w - w1) / 2) + s * s)
					return 2 * ((w + w1) / 2) * sa + 2 * ((h + h1) / 2) * sb + w1 * h1
				},
			},
			{
				id: 'canopy_blunt',
				label: 'Зонт тупоугольный',
				diagram: 'hood',
				image: 'canopy_blunt_correction',
				fields: [
					f('width', 'Ширина A'),
					f('height', 'Высота B'),
					f('board', 'Полка C1'),
					f('length', 'Длина L'),
				],
				area: v => {
					const w = qty(v, 'width') / 1000
					const h = qty(v, 'height') / 1000
					const board = qty(v, 'board') / 1000
					const l = qty(v, 'length') / 1000
					return (
						h * (w + board) +
						l * Math.sqrt((w - board) * (w - board) + h * h) +
						l * h +
						l * board
					)
				},
			},
		],
	},
]

// Карта схем-картинок: имя файла -> URL (бандлится Vite).
const imageModules = import.meta.glob('../assets/calculator/*.png', {
	eager: true,
	query: '?url',
	import: 'default',
}) as Record<string, string>

export const getVariantImage = (image?: string): string | undefined => {
	if (!image) return undefined
	const entry = Object.entries(imageModules).find(([path]) =>
		path.endsWith(`/${image}.png`)
	)
	return entry?.[1]
}

// Локализация подписей калькулятора: данные CALC_CATEGORIES остаются на русском
// (чтобы не трогать формулы), а тексты переводятся на лету по словарю русский→{en,uz}.
const CALC_I18N: Record<string, { en: string; uz: string }> = {
	// Категории
	'Прямой участок': { en: 'Straight duct', uz: 'To‘g‘ri qism' },
	Отвод: { en: 'Elbow', uz: 'Otvod' },
	Переход: { en: 'Transition', uz: 'O‘tish' },
	Врезка: { en: 'Tap-in', uz: 'Vrezka' },
	Тройник: { en: 'Tee', uz: 'Troynik' },
	Заглушка: { en: 'Cap', uz: 'Zaglushka' },
	Утка: { en: 'Offset', uz: 'Utka' },
	'Вытяжные зонты': { en: 'Exhaust hoods', uz: 'So‘rg‘ich zontlar' },
	// Варианты сечений
	'Круглое сечение': { en: 'Round section', uz: 'Doiraviy kesim' },
	'Прямоугольное сечение': { en: 'Rectangular section', uz: 'To‘rtburchak kesim' },
	'Круг → круг': { en: 'Round → round', uz: 'Doira → doira' },
	'Прямоуг. → прямоуг.': { en: 'Rect. → rect.', uz: 'To‘rtb. → to‘rtb.' },
	'Круг → прямоуг.': { en: 'Round → rect.', uz: 'Doira → to‘rtb.' },
	'Прямая, круглая': { en: 'Straight, round', uz: 'To‘g‘ri, doiraviy' },
	'Прямая, прямоугольная': { en: 'Straight, rectangular', uz: 'To‘g‘ri, to‘rtburchak' },
	'С воротником, круглая': { en: 'With collar, round', uz: 'Manjetli, doiraviy' },
	'С воротником, прямоугольная': {
		en: 'With collar, rectangular',
		uz: 'Manjetli, to‘rtburchak',
	},
	'Круг + круглый отвод': { en: 'Round + round branch', uz: 'Doira + doiraviy tarmoq' },
	'Круг + прямоуг. врезка': { en: 'Round + rect. tap', uz: 'Doira + to‘rtb. vrezka' },
	'Прямоуг. + круглый отвод': {
		en: 'Rect. + round branch',
		uz: 'To‘rtb. + doiraviy tarmoq',
	},
	'Прямоуг. + прямоуг. отвод': {
		en: 'Rect. + rect. branch',
		uz: 'To‘rtb. + to‘rtb. tarmoq',
	},
	Круглая: { en: 'Round', uz: 'Doiraviy' },
	Прямоугольная: { en: 'Rectangular', uz: 'To‘rtburchak' },
	'Одно смещение': { en: 'Single offset', uz: 'Bitta siljish' },
	'Два смещения': { en: 'Double offset', uz: 'Ikkita siljish' },
	'Зонт остроугольный': { en: 'Sharp-angle hood', uz: 'O‘tkir burchakli zont' },
	'Зонт тупоугольный': { en: 'Obtuse-angle hood', uz: 'O‘tmas burchakli zont' },
	// Поля
	'Длина L': { en: 'Length L', uz: 'Uzunlik L' },
	'Диаметр D': { en: 'Diameter D', uz: 'Diametr D' },
	'Ширина A': { en: 'Width A', uz: 'Kenglik A' },
	'Высота B': { en: 'Height B', uz: 'Balandlik B' },
	'Угол α': { en: 'Angle α', uz: 'Burchak α' },
	'Диаметр D1': { en: 'Diameter D1', uz: 'Diametr D1' },
	'Ширина A1': { en: 'Width A1', uz: 'Kenglik A1' },
	'Высота B1': { en: 'Height B1', uz: 'Balandlik B1' },
	'Диаметр воротника D': { en: 'Collar diameter D', uz: 'Manjet diametri D' },
	'Диаметр врезки d': { en: 'Tap diameter d', uz: 'Vrezka diametri d' },
	'Длина воротника l1': { en: 'Collar length l1', uz: 'Manjet uzunligi l1' },
	'Магистраль D': { en: 'Main duct D', uz: 'Magistral D' },
	'Ответвление D1': { en: 'Branch D1', uz: 'Tarmoq D1' },
	'Длина L1': { en: 'Length L1', uz: 'Uzunlik L1' },
	'Ширина врезки A': { en: 'Tap width A', uz: 'Vrezka kengligi A' },
	'Высота врезки B': { en: 'Tap height B', uz: 'Vrezka balandligi B' },
	'Длина врезки L1': { en: 'Tap length L1', uz: 'Vrezka uzunligi L1' },
	'Магистраль A': { en: 'Main duct A', uz: 'Magistral A' },
	'Магистраль B': { en: 'Main duct B', uz: 'Magistral B' },
	'Ответвление D': { en: 'Branch D', uz: 'Tarmoq D' },
	'Ответвление A1': { en: 'Branch A1', uz: 'Tarmoq A1' },
	'Ответвление B1': { en: 'Branch B1', uz: 'Tarmoq B1' },
	'Сдвиг H': { en: 'Offset H', uz: 'Siljish H' },
	'Сдвиг H1': { en: 'Offset H1', uz: 'Siljish H1' },
	'Низ A': { en: 'Bottom A', uz: 'Past A' },
	'Низ B': { en: 'Bottom B', uz: 'Past B' },
	'Верх A1': { en: 'Top A1', uz: 'Tepa A1' },
	'Верх B1': { en: 'Top B1', uz: 'Tepa B1' },
	'Высота H': { en: 'Height H', uz: 'Balandlik H' },
	'Полка C1': { en: 'Flange C1', uz: 'Polka C1' },
	// Единицы измерения
	мм: { en: 'mm', uz: 'mm' },
	м: { en: 'm', uz: 'm' },
	// Примечания
	'Приближённый расчёт развёртки.': {
		en: 'Approximate development area.',
		uz: 'Yoyilma taxminan hisoblanadi.',
	},
	// Подпись на схеме
	магистраль: { en: 'main', uz: 'magistral' },
}

/** Перевод подписи калькулятора. Русский — как есть; для en/uz — по словарю. */
export const tCalc = (text: string | undefined, lang: Lang): string => {
	if (!text) return ''
	if (lang === 'ru') return text
	return CALC_I18N[text]?.[lang] ?? text
}
