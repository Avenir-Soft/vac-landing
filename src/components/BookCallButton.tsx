import { CheckCircle2, Phone, X } from 'lucide-react'
import { useState } from 'react'

const TELEGRAM_BOT_TOKEN = '8244935192:AAFf57K5C7lrrPyWLKU6xjE021nLlVlk15s'
const TELEGRAM_CHAT_ID = '-1003652371972'

const BookCallButton = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false)
	const [formData, setFormData] = useState({
		name: '',
		phone: '',
	})

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsSubmitting(true)

		try {
			await sendBookCallRequest()

			setIsSuccess(true)
			setTimeout(() => {
				setIsOpen(false)
				setIsSuccess(false)
				setFormData({ name: '', phone: '' })
			}, 3000)
		} catch (error) {
			console.error('Error:', error)
			alert('Ошибка отправки. Попробуйте позже.')
		} finally {
			setIsSubmitting(false)
		}
	}

	const sendBookCallRequest = async () => {
		try {
			const response = await fetch('/api/book-call', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			})

			if (response.ok) {
				return
			}
		} catch (error) {
			console.warn('Serverless Telegram request failed, using browser fallback:', error)
		}

		const date = new Date().toLocaleString('ru-RU', {
			timeZone: 'Asia/Tashkent',
		})
		const text = [
			'Новая заявка на звонок',
			`Имя: ${formData.name.trim()}`,
			`Телефон: ${formData.phone.trim()}`,
			`Дата: ${date}`,
			'Сайт: vac.uz',
		].join('\n')

		const response = await fetch(
			`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					chat_id: TELEGRAM_CHAT_ID,
					text,
				}),
			}
		)
		const result = await response.json()

		if (!response.ok || !result.ok) {
			throw new Error('Telegram browser fallback failed')
		}
	}

	return (
		<>
			<button
				onClick={() => setIsOpen(true)}
				className='liquid-button liquid-button-primary liquid-button-fixed group right-6 bottom-6 z-40 h-14 w-14 md:h-16 md:w-16'
				aria-label='Заказать звонок'
			>
				<Phone size={28} className='transition-transform group-hover:rotate-12' />
			</button>

			{isOpen && (
				<div
					className='fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm'
					onClick={() => setIsOpen(false)}
				>
					<div
						className='w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-slate-950'
						onClick={e => e.stopPropagation()}
					>
						<div className='relative bg-slate-950 p-6 text-white dark:bg-[#060b13]'>
							<button
								onClick={() => setIsOpen(false)}
								className='liquid-button liquid-button-icon liquid-button-absolute top-4 right-4 h-10 w-10 rounded-full text-white'
								aria-label='Закрыть'
							>
								<X size={20} />
							</button>

							<div className='flex items-center gap-3'>
								<div className='flex h-12 w-12 items-center justify-center rounded-full bg-white/12'>
									<Phone size={24} />
								</div>
								<div>
									<h3 className='text-2xl font-bold'>Заказать звонок</h3>
									<p className='text-sm text-slate-300'>Мы перезвоним в течение дня</p>
								</div>
							</div>
						</div>

						<div className='p-6'>
							{isSuccess ? (
								<div className='py-8 text-center'>
									<div className='mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-900'>
										<CheckCircle2 size={40} className='text-slate-950 dark:text-white' />
									</div>
									<h4 className='mb-2 text-2xl font-bold text-gray-900 dark:text-white'>
										Заявка принята!
									</h4>
									<p className='text-gray-600 dark:text-slate-300'>
										Мы свяжемся с вами в ближайшее время
									</p>
								</div>
							) : (
								<form onSubmit={handleSubmit} className='space-y-5'>
									<div>
										<label className='mb-2 block font-semibold text-gray-700 dark:text-slate-200'>
											Ваше имя <span className='text-red-500'>*</span>
										</label>
										<input
											type='text'
											value={formData.name}
											onChange={e => setFormData({ ...formData, name: e.target.value })}
											className='w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-slate-600 dark:focus:ring-slate-900'
											required
											disabled={isSubmitting}
										/>
									</div>

									<div>
										<label className='mb-2 block font-semibold text-gray-700 dark:text-slate-200'>
											Номер телефона <span className='text-red-500'>*</span>
										</label>
										<input
											type='tel'
											value={formData.phone}
											onChange={e => setFormData({ ...formData, phone: e.target.value })}
											className='w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-slate-600 dark:focus:ring-slate-900'
											placeholder='+998909117272'
											required
											disabled={isSubmitting}
										/>
									</div>

									<button
										type='submit'
										disabled={isSubmitting}
										className='liquid-button liquid-button-primary w-full py-4 text-lg font-bold disabled:cursor-not-allowed disabled:opacity-50'
									>
										{isSubmitting ? (
											<>
												<svg
													className='-ml-1 mr-3 h-5 w-5 animate-spin text-white dark:text-slate-950'
													xmlns='http://www.w3.org/2000/svg'
													fill='none'
													viewBox='0 0 24 24'
												>
													<circle
														className='opacity-25'
														cx='12'
														cy='12'
														r='10'
														stroke='currentColor'
														strokeWidth='4'
													></circle>
													<path
														className='opacity-75'
														fill='currentColor'
														d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
													></path>
												</svg>
												Отправка...
											</>
										) : (
											<>
												<Phone size={20} className='mr-2' />
												Заказать звонок
											</>
										)}
									</button>
								</form>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default BookCallButton
