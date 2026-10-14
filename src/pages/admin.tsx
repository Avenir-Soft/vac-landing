import { ExternalLink, Images, KeyRound, LogOut, ReceiptText } from 'lucide-react'
import { useCallback, useEffect, useState, type FormEvent } from 'react'
import {
	AuthError,
	changePassword,
	checkSession,
	login,
	logout,
	onAuthLost,
} from '../admin/api'
import GalleryEditor from '../admin/GalleryEditor'
import PricesEditor from '../admin/PricesEditor'
import { Button, Card, Field, Notice, inputClass } from '../admin/ui'
import { errorText } from '../admin/utils'
import {
	fetchContent,
	type GalleryContent,
	type PricesContent,
} from '../lib/siteContent'

// Админка сайта: /admin (ссылок на неё на сайте нет).
// Интерфейс только на русском — это внутренний инструмент.

type Tab = 'gallery' | 'prices' | 'settings'

const TABS: { id: Tab; label: string; icon: typeof Images }[] = [
	{ id: 'gallery', label: 'Фото галерея', icon: Images },
	{ id: 'prices', label: 'Прайс-листы', icon: ReceiptText },
	{ id: 'settings', label: 'Пароль', icon: KeyRound },
]

const LoginForm = ({ onSuccess }: { onSuccess: () => void }) => {
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const [busy, setBusy] = useState(false)

	const submit = async (e: FormEvent) => {
		e.preventDefault()
		setBusy(true)
		setError('')
		try {
			await login(password)
			onSuccess()
		} catch (err) {
			setError(errorText(err))
		} finally {
			setBusy(false)
		}
	}

	return (
		<form onSubmit={submit} className='w-full max-w-sm space-y-4'>
			<div className='text-center'>
				<img src='/vac-logo.png' alt='VAC.UZ' className='mx-auto h-14 w-auto rounded-xl bg-white p-1.5' />
				<h1 className='mt-4 text-xl font-bold text-white'>Админ-панель</h1>
			</div>
			<Field label='Пароль'>
				<input
					type='password'
					autoFocus
					autoComplete='current-password'
					className={inputClass}
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
			</Field>
			{error ? <Notice tone='error'>{error}</Notice> : null}
			<Button type='submit' variant='primary' className='w-full' disabled={busy || !password}>
				{busy ? 'Проверяю…' : 'Войти'}
			</Button>
		</form>
	)
}

const PasswordForm = () => {
	const [current, setCurrent] = useState('')
	const [next, setNext] = useState('')
	const [repeat, setRepeat] = useState('')
	const [notice, setNotice] = useState<{ tone: 'error' | 'success'; text: string } | null>(null)
	const [busy, setBusy] = useState(false)

	const submit = async (e: FormEvent) => {
		e.preventDefault()
		if (next !== repeat) {
			setNotice({ tone: 'error', text: 'Новые пароли не совпадают' })
			return
		}
		setBusy(true)
		setNotice(null)
		try {
			await changePassword(current, next)
			setCurrent('')
			setNext('')
			setRepeat('')
			setNotice({
				tone: 'success',
				text: 'Пароль изменён. На других устройствах нужно будет войти заново.',
			})
		} catch (err) {
			if (!(err instanceof AuthError)) setNotice({ tone: 'error', text: errorText(err) })
		} finally {
			setBusy(false)
		}
	}

	return (
		<Card className='max-w-md'>
			<form onSubmit={submit} className='space-y-4'>
				<h2 className='text-lg font-bold text-white'>Смена пароля</h2>
				<Field label='Текущий пароль'>
					<input type='password' autoComplete='current-password' className={inputClass} value={current} onChange={e => setCurrent(e.target.value)} />
				</Field>
				<Field label='Новый пароль' hint='Минимум 8 символов'>
					<input type='password' autoComplete='new-password' className={inputClass} value={next} onChange={e => setNext(e.target.value)} />
				</Field>
				<Field label='Новый пароль ещё раз'>
					<input type='password' autoComplete='new-password' className={inputClass} value={repeat} onChange={e => setRepeat(e.target.value)} />
				</Field>
				{notice ? <Notice tone={notice.tone}>{notice.text}</Notice> : null}
				<Button type='submit' variant='primary' disabled={busy || !current || next.length < 8}>
					{busy ? 'Сохраняю…' : 'Сменить пароль'}
				</Button>
			</form>
		</Card>
	)
}

