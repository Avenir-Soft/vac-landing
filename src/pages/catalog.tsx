import { CheckCircle2, Download, FileText } from 'lucide-react'
import Footer from '../components/Footer'
import NavbarForPages from '../components/NavbarForPages'

const Catalog = () => {
	const handleDownload = () => {
		const link = document.createElement('a')
		link.href = '/products-catalog.pdf'
		link.download = 'products-catalog.pdf'
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
	}

	return (
		<div>
			<NavbarForPages />
			<section className='relative min-h-screen overflow-hidden px-4 pt-32 pb-20'>
				<div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(149,172,197,0.25),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0),rgba(226,234,242,0.65))] dark:bg-[radial-gradient(circle_at_top_right,rgba(149,172,197,0.08),transparent_24%),linear-gradient(180deg,rgba(9,16,27,0),rgba(4,8,15,0.45))]'></div>
				<div className='section-shell relative z-10'>
					<div className='surface-card mx-auto max-w-5xl overflow-hidden'>
						<div className='grid gap-0 lg:grid-cols-[0.95fr_1.05fr]'>
							<div className='border-b border-slate-200 bg-slate-950 p-8 text-white lg:border-r lg:border-b-0 dark:border-slate-800 dark:bg-[#060b13]'>
								<div className='flex h-16 w-16 items-center justify-center rounded-3xl border border-white/10 bg-white/8'>
									<FileText size={34} strokeWidth={1.7} />
								</div>
								<p className='mt-6 text-xs font-semibold uppercase tracking-[0.28em] text-slate-300'>
									Catalog
								</p>
								<h1 className='mt-4 text-4xl font-bold leading-tight md:text-5xl'>
									Каталог продукции VAC.UZ
								</h1>
								<p className='mt-5 max-w-md text-base leading-7 text-slate-300'>
									Полный каталог нашей продукции с подробными характеристиками и
									позициями для проектных и монтажных задач.
								</p>
							</div>

							<div className='p-8 md:p-10'>
								<span className='section-kicker'>Скачать PDF</span>
								<h2 className='mt-4 text-3xl font-bold text-slate-950 md:text-4xl dark:text-white'>
									Вся продукция в одном документе
								</h2>
								<p className='mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300'>
									Каталог удобно использовать для подбора решений, согласования
									спецификации и отправки коллегам или заказчику.
								</p>

								<div className='mt-8 space-y-4'>
									{[
										'Основные категории воздуховодов и комплектующих',
										'Удобный формат для просмотра и печати',
										'Подходит для коммерческих и проектных задач',
									].map(item => (
										<div key={item} className='flex items-start gap-3'>
											<CheckCircle2 className='mt-0.5 h-5 w-5 flex-shrink-0 text-slate-950 dark:text-white' />
											<p className='text-sm leading-6 text-slate-700 dark:text-slate-300'>{item}</p>
										</div>
									))}
								</div>

								<button
									onClick={handleDownload}
									className='liquid-button liquid-button-primary mt-10 px-8 py-4 text-base font-bold'
								>
									<Download size={22} />
									Скачать каталог PDF
								</button>

								<p className='mt-5 text-sm text-slate-500 dark:text-slate-400'>
									Формат: PDF • Для быстрого доступа к ассортименту
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	)
}

export default Catalog
