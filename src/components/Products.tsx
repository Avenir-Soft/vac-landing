import { ChevronDown, Download } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const subcategoryData: Record<
	string,
	{ image: string; title: string; description?: string }
> = {
	'rect-1': {
		image: '/products/Реечное.jpg',
		title: 'Воздуховоды прямоугольные на рейке',
		description:
			'Воздуховоды на рейке - надежное и экономичное решение для систем вентиляции.',
	},
	'rect-2': {
		image: '/products/шинорейке.jpg',
		title: 'Воздуховоды прямоугольные на шинорейке',
		description:
			'Система шинорейка обеспечивает быстрый монтаж и высокую герметичность.',
	},
	'rect-3': {
		image: '/products/тдф.jpg',
		title: 'Воздуховоды прямоугольные TDF',
		description: 'TDF система - современное фланцевое соединение без болтов.',
	},
	'rect-4': {
		image: '/products/фасон.jpg',
		title: 'Фасонные части для всех видов соеденений',
		description: 'Отводы, переходы, тройники и другие фасонные изделия.',
	},
	'round-1': {
		image: '/products/прямошовное.jpg',
		title: 'Круглые прямошовные воздуховоды',
		description: 'Прямошовные воздуховоды из оцинкованной стали.',
	},
	'round-2': {
		image: '/products/спиральное.jpg',
		title: 'Круглые спирально навивные воздуховоды',
		description: 'Спирально-навивные воздуховоды повышенной прочности.',
	},
	'round-3': {
		image: '/products/фасонные-части.jpg',
		title: 'Фасонные части воздуховодов круглого сечения',
		description: 'Оцинкованные воздуховоды для долговечной эксплуатации.',
	},
	'round-4': {
		image: '/products/типы-соединения.jpg',
		title: 'Типы соединений круглых воздуховодов',
	},
	'smoke-1': {
		image: '/products/дымоудаление.jpg',
		title: 'Дымоудаление',
		description: 'Специальные воздуховоды для систем противопожарной вентиляци',
	},
	'flex-1': {
		image: '/products/flex-alyuminievye.jpg',
		title: 'Гибкие воздуховоды',
		description: 'Легкие и удобные в монтаже алюминиевые гофры.',
	},
	'comp-1': {
		image: '/products/comp-flancy.jpg',
		title: 'Кассетные фильтры',
		description: 'Фланцевые соединения различных типов и размеров.',
	},
	'comp-2': {
		image: '/products/shumoglushitel.jpg',
		title: 'Шумоглушитель',
		description: 'Хомуты и крепежные элементы для надежного соединения.',
	},
	'comp-3': {
		image: '/products/drossel.jpg',
		title: 'Дроссель клапаны',
		description: 'Отводы различных углов и диаметров.',
	},
	'comp-4': {
		image: '/products/deflector.jpg',
		title: 'Дефлектора',
		description: 'Фланцевые соединения различных типов и размеров.',
	},
	'comp-5': {
		image: '/products/gibkaya.jpg',
		title: 'Гибкая вставка',
		description: 'Хомуты и крепежные элементы для надежного соединения.',
	},
	'comp-6': {
		image: '/products/zont.jpg',
		title: 'Зонт колпак',
		description: 'Отводы различных углов и диаметров.',
	},
	'comp-7': {
		image: '/products/reshetka.jpg',
		title: 'Решетка',
		description: 'Фланцевые соединения различных типов и размеров.',
	},
	'comp-8': {
		image: '/products/islation.jpg',
		title: 'Изоляция',
		description: 'Хомуты и крепежные элементы для надежного соединения.',
	},
	'mat-1': {
		image: '/products/mat-uplotniteli.jpg',
		title: 'Для воздуховодов',
		description: 'Уплотнительные материалы для герметичности соединений.',
	},
	'mat-2': {
		image: '/products/montaj1.jpg',
		title: 'Для монтажа 1',
		description: 'Метизы, саморезы, заклепки для монтажа.',
	},
	'mat-3': {
		image: '/products/montaj2.jpg',
		title: 'Для монтажа 2',
		description: 'Теплоизоляционные и звукоизоляционные материалы.',
	},
	'mat-4': {
		image: '/products/montaj3.jpg',
		title: 'Для монтажа 3',
		description: 'Метизы, саморезы, заклепки для монтажа.',
	},
	'mat-5': {
		image: '/products/montaj4.jpg',
		title: 'Для монтажа 4',
		description: 'Теплоизоляционные и звукоизоляционные материалы.',
	},
	'mat-6': {
		image: '/products/montaj5.jpg',
		title: 'Для монтажа 5',
		description: 'Теплоизоляционные и звукоизоляционные материалы.',
	},
	'tool-1': {
		image: '/products/tool1.jpg',
		title: 'Инструменты 1',
		description: 'Профессиональные ножницы для резки воздуховодов.',
	},
	'tool-2': {
		image: '/products/tool2.jpg',
		title: 'Инструменты 2',
		description: 'Инструмент для установки заклепок.',
	},
	'tool-3': {
		image: '/products/tool3.jpg',
		title: 'Инструменты 3',
		description: 'Рулетки, угломеры, уровни для точного монтажа.',
	},
	'tool-4': {
		image: '/products/tool4.jpg',
		title: 'Инструменты 4',
		description: 'Инструмент для установки заклепок.',
	},
	'tool-5': {
		image: '/products/tool5.jpg',
		title: 'Инструменты 5',
		description: 'Рулетки, угломеры, уровни для точного монтажа.',
	},
	'siz-1': {
		image: '/products/siz-respiratori.jpg',
		title: 'СИЗ',
		description: 'Средства защиты органов дыхания.',
	},
}

