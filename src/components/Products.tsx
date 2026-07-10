import { ChevronDown, Download } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import type { Lang } from '../i18n/language'

// Пути к изображениям не зависят от языка — только подписи локализуются.
const subcategoryImages: Record<string, string> = {
	'rect-1': '/products/Реечное.jpg',
	'rect-2': '/products/шинорейке.jpg',
	'rect-3': '/products/тдф.jpg',
	'rect-4': '/products/фасон.jpg',
	'round-1': '/products/прямошовное.jpg',
	'round-2': '/products/спиральное.jpg',
	'round-3': '/products/фасонные-части.jpg',
	'round-4': '/products/типы-соединения.jpg',
	'smoke-1': '/products/дымоудаление.jpg',
	'flex-1': '/products/flex-alyuminievye.jpg',
	'comp-1': '/products/comp-flancy.jpg',
	'comp-2': '/products/shumoglushitel.jpg',
	'comp-3': '/products/drossel.jpg',
	'comp-4': '/products/deflector.jpg',
	'comp-5': '/products/gibkaya.jpg',
	'comp-6': '/products/zont.jpg',
	'comp-7': '/products/reshetka.jpg',
	'comp-8': '/products/islation.jpg',
	'mat-1': '/products/mat-uplotniteli.jpg',
	'mat-2': '/products/montaj1.jpg',
	'mat-3': '/products/montaj2.jpg',
	'mat-4': '/products/montaj3.jpg',
	'mat-5': '/products/montaj4.jpg',
	'mat-6': '/products/montaj5.jpg',
	'tool-1': '/products/tool1.jpg',
	'tool-2': '/products/tool2.jpg',
	'tool-3': '/products/tool3.jpg',
	'tool-4': '/products/tool4.jpg',
	'tool-5': '/products/tool5.jpg',
	'siz-1': '/products/siz-respiratori.jpg',
}

// Идентификаторы и связи категорий стабильны — названия локализуются в content.
const productCategories = [
	{ id: 1, subcategoryIds: ['rect-1', 'rect-2', 'rect-3', 'rect-4'] },
	{ id: 2, subcategoryIds: ['round-1', 'round-2', 'round-3', 'round-4'] },
	{ id: 3, subcategoryIds: ['smoke-1'] },
	{ id: 4, subcategoryIds: ['flex-1'] },
	{
		id: 5,
		subcategoryIds: [
			'comp-1',
			'comp-2',
			'comp-3',
			'comp-4',
			'comp-5',
			'comp-6',
			'comp-7',
			'comp-8',
		],
	},
	{
		id: 6,
		subcategoryIds: ['mat-1', 'mat-2', 'mat-3', 'mat-4', 'mat-5', 'mat-6'],
	},
	{
		id: 7,
		subcategoryIds: ['tool-1', 'tool-2', 'tool-3', 'tool-4', 'tool-5'],
	},
	{ id: 8, subcategoryIds: ['siz-1'] },
]

