import {
	ArrowLeft,
	ArrowRight,
	ArrowUpToLine,
	Download,
	ImagePlus,
	Trash2,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { GalleryContent } from '../lib/siteContent'
import { AuthError, saveContent, uploadFile } from './api'
import { prepareGalleryPhoto } from './media'
import SaveBar from './SaveBar'
import { useFileDrag } from './useFileDrag'
import { IconButton, Notice, Progress } from './ui'
import { errorText, move } from './utils'

type Props = {
	initial: GalleryContent
	/** Вкладка открыта — только тогда ловим файлы, брошенные на страницу. */
	active: boolean
	onDirtyChange: (dirty: boolean) => void
}

type Failure = { name: string; reason: string }

const IMAGE_EXT = /\.(jpe?g|png|webp|gif|bmp|avif|hei[cf])$/i
// HEIC с телефона Windows часто отдаёт с пустым type — проверяем и расширение.
const isImage = (file: File) => file.type.startsWith('image/') || IMAGE_EXT.test(file.name)

// Небольшая пауза между файлами — чтобы защита хостинга не приняла пачку
// загрузок за атаку.
const PAUSE_BETWEEN_FILES = 150

const GalleryEditor = ({ initial, active, onDirtyChange }: Props) => {
	const [saved, setSaved] = useState(initial.photos)
	const [photos, setPhotos] = useState(initial.photos)
	const [upload, setUpload] = useState<{ label: string; value: number } | null>(null)
	const [saving, setSaving] = useState(false)
	const [notice, setNotice] = useState<{ tone: 'error' | 'success'; text: string } | null>(null)
	const [dragFrom, setDragFrom] = useState<number | null>(null)
	const [trashHover, setTrashHover] = useState(false)
	const [failures, setFailures] = useState<Failure[]>([])
	const fileInput = useRef<HTMLInputElement>(null)

	const dirty = JSON.stringify(photos) !== JSON.stringify(saved)
	useEffect(() => onDirtyChange(dirty), [dirty, onDirtyChange])

	// Одно неудачное фото не обрывает пачку: остальные грузятся дальше,
	// в конце показываем список того, что не получилось.
	const addFiles = async (fileList: FileList | File[]) => {
		if (upload) {
			setNotice({ tone: 'error', text: 'Дождитесь окончания текущей загрузки.' })
			return
		}
		const all = Array.from(fileList)
		const files = all.filter(isImage)
		const skipped: Failure[] = all
			.filter(f => !isImage(f))
			.map(f => ({ name: f.name, reason: 'это не изображение' }))
		if (!files.length) {
			setFailures(skipped)
			setNotice({ tone: 'error', text: 'Среди файлов нет фотографий.' })
			return
		}
		setNotice(null)
		setFailures([])
		const failed: Failure[] = [...skipped]
		let added = 0
		for (const [i, file] of files.entries()) {
			const label = `Фото ${i + 1} из ${files.length}: ${file.name}`
			setUpload({ label, value: i / files.length })
			try {
				const blob = await prepareGalleryPhoto(file)
				const url = await uploadFile(blob, 'gallery', fraction =>
					setUpload({ label, value: (i + fraction) / files.length }),
				)
				added++
				setPhotos(list => [...list, url])
			} catch (error) {
				if (error instanceof AuthError) {
					// Без входа остальные тоже не загрузятся — останавливаемся.
					files.slice(i).forEach(f =>
						failed.push({ name: f.name, reason: 'сессия истекла — войдите и добавьте снова' }),
					)
					break
				}
				failed.push({ name: file.name, reason: errorText(error) })
			}
			if (i < files.length - 1) await new Promise(r => setTimeout(r, PAUSE_BETWEEN_FILES))
		}
		setUpload(null)
		setFailures(failed)
		setNotice(
			failed.length
				? {
						tone: 'error',
						text: `Добавлено ${added} из ${files.length + skipped.length}. Не загрузились — список ниже.${added ? ' Добавленные сохраните кнопкой «Сохранить на сайте».' : ''}`,
					}
				: {
						tone: 'success',
						text: `Добавлено фото: ${added}. Не забудьте нажать «Сохранить на сайте».`,
					},
		)
	}

	// Файлы можно бросить в любое место страницы, не только в рамку.
	const dropActive = useFileDrag(active, addFiles)

	const save = async () => {
		setSaving(true)
		setNotice(null)
		try {
			await saveContent('gallery', { photos })
			setSaved(photos)
			setNotice({ tone: 'success', text: 'Галерея сохранена и уже видна на сайте.' })
		} catch (error) {
			setNotice({ tone: 'error', text: errorText(error) })
		} finally {
			setSaving(false)
		}
	}

	const remove = (index: number) => {
		if (!window.confirm(`Убрать фото №${index + 1} из галереи?`)) return
		setPhotos(list => list.filter((_, i) => i !== index))
	}

	return (
		<div>
			<SaveBar
				title={`Фото галерея · ${photos.length} фото`}
				dirty={dirty}
				busy={upload !== null}
				saving={saving}
				onSave={save}
				onReset={() => setPhotos(saved)}
			/>

			<div className='space-y-4'>
				<button
					type='button'
					onClick={() => fileInput.current?.click()}
					disabled={upload !== null}
					className={`flex w-full flex-col items-center gap-2 rounded-2xl border-2 border-dashed px-6 py-8 text-center transition ${
						dropActive
							? 'border-sky-400 bg-sky-500/10'
							: 'border-white/15 bg-white/[0.03] hover:border-sky-400/60 hover:bg-white/[0.05]'
					}`}
				>
					<ImagePlus size={30} className='text-sky-400' />
					<span className='font-semibold text-white'>Добавить фото</span>
					<span className='text-sm text-slate-400'>
						Нажмите или перетащите файлы в любое место страницы. Можно сразу
						много — они сожмутся автоматически.
					</span>
				</button>
				<input
					ref={fileInput}
					type='file'
					accept='image/*'
					multiple
					hidden
					onChange={e => {
						if (e.target.files) addFiles(e.target.files)
						e.target.value = ''
					}}
				/>

				{upload ? <Progress label={upload.label} value={upload.value} /> : null}
				{notice ? <Notice tone={notice.tone}>{notice.text}</Notice> : null}
				{failures.length ? (
					<ul className='max-h-48 space-y-1 overflow-y-auto rounded-xl border border-rose-400/20 bg-rose-500/[0.06] p-3 text-sm'>
						{failures.map((f, i) => (
							<li key={i} className='text-rose-100'>
								<span className='font-semibold'>{f.name}</span>
								<span className='text-rose-200/70'> — {f.reason}</span>
							</li>
						))}
					</ul>
				) : null}

				<p className='text-sm text-slate-400'>
					Порядок здесь = порядок на сайте. Перетаскивайте фото мышкой или
					двигайте стрелками. Чтобы удалить — перетащите фото в корзину внизу.
				</p>

				<div className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
					{photos.map((src, index) => (
						<div
							key={src}
							draggable
							onDragStart={e => {
								setDragFrom(index)
								e.dataTransfer.effectAllowed = 'move'
								// Firefox не начинает перетаскивание без данных.
								e.dataTransfer.setData('text/plain', src)
							}}
							onDragEnd={() => {
								setDragFrom(null)
								setTrashHover(false)
							}}
							onDragOver={e => {
								if (dragFrom === null) return
								e.preventDefault()
								if (dragFrom !== index) {
									setPhotos(list => move(list, dragFrom, index))
									setDragFrom(index)
								}
							}}
							className={`group relative overflow-hidden rounded-xl border bg-[#1d1f23] ${
								dragFrom === index
									? 'border-sky-400 opacity-60'
									: saved.includes(src)
										? 'border-white/8'
										: 'border-emerald-400/60'
							} cursor-grab active:cursor-grabbing`}
						>
							<img
								src={src}
								alt={`Фото ${index + 1}`}
								loading='lazy'
								draggable={false}
								className='aspect-[4/3] w-full object-cover'
							/>
							<span className='absolute left-2 top-2 rounded-md bg-slate-950/75 px-2 py-0.5 text-xs font-bold tabular-nums text-white'>
								{index + 1}
							</span>
							{!saved.includes(src) ? (
								<span className='absolute right-2 top-2 rounded-md bg-emerald-500 px-2 py-0.5 text-[11px] font-bold text-white'>
									новое
								</span>
							) : null}
							<div className='absolute inset-x-0 bottom-0 flex justify-between gap-1 bg-gradient-to-t from-slate-950/80 to-transparent p-2 pt-6'>
								<div className='flex gap-1'>
									<IconButton
										title='В начало'
										onClick={() => setPhotos(list => move(list, index, 0))}
										disabled={index === 0}
									>
										<ArrowUpToLine size={15} />
									</IconButton>
									<IconButton
										title='Левее'
										onClick={() => setPhotos(list => move(list, index, index - 1))}
										disabled={index === 0}
									>
										<ArrowLeft size={15} />
									</IconButton>
									<IconButton
										title='Правее'
										onClick={() => setPhotos(list => move(list, index, index + 1))}
										disabled={index === photos.length - 1}
									>
										<ArrowRight size={15} />
									</IconButton>
								</div>
								<div className='flex gap-1'>
									<a
										href={src}
										download
										title='Скачать'
										draggable={false}
										className='flex h-8 w-8 items-center justify-center rounded-lg bg-slate-950/70 text-white backdrop-blur transition hover:bg-slate-950'
									>
										<Download size={15} />
									</a>
									<IconButton
										title='Удалить'
										onClick={() => remove(index)}
										className='hover:!bg-rose-600'
									>
										<Trash2 size={15} />
									</IconButton>
								</div>
							</div>
						</div>
					))}
				</div>

				{photos.length === 0 ? (
					<p className='py-10 text-center text-slate-500'>В галерее нет фото.</p>
				) : null}
			</div>

			{dropActive ? (
				<div className='pointer-events-none fixed inset-3 z-40 flex items-center justify-center rounded-3xl border-4 border-dashed border-sky-400 bg-sky-500/15 backdrop-blur-[2px]'>
					<div className='flex flex-col items-center gap-3 rounded-2xl bg-[#1d1f23]/90 px-8 py-6 text-center'>
						<ImagePlus size={40} className='text-sky-400' />
						<span className='text-lg font-bold text-white'>Отпустите, чтобы добавить фото</span>
					</div>
				</div>
			) : null}

			{dragFrom !== null ? (
				<div
					onDragOver={e => {
						e.preventDefault()
						e.dataTransfer.dropEffect = 'move'
						setTrashHover(true)
					}}
					onDragLeave={() => setTrashHover(false)}
					onDrop={e => {
						e.preventDefault()
						const index = dragFrom
						setDragFrom(null)
						setTrashHover(false)
						setPhotos(list => list.filter((_, i) => i !== index))
					}}
					className={`fixed bottom-6 left-1/2 z-40 flex w-[min(90vw,420px)] -translate-x-1/2 items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-5 font-semibold shadow-2xl transition ${
						trashHover
							? 'scale-105 border-rose-400 bg-rose-600 text-white'
							: 'border-rose-400/60 bg-[#2b1f23]/95 text-rose-200'
					}`}
				>
					<Trash2 size={22} />
					Перетащите сюда, чтобы удалить
				</div>
			) : null}
		</div>
	)
}

export default GalleryEditor
