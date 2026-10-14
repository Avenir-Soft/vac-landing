import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost'

const variants: Record<Variant, string> = {
	primary: 'bg-sky-500 text-white hover:bg-sky-400',
	secondary: 'border border-white/12 bg-white/6 text-slate-100 hover:bg-white/12',
	danger: 'border border-rose-400/30 bg-rose-500/10 text-rose-200 hover:bg-rose-500/20',
	ghost: 'text-slate-300 hover:bg-white/8 hover:text-white',
}

export const Button = ({
	variant = 'secondary',
	className = '',
	...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) => (
	<button
		type='button'
		{...props}
		className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
	/>
)

export const IconButton = ({
	className = '',
	...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => (
	<button
		type='button'
		{...props}
		className={`flex h-8 w-8 items-center justify-center rounded-lg bg-slate-950/70 text-white backdrop-blur transition hover:bg-slate-950 disabled:opacity-30 ${className}`}
	/>
)

export const inputClass =
	'w-full rounded-xl border border-white/10 bg-[#1d1f23] px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-400 focus:outline-none'

export const Field = ({
	label,
	hint,
	children,
}: {
	label: string
	hint?: string
	children: ReactNode
}) => (
	<label className='block'>
		<span className='mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400'>
			{label}
		</span>
		{children}
		{hint ? <span className='mt-1 block text-xs text-slate-500'>{hint}</span> : null}
	</label>
)

export const Card = ({
	children,
	className = '',
}: {
	children: ReactNode
	className?: string
}) => (
	<div className={`rounded-2xl border border-white/8 bg-[#2b2e33] p-5 ${className}`}>
		{children}
	</div>
)

export const Progress = ({ label, value }: { label: string; value: number }) => (
	<div className='rounded-xl border border-sky-400/20 bg-sky-500/10 p-3'>
		<div className='mb-2 flex justify-between text-xs font-semibold text-sky-100'>
			<span>{label}</span>
			<span className='tabular-nums'>{Math.round(value * 100)}%</span>
		</div>
		<div className='h-1.5 overflow-hidden rounded-full bg-white/10'>
			<div
				className='h-full rounded-full bg-sky-400 transition-[width] duration-200'
				style={{ width: `${Math.round(value * 100)}%` }}
			/>
		</div>
	</div>
)

export const Notice = ({
	tone,
	children,
}: {
	tone: 'error' | 'success'
	children: ReactNode
}) => (
	<div
		className={`rounded-xl border px-4 py-3 text-sm ${
			tone === 'error'
				? 'border-rose-400/30 bg-rose-500/10 text-rose-100'
				: 'border-emerald-400/30 bg-emerald-500/10 text-emerald-100'
		}`}
	>
		{children}
	</div>
)