const ru = {
	kicker: 'Продукция',
	title: 'Каталог воздуховодов, комплектующих и материалов',
	subtitle:
		'Ключевой ассортимент на одной компактной секции без лишнего растягивания страницы.',
	selectedPosition: 'Выбранная позиция',
	fallbackDescription:
		'Позиция из действующего каталога продукции для комплектации систем вентиляции.',
	downloadCatalog: 'Скачать каталог',
	categoryNames: {
		1: 'Воздуховоды прямоугольные',
		2: 'Воздуховоды круглые',
		3: 'Воздуховоды дымоудаления',
		4: 'Гибкие воздуховоды',
		5: 'Комплектующие изделия',
		6: 'Комплектующие материалы',
		7: 'Инструменты',
		8: 'Средства индивидуальной защиты',
	} as Record<number, string>,
	subNames: {
		'rect-1': 'На рейке',
		'rect-2': 'Шинорейке',
		'rect-3': 'TDF',
		'rect-4': 'Фасонные части',
		'round-1': 'Прямошовные воздуховоды',
		'round-2': 'Спирально Навивные воздуховоды',
		'round-3': 'Фасонные части воздуховодов',
		'round-4': 'Типы соединения воздуховодов',
		'smoke-1': 'Дымоудаление',
		'flex-1': 'Гибкие воздуховоды',
		'comp-1': 'Кассетные фильтры',
		'comp-2': 'Шумоглушитель',
		'comp-3': 'Дроссель клапаны',
		'comp-4': 'Дефлектора',
		'comp-5': 'Гибкая вставка',
		'comp-6': 'Зонт колпак',
		'comp-7': 'Решетка',
		'comp-8': 'Изоляция',
		'mat-1': 'Для воздуховодов',
		'mat-2': 'Для монтажа 1',
		'mat-3': 'Для монтажа 2',
		'mat-4': 'Для монтажа 3',
		'mat-5': 'Для монтажа 4',
		'mat-6': 'Для монтажа 5',
		'tool-1': 'Инструменты 1',
		'tool-2': 'Инструменты 2',
		'tool-3': 'Инструменты 3',
		'tool-4': 'Инструменты 4',
		'tool-5': 'Инструменты 5',
		'siz-1': 'СИЗ',
	} as Record<string, string>,
	subcategories: {
		'rect-1': {
			title: 'Воздуховоды прямоугольные на рейке',
			description:
				'Воздуховоды на рейке - надежное и экономичное решение для систем вентиляции.',
		},
		'rect-2': {
			title: 'Воздуховоды прямоугольные на шинорейке',
			description:
				'Система шинорейка обеспечивает быстрый монтаж и высокую герметичность.',
		},
		'rect-3': {
			title: 'Воздуховоды прямоугольные TDF',
			description: 'TDF система - современное фланцевое соединение без болтов.',
		},
		'rect-4': {
			title: 'Фасонные части для всех видов соеденений',
			description: 'Отводы, переходы, тройники и другие фасонные изделия.',
		},
		'round-1': {
			title: 'Круглые прямошовные воздуховоды',
			description: 'Прямошовные воздуховоды из оцинкованной стали.',
		},
		'round-2': {
			title: 'Круглые спирально навивные воздуховоды',
			description: 'Спирально-навивные воздуховоды повышенной прочности.',
		},
		'round-3': {
			title: 'Фасонные части воздуховодов круглого сечения',
			description: 'Оцинкованные воздуховоды для долговечной эксплуатации.',
		},
		'round-4': {
			title: 'Типы соединений круглых воздуховодов',
		},
		'smoke-1': {
			title: 'Дымоудаление',
			description:
				'Специальные воздуховоды для систем противопожарной вентиляци',
		},
		'flex-1': {
			title: 'Гибкие воздуховоды',
			description: 'Легкие и удобные в монтаже алюминиевые гофры.',
		},
		'comp-1': {
			title: 'Кассетные фильтры',
			description: 'Фланцевые соединения различных типов и размеров.',
		},
		'comp-2': {
			title: 'Шумоглушитель',
			description: 'Хомуты и крепежные элементы для надежного соединения.',
		},
		'comp-3': {
			title: 'Дроссель клапаны',
			description: 'Отводы различных углов и диаметров.',
		},
		'comp-4': {
			title: 'Дефлектора',
			description: 'Фланцевые соединения различных типов и размеров.',
		},
		'comp-5': {
			title: 'Гибкая вставка',
			description: 'Хомуты и крепежные элементы для надежного соединения.',
		},
		'comp-6': {
			title: 'Зонт колпак',
			description: 'Отводы различных углов и диаметров.',
		},
		'comp-7': {
			title: 'Решетка',
			description: 'Фланцевые соединения различных типов и размеров.',
		},
		'comp-8': {
			title: 'Изоляция',
			description: 'Хомуты и крепежные элементы для надежного соединения.',
		},
		'mat-1': {
			title: 'Для воздуховодов',
			description: 'Уплотнительные материалы для герметичности соединений.',
		},
		'mat-2': {
			title: 'Для монтажа 1',
			description: 'Метизы, саморезы, заклепки для монтажа.',
		},
		'mat-3': {
			title: 'Для монтажа 2',
			description: 'Теплоизоляционные и звукоизоляционные материалы.',
		},
		'mat-4': {
			title: 'Для монтажа 3',
			description: 'Метизы, саморезы, заклепки для монтажа.',
		},
		'mat-5': {
			title: 'Для монтажа 4',
			description: 'Теплоизоляционные и звукоизоляционные материалы.',
		},
		'mat-6': {
			title: 'Для монтажа 5',
			description: 'Теплоизоляционные и звукоизоляционные материалы.',
		},
		'tool-1': {
			title: 'Инструменты 1',
			description: 'Профессиональные ножницы для резки воздуховодов.',
		},
		'tool-2': {
			title: 'Инструменты 2',
			description: 'Инструмент для установки заклепок.',
		},
		'tool-3': {
			title: 'Инструменты 3',
			description: 'Рулетки, угломеры, уровни для точного монтажа.',
		},
		'tool-4': {
			title: 'Инструменты 4',
			description: 'Инструмент для установки заклепок.',
		},
		'tool-5': {
			title: 'Инструменты 5',
			description: 'Рулетки, угломеры, уровни для точного монтажа.',
		},
		'siz-1': {
			title: 'СИЗ',
			description: 'Средства защиты органов дыхания.',
		},
	} as Record<string, { title: string; description?: string }>,
}

