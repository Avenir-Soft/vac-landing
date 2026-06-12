import type { DiagramKey } from '../lib/calculator'

// Собственные технические схемы изделий (оригинальная графика VAC.UZ).
// Линии — currentColor (тянутся под тему), подписи размеров совпадают с полями.

const Svg = ({ children }: { children: React.ReactNode }) => (
	<svg
		viewBox='0 0 220 150'
		fill='none'
		className='h-full w-full text-slate-400 dark:text-slate-500'
		stroke='currentColor'
		strokeWidth={2}
		strokeLinecap='round'
		strokeLinejoin='round'
	>
		{children}
	</svg>
)

// подпись размера
const T = ({ x, y, children }: { x: number; y: number; children: string }) => (
	<text
		x={x}
		y={y}
		fontSize={12}
		fontWeight={700}
		fill='currentColor'
		stroke='none'
		textAnchor='middle'
		dominantBaseline='middle'
	>
		{children}
	</text>
)

// тонкая выносная/размерная линия
const dim = { strokeWidth: 1, opacity: 0.7 } as const

const diagrams: Record<DiagramKey, React.ReactNode> = {
	ductRound: (
		<Svg>
			<ellipse cx={55} cy={70} rx={15} ry={40} />
			<line x1={55} y1={30} x2={170} y2={30} />
			<line x1={55} y1={110} x2={170} y2={110} />
			<ellipse cx={170} cy={70} rx={15} ry={40} strokeDasharray='4 5' />
			<line x1={30} y1={30} x2={30} y2={110} {...dim} />
			<T x={20} y={70}>
				Ø
			</T>
			<line x1={55} y1={128} x2={170} y2={128} {...dim} />
			<T x={112} y={140}>
				L
			</T>
		</Svg>
	),
	ductRect: (
		<Svg>
			<path d='M45 50 L150 50 L180 30 L75 30 Z' />
			<path d='M45 50 L45 115 L150 115 L150 50' />
			<path d='M150 115 L180 95 L180 30' />
			<T x={97} y={88}>
				A
			</T>
			<line x1={33} y1={50} x2={33} y2={115} {...dim} />
			<T x={24} y={82}>
				B
			</T>
			<line x1={150} y1={128} x2={45} y2={128} {...dim} />
			<T x={97} y={140}>
				L
			</T>
		</Svg>
	),
	elbow: (
		<Svg>
			<path d='M40 120 L40 78 Q40 45 73 45 L120 45' />
			<path d='M72 120 L72 82 Q72 77 78 77 L120 77' />
			<line x1={40} y1={120} x2={72} y2={120} />
			<line x1={120} y1={45} x2={120} y2={77} />
			<path d='M40 95 Q44 70 66 60' {...dim} />
			<T x={92} y={36}>
				Ø / A·B
			</T>
			<T x={52} y={104}>
				α
			</T>
		</Svg>
	),
	transition: (
		<Svg>
			<line x1={50} y1={28} x2={50} y2={112} />
			<line x1={170} y1={55} x2={170} y2={85} />
			<line x1={50} y1={28} x2={170} y2={55} />
			<line x1={50} y1={112} x2={170} y2={85} />
			<line x1={34} y1={28} x2={34} y2={112} {...dim} />
			<T x={24} y={70}>
				1
			</T>
			<line x1={186} y1={55} x2={186} y2={85} {...dim} />
			<T x={196} y={70}>
				2
			</T>
			<line x1={50} y1={128} x2={170} y2={128} {...dim} />
			<T x={110} y={140}>
				L
			</T>
		</Svg>
	),
	incut: (
		<Svg>
			<rect x={28} y={78} width={164} height={42} rx={5} />
			<path d='M92 78 L92 40 L132 40 L132 78' />
			<line x1={92} y1={40} x2={132} y2={40} />
			<T x={112} y={102}>
				магистраль
			</T>
			<line x1={92} y1={30} x2={132} y2={30} {...dim} />
			<T x={112} y={22}>
				Ø / A·B
			</T>
		</Svg>
	),
	tee: (
		<Svg>
			<rect x={24} y={74} width={172} height={44} rx={5} />
			<path d='M88 74 L88 34 L132 34 L132 74' />
			<line x1={88} y1={34} x2={132} y2={34} />
			<T x={56} y={98}>
				L
			</T>
			<T x={150} y={98}>
				L
			</T>
			<T x={110} y={26}>
				L2
			</T>
		</Svg>
	),
	cap: (
		<Svg>
			<ellipse cx={78} cy={75} rx={18} ry={44} />
			<line x1={78} y1={31} x2={138} y2={31} />
			<line x1={78} y1={119} x2={138} y2={119} />
			<path d='M138 31 Q156 75 138 119' />
			<line x1={56} y1={31} x2={56} y2={119} {...dim} />
			<T x={46} y={75}>
				Ø
			</T>
		</Svg>
	),
	offset: (
		<Svg>
			<path d='M30 104 L86 104 L130 50 L186 50' />
			<path d='M30 74 L78 74 L122 20 L186 20' />
			<line x1={30} y1={74} x2={30} y2={104} />
			<line x1={186} y1={20} x2={186} y2={50} />
			<line x1={200} y1={35} x2={200} y2={90} {...dim} />
			<T x={208} y={62}>
				H
			</T>
			<line x1={86} y1={120} x2={130} y2={120} {...dim} />
			<T x={108} y={132}>
				L
			</T>
		</Svg>
	),
	hood: (
		<Svg>
			<path d='M30 62 L110 24 L190 62' />
			<line x1={30} y1={62} x2={190} y2={62} />
			<line x1={98} y1={62} x2={98} y2={118} />
			<line x1={122} y1={62} x2={122} y2={118} />
			<line x1={98} y1={118} x2={122} y2={118} />
			<line x1={206} y1={26} x2={206} y2={62} {...dim} />
			<T x={210} y={44}>
				H
			</T>
			<line x1={30} y1={76} x2={190} y2={76} {...dim} />
			<T x={110} y={88}>
				A · B
			</T>
		</Svg>
	),
}

const CalculatorSchematic = ({ diagram }: { diagram: DiagramKey }) => (
	<>{diagrams[diagram]}</>
)

export default CalculatorSchematic
