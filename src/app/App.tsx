import { ColorMapper } from 'shared/lib/ColorMapper/ColorMapper'
import styles from './App.module.less'
import { HStack } from 'shared/ui/Flex'
import RoutesConfig from './router/ui/Routes'
import { Sidebar } from 'widgets/Sidebar'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { useCallback, useEffect } from 'react'
import { fetchPicture, fetchUser, getIsAuth, getIsMounted, getUser, userActions } from 'entities/User'
import { useSelector, useStore } from 'react-redux'
import { AuthFormModal } from 'widgets/AuthForm'
import { NotificationsList } from 'entities/Notification'
import { getId, getSavedIsSuccess } from 'entities/Board/model/selectors/selectors'
import { getTimer } from 'entities/Timer/model/selectors/selector'
import Cookies from 'js-cookie'

export default function App() {
	const dispatch = useAppDispatch()
	const isAuth = useSelector(getIsAuth)
	const isMounted = useSelector(getIsMounted)
	const user = useSelector(getUser)
	const store = useStore()

	useEffect(() => {
		(async() =>{
			if (!isMounted || (isAuth && !user)){
				if(localStorage.getItem('token')) {
					await dispatch(fetchUser())
				}
				dispatch(userActions.mount())
			}})()
			
	}, [isMounted, isAuth, user])

	useEffect(() => {
		if (user && !user.avatarUrl) {
			dispatch(fetchPicture())
		}
	}, [user])

	const saveCookie = useCallback(() => {
		const state = store.getState()
		const savedSuccess = getSavedIsSuccess(state)
		const timer = getTimer(state)
		const id = getId(state)
		if (savedSuccess || !id) return
		Cookies.set(String(id), String(timer), {
			expires: 7
		})
	}, [])

	useEffect(() => {
		window.addEventListener('beforeunload', saveCookie)
		window.addEventListener('unload', saveCookie)

		return () => {
			window.addEventListener('beforeunload', saveCookie)
			window.addEventListener('unload', saveCookie)
		}
	}, [])

	return (<>
		<div className={ColorMapper('bg-primary', 'bg')}>
			<HStack gap={20} className={styles.page} justify='center'>
				<>
					<div id='page-left' className={styles['page-left']}>
						<RoutesConfig />
					</div>
					<Sidebar />
				</>
			</HStack>
		</div>
		<AuthFormModal />
		<NotificationsList />
	</>
	)
}