const content: Record<Lang, typeof ru> = {
	ru,
	en: {
		kicker: 'Products',
		title: 'Catalog of air ducts, components and materials',
		subtitle:
			'The key product range in one compact section, without stretching the page.',
		selectedPosition: 'Selected item',
		fallbackDescription:
			'An item from the current product catalog for assembling ventilation systems.',
		downloadCatalog: 'Download catalog',
		categoryNames: {
			1: 'Rectangular air ducts',
			2: 'Round air ducts',
			3: 'Smoke-extraction air ducts',
			4: 'Flexible air ducts',
			5: 'Components',
			6: 'Ancillary materials',
			7: 'Tools',
			8: 'Personal protective equipment',
		},
		subNames: {
			'rect-1': 'Slide-bar joint',
			'rect-2': 'Busbar-flange joint',
			'rect-3': 'TDF',
			'rect-4': 'Fittings',
			'round-1': 'Straight-seam ducts',
			'round-2': 'Spiral-wound ducts',
			'round-3': 'Duct fittings',
			'round-4': 'Duct connection types',
			'smoke-1': 'Smoke extraction',
			'flex-1': 'Flexible air ducts',
			'comp-1': 'Cassette filters',
			'comp-2': 'Silencer',
			'comp-3': 'Throttle valves',
			'comp-4': 'Deflectors',
			'comp-5': 'Flexible insert',
			'comp-6': 'Weather cap',
			'comp-7': 'Grille',
			'comp-8': 'Insulation',
			'mat-1': 'For air ducts',
			'mat-2': 'For installation 1',
			'mat-3': 'For installation 2',
			'mat-4': 'For installation 3',
			'mat-5': 'For installation 4',
			'mat-6': 'For installation 5',
			'tool-1': 'Tools 1',
			'tool-2': 'Tools 2',
			'tool-3': 'Tools 3',
			'tool-4': 'Tools 4',
			'tool-5': 'Tools 5',
			'siz-1': 'PPE',
		},
		subcategories: {
			'rect-1': {
				title: 'Rectangular air ducts with a slide-bar joint',
				description:
					'Slide-bar air ducts are a reliable and cost-effective solution for ventilation systems.',
			},
			'rect-2': {
				title: 'Rectangular air ducts with a busbar-flange joint',
				description:
					'The busbar-flange system ensures fast installation and high tightness.',
			},
			'rect-3': {
				title: 'Rectangular TDF air ducts',
				description:
					'The TDF system is a modern flange connection without bolts.',
			},
			'rect-4': {
				title: 'Fittings for all types of connections',
				description: 'Bends, transitions, tees and other fittings.',
			},
			'round-1': {
				title: 'Round straight-seam air ducts',
				description: 'Straight-seam air ducts made of galvanized steel.',
			},
			'round-2': {
				title: 'Round spiral-wound air ducts',
				description: 'Spiral-wound air ducts with increased strength.',
			},
			'round-3': {
				title: 'Fittings for round-section air ducts',
				description: 'Galvanized air ducts for long-lasting service.',
			},
			'round-4': {
				title: 'Connection types for round air ducts',
			},
			'smoke-1': {
				title: 'Smoke extraction',
				description:
					'Special air ducts for fire-protection ventilation systems.',
			},
			'flex-1': {
				title: 'Flexible air ducts',
				description: 'Lightweight aluminium flex ducts that are easy to install.',
			},
			'comp-1': {
				title: 'Cassette filters',
				description: 'Flange connections of various types and sizes.',
			},
			'comp-2': {
				title: 'Silencer',
				description: 'Clamps and fastening elements for a secure connection.',
			},
			'comp-3': {
				title: 'Throttle valves',
				description: 'Bends of various angles and diameters.',
			},
			'comp-4': {
				title: 'Deflectors',
				description: 'Flange connections of various types and sizes.',
			},
			'comp-5': {
				title: 'Flexible insert',
				description: 'Clamps and fastening elements for a secure connection.',
			},
			'comp-6': {
				title: 'Weather cap',
				description: 'Bends of various angles and diameters.',
			},
			'comp-7': {
				title: 'Grille',
				description: 'Flange connections of various types and sizes.',
			},
			'comp-8': {
				title: 'Insulation',
				description: 'Clamps and fastening elements for a secure connection.',
			},
			'mat-1': {
				title: 'For air ducts',
				description: 'Sealing materials for airtight connections.',
			},
			'mat-2': {
				title: 'For installation 1',
				description:
					'Hardware, self-tapping screws and rivets for installation.',
			},
			'mat-3': {
				title: 'For installation 2',
				description: 'Thermal and sound insulation materials.',
			},
			'mat-4': {
				title: 'For installation 3',
				description:
					'Hardware, self-tapping screws and rivets for installation.',
			},
			'mat-5': {
				title: 'For installation 4',
				description: 'Thermal and sound insulation materials.',
			},
			'mat-6': {
				title: 'For installation 5',
				description: 'Thermal and sound insulation materials.',
			},
			'tool-1': {
				title: 'Tools 1',
				description: 'Professional shears for cutting air ducts.',
			},
			'tool-2': {
				title: 'Tools 2',
				description: 'A tool for setting rivets.',
			},
			'tool-3': {
				title: 'Tools 3',
				description:
					'Tape measures, protractors and levels for precise installation.',
			},
			'tool-4': {
				title: 'Tools 4',
				description: 'A tool for setting rivets.',
			},
			'tool-5': {
				title: 'Tools 5',
				description:
					'Tape measures, protractors and levels for precise installation.',
			},
			'siz-1': {
				title: 'PPE',
				description: 'Respiratory protection equipment.',
			},
		},
	},
	uz: {
		kicker: 'Mahsulotlar',
		title: 'Havo o‘tkazgichlar, butlovchi qismlar va materiallar katalogi',
		subtitle:
			'Asosiy assortiment bitta ixcham bo‘limda, sahifani ortiqcha cho‘zmasdan.',
		selectedPosition: 'Tanlangan pozitsiya',
		fallbackDescription:
			'Ventilatsiya tizimlarini butlash uchun amaldagi mahsulot katalogidagi pozitsiya.',
		downloadCatalog: 'Katalogni yuklab olish',
		categoryNames: {
			1: 'To‘rtburchak havo o‘tkazgichlar',
			2: 'Doiraviy havo o‘tkazgichlar',
			3: 'Tutun chiqarish havo o‘tkazgichlari',
			4: 'Egiluvchan havo o‘tkazgichlar',
			5: 'Butlovchi buyumlar',
			6: 'Butlovchi materiallar',
			7: 'Asboblar',
			8: 'Shaxsiy himoya vositalari',
		},
		subNames: {
			'rect-1': 'Reyka birikmasi',
			'rect-2': 'Shinoreyka birikmasi',
			'rect-3': 'TDF',
			'rect-4': 'Fasson qismlar',
			'round-1': 'To‘g‘ri chokli havo o‘tkazgichlar',
			'round-2': 'Spiral o‘ralgan havo o‘tkazgichlar',
			'round-3': 'Havo o‘tkazgich fasson qismlari',
			'round-4': 'Havo o‘tkazgich birikma turlari',
			'smoke-1': 'Tutun chiqarish',
			'flex-1': 'Egiluvchan havo o‘tkazgichlar',
			'comp-1': 'Kassetali filtrlar',
			'comp-2': 'Shovqin susaytirgich',
			'comp-3': 'Drossel klapanlari',
			'comp-4': 'Deflektorlar',
			'comp-5': 'Egiluvchan qo‘shimcha',
			'comp-6': 'Qalpoq (zont)',
			'comp-7': 'Panjara',
			'comp-8': 'Izolyatsiya',
			'mat-1': 'Havo o‘tkazgichlar uchun',
			'mat-2': 'Montaj uchun 1',
			'mat-3': 'Montaj uchun 2',
			'mat-4': 'Montaj uchun 3',
			'mat-5': 'Montaj uchun 4',
			'mat-6': 'Montaj uchun 5',
			'tool-1': 'Asboblar 1',
			'tool-2': 'Asboblar 2',
			'tool-3': 'Asboblar 3',
			'tool-4': 'Asboblar 4',
			'tool-5': 'Asboblar 5',
			'siz-1': 'SHV',
		},
		subcategories: {
			'rect-1': {
				title: 'Reyka birikmali to‘rtburchak havo o‘tkazgichlar',
				description:
					'Reyka birikmali havo o‘tkazgichlar - ventilatsiya tizimlari uchun ishonchli va tejamkor yechim.',
			},
			'rect-2': {
				title: 'Shinoreyka birikmali to‘rtburchak havo o‘tkazgichlar',
				description:
					'Shinoreyka tizimi tez montaj va yuqori zichlikni ta’minlaydi.',
			},
			'rect-3': {
				title: 'TDF to‘rtburchak havo o‘tkazgichlar',
				description: 'TDF tizimi - boltsiz zamonaviy flanetsli birikma.',
			},
			'rect-4': {
				title: 'Barcha turdagi birikmalar uchun fasson qismlar',
				description:
					'Burilishlar, o‘tishlar, troyniklar va boshqa fasson buyumlar.',
			},
			'round-1': {
				title: 'Doiraviy to‘g‘ri chokli havo o‘tkazgichlar',
				description:
					'Ruxlangan po‘latdan tayyorlangan to‘g‘ri chokli havo o‘tkazgichlar.',
			},
			'round-2': {
				title: 'Doiraviy spiral o‘ralgan havo o‘tkazgichlar',
				description:
					'Yuqori mustahkamlikdagi spiral o‘ralgan havo o‘tkazgichlar.',
			},
			'round-3': {
				title: 'Doiraviy kesimli havo o‘tkazgichlarning fasson qismlari',
				description:
					'Uzoq muddat xizmat qilish uchun ruxlangan havo o‘tkazgichlar.',
			},
			'round-4': {
				title: 'Doiraviy havo o‘tkazgichlar birikma turlari',
			},
			'smoke-1': {
				title: 'Tutun chiqarish',
				description:
					'Yong‘inga qarshi ventilatsiya tizimlari uchun maxsus havo o‘tkazgichlar.',
			},
			'flex-1': {
				title: 'Egiluvchan havo o‘tkazgichlar',
				description: 'Montaji oson va yengil alyumin gofralar.',
			},
			'comp-1': {
				title: 'Kassetali filtrlar',
				description: 'Turli tur va o‘lchamdagi flanetsli birikmalar.',
			},
			'comp-2': {
				title: 'Shovqin susaytirgich',
				description:
					'Ishonchli birikma uchun xomutlar va mahkamlash elementlari.',
			},
			'comp-3': {
				title: 'Drossel klapanlari',
				description: 'Turli burchak va diametrdagi burilishlar.',
			},
			'comp-4': {
				title: 'Deflektorlar',
				description: 'Turli tur va o‘lchamdagi flanetsli birikmalar.',
			},
			'comp-5': {
				title: 'Egiluvchan qo‘shimcha',
				description:
					'Ishonchli birikma uchun xomutlar va mahkamlash elementlari.',
			},
			'comp-6': {
				title: 'Qalpoq (zont)',
				description: 'Turli burchak va diametrdagi burilishlar.',
			},
			'comp-7': {
				title: 'Panjara',
				description: 'Turli tur va o‘lchamdagi flanetsli birikmalar.',
			},
			'comp-8': {
				title: 'Izolyatsiya',
				description:
					'Ishonchli birikma uchun xomutlar va mahkamlash elementlari.',
			},
			'mat-1': {
				title: 'Havo o‘tkazgichlar uchun',
				description: 'Birikmalar zichligi uchun zichlagich materiallar.',
			},
			'mat-2': {
				title: 'Montaj uchun 1',
				description:
					'Montaj uchun temir buyumlar, o‘z-o‘zidan burg‘ilanadigan vintlar, parchinlar.',
			},
			'mat-3': {
				title: 'Montaj uchun 2',
				description: 'Issiqlik va tovush izolyatsiyasi materiallari.',
			},
			'mat-4': {
				title: 'Montaj uchun 3',
				description:
					'Montaj uchun temir buyumlar, o‘z-o‘zidan burg‘ilanadigan vintlar, parchinlar.',
			},
			'mat-5': {
				title: 'Montaj uchun 4',
				description: 'Issiqlik va tovush izolyatsiyasi materiallari.',
			},
			'mat-6': {
				title: 'Montaj uchun 5',
				description: 'Issiqlik va tovush izolyatsiyasi materiallari.',
			},
			'tool-1': {
				title: 'Asboblar 1',
				description: 'Havo o‘tkazgichlarni kesish uchun professional qaychilar.',
			},
			'tool-2': {
				title: 'Asboblar 2',
				description: 'Parchinlarni o‘rnatish uchun asbob.',
			},
			'tool-3': {
				title: 'Asboblar 3',
				description:
					'Aniq montaj uchun ruletkalar, burchak o‘lchagichlar, sathlar.',
			},
			'tool-4': {
				title: 'Asboblar 4',
				description: 'Parchinlarni o‘rnatish uchun asbob.',
			},
			'tool-5': {
				title: 'Asboblar 5',
				description:
					'Aniq montaj uchun ruletkalar, burchak o‘lchagichlar, sathlar.',
			},
			'siz-1': {
				title: 'SHV',
				description: 'Nafas olish organlarini himoya qilish vositalari.',
			},
		},
	},
}

