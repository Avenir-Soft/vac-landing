/** Перемещает элемент массива с позиции from на позицию to. */
export const move = <T>(list: T[], from: number, to: number): T[] => {
	if (to < 0 || to >= list.length || from === to) return list
	const next = [...list]
	const [item] = next.splice(from, 1)
	next.splice(to, 0, item)
	return next
}

export const errorText = (error: unknown) =>
	error instanceof Error ? error.message : String(error)
