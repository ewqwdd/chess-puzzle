import { getIsAuth, getIsMounted } from 'entities/User'
import { ReactNode, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { Spinner } from 'shared/ui/Spinner'
import { authFormActions } from 'widgets/AuthForm/model'

export default function AuthRequired({children}: {children: ReactNode}) {
	const isMounted = useSelector(getIsMounted)
	const isAuth = useSelector(getIsAuth)
	// const user = !!useSelector(getUser)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		if (isMounted && !isAuth) {
			dispatch(authFormActions.open())
			navigate('/', {
				state: {
					from: location.pathname
				}
			})
		}
	}, [isMounted, isAuth])
	
	if (isMounted && isAuth) {
		return children
	}
    
	return <Spinner />
}
