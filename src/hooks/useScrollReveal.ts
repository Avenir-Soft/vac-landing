import { useEffect, useRef, useState } from 'react'

export const useScrollReveal = () => {
	const ref = useRef<HTMLDivElement | null>(null)
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		const element = ref.current
		if (!element) return

		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						setIsVisible(true)
						observer.unobserve(element) // чтобы анимация была 1 раз
					}
				})
			},
			{ threshold: 0.5 }
		)

		observer.observe(element)

		return () => observer.disconnect()
	}, [])

	return { ref, isVisible }
}
