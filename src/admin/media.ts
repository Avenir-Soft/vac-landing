import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist'
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

GlobalWorkerOptions.workerSrc = pdfWorkerUrl

const canvasToBlob = (
	canvas: HTMLCanvasElement,
	type: string,
	quality: number,
): Promise<Blob> =>
	new Promise((resolve, reject) =>
		canvas.toBlob(
			blob => (blob ? resolve(blob) : reject(new Error('Не удалось сжать изображение'))),
			type,
			quality,
		),
	)

/**
 * Уменьшает фото до maxSide по длинной стороне и пережимает в JPEG.
 * Заодно выкидывает EXIF (геометка и т.п.) и учитывает поворот с телефона.
 */
export const prepareGalleryPhoto = async (
	file: File,
	maxSide = 2400,
): Promise<Blob> => {
	const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' })
	const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height))
	const canvas = document.createElement('canvas')
	canvas.width = Math.round(bitmap.width * scale)
	canvas.height = Math.round(bitmap.height * scale)
	const ctx = canvas.getContext('2d')!
	ctx.fillStyle = '#fff'
	ctx.fillRect(0, 0, canvas.width, canvas.height)
	ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
	bitmap.close()
	return canvasToBlob(canvas, 'image/jpeg', 0.86)
}

/**
 * Рендерит каждую страницу PDF в картинку шириной `width` px — так прайс
 * показывается на сайте «как фото». WebP, если браузер умеет, иначе JPEG.
 */
export const renderPdfPages = async (
	file: Blob,
	onProgress?: (done: number, total: number) => void,
	width = 1600,
): Promise<Blob[]> => {
	const task = getDocument({ data: new Uint8Array(await file.arrayBuffer()) })
	const pages: Blob[] = []
	try {
		const pdf = await task.promise
		for (let n = 1; n <= pdf.numPages; n++) {
			const page = await pdf.getPage(n)
			const base = page.getViewport({ scale: 1 })
			const viewport = page.getViewport({ scale: width / base.width })
			const canvas = document.createElement('canvas')
			canvas.width = Math.round(viewport.width)
			canvas.height = Math.round(viewport.height)
			const ctx = canvas.getContext('2d')!
			ctx.fillStyle = '#fff'
			ctx.fillRect(0, 0, canvas.width, canvas.height)
			await page.render({ canvasContext: ctx, canvas, viewport }).promise
			let blob = await canvasToBlob(canvas, 'image/webp', 0.88)
			// Старый Safari вместо WebP молча отдаёт PNG — тогда берём JPEG.
			if (blob.type !== 'image/webp') blob = await canvasToBlob(canvas, 'image/jpeg', 0.9)
			pages.push(blob)
			page.cleanup()
			onProgress?.(n, pdf.numPages)
		}
	} finally {
		await task.destroy()
	}
	return pages
}
