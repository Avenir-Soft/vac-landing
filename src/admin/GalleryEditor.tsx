import {
	ArrowLeft,
	ArrowRight,
	ArrowUpToLine,
	ImagePlus,
	Trash2,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { GalleryContent } from '../lib/siteContent'
import { saveContent, uploadFile } from './api'
import { prepareGalleryPhoto } from './media'
import SaveBar from './SaveBar'
import { IconButton, Notice, Progress } from './ui'
import { errorText, move } from './utils'

type Props = {
	initial: GalleryContent
	onDirtyChange: (dirty: boolean) => void
}

const GalleryEditor = ({ initial, onDirtyChange }: Props) => {
	const [saved, setSaved] = useState(initial.photos)
	const [photos, setPhotos] = useState(initial.photos)
	const [upload, setUpload] = useState<{ label: string; value: number } | null>(null)
	const [saving, setSaving] = useState(false)
	const [notice, setNotice] = useState<{ tone: 'error' | 'success'; text: string } | null>(null)
	const [dragFrom, setDragFrom] = useState<number | null>(null)
	const [dropActive, setDropActive] = useState(false)
	const fileInput = useRef<HTMLInputElement>(null)

	const dirty = JSON.stringify(photos) !== JSON.stringify(saved)
	useEffect(() => onDirtyChange(dirty), [dirty, onDirtyChange])

	const addFiles = async (fileList: FileList | File[]) => {
		const files = Array.from(fileList).filter(f => f.type.startsWith('image/'))
		if (!files.length || upload) return
		setNotice(null)
		const added: string[] = []
		try {
			for (const [i, file] of files.entries()) {
				const label = `Фото ${i + 1} из ${files.length}: ${file.name}`
				setUpload({ label, value: i / files.length })
				const blob = await prepareGalleryPhoto(file)
				const url = await uploadFile(blob, 'gallery', fraction =>
					setUpload({ label, value: (i + fraction) / files.length }),
				)
				added.push(url)
				setPhotos(list => [...list, url])
			}
			setNotice({
				tone: 'success',
				text: `Добавлено фото: ${added.length}. Не забудьте нажать «Сохранить на сайте».`,
			})
		} catch (error) {
			setNotice({
				tone: 'error',
				text: `Загружено ${added.length} из ${files.length}. Ошибка: ${errorText(error)}`,
			})
		} finally {
			setUpload(null)
		}
	}

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
					onDragOver={e => {
						if (!e.dataTransfer.types.includes('Files')) return
						e.preventDefault()
						setDropActive(true)
					}}
					onDragLeave={() => setDropActive(false)}
					onDrop={e => {
						if (!e.dataTransfer.files.length) return
						e.preventDefault()
						setDropActive(false)
						addFiles(e.dataTransfer.files)
					}}
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
						Нажмите или перетащите сюда файлы. Можно сразу несколько — они сожмутся
						автоматически.
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

				<p className='text-sm text-slate-400'>
					Порядок здесь = порядок на сайте. Перетаскивайте фото мышкой или
					двигайте стрелками.
				</p>

				<div className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
					{photos.map((src, index) => (
						<div
							key={src}
							draggable
							onDragStart={e => {
								setDragFrom(index)
								e.dataTransfer.effectAllowed = 'move'
							}}
							onDragEnd={() => setDragFrom(null)}
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
								<IconButton
									title='Удалить'
									onClick={() => remove(index)}
									className='hover:!bg-rose-600'
								>
									<Trash2 size={15} />
								</IconButton>
							</div>
						</div>
					))}
				</div>

				{photos.length === 0 ? (
					<p className='py-10 text-center text-slate-500'>В галерее нет фото.</p>
				) : null}
			</div>
		</div>
	)
}

export default GalleryEditor
