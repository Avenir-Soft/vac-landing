import {
	type CSSProperties,
	type FC,
	type SVGProps,
	memo,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react'
import { createPortal } from 'react-dom'

type SvgProps = SVGProps<SVGSVGElement>

// Shared geometry (in SVG units = px when rendered 1:1):
//   D = 56  pipe diameter
//   F = 10  flange thickness along axis
//   T = 64  bbox thick-axis (D + 4 px overhang each side for the flange)
//   C = 96  corner box; each branch centerline is 32 px from the outer edge.

const SpiralH: FC<SvgProps> = props => (
	<svg viewBox='0 0 200 64' fill='none' preserveAspectRatio='none' {...props}>
		<rect
			x='10'
			y='4'
			width='180'
			height='56'
			rx='1.5'
			stroke='currentColor'
			strokeWidth='1.6'
			fill='currentColor'
			fillOpacity='0.05'
		/>
		{Array.from({ length: 11 }).map((_, i) => (
			<line
				key={i}
				x1={14 + i * 16}
				y1={4}
				x2={30 + i * 16}
				y2={60}
				stroke='currentColor'
				strokeWidth='0.7'
				opacity='0.42'
			/>
		))}
		<line x1='10' y1='12' x2='190' y2='12' stroke='currentColor' strokeWidth='0.5' opacity='0.4' />
		<line x1='10' y1='52' x2='190' y2='52' stroke='currentColor' strokeWidth='0.5' opacity='0.4' />
		<rect x='0' y='0' width='10' height='64' stroke='currentColor' strokeWidth='1.4' fill='currentColor' fillOpacity='0.1' />
		<rect x='190' y='0' width='10' height='64' stroke='currentColor' strokeWidth='1.4' fill='currentColor' fillOpacity='0.1' />
		<line
			x1='14'
			y1='32'
			x2='186'
			y2='32'
			stroke='currentColor'
			strokeWidth='1.4'
			strokeDasharray='4 7'
			className='duct-flow'
			opacity='0.7'
		/>
	</svg>
)

const SpiralV: FC<SvgProps> = props => (
	<svg viewBox='0 0 64 200' fill='none' preserveAspectRatio='none' {...props}>
		<rect
			x='4'
			y='10'
			width='56'
			height='180'
			rx='1.5'
			stroke='currentColor'
			strokeWidth='1.6'
			fill='currentColor'
			fillOpacity='0.05'
		/>
		{Array.from({ length: 11 }).map((_, i) => (
			<line
				key={i}
				x1={4}
				y1={14 + i * 16}
				x2={60}
				y2={30 + i * 16}
				stroke='currentColor'
				strokeWidth='0.7'
				opacity='0.42'
			/>
		))}
		<line x1='12' y1='10' x2='12' y2='190' stroke='currentColor' strokeWidth='0.5' opacity='0.4' />
		<line x1='52' y1='10' x2='52' y2='190' stroke='currentColor' strokeWidth='0.5' opacity='0.4' />
		<rect x='0' y='0' width='64' height='10' stroke='currentColor' strokeWidth='1.4' fill='currentColor' fillOpacity='0.1' />
		<rect x='0' y='190' width='64' height='10' stroke='currentColor' strokeWidth='1.4' fill='currentColor' fillOpacity='0.1' />
		<line
			x1='32'
			y1='14'
			x2='32'
			y2='186'
			stroke='currentColor'
			strokeWidth='1.4'
			strokeDasharray='4 7'
			className='duct-flow'
			opacity='0.7'
		/>
	</svg>
)

const RectH: FC<SvgProps> = props => (
	<svg viewBox='0 0 200 64' fill='none' preserveAspectRatio='none' {...props}>
		<rect
			x='10'
			y='4'
			width='180'
			height='56'
			stroke='currentColor'
			strokeWidth='1.6'
			fill='currentColor'
			fillOpacity='0.05'
		/>
		<line x1='10' y1='12' x2='190' y2='12' stroke='currentColor' strokeWidth='0.6' opacity='0.38' />
		<line x1='10' y1='52' x2='190' y2='52' stroke='currentColor' strokeWidth='0.6' opacity='0.38' />
		<line x1='34' y1='4' x2='34' y2='60' stroke='currentColor' strokeWidth='0.55' opacity='0.34' />
		<line x1='98' y1='4' x2='98' y2='60' stroke='currentColor' strokeWidth='0.55' opacity='0.34' />
		<line x1='162' y1='4' x2='162' y2='60' stroke='currentColor' strokeWidth='0.55' opacity='0.34' />
		<rect x='0' y='0' width='10' height='64' stroke='currentColor' strokeWidth='1.4' fill='currentColor' fillOpacity='0.1' />
		<rect x='190' y='0' width='10' height='64' stroke='currentColor' strokeWidth='1.4' fill='currentColor' fillOpacity='0.1' />
		<line
			x1='14'
			y1='32'
			x2='186'
			y2='32'
			stroke='currentColor'
			strokeWidth='1.4'
			strokeDasharray='4 7'
			className='duct-flow'
			opacity='0.7'
		/>
	</svg>
)

const RectV: FC<SvgProps> = props => (
	<svg viewBox='0 0 64 200' fill='none' preserveAspectRatio='none' {...props}>
		<rect
			x='4'
			y='10'
			width='56'
			height='180'
			stroke='currentColor'
			strokeWidth='1.6'
			fill='currentColor'
			fillOpacity='0.05'
		/>
		<line x1='12' y1='10' x2='12' y2='190' stroke='currentColor' strokeWidth='0.6' opacity='0.38' />
		<line x1='52' y1='10' x2='52' y2='190' stroke='currentColor' strokeWidth='0.6' opacity='0.38' />
		<line x1='4' y1='50' x2='60' y2='50' stroke='currentColor' strokeWidth='0.55' opacity='0.34' />
		<line x1='4' y1='100' x2='60' y2='100' stroke='currentColor' strokeWidth='0.55' opacity='0.34' />
		<line x1='4' y1='150' x2='60' y2='150' stroke='currentColor' strokeWidth='0.55' opacity='0.34' />
		<rect x='0' y='0' width='64' height='10' stroke='currentColor' strokeWidth='1.4' fill='currentColor' fillOpacity='0.1' />
		<rect x='0' y='190' width='64' height='10' stroke='currentColor' strokeWidth='1.4' fill='currentColor' fillOpacity='0.1' />
		<line
			x1='32'
			y1='14'
			x2='32'
			y2='186'
			stroke='currentColor'
			strokeWidth='1.4'
			strokeDasharray='4 7'
			className='duct-flow'
			opacity='0.7'
		/>
	</svg>
)

const Elbow: FC<SvgProps> = props => (
	<svg viewBox='0 0 96 96' fill='none' {...props}>
		<path
			d='M 4 96 L 4 64 A 60 60 0 0 1 64 4 L 96 4 L 96 60 L 64 60 A 4 4 0 0 0 60 64 L 60 96 Z'
			stroke='currentColor'
			strokeWidth='1.6'
			fill='currentColor'
			fillOpacity='0.05'
		/>
		<path
			d='M 14 96 L 14 64 A 50 50 0 0 1 64 14 L 96 14'
			stroke='currentColor'
			strokeWidth='0.55'
			opacity='0.4'
			fill='none'
		/>
		<path
			d='M 50 96 L 50 64 A 14 14 0 0 1 64 50 L 96 50'
			stroke='currentColor'
			strokeWidth='0.55'
			opacity='0.4'
			fill='none'
		/>
		<rect x='0' y='86' width='64' height='10' stroke='currentColor' strokeWidth='1.4' fill='currentColor' fillOpacity='0.1' />
		<rect x='86' y='0' width='10' height='64' stroke='currentColor' strokeWidth='1.4' fill='currentColor' fillOpacity='0.1' />
		<path
			d='M 32 92 L 32 64 A 32 32 0 0 1 64 32 L 92 32'
			stroke='currentColor'
			strokeWidth='1.4'
			strokeDasharray='4 7'
			className='duct-flow'
			fill='none'
			opacity='0.7'
		/>
	</svg>
)

const ReducerH: FC<SvgProps> = props => (
	<svg viewBox='0 0 140 64' fill='none' preserveAspectRatio='none' {...props}>
		<path
			d='M 10 4 L 130 18 L 130 46 L 10 60 Z'
			stroke='currentColor'
			strokeWidth='1.6'
			fill='currentColor'
			fillOpacity='0.05'
		/>
		<line x1='14' y1='6' x2='126' y2='20' stroke='currentColor' strokeWidth='0.5' opacity='0.4' />
		<line x1='14' y1='58' x2='126' y2='44' stroke='currentColor' strokeWidth='0.5' opacity='0.4' />
		<rect x='0' y='0' width='10' height='64' stroke='currentColor' strokeWidth='1.4' fill='currentColor' fillOpacity='0.1' />
		<rect x='130' y='0' width='10' height='64' stroke='currentColor' strokeWidth='1.4' fill='currentColor' fillOpacity='0.1' />
		<line
			x1='14'
			y1='32'
			x2='126'
			y2='32'
			stroke='currentColor'
			strokeWidth='1.4'
			strokeDasharray='4 7'
			className='duct-flow'
			opacity='0.7'
		/>
	</svg>
)

const Cross: FC<SvgProps> = props => (
	<svg viewBox='0 0 96 96' fill='none' {...props}>
		<rect x='0' y='32' width='96' height='32' stroke='currentColor' strokeWidth='1.6' fill='currentColor' fillOpacity='0.05' />
		<rect x='32' y='0' width='32' height='96' stroke='currentColor' strokeWidth='1.6' fill='currentColor' fillOpacity='0.05' />
		<line x1='32' y1='32' x2='64' y2='32' stroke='currentColor' strokeWidth='1.6' />
		<line x1='32' y1='64' x2='64' y2='64' stroke='currentColor' strokeWidth='1.6' />
		<rect x='0' y='28' width='8' height='40' stroke='currentColor' strokeWidth='1.4' fill='currentColor' fillOpacity='0.1' />
		<rect x='88' y='28' width='8' height='40' stroke='currentColor' strokeWidth='1.4' fill='currentColor' fillOpacity='0.1' />
		<rect x='28' y='0' width='40' height='8' stroke='currentColor' strokeWidth='1.4' fill='currentColor' fillOpacity='0.1' />
		<rect x='28' y='88' width='40' height='8' stroke='currentColor' strokeWidth='1.4' fill='currentColor' fillOpacity='0.1' />
		<line
			x1='10'
			y1='48'
			x2='86'
			y2='48'
			stroke='currentColor'
			strokeWidth='1.4'
			strokeDasharray='4 7'
			className='duct-flow'
			opacity='0.7'
		/>
		<line
			x1='48'
			y1='10'
			x2='48'
			y2='86'
			stroke='currentColor'
			strokeWidth='1.4'
			strokeDasharray='4 7'
			className='duct-flow'
			opacity='0.7'
		/>
	</svg>
)

type Piece = {
	id: string
	name: string
	description: string
	posClass: string
	width: number
	height: number
	widthCss?: string
	heightCss?: string
	rotate?: number
	tipBelow?: boolean
	Component: FC<SvgProps>
}

const pieces: Piece[] = [
	// Right side: vertical duct · cross · vertical duct · BR
	{ id: 'r1-rect', name: 'Прямоугольный воздуховод', description: 'Вертикальный участок',
		posClass: 'duct-pos-r1', width: 64, height: 200, heightCss: '100%', Component: RectV },
	{ id: 'r-cross', name: 'Крестовина', description: 'Боковое соединение линий',
		posClass: 'duct-pos-r-cross', width: 96, height: 96, Component: Cross },
	{ id: 'r2-pipe', name: 'Спирально-навивной воздуховод', description: 'Вертикальный участок',
		posClass: 'duct-pos-r2', width: 64, height: 200, heightCss: '100%', Component: SpiralV },

	// Bottom row: BL · rectangular duct · reducer · spiral duct · BR
	{ id: 'br-elbow', name: 'Отвод 90°', description: 'Поворот круглого канала',
		posClass: 'duct-pos-br', width: 96, height: 96, rotate: 180, Component: Elbow },
	{ id: 'b-right-spiral', name: 'Спирально-навивной воздуховод', description: 'Нижний круглый участок',
		posClass: 'duct-pos-b-right', width: 200, height: 64, widthCss: '100%', Component: SpiralH },
	{ id: 'b-reducer', name: 'Переход', description: 'Изменение сечения на магистрали',
		posClass: 'duct-pos-b-reducer', width: 140, height: 64, Component: ReducerH },
	{ id: 'b-left-rect', name: 'Прямоугольный воздуховод', description: 'Нижний прямоугольный участок',
		posClass: 'duct-pos-b-left', width: 200, height: 64, widthCss: '100%', Component: RectH },
	{ id: 'bl-elbow', name: 'Отвод 90°', description: 'Поворот круглого канала',
		posClass: 'duct-pos-bl', width: 96, height: 96, rotate: 270, Component: Elbow },

	// Left side: vertical duct · cross · vertical duct · BL
	{ id: 'l1-pipe', name: 'Спирально-навивной воздуховод', description: 'Вертикальный участок',
		posClass: 'duct-pos-l1', width: 64, height: 200, heightCss: '100%', Component: SpiralV },
	{ id: 'l-cross', name: 'Крестовина', description: 'Боковое соединение линий',
		posClass: 'duct-pos-l-cross', width: 96, height: 96, Component: Cross },
	{ id: 'l2-rect', name: 'Прямоугольный воздуховод', description: 'Вертикальный участок',
		posClass: 'duct-pos-l2', width: 64, height: 200, heightCss: '100%', Component: RectV },
]

const TOOLTIP_GAP = 14
const TOOLTIP_EDGE_SPACE = 260

type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right'

type TooltipState = {
	piece: Piece
	x: number
	y: number
	placement: TooltipPlacement
} | null

const DuctPiece = memo<{
	piece: Piece
	delay: number
	onShow: (state: TooltipState) => void
	onHide: () => void
}>(({ piece, delay, onShow, onHide }) => {
	const ref = useRef<HTMLDivElement>(null)

	const updateTooltip = useCallback(() => {
		if (!ref.current) return
		const rect = ref.current.getBoundingClientRect()
		const viewportWidth = window.innerWidth
		let placement: TooltipPlacement = 'top'
		let x = rect.left + rect.width / 2
		let y = rect.top - TOOLTIP_GAP

		if (rect.right > viewportWidth - TOOLTIP_EDGE_SPACE) {
			placement = 'left'
			x = rect.left - TOOLTIP_GAP
			y = rect.top + rect.height / 2
		} else if (rect.left < TOOLTIP_EDGE_SPACE) {
			placement = 'right'
			x = rect.right + TOOLTIP_GAP
			y = rect.top + rect.height / 2
		} else if ((piece.tipBelow ?? false) || rect.top < 90) {
			placement = 'bottom'
			y = rect.bottom + TOOLTIP_GAP
		}

		onShow({
			piece,
			x,
			y,
			placement,
		})
	}, [piece, onShow])

	const artStyle: CSSProperties = {
		width: piece.widthCss ?? `${piece.width}px`,
		height: piece.heightCss ?? `${piece.height}px`,
	}
	if (piece.rotate) artStyle.rotate = `${piece.rotate}deg`

	return (
		<div
			ref={ref}
			className={`duct-piece ${piece.posClass}`}
			style={{ '--duct-delay': `${delay}s` } as CSSProperties}
			onMouseEnter={updateTooltip}
			onMouseLeave={onHide}
			onFocus={updateTooltip}
			onBlur={onHide}
			tabIndex={0}
			role='button'
			aria-label={piece.name}
		>
			<div className='duct-art' style={artStyle}>
				<piece.Component className='duct-svg' />
			</div>
		</div>
	)
})

DuctPiece.displayName = 'DuctPiece'

export const DuctSystem = () => {
	const [tooltip, setTooltip] = useState<TooltipState>(null)
	const [mounted, setMounted] = useState(false)

	useEffect(() => setMounted(true), [])

	useEffect(() => {
		if (!tooltip) return
		const onScroll = () => setTooltip(null)
		window.addEventListener('scroll', onScroll, { passive: true })
		window.addEventListener('resize', onScroll)
		return () => {
			window.removeEventListener('scroll', onScroll)
			window.removeEventListener('resize', onScroll)
		}
	}, [tooltip])

	const hide = useCallback(() => setTooltip(null), [])

	return (
		<div className='hero-duct-system' role='presentation'>
			{pieces.map((p, i) => (
				<DuctPiece
					key={p.id}
					piece={p}
					delay={i * 0.05}
					onShow={setTooltip}
					onHide={hide}
				/>
			))}
			{mounted && tooltip
				? createPortal(
						<div
							className={`duct-tooltip-portal duct-tooltip-portal-${tooltip.placement}`}
							style={{ left: tooltip.x, top: tooltip.y }}
							role='tooltip'
						>
							<strong>{tooltip.piece.name}</strong>
							<span>{tooltip.piece.description}</span>
						</div>,
						document.body,
				  )
				: null}
		</div>
	)
}

export default DuctSystem