const Admin = () => {
	const [auth, setAuth] = useState<'checking' | 'out' | 'in' | 'error'>('checking')
	const [authError, setAuthError] = useState('')
	const [sessionLost, setSessionLost] = useState(false)
	const [tab, setTab] = useState<Tab>('gallery')
	const [content, setContent] = useState<{
		gallery: GalleryContent
		prices: PricesContent
	} | null>(null)
	const [dirty, setDirty] = useState<Record<string, boolean>>({})

	const setGalleryDirty = useCallback(
		(value: boolean) => setDirty(d => ({ ...d, gallery: value })),
		[],
	)
	const setPricesDirty = useCallback(
		(value: boolean) => setDirty(d => ({ ...d, prices: value })),
		[],
	)
	const anyDirty = Object.values(dirty).some(Boolean)

	useEffect(() => {
		document.title = 'Админ-панель — VAC.UZ'
		const robots = document.createElement('meta')
		robots.name = 'robots'
		robots.content = 'noindex, nofollow'
		document.head.appendChild(robots)
		checkSession()
			.then(ok => setAuth(ok ? 'in' : 'out'))
			.catch(err => {
				setAuthError(errorText(err))
				setAuth('error')
			})
		return () => {
			robots.remove()
			document.title = 'VAC.UZ'
		}
	}, [])

	useEffect(() => onAuthLost(() => setSessionLost(true)), [])

	useEffect(() => {
		if (auth !== 'in' || content) return
		Promise.all([
			fetchContent('gallery'),
			fetchContent('prices'),
		]).then(([gallery, prices]) => setContent({ gallery, prices }))
	}, [auth, content])

	useEffect(() => {
		if (!anyDirty) return
		const warn = (e: BeforeUnloadEvent) => e.preventDefault()
		window.addEventListener('beforeunload', warn)
		return () => window.removeEventListener('beforeunload', warn)
	}, [anyDirty])

	const signOut = async () => {
		if (anyDirty && !window.confirm('Есть несохранённые изменения. Всё равно выйти?')) return
		await logout().catch(() => {})
		setContent(null)
		setDirty({})
		setAuth('out')
	}

	if (auth !== 'in') {
		return (
			<div className='flex min-h-screen items-center justify-center bg-[#24262b] p-4 text-slate-100'>
				{auth === 'checking' ? <p className='text-slate-400'>Загрузка…</p> : null}
				{auth === 'error' ? (
					<div className='max-w-md'>
						<Notice tone='error'>{authError}</Notice>
					</div>
				) : null}
				{auth === 'out' ? <LoginForm onSuccess={() => setAuth('in')} /> : null}
			</div>
		)
	}

	return (
		<div className='min-h-screen bg-[#24262b] text-slate-100'>
			<header className='sticky top-0 z-30 border-b border-white/8 bg-[#1d1f23]'>
				<div className='mx-auto flex max-w-7xl items-center gap-2 px-4 py-2.5'>
					<img src='/vac-logo.png' alt='VAC.UZ' className='mr-2 h-9 w-auto rounded-lg bg-white p-1' />
					<nav className='flex flex-1 gap-1 overflow-x-auto'>
						{TABS.map(({ id, label, icon: Icon }) => (
							<button
								key={id}
								type='button'
								onClick={() => setTab(id)}
								className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition ${
									tab === id ? 'bg-sky-500/15 text-sky-300' : 'text-slate-300 hover:bg-white/6'
								}`}
							>
								<Icon size={17} />
								<span className='hidden sm:inline'>{label}</span>
								{dirty[id] ? <span className='h-2 w-2 rounded-full bg-amber-400' /> : null}
							</button>
						))}
					</nav>
					<a
						href='/'
						target='_blank'
						rel='noreferrer'
						className='flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-300 hover:bg-white/6'
					>
						<ExternalLink size={16} />
						<span className='hidden md:inline'>Сайт</span>
					</a>
					<Button variant='ghost' onClick={signOut}>
						<LogOut size={16} />
						<span className='hidden md:inline'>Выйти</span>
					</Button>
				</div>
			</header>

			<main className='mx-auto max-w-7xl px-4 pb-16'>
				{content ? (
					<>
						<div hidden={tab !== 'gallery'}>
							<GalleryEditor initial={content.gallery} onDirtyChange={setGalleryDirty} />
						</div>
						<div hidden={tab !== 'prices'}>
							<PricesEditor initial={content.prices} onDirtyChange={setPricesDirty} />
						</div>
					</>
				) : (
					<p className='py-10 text-slate-400'>Загрузка…</p>
				)}
				{tab === 'settings' ? (
					<div className='pt-6'>
						<PasswordForm />
					</div>
				) : null}
			</main>

			{sessionLost ? (
				<div className='fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm'>
					<Card className='w-full max-w-sm'>
						<p className='mb-4 text-sm text-amber-200'>
							Сессия истекла. Войдите снова — несохранённые изменения останутся,
							после входа нажмите «Сохранить» ещё раз.
						</p>
						<LoginForm onSuccess={() => setSessionLost(false)} />
					</Card>
				</div>
			) : null}
		</div>
	)
}

export default Admin
