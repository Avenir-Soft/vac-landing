import {
	ArrowDown,
	ArrowLeft,
	ArrowRight,
	ArrowUp,
	ChevronDown,
	ExternalLink,
	FileUp,
	Plus,
	Trash2,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { Lang } from '../i18n/language'
import type { PriceDoc, PricesContent } from '../lib/siteContent'
import { saveContent, uploadFile } from './api'
import { renderPdfPages } from './media'
import SaveBar from './SaveBar'
import {
	Button,
	Card,
	Field,
	IconButton,
	Notice,
	Progress,
	inputClass,
} from './ui'
import { errorText, move } from './utils'

type Props = {
	initial: PricesContent
	onDirtyChange: (dirty: boolean) => void
}

const LANGS: { id: Lang; label: string }[] = [
	{ id: 'ru', label: 'Русский' },
	{ id: 'en', label: 'English' },
	{ id: 'uz', label: 'O‘zbekcha' },
]

const emptyDoc = (): PriceDoc => ({
	id: `price-${Date.now().toString(36)}`,
	title: { ru: '', en: '', uz: '' },
	description: { ru: '', en: '', uz: '' },
	badge: `PDF · ${new Date().getFullYear()}`,
	pdf: '',
	pages: [],
	downloadName: '',
})

const validate = (docs: PriceDoc[]): string | null => {
	for (const [i, doc] of docs.entries()) {
		const name = doc.title.ru.trim() || `№${i + 1}`
		if (!doc.title.ru.trim()) return `Прайс ${name}: заполните название на русском.`
		if (!doc.pdf) return `Прайс «${name}»: загрузите PDF-файл.`
		if (!doc.pages.length) return `Прайс «${name}»: нет ни одной страницы для показа.`
	}
	return null
}

type DocEditorProps = {
	doc: PriceDoc
	index: number
	count: number
	savedPages: Set<string>
	expanded: boolean
	busy: boolean
	onToggle: () => void
	onChange: (doc: PriceDoc) => void
	onMove: (to: number) => void
	onRemove: () => void
	onReplacePdf: (file: File) => void
}

const DocEditor = ({
	doc,
	index,
	count,
	savedPages,
	expanded,
	busy,
	onToggle,
	onChange,
	onMove,
	onRemove,
	onReplacePdf,
}: DocEditorProps) => {
	const pdfInput = useRef<HTMLInputElement>(null)
	const setText = (field: 'title' | 'description', lang: Lang, value: string) =>
		onChange({ ...doc, [field]: { ...doc[field], [lang]: value } })

	return (
		<Card className='!p-0'>
			<div className='flex items-center gap-3 p-4'>
				<button
					type='button'
					onClick={onToggle}
					className='flex min-w-0 flex-1 items-center gap-3 text-left'
				>
					<ChevronDown
						size={20}
						className={`shrink-0 text-slate-400 transition-transform ${expanded ? 'rotate-180' : ''}`}
					/>
					<span className='min-w-0'>
						<span className='block truncate font-semibold text-white'>
							{doc.title.ru || 'Новый прайс-лист'}
						</span>
						<span className='text-xs text-slate-400'>
							{doc.pdf ? `${doc.pages.length} стр.` : 'PDF не загружен'}
						</span>
					</span>
				</button>
				<div className='flex shrink-0 gap-1'>
					<Button variant='ghost' className='!px-2' title='Выше' onClick={() => onMove(index - 1)} disabled={index === 0}>
						<ArrowUp size={16} />
					</Button>
					<Button variant='ghost' className='!px-2' title='Ниже' onClick={() => onMove(index + 1)} disabled={index === count - 1}>
						<ArrowDown size={16} />
					</Button>
					<Button variant='ghost' className='!px-2 hover:!text-rose-300' title='Удалить прайс' onClick={onRemove}>
						<Trash2 size={16} />
					</Button>
				</div>
			</div>

			{expanded ? (
				<div className='space-y-6 border-t border-white/8 p-5'>
					<div className='rounded-xl border border-sky-400/20 bg-sky-500/[0.06] p-4'>
						<div className='flex flex-wrap items-center justify-between gap-3'>
							<div>
								<p className='font-semibold text-white'>PDF-файл прайса</p>
								<p className='text-sm text-slate-400'>
									Загрузите новый PDF — страницы для сайта нарежутся сами.
								</p>
							</div>
							<div className='flex flex-wrap gap-2'>
								{doc.pdf ? (
									<a
										href={doc.pdf}
										target='_blank'
										rel='noreferrer'
										className='inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-slate-300 hover:bg-white/8 hover:text-white'
									>
										<ExternalLink size={16} />
										Открыть текущий
									</a>
								) : null}
								<Button variant='primary' onClick={() => pdfInput.current?.click()} disabled={busy}>
									<FileUp size={16} />
									{doc.pdf ? 'Заменить PDF' : 'Загрузить PDF'}
								</Button>
							</div>
						</div>
						<input
							ref={pdfInput}
							type='file'
							accept='application/pdf,.pdf'
							hidden
							onChange={e => {
								const file = e.target.files?.[0]
								if (file) onReplacePdf(file)
								e.target.value = ''
							}}
						/>
					</div>

					<div className='grid gap-4 md:grid-cols-3'>
						{LANGS.map(lang => (
							<div key={lang.id} className='space-y-3'>
								<p className='text-sm font-bold text-sky-300'>{lang.label}</p>
								<Field
									label='Название'
									hint={lang.id === 'ru' ? undefined : 'Пусто — покажется русское'}
								>
									<input
										className={inputClass}
										value={doc.title[lang.id]}
										onChange={e => setText('title', lang.id, e.target.value)}
									/>
								</Field>
								<Field label='Описание'>
									<textarea
										rows={3}
										className={inputClass}
										value={doc.description[lang.id]}
										onChange={e => setText('description', lang.id, e.target.value)}
									/>
								</Field>
							</div>
						))}
					</div>

					<div className='grid gap-4 md:grid-cols-2'>
						<Field label='Метка' hint='Маленькая плашка над описанием, например «PDF · 2026»'>
							<input
								className={inputClass}
								value={doc.badge}
								onChange={e => onChange({ ...doc, badge: e.target.value })}
							/>
						</Field>
						<Field label='Имя файла при скачивании'>
							<input
								className={inputClass}
								value={doc.downloadName}
								onChange={e => onChange({ ...doc, downloadName: e.target.value })}
							/>
						</Field>
					</div>

					<div>
						<p className='mb-1 font-semibold text-white'>
							Страницы на сайте · {doc.pages.length}
						</p>
						<p className='mb-3 text-sm text-slate-400'>
							Так прайс выглядит на странице «Прайс-лист». Лишнюю страницу можно
							убрать — PDF для скачивания при этом не меняется.
						</p>
						<div className='grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6'>
							{doc.pages.map((page, i) => (
								<div
									key={page}
									className={`relative overflow-hidden rounded-lg border bg-white ${
										savedPages.has(page) ? 'border-white/10' : 'border-emerald-400'
									}`}
								>
									<a href={page} target='_blank' rel='noreferrer'>
										<img
											src={page}
											alt={`Страница ${i + 1}`}
											loading='lazy'
											className='aspect-[1/1.414] w-full object-cover object-top'
										/>
									</a>
									<span className='absolute left-1.5 top-1.5 rounded bg-slate-950/75 px-1.5 text-xs font-bold tabular-nums text-white'>
										{i + 1}
									</span>
									<div className='absolute inset-x-0 bottom-0 flex justify-between bg-gradient-to-t from-slate-950/80 to-transparent p-1.5 pt-5'>
										<div className='flex gap-1'>
											<IconButton
												title='Раньше'
												className='!h-7 !w-7'
												onClick={() => onChange({ ...doc, pages: move(doc.pages, i, i - 1) })}
												disabled={i === 0}
											>
												<ArrowLeft size={14} />
											</IconButton>
											<IconButton
												title='Позже'
												className='!h-7 !w-7'
												onClick={() => onChange({ ...doc, pages: move(doc.pages, i, i + 1) })}
												disabled={i === doc.pages.length - 1}
											>
												<ArrowRight size={14} />
											</IconButton>
										</div>
										<IconButton
											title='Убрать страницу'
											className='!h-7 !w-7 hover:!bg-rose-600'
											onClick={() =>
												onChange({ ...doc, pages: doc.pages.filter((_, j) => j !== i) })
											}
										>
											<Trash2 size={14} />
										</IconButton>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			) : null}
		</Card>
	)
}

const PricesEditor = ({ initial, onDirtyChange }: Props) => {
	const [saved, setSaved] = useState(initial.docs)
	const [docs, setDocs] = useState(initial.docs)
	const [expanded, setExpanded] = useState<string | null>(initial.docs[0]?.id ?? null)
	const [progress, setProgress] = useState<{ label: string; value: number } | null>(null)
	const [saving, setSaving] = useState(false)
	const [notice, setNotice] = useState<{ tone: 'error' | 'success'; text: string } | null>(null)

	const dirty = JSON.stringify(docs) !== JSON.stringify(saved)
	useEffect(() => onDirtyChange(dirty), [dirty, onDirtyChange])

	const savedPages = new Set(saved.flatMap(doc => doc.pages))

	const updateDoc = (id: string, update: (doc: PriceDoc) => PriceDoc) =>
		setDocs(list => list.map(doc => (doc.id === id ? update(doc) : doc)))

	const replacePdf = async (id: string, file: File) => {
		setNotice(null)
		try {
			// Сначала рендерим: если PDF битый, ничего не загружаем.
			setProgress({ label: 'Нарезаю PDF на страницы…', value: 0 })
			const pages = await renderPdfPages(file, (done, total) =>
				setProgress({ label: `Нарезаю PDF: страница ${done} из ${total}`, value: done / total }),
			)

			const pdfLabel = `Загружаю PDF (${(file.size / 1024 / 1024).toFixed(1)} МБ)`
			setProgress({ label: pdfLabel, value: 0 })
			const pdfUrl = await uploadFile(file, 'prices', value =>
				setProgress({ label: pdfLabel, value }),
			)

			const pageUrls: string[] = []
			for (const [i, page] of pages.entries()) {
				const label = `Загружаю страницы: ${i + 1} из ${pages.length}`
				pageUrls.push(
					await uploadFile(page, 'prices', fraction =>
						setProgress({ label, value: (i + fraction) / pages.length }),
					),
				)
			}

			updateDoc(id, doc => ({
				...doc,
				pdf: pdfUrl,
				pages: pageUrls,
				downloadName: doc.downloadName || file.name,
			}))
			setNotice({
				tone: 'success',
				text: `PDF загружен: ${pages.length} стр. Проверьте страницы и нажмите «Сохранить на сайте».`,
			})
		} catch (error) {
			setNotice({ tone: 'error', text: `Не удалось обработать PDF: ${errorText(error)}` })
		} finally {
			setProgress(null)
		}
	}

	const save = async () => {
		const problem = validate(docs)
		if (problem) {
			setNotice({ tone: 'error', text: problem })
			return
		}
		setSaving(true)
		setNotice(null)
		try {
			await saveContent('prices', { docs })
			setSaved(docs)
			setNotice({ tone: 'success', text: 'Прайс-листы сохранены и уже видны на сайте.' })
		} catch (error) {
			setNotice({ tone: 'error', text: errorText(error) })
		} finally {
			setSaving(false)
		}
	}

	const addDoc = () => {
		const doc = emptyDoc()
		setDocs(list => [...list, doc])
		setExpanded(doc.id)
	}

	return (
		<div>
			<SaveBar
				title={`Прайс-листы · ${docs.length}`}
				dirty={dirty}
				busy={progress !== null}
				saving={saving}
				onSave={save}
				onReset={() => setDocs(saved)}
			/>

			<div className='space-y-4'>
				{progress ? <Progress label={progress.label} value={progress.value} /> : null}
				{notice ? <Notice tone={notice.tone}>{notice.text}</Notice> : null}

				{docs.map((doc, index) => (
					<DocEditor
						key={doc.id}
						doc={doc}
						index={index}
						count={docs.length}
						savedPages={savedPages}
						expanded={expanded === doc.id}
						busy={progress !== null}
						onToggle={() => setExpanded(expanded === doc.id ? null : doc.id)}
						onChange={next => updateDoc(doc.id, () => next)}
						onMove={to => setDocs(list => move(list, index, to))}
						onRemove={() => {
							if (window.confirm(`Удалить прайс «${doc.title.ru || 'без названия'}» с сайта?`))
								setDocs(list => list.filter(d => d.id !== doc.id))
						}}
						onReplacePdf={file => replacePdf(doc.id, file)}
					/>
				))}

				<Button onClick={addDoc} disabled={progress !== null}>
					<Plus size={16} />
					Добавить прайс-лист
				</Button>
			</div>
		</div>
	)
}

export default PricesEditor
