import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { AppRoutes, RoutesEnum } from '../config/routes'

export const useTitle = () => {
	const location = useLocation()

	useEffect(() => {
		document.title = AppRoutes[location.pathname as RoutesEnum]?.title || 'CHESS PUZZLES'
	}, [location])
}
