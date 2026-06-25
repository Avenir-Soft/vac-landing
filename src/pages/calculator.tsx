import Calculator from '../components/Calculator'
import Footer from '../components/Footer'
import NavbarForPages from '../components/NavbarForPages'

const CalculatorPage = () => {
	return (
		<div>
			<NavbarForPages />
			<section className='relative min-h-screen overflow-hidden px-4 pt-32 pb-20'>
				<div className='section-shell relative z-10'>
					<div className='mx-auto max-w-7xl'>
						<h1 className='text-center text-[clamp(1.8rem,1.3rem+2.5vw,2.75rem)] font-bold leading-tight tracking-tight text-white'>
							Калькулятор площади воздуховодов
						</h1>

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