const productCategories = [
	{
		id: 1,
		name: 'Воздуховоды прямоугольные',
		subcategories: [
			{ id: 'rect-1', name: 'На рейке' },
			{ id: 'rect-2', name: 'Шинорейке' },
			{ id: 'rect-3', name: 'TDF' },
			{ id: 'rect-4', name: 'Фасонные части' },
		],
	},
	{
		id: 2,
		name: 'Воздуховоды круглые',
		subcategories: [
			{ id: 'round-1', name: 'Прямошовные воздуховоды' },
			{ id: 'round-2', name: 'Спирально Навивные воздуховоды' },
			{ id: 'round-3', name: 'Фасонные части воздуховодов' },
			{ id: 'round-4', name: 'Типы соединения воздуховодов' },
		],
	},
	{
		id: 3,
		name: 'Воздуховоды дымоудаления',
		subcategories: [{ id: 'smoke-1', name: 'Дымоудаление' }],
	},
	{
		id: 4,
		name: 'Гибкие воздуховоды',
		subcategories: [{ id: 'flex-1', name: 'Гибкие воздуховоды' }],
	},
	{
		id: 5,
		name: 'Комплектующие изделия',
		subcategories: [
			{ id: 'comp-1', name: 'Кассетные фильтры' },
			{ id: 'comp-2', name: 'Шумоглушитель' },
			{ id: 'comp-3', name: 'Дроссель клапаны' },
			{ id: 'comp-4', name: 'Дефлектора' },
			{ id: 'comp-5', name: 'Гибкая вставка' },
			{ id: 'comp-6', name: 'Зонт колпак' },
			{ id: 'comp-7', name: 'Решетка' },
			{ id: 'comp-8', name: 'Изоляция' },
		],
	},
	{
		id: 6,
		name: 'Комплектующие материалы',
		subcategories: [
			{ id: 'mat-1', name: 'Для воздуховодов' },
			{ id: 'mat-2', name: 'Для монтажа 1' },
			{ id: 'mat-3', name: 'Для монтажа 2' },
			{ id: 'mat-4', name: 'Для монтажа 3' },
			{ id: 'mat-5', name: 'Для монтажа 4' },
			{ id: 'mat-6', name: 'Для монтажа 5' },
		],
	},
	{
		id: 7,
		name: 'Инструменты',
		subcategories: [
			{ id: 'tool-1', name: 'Инструменты 1' },
			{ id: 'tool-2', name: 'Инструменты 2' },
			{ id: 'tool-3', name: 'Инструменты 3' },
			{ id: 'tool-4', name: 'Инструменты 4' },
			{ id: 'tool-5', name: 'Инструменты 5' },
		],
	},
	{
		id: 8,
		name: 'Средства индивидуальной защиты',
		subcategories: [{ id: 'siz-1', name: 'СИЗ' }],
	},
]

