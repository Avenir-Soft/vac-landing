import { Check, Copy, Mail, MessageCircle, Send, Share2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

type Props = {
	/** Путь к PDF (относительный или абсолютный) */
	src: string
	/** Заголовок документа — попадёт в текст сообщения */
	title: string
	/** Классы триггер-кнопки (по умолчанию — стиль panel) */
	className?: string
}

const MENU_WIDTH = 224

/**
 * Кнопка «Поделиться» для PDF.
 * На устройствах с Web Share API (телефоны, Chrome/Safari) открывает системное
 * окно — там сразу Telegram, WhatsApp, почта и т.д. На остальных показывает
 * собственное меню с прямыми ссылками. Меню позиционируется fixed, чтобы его
 * не обрезал overflow-hidden родительской карточки.
 */
const SharePdf = ({ src, title, className }: Props) => {
	const [open, setOpen] = useState(false)
	const [copied, setCopied] = useState(false)
	const [pos, setPos] = useState({ top: 0, left: 0 })
	const btnRef = useRef<HTMLButtonElement>(null)

	const shareUrl = new URL(src, window.location.origin).href
	const text = `${title} — VAC.UZ`

	const canNativeShare =
		typeof navigator !== 'undefined' && typeof navigator.share === 'function'

	useEffect(() => {
		if (!open) return
		const close = () => setOpen(false)
		const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
		window.addEventListener('scroll', close, true)
		window.addEventListener('resize', close)
		window.addEventListener('keydown', onKey)
		return () => {
			window.removeEventListener('scroll', close, true)
			window.removeEventListener('resize', close)
			window.removeEventListener('keydown', onKey)
		}
	}, [open])

	const nativeShare = async () => {
		try {
			await navigator.share({ title, text, url: shareUrl })
		} catch {
			/* пользователь отменил — ничего не делаем */
		}
	}

	const openMenu = () => {
		const r = btnRef.current?.getBoundingClientRect()
		if (r) {
			setPos({
				top: r.bottom + 8,
				left: Math.max(8, Math.min(r.right - MENU_WIDTH, window.innerWidth - MENU_WIDTH - 8)),
			})
		}
		setOpen(true)
	}

	const handleTrigger = () => {
		if (canNativeShare) nativeShare()
		else openMenu()
	}

	const copy = async () => {
		try {
			await navigator.clipboard.writeText(shareUrl)
			setCopied(true)
			setTimeout(() => setCopied(false), 1800)
		} catch {
			/* буфер недоступен */
		}
		setOpen(false)
	}

	const targets = [
		{
			label: 'Telegram',
			href: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`,
			icon: Send,
		},
		{
			label: 'WhatsApp',
			href: `https://wa.me/?text=${encodeURIComponent(`${text} ${shareUrl}`)}`,
			icon: MessageCircle,
		},
		{
			label: 'Email',
			href: `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(`${title}:\n${shareUrl}`)}`,
			icon: Mail,
		},
	]

	return (
		<>
			<button
				ref={btnRef}
				type='button'
				onClick={handleTrigger}
				className={
					className ??
					'liquid-button liquid-button-panel px-5 py-3 text-sm font-semibold'
				}
				aria-haspopup='menu'
				aria-expanded={open}
			>
				<Share2 size={18} />
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
						className='fixed z-50 rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_22px_46px_-26px_rgba(15,23,42,0.5)] dark:border-slate-700 dark:bg-[#122033]'
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
