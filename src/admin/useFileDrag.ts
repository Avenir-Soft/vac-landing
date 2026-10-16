import { useEffect, useRef, useState } from 'react'

export const hasFiles = (e: { dataTransfer: DataTransfer | null }) =>
	e.dataTransfer?.types.includes('Files') ?? false

/**
 * `true`, пока над окном тащат файлы с компьютера. Заодно не даёт браузеру
 * открыть файл, брошенный мимо зоны загрузки (и потерять несохранённое).
 * `onFiles` — если передан, получает файлы, брошенные в любое место окна.
 */
export const useFileDrag = (active: boolean, onFiles?: (files: FileList) => void) => {
	const [dragging, setDragging] = useState(false)
	const onFilesRef = useRef(onFiles)
	useEffect(() => {
		onFilesRef.current = onFiles
	})
	useEffect(() => {
		if (!active) return
		let depth = 0
		const onEnter = (e: DragEvent) => {
			if (!hasFiles(e)) return
			depth++
			setDragging(true)
		}
		const onLeave = (e: DragEvent) => {
			if (!hasFiles(e)) return
			depth = Math.max(0, depth - 1)
			if (!depth) setDragging(false)
		}
		const onOver = (e: DragEvent) => {
			if (hasFiles(e)) e.preventDefault()
		}
		const onDrop = (e: DragEvent) => {
			if (!hasFiles(e)) return
			e.preventDefault()
			depth = 0
			setDragging(false)
			if (e.dataTransfer?.files.length) onFilesRef.current?.(e.dataTransfer.files)
		}
		window.addEventListener('dragenter', onEnter)
		window.addEventListener('dragleave', onLeave)
		window.addEventListener('dragover', onOver)
		window.addEventListener('drop', onDrop)
		return () => {
			window.removeEventListener('dragenter', onEnter)
			window.removeEventListener('dragleave', onLeave)
			window.removeEventListener('dragover', onOver)
			window.removeEventListener('drop', onDrop)
			setDragging(false)
		}
	}, [active])
	return dragging
}
