'use client'

import { useEffect, useState } from 'react'

export const useCarousel = (itemCount: number, autoScrollInterval = 2000) => {
	const [currentIndex, setCurrentIndex] = useState(0)

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentIndex(prev => (prev + 1) % itemCount)
		}, autoScrollInterval)

		return () => clearInterval(timer)
	}, [itemCount, autoScrollInterval])

	const goToPrevious = () => {
		setCurrentIndex(prev => (prev - 1 + itemCount) % itemCount)
	}

	const goToNext = () => {
		setCurrentIndex(prev => (prev + 1) % itemCount)
	}

	return { currentIndex, goToPrevious, goToNext, setCurrentIndex }
}
