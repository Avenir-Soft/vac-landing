import { Gauge } from 'lucide-react'
import Calculator from '../components/Calculator'
import Footer from '../components/Footer'
import NavbarForPages from '../components/NavbarForPages'

const CalculatorPage = () => {
	return (
		<div>
			<NavbarForPages />
			<section className='relative min-h-screen overflow-hidden px-4 pt-32 pb-20'>
				<div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(149,172,197,0.25),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0),rgba(226,234,242,0.65))] dark:bg-[radial-gradient(circle_at_top_right,rgba(149,172,197,0.08),transparent_24%),linear-gradient(180deg,rgba(9,16,27,0),rgba(4,8,15,0.45))]'></div>
				<div className='section-shell relative z-10'>
					<div className='mx-auto max-w-6xl'>
						<div className='surface-card overflow-hidden'>
							<div className='border-b border-slate-200 bg-slate-950 p-8 text-white md:p-10 dark:border-slate-800 dark:bg-[#060b13]'>
								<div className='flex h-16 w-16 items-center justify-center rounded-3xl border border-white/10 bg-white/8'>
									<Gauge size={34} strokeWidth={1.7} />
								</div>
								<p className='mt-6 text-xs font-semibold uppercase tracking-[0.28em] text-slate-300'>
									Упрощённый расчёт
								</p>
								<h1 className='mt-4 text-4xl font-bold leading-tight md:text-5xl'>
									Калькулятор площади воздуховодов
								</h1>
								<p className='mt-5 max-w-2xl text-base leading-7 text-slate-300'>
									Рассчитайте площадь развёртки и количество металла для прямых
									участков и фасонных изделий — отводов, переходов, тройников,
									врезок, заглушек, уток и вытяжных зонтов. Выберите тип изделия,
									укажите размеры — и получите итоговую площадь развёртки.
								</p>
							</div>
						</div>

						<div className='mt-8'>
							<Calculator />
						</div>

						<p className='mt-8 text-center text-xs text-slate-400 dark:text-slate-500'>
							Расчёт предварительный. Итоговая площадь зависит от типа замков,
							фланцев и припусков — уточняйте у менеджера VAC.UZ.
						</p>
					</div>
				</div>
			</section>
			<Footer />
		</div>
	)
}

export default CalculatorPage
