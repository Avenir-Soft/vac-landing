import { ArrowDown, ArrowUp, Plus, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { PriceTickerView } from '../components/PriceTicker'
import type { Lang } from '../i18n/language'
import type { TickerContent, TickerItem, TickerTrend } from '../lib/siteContent'
import { saveContent } from './api'
import SaveBar from './SaveBar'
import { Button, Card, Field, Notice, inputClass } from './ui'
import { errorText, move } from './utils'

type Props = {
	initial: TickerContent
	onDirtyChange: (dirty: boolean) => void
}

const LANGS: { id: Lang; label: string }[] = [
	{ id: 'ru', label: 'RU' },
	{ id: 'en', label: 'EN' },
	{ id: 'uz', label: 'UZ' },
]

const TRENDS: { id: TickerTrend; label: string }[] = [
	{ id: 'none', label: 'Без стрелки' },
	{ id: 'down', label: '▼ Подешевело' },
	{ id: 'up', label: '▲ Подорожало' },
]

const emptyItem = (): TickerItem => ({
	id: `item-${Date.now().toString(36)}`,
	name: { ru: '', en: '', uz: '' },
	price: 0,
	unit: { ru: '', en: '', uz: '' },
	trend: 'none',
})

const validate = (items: TickerItem[]): string | null => {
	for (const [i, item] of items.entries()) {
		if (!item.name.ru.trim()) return `Позиция №${i + 1}: заполните название на русском.`
		if (!Number.isFinite(item.price) || item.price <= 0)
			return `«${item.name.ru}»: укажите цену больше нуля.`
	}
	return null
}

const ItemEditor = ({
	item,
	index,
	count,
	onChange,
	onMove,
	onRemove,
}: {
	item: TickerItem
	index: number
	count: number
	onChange: (item: TickerItem) => void
	onMove: (to: number) => void
	onRemove: () => void
}) => {
	const setText = (field: 'name' | 'unit', lang: Lang, value: string) =>
		onChange({ ...item, [field]: { ...item[field], [lang]: value } })

	return (
		<Card className='space-y-4'>
			<div className='flex items-center justify-between gap-3'>
				<p className='font-semibold text-white'>
					{index + 1}. {item.name.ru || 'Новая позиция'}
				</p>
				<div className='flex shrink-0 gap-1'>
					<Button variant='ghost' className='!px-2' title='Выше' onClick={() => onMove(index - 1)} disabled={index === 0}>
						<ArrowUp size={16} />
					</Button>
					<Button variant='ghost' className='!px-2' title='Ниже' onClick={() => onMove(index + 1)} disabled={index === count - 1}>
						<ArrowDown size={16} />
					</Button>
					<Button variant='ghost' className='!px-2 hover:!text-rose-300' title='Удалить' onClick={onRemove}>
						<Trash2 size={16} />
					</Button>
				</div>
			</div>

			<div className='grid gap-3 md:grid-cols-3'>
				{LANGS.map(({ id, label }) => (
					<Field key={id} label={`Название ${label}`} hint={id === 'ru' ? undefined : 'Пусто — покажется русское'}>
						<input
							className={inputClass}
							value={item.name[id]}
							placeholder={id === 'ru' ? 'Шинорейка 20 мм' : item.name.ru}
							onChange={e => setText('name', id, e.target.value)}
						/>
					</Field>
				))}
			</div>

			<div className='grid gap-3 sm:grid-cols-2 md:grid-cols-[1fr_repeat(3,0.6fr)_1fr]'>
				<Field label='Цена, сум'>
					<input
						type='number'
						min={0}
						step={1}
						inputMode='numeric'
						className={inputClass}
						value={item.price || ''}
						placeholder='1000'
						onChange={e => onChange({ ...item, price: Math.max(0, Math.round(Number(e.target.value) || 0)) })}
					/>
				</Field>
				{LANGS.map(({ id, label }) => (
					<Field key={id} label={`Ед. ${label}`}>
						<input
							className={inputClass}
							value={item.unit[id]}
							placeholder={id === 'ru' ? 'м, шт…' : item.unit.ru}
							onChange={e => setText('unit', id, e.target.value)}
						/>
					</Field>
				))}
				<Field label='Стрелка'>
					<select
						className={inputClass}
						value={item.trend}
						onChange={e => onChange({ ...item, trend: e.target.value as TickerTrend })}
					>
						{TRENDS.map(trend => (
							<option key={trend.id} value={trend.id}>
								{trend.label}
							</option>
						))}
					</select>
				</Field>
			</div>
		</Card>
	)
}

const TickerEditor = ({ initial, onDirtyChange }: Props) => {
	const [saved, setSaved] = useState(initial)
	const [data, setData] = useState(initial)
	const [saving, setSaving] = useState(false)
	const [notice, setNotice] = useState<{ tone: 'error' | 'success'; text: string } | null>(null)

	const dirty = JSON.stringify(data) !== JSON.stringify(saved)
	useEffect(() => onDirtyChange(dirty), [dirty, onDirtyChange])

	const setItems = (update: (items: TickerItem[]) => TickerItem[]) =>
		setData(d => ({ ...d, items: update(d.items) }))

	const save = async () => {
		const problem = validate(data.items)
		if (problem) {
			setNotice({ tone: 'error', text: problem })
			return
		}
		setSaving(true)
		setNotice(null)
		try {
			await saveContent('ticker', data)
			setSaved(data)
			setNotice({ tone: 'success', text: 'Бегущая строка сохранена и уже видна на сайте.' })
		} catch (error) {
			setNotice({ tone: 'error', text: errorText(error) })
		} finally {
			setSaving(false)
		}
	}

	return (
		<div>
			<SaveBar
				title='Бегущая строка цен'
				dirty={dirty}
				busy={false}
				saving={saving}
				onSave={save}
				onReset={() => setData(saved)}
			/>

			<div className='space-y-5'>
				{notice ? <Notice tone={notice.tone}>{notice.text}</Notice> : null}

				<Card className='space-y-4'>
					<label className='flex cursor-pointer items-center gap-3'>
						<input
							type='checkbox'
							className='h-5 w-5 accent-sky-500'
							checked={data.enabled}
							onChange={e => setData(d => ({ ...d, enabled: e.target.checked }))}
						/>
						<span>
							<span className='block font-semibold text-white'>Показывать на главной</span>
							<span className='text-sm text-slate-400'>
								Строка едет внизу первого экрана, клик по ней открывает прайс-листы.
							</span>
						</span>
					</label>
					<div>
						<p className='mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400'>
							Предпросмотр {data.enabled ? '' : '(сейчас скрыта на сайте)'}
						</p>
						<div className={`overflow-hidden rounded-xl ${data.enabled ? '' : 'opacity-50'}`}>
							{data.items.some(item => item.name.ru.trim()) ? (
								<PriceTickerView data={data} preview />
							) : (
								<p className='rounded-xl border border-dashed border-white/12 p-4 text-sm text-slate-400'>
									Добавьте хотя бы одну позицию.
								</p>
							)}
						</div>
					</div>
				</Card>

				{data.items.map((item, index) => (
					<ItemEditor
						key={item.id}
						item={item}
						index={index}
						count={data.items.length}
						onChange={next => setItems(list => list.map(it => (it.id === item.id ? next : it)))}
						onMove={to => setItems(list => move(list, index, to))}
						onRemove={() => setItems(list => list.filter(it => it.id !== item.id))}
					/>
				))}

				<Button variant='secondary' onClick={() => setItems(list => [...list, emptyItem()])}>
					<Plus size={16} />
					Добавить позицию
				</Button>
			</div>
		</div>
	)
}

export default TickerEditor
