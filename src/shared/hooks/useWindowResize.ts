import { useCallback, useEffect, useState } from 'react'

interface SizingsSchema {
	width: number
	height: number
}

export const useWindowResize = () => {
	const [sizings, setSizings] = useState<SizingsSchema>({
		height: window.innerHeight,
		width: window.innerWidth,
	})

	const updateSizings = useCallback(() => {
		setSizings({
			height: window.innerHeight,
			width: window.innerWidth,
		})
	}, [])

	useEffect(() => {
		window.addEventListener('resize', updateSizings)

		return () => {
			window.removeEventListener('resize', updateSizings)
		}
	}, [])

	return sizings
}