const Products = () => {
	const [isVisible, setIsVisible] = useState(false)
	const [selectedCategory, setSelectedCategory] = useState(0)
	const [openCategory, setOpenCategory] = useState<number | null>(0)
	const [selectedSubcategory, setSelectedSubcategory] = useState('rect-1')
	const sectionRef = useRef<HTMLDivElement>(null)

	const handleDownload = () => {
		const link = document.createElement('a')
		link.href = '/products-catalog.pdf'
		link.download = 'products-catalog.pdf'
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
	}

	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) setIsVisible(true)
				})
			},
			{ threshold: 0.2 }
		)

		if (sectionRef.current) observer.observe(sectionRef.current)
		return () => {
			if (sectionRef.current) observer.unobserve(sectionRef.current)
		}
	}, [])

	const handleCategoryClick = (index: number) => {
		setSelectedCategory(index)

		if (openCategory === index) {
			setOpenCategory(null)
			return
		}

		setOpenCategory(index)
		const firstSubcategory = productCategories[index].subcategories?.[0]?.id
		if (firstSubcategory) setSelectedSubcategory(firstSubcategory)
	}

	const currentData =
		subcategoryData[selectedSubcategory] || subcategoryData['rect-1']

	return (
		<section id='products' ref={sectionRef} className='overflow-hidden py-10 md:py-14'>
			<div className='section-shell'>
				<div className='mb-6 max-w-3xl md:mb-8'>
					<span className='section-kicker'>Продукция</span>
					<h2 className='section-title mt-4'>
						Каталог воздуховодов, комплектующих и материалов
					</h2>
					<p className='section-subtitle mt-4'>
						Ключевой ассортимент на одной компактной секции без лишнего
						растягивания страницы.
					</p>
				</div>

				<div className='grid items-start gap-6 lg:grid-cols-[minmax(320px,0.92fr)_minmax(0,1.08fr)]'>
					<div
						className={`transition-all duration-1000 ${
							isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
						}`}
					>
						<div className='surface-card p-5 md:p-6 lg:sticky lg:top-24'>
							<div className='space-y-2'>
								{productCategories.map((category, index) => (
									<div key={category.id}>
										<button
											onClick={() => handleCategoryClick(index)}
											className={`liquid-button liquid-button-panel justify-between px-4 py-3 text-left font-semibold ${
												selectedCategory === index
													? 'liquid-button-active'
													: ''
											}`}
										>
											<span>{category.name}</span>
											<ChevronDown
												size={20}
												className={`transition-transform duration-300 ${
													openCategory === index ? 'rotate-180' : ''
												}`}
											/>
										</button>

										{openCategory === index && (
											<div className='mt-2 ml-4 space-y-1 animate-in fade-in slide-in-from-top-2 duration-300'>
												{category.subcategories.map(sub => (
													<button
														key={sub.id}
														onClick={() => setSelectedSubcategory(sub.id)}
														className={`liquid-button liquid-button-panel px-4 py-2 text-left text-sm ${
															selectedSubcategory === sub.id
																? 'liquid-button-active font-semibold'
																: ''
														}`}
													>
														{sub.name}
													</button>
												))}
											</div>
										)}
									</div>
								))}
							</div>
						</div>
					</div>

					<div
						className={`transition-all duration-1000 delay-200 ${
							isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
						}`}
					>
						<div className='surface-card overflow-hidden'>
							<div className='flex items-center justify-between border-b border-slate-200 px-5 py-4 md:px-6 dark:border-slate-800'>
								<div>
									<p className='text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400'>
										Выбранная позиция
									</p>
									<h3 className='mt-2 text-[clamp(1.45rem,1.2rem+1.3vw,1.875rem)] font-bold text-slate-950 dark:text-white'>
										{currentData.title}
									</h3>
								</div>
								<span className='hidden rounded-full border border-slate-200 bg-slate-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 md:inline-flex dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'>
									VAC.UZ
								</span>
							</div>

							<div className='flex aspect-[4/3] items-center justify-center bg-[linear-gradient(180deg,#f8fafc,#e7edf4)] p-5 dark:bg-[linear-gradient(180deg,#0f1725,#131d2f)]'>
								<img
									src={currentData.image}
									alt={currentData.title}
									className='max-h-full max-w-full object-contain transition-all duration-500'
								/>
							</div>

							<div className='px-5 py-5 md:px-6'>
								<p className='text-sm leading-7 text-slate-600 dark:text-slate-300'>
									{currentData.description ||
										'Позиция из действующего каталога продукции для комплектации систем вентиляции.'}
								</p>
								<button
									onClick={handleDownload}
									className='liquid-button liquid-button-primary mt-4 px-4 py-3 text-sm font-semibold'
								>
									<Download size={18} />
									Скачать каталог
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Products
