import {
	Check,
	Copy,
	Download,
	Loader2,
	Mail,
	MessageCircle,
	Send,
	Share2,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

type Props = {
	/** Путь к PDF (относительный или абсолютный) */
	src: string
	/** Заголовок документа — попадёт в текст сообщения */
	title: string
	/** Имя файла при шеринге/скачивании */
	downloadName?: string
	/** Классы триггер-кнопки (по умолчанию — стиль panel) */
	className?: string
}

const MENU_WIDTH = 240

/**
 * Кнопка «Поделиться» для PDF.
 *
 * На телефонах с поддержкой Web Share API уровня 2 отправляет САМ ФАЙЛ (PDF)
 * через системное окно — пользователь выбирает Telegram/WhatsApp/почту, и туда
 * уходит документ + текст со ссылкой на сайт. Где файл прикрепить нельзя
 * (десктоп) — показывает меню с прямыми ссылками и кнопкой «Скачать».
 */
const SharePdf = ({ src, title, downloadName, className }: Props) => {
	const [open, setOpen] = useState(false)
	const [copied, setCopied] = useState(false)
	const [busy, setBusy] = useState(false)
	const [pos, setPos] = useState({ top: 0, left: 0 })
	const btnRef = useRef<HTMLButtonElement>(null)

	const fileUrl = new URL(src, window.location.origin).href
	// Ссылка именно на текущую страницу (чистый URL, без кириллицы в имени файла)
	const pageUrl = window.location.origin + window.location.pathname
	const fileName =
		downloadName || decodeURIComponent(fileUrl.split('/').pop() || 'vac-uz.pdf')
	// Текст сообщения: название + ссылка на страницу
	const text = `${title} — VAC.UZ\n${pageUrl}`

	useEffect(() => {
		if (!open) return
		const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
		window.addEventListener('keydown', onKey)
		return () => window.removeEventListener('keydown', onKey)
	}, [open])

	const openMenu = () => {
		const r = btnRef.current?.getBoundingClientRect()
		if (r) {
			setPos({
				top: r.bottom + 8,
				left: Math.max(
					8,
					Math.min(r.right - MENU_WIDTH, window.innerWidth - MENU_WIDTH - 8),
				),
			})
		}
		setOpen(true)
	}

	const download = () => {
		const a = document.createElement('a')
		a.href = fileUrl
		a.download = fileName
		document.body.appendChild(a)
		a.click()
		a.remove()
		setOpen(false)
	}

	// Главное действие: попытаться отправить сам файл, иначе — меню со ссылками
	const handleTrigger = async () => {
		const nav = navigator as Navigator & {
			canShare?: (data?: ShareData) => boolean
		}

		if (typeof nav.share === 'function') {
			try {
				setBusy(true)
				const res = await fetch(fileUrl)
				if (!res.ok) throw new Error('fetch failed')
				const blob = await res.blob()
				const file = new File([blob], fileName, {
					type: blob.type || 'application/pdf',
				})

				if (nav.canShare && nav.canShare({ files: [file] })) {
					// Отправляем сам PDF + текст со ссылкой на страницу
					await nav.share({ files: [file], title, text, url: pageUrl })
				} else {
					// Файлы не поддерживаются — делимся ссылкой на страницу
					await nav.share({ title, text, url: pageUrl })
				}
				setBusy(false)
				return
			} catch (e) {
				setBusy(false)
				// Пользователь закрыл системное окно — не открываем меню
				if ((e as Error)?.name === 'AbortError') return
				// Иначе (нет поддержки/ошибка сети) — показываем меню
			}
		}

		openMenu()
	}

	const copy = async () => {
		try {
			await navigator.clipboard.writeText(pageUrl)
			setCopied(true)
			setTimeout(() => setCopied(false), 1800)
		} catch {
			/* буфер недоступен */
		}
		setOpen(false)
	}

	// Прямые ссылки ведут на текущую страницу
	const shareMessage = `${title} — VAC.UZ ${pageUrl}`
	const targets = [
		{
			label: 'Telegram',
			href: `https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(`${title} — VAC.UZ`)}`,
			icon: Send,
		},
		{
			label: 'WhatsApp',
			href: `https://wa.me/?text=${encodeURIComponent(shareMessage)}`,
			icon: MessageCircle,
		},
		{
			label: 'Email',
			href: `mailto:?subject=${encodeURIComponent(`${title} — VAC.UZ`)}&body=${encodeURIComponent(`${title}\n${pageUrl}`)}`,
			icon: Mail,
		},
	]

	return (
		<>
			<button
				ref={btnRef}
				type='button'
				onClick={handleTrigger}
				disabled={busy}
				className={
					className ??
					'liquid-button liquid-button-panel px-5 py-3 text-sm font-semibold'
				}
				aria-haspopup='menu'
				aria-expanded={open}
			>
				{busy ? (
					<Loader2 size={18} className='animate-spin' />
				) : (
					<Share2 size={18} />
				)}
				Поделиться
			</button>

			{open && (
				<>
					{/* Подложка для закрытия по клику вне меню */}
					<div
						className='fixed inset-0 z-40'
						onClick={() => setOpen(false)}
						aria-hidden='true'
					/>
					<div
						role='menu'
						style={{ top: pos.top, left: pos.left, width: MENU_WIDTH }}
						className='fixed z-50 rounded-2xl border border-slate-200 bg-white p-2 text-left shadow-[0_22px_46px_-26px_rgba(15,23,42,0.5)] dark:border-slate-700 dark:bg-[#122033]'
					>
						{targets.map(t => (
							<a
								key={t.label}
								href={t.href}
								target='_blank'
								rel='noopener noreferrer'
								role='menuitem'
								onClick={() => setOpen(false)}
								className='flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800/70'
							>
								<t.icon size={18} />
								{t.label}
							</a>
						))}
						<button
							type='button'
							onClick={download}
							role='menuitem'
							className='flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800/70'
						>
							<Download size={18} />
							Скачать файл
						</button>
						<button
							type='button'
							onClick={copy}
							role='menuitem'
							className='flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800/70'
						>
							{copied ? <Check size={18} /> : <Copy size={18} />}
							{copied ? 'Ссылка скопирована' : 'Копировать ссылку'}
						</button>
					</div>
				</>
			)}
		</>
	)
}

export default SharePdf
