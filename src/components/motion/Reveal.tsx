import {
	motion,
	useReducedMotion,
	type HTMLMotionProps,
	type Variants,
} from 'framer-motion'

/**
 * Плавные scroll-reveal анимации на framer-motion.
 *
 * Все компоненты уважают `prefers-reduced-motion`: при включённой настройке
 * движение отключается, остаётся только мгновенное появление (без сдвигов).
 *
 * Длительности 0.45–0.6s и easing совпадают с остальным сайтом (ui-ux-pro-max:
 * micro-interactions 150–300ms, входные анимации — плавные, transform/opacity).
 */

const EASE = [0.22, 1, 0.36, 1] as const

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

const offsetFor = (direction: Direction, distance: number) => {
	switch (direction) {
		case 'up':
			return { y: distance }
		case 'down':
			return { y: -distance }
		case 'left':
			return { x: distance }
		case 'right':
			return { x: -distance }
		default:
			return {}
	}
}

type RevealProps = HTMLMotionProps<'div'> & {
	/** Сторона, с которой «выезжает» элемент. */
	direction?: Direction
	/** Дистанция сдвига в px. */
	distance?: number
	/** Задержка перед стартом, сек. */
	delay?: number
	/** Длительность, сек. */
	duration?: number
	/** Запускать один раз (по умолчанию) или каждый раз при попадании во вьюпорт. */
	once?: boolean
}

export const Reveal = ({
	direction = 'up',
	distance = 28,
	delay = 0,
	duration = 0.6,
	once = true,
	children,
	...rest
}: RevealProps) => {
	const reduceMotion = useReducedMotion()

	const variants: Variants = {
		hidden: reduceMotion
			? { opacity: 0 }
			: { opacity: 0, ...offsetFor(direction, distance) },
		visible: {
			opacity: 1,
			x: 0,
			y: 0,
			transition: { duration: reduceMotion ? 0.2 : duration, ease: EASE, delay },
		},
	}

	return (
		<motion.div
			initial='hidden'
			whileInView='visible'
			viewport={{ once, amount: 0.2 }}
			variants={variants}
			{...rest}
		>
			{children}
		</motion.div>
	)
}

type StaggerProps = HTMLMotionProps<'div'> & {
	/** Пауза между появлением дочерних элементов, сек. */
	stagger?: number
	delay?: number
	once?: boolean
}

/** Контейнер, который последовательно раскрывает дочерние <StaggerItem>. */
export const Stagger = ({
	stagger = 0.1,
	delay = 0.05,
	once = true,
	children,
	...rest
}: StaggerProps) => {
	const variants: Variants = {
		hidden: {},
		visible: {
			transition: { staggerChildren: stagger, delayChildren: delay },
		},
	}

	return (
		<motion.div
			initial='hidden'
			whileInView='visible'
			viewport={{ once, amount: 0.2 }}
			variants={variants}
			{...rest}
		>
			{children}
		</motion.div>
	)
}

type StaggerItemProps = HTMLMotionProps<'div'> & {
	direction?: Direction
	distance?: number
	duration?: number
}

export const StaggerItem = ({
	direction = 'up',
	distance = 24,
	duration = 0.55,
	children,
	...rest
}: StaggerItemProps) => {
	const reduceMotion = useReducedMotion()

	const variants: Variants = {
		hidden: reduceMotion
			? { opacity: 0 }
			: { opacity: 0, ...offsetFor(direction, distance) },
		visible: {
			opacity: 1,
			x: 0,
			y: 0,
			transition: { duration: reduceMotion ? 0.2 : duration, ease: EASE },
		},
	}

	return (
		<motion.div variants={variants} {...rest}>
			{children}
		</motion.div>
	)
}
