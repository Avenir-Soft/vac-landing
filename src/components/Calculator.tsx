import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useMemo, useState } from 'react'
import {
	CALC_CATEGORIES,
	getVariantImage,
	type CalcCategory,
	type CalcVariant,
} from '../lib/calculator'
import CalculatorSchematic from './CalculatorSchematic'

const formatNumber = (n: number, digits = 2) =>
	n.toLocaleString('ru-RU', {
		minimumFractionDigits: digits,
		maximumFractionDigits: digits,
	})

// Разрешаем вводить только цифры (без стрелок type=number)
const sanitizeDecimal = (s: string) =>
	s.replace(',', '.').replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')
const sanitizeInt = (s: string) => s.replace(/[^0-9]/g, '')

const inputClass =
	'w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-900 outline-none focus:border-sky-400 focus:bg-white dark:border-slate-700 dark:bg-slate-950/60 dark:text-white dark:focus:border-sky-500'

const labelClass =
	'mb-1.5 block text-xs font-semibold text-slate-500 dark:text-slate-400'

// Отдельная карточка под каждый воздуховод (вариант сечения) — со своим расчётом.
const VariantCard = ({
	category,
	variant,
}: {
	category: CalcCategory
	variant: CalcVariant
}) => {
	const [values, setValues] = useState<Record<string, string>>({})
	const [quantity, setQuantity] = useState('1')

	const setField = (key: string, value: string) =>
		setValues(prev => ({ ...prev, [key]: value }))

	const parsed = useMemo(() => {
		const out: Record<string, number> = {}
		for (const fld of variant.fields) out[fld.key] = parseFloat(values[fld.key])
		return out
	}, [values, variant])

	const allFilled = variant.fields.every(
		fld => Number.isFinite(parsed[fld.key]) && parsed[fld.key] > 0
	)

	const qtyNum = Math.max(1, Math.floor(parseFloat(quantity) || 1))
	const areaOne = allFilled ? variant.area(parsed) : 0
	const areaTotal = areaOne * qtyNum

	return (
		<div className='flex flex-col rounded-3xl border border-slate-200 bg-white p-5 md:p-6 dark:border-slate-800 dark:bg-slate-900'>
			{category.variants.length > 1 && (
				<h4 className='mb-4 text-sm font-bold uppercase tracking-wide text-slate-600 dark:text-slate-300'>
					{variant.label}
				</h4>
			)}

			<div className='grid flex-1 items-stretch gap-5 sm:grid-cols-[260px_1fr]'>
				{/* Схема слева */}
				<div className='flex h-full min-h-[240px] items-center justify-center rounded-3xl bg-slate-50 p-3 dark:bg-slate-950/50'>
					{getVariantImage(variant.image) ? (
						<img
							src={getVariantImage(variant.image)}
							alt={`${category.label} — ${variant.label}`}
							className='max-h-full w-full rounded-2xl bg-white object-contain p-2'
							loading='lazy'
						/>
					) : (
						<CalculatorSchematic diagram={variant.diagram} />
					)}
				</div>

				{/* Поля справа — одна колонка */}
				<div className='space-y-4'>
					{variant.fields.map(fld => (
						<div key={fld.key}>
							<label className={labelClass} htmlFor={`f-${variant.id}-${fld.key}`}>
								{fld.label}
								{fld.unit ? `, ${fld.unit}` : ''}
							</label>
							{fld.type === 'select' ? (
								<select
									id={`f-${variant.id}-${fld.key}`}
									value={values[fld.key] ?? ''}
									onChange={e => setField(fld.key, sanitizeDecimal(e.target.value))}
									className={inputClass}
								>
									<option value=''>—</option>
									{fld.options?.map(opt => (
										<option key={opt.value} value={opt.value}>
											{opt.label}
										</option>
									))}
								</select>
							) : (
								<input
									id={`f-${variant.id}-${fld.key}`}
									type='text'
									inputMode='decimal'
									min={0}
									value={values[fld.key] ?? ''}
									onChange={e => setField(fld.key, sanitizeDecimal(e.target.value))}
									placeholder='0'
									className={inputClass}
								/>
							)}
						</div>
					))}

					<div>
						<label className={labelClass} htmlFor={`f-${variant.id}-qty`}>
							Количество, шт
						</label>
						<input
							id={`f-${variant.id}-qty`}
							type='text'
							inputMode='numeric'
							min={1}
							value={quantity}
							onChange={e => setQuantity(sanitizeInt(e.target.value))}
							className={inputClass}
						/>
					</div>
				</div>
			</div>

			{variant.note && (
				<p className='mt-4 text-xs text-slate-400 dark:text-slate-500'>
					* {variant.note}
				</p>
			)}

			{/* Итого */}
			<div className='mt-6 flex flex-wrap items-center gap-x-10 gap-y-2 rounded-3xl bg-[#2c2e33] px-6 py-5 text-white dark:bg-[#1c1d21]'>
				<div>
					<p className='text-xs text-slate-400'>Итого, {qtyNum} шт</p>
					<p className='text-2xl font-bold'>{formatNumber(areaTotal)} м²</p>
				</div>
			</div>
		</div>
	)
}

const Calculator = () => {
	// Все драверы изначально закрыты — пользователь раскрывает нужный сам.
	const [openCat, setOpenCat] = useState<string>('')

	const toggleCat = (cat: CalcCategory) =>
		setOpenCat(prev => (prev === cat.id ? '' : cat.id))

	return (
		<div className='space-y-3'>
			{CALC_CATEGORIES.map(cat => {
				const isOpen = cat.id === openCat
				return (
					<div key={cat.id} className='overflow-hidden rounded-2xl'>
						{/* Полоса категории (стиль wentprom, наши цвета) */}
						<button
							type='button'
							onClick={() => toggleCat(cat)}
							className={`flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors md:px-6 ${
								isOpen
									? 'bg-sky-600 text-white'
									: 'bg-[#2c2e33] text-white hover:bg-[#3a3d44] dark:bg-slate-800 dark:hover:bg-slate-700'
							}`}
						>
							<span className='text-sm font-bold uppercase tracking-wide md:text-base'>
								{cat.label}
							</span>
							<ChevronDown
								size={20}
								className={`shrink-0 transition-transform duration-300 ${
									isOpen ? 'rotate-180' : ''
								}`}
							/>
						</button>

						<AnimatePresence initial={false}>
							{isOpen && (
								<motion.div
									key='drawer'
									initial={{ height: 0, opacity: 0 }}
									animate={{ height: 'auto', opacity: 1 }}
									exit={{ height: 0, opacity: 0 }}
									transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
									className='overflow-hidden'
								>
									<div className='grid items-stretch gap-4 bg-slate-100/70 p-3 md:grid-cols-2 md:p-4 dark:bg-slate-950/40'>
										{cat.variants.map(v => (
											<VariantCard key={v.id} category={cat} variant={v} />
										))}
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				)
			})}
		</div>
	)
}

export default Calculator
