import Calculator from '../components/Calculator'
import Footer from '../components/Footer'
import NavbarForPages from '../components/NavbarForPages'
import { useLanguage } from '../hooks/useLanguage'
import type { Lang } from '../i18n/language'

const ru = {
	title: 'Калькулятор площади воздуховодов',
	note: 'Расчёт предварительный. Итоговая площадь зависит от типа замков, фланцев и припусков — уточняйте у менеджера VAC.UZ.',
}

const content: Record<Lang, typeof ru> = {
	ru,
	en: {
		title: 'Air duct surface area calculator',
		note: 'The calculation is preliminary. The final area depends on the type of seams, flanges and allowances — check with a VAC.UZ manager.',
	},
	uz: {
		title: 'Havo o‘tkazgichlar yuzasi kalkulyatori',
		note: 'Hisob taxminiy. Yakuniy yuza fals qulflari, flanetslar va pripusklar turiga bog‘liq — VAC.UZ menejeri bilan aniqlashtiring.',
	},
}

const CalculatorPage = () => {
	const { lang } = useLanguage()
	const t = content[lang]

	return (
		<div>
			<NavbarForPages />
			<section className='relative min-h-screen overflow-hidden px-4 pt-32 pb-20'>
				<div className='section-shell relative z-10'>
					<div className='mx-auto max-w-7xl'>
						<h1 className='text-center text-[clamp(1.8rem,1.3rem+2.5vw,2.75rem)] font-bold leading-tight tracking-tight text-white'>
							{t.title}
						</h1>

						<div className='mt-8'>
							<Calculator />
						</div>

						<p className='mt-8 text-center text-xs text-slate-400 dark:text-slate-500'>
							{t.note}
						</p>
					</div>
				</div>
			</section>
			<Footer />
		</div>
	)
}

export default CalculatorPage
