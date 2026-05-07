// import { useEffect, useState } from 'react'
// import gyal from '../assets/gyal.png'

// interface PreloaderProps {
// 	onLoadingComplete?: () => void
// 	duration?: number
// }

// const Preloader = ({ onLoadingComplete, duration = 500 }: PreloaderProps) => {
// 	const [isVisible, setIsVisible] = useState(true)

// 	useEffect(() => {
// 		const timer = setTimeout(() => {
// 			setIsVisible(false)
// 			if (onLoadingComplete) {
// 				onLoadingComplete()
// 			}
// 		}, duration)

// 		return () => clearTimeout(timer)
// 	}, [duration, onLoadingComplete])

// 	if (!isVisible) return null

// 	return (
// 		<div className='fixed inset-0 z-[9999] flex items-center justify-center bg-white/90 backdrop-blur-md'>
// 			<img
// 				src={gyal}
// 				alt=''
// 				className='w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[48rem] lg:h-[48rem] object-contain'
// 			/>
// 		</div>
// 	)
// }

// export default Preloader