const Products = () => {
	const { lang } = useLanguage()
	const t = content[lang]
	const [isVisible, setIsVisible] = useState(false)
	const [selectedCategory, setSelectedCategory] = useState(0)
	const [openCategory, setOpenCategory] = useState<number | null>(0)
	const [selectedSubcategory, setSelectedSubcategory] = useState('rect-1')
	const sectionRef = useRef<HTMLDivElement>(null)

	const categories = productCategories.map(category => ({
		id: category.id,
		name: t.categoryNames[category.id],
		subcategories: category.subcategoryIds.map(id => ({
			id,
			name: t.subNames[id],
		})),
	}))

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
		const firstSubcategory = productCategories[index].subcategoryIds?.[0]
		if (firstSubcategory) setSelectedSubcategory(firstSubcategory)
	}

	const currentData =
		t.subcategories[selectedSubcategory] || t.subcategories['rect-1']
	const currentImage =
		subcategoryImages[selectedSubcategory] || subcategoryImages['rect-1']

	return (
		<section id='products' ref={sectionRef} className='overflow-hidden py-10 md:py-14'>
			<div className='section-shell'>
				<div className='mb-6 max-w-3xl md:mb-8'>
					<span className='section-kicker'>{t.kicker}</span>
					<h2 className='section-title mt-4'>{t.title}</h2>
					<p className='section-subtitle mt-4'>{t.subtitle}</p>
				</div>

				<div className='grid items-start gap-6 lg:grid-cols-[minmax(320px,0.92fr)_minmax(0,1.08fr)]'>
					<div
						className={`transition-all duration-1000 ${
							isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
						}`}
					>
						<div className='surface-card p-5 md:p-6 lg:sticky lg:top-24'>
							<div className='space-y-2'>
								{categories.map((category, index) => (
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
										{t.selectedPosition}
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
									src={currentImage}
									alt={currentData.title}
									className='max-h-full max-w-full object-contain transition-all duration-500'
								/>
							</div>

							<div className='px-5 py-5 md:px-6'>
								<p className='text-sm leading-7 text-slate-600 dark:text-slate-300'>
									{currentData.description || t.fallbackDescription}
								</p>
								<button
									onClick={handleDownload}
									className='liquid-button liquid-button-primary mt-4 px-4 py-3 text-sm font-semibold'
								>
									<Download size={18} />
									{t.downloadCatalog}
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
