import { ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import { GestureContext } from './GestureContext'
import { Gesture, GestureProvider, Spring } from './types'

interface GestureProviderProps {
    children: ReactNode
}

export default function GestureProvider({children}: GestureProviderProps) {

	const SpringRef = useRef<Spring>()
	const GestureRef = useRef<Gesture>()
	const [isImported, setIsImported] = useState<boolean>(false)

	useEffect(() => {
		Promise.all([
			import('@react-spring/web'),
			import('@use-gesture/react')
		]).then(([spring, gesture]) => {
			SpringRef.current = spring
			GestureRef.current = gesture 
			setIsImported(true)
		})
	}, [])

	const defaultProps = useMemo<GestureProvider>(() => ({
		isImported: isImported,
		Gesture: GestureRef.current,
		Spring: SpringRef.current
	}), [isImported])
	return (
		<GestureContext.Provider value={defaultProps}>
			{children}
		</GestureContext.Provider>
	)
}
