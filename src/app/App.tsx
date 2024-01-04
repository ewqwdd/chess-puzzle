import { ColorMapper } from 'shared/lib/ColorMapper/ColorMapper'
import styles from './App.module.less'
import { HStack } from 'shared/ui/Flex'
import RoutesConfig from './router/ui/Routes'
import { Sidebar } from 'widgets/Sidebar'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { useEffect } from 'react'
import { fetchUser, getIsAuth, getIsMounted, getUser, userActions } from 'entities/User'
import { useSelector } from 'react-redux'
import { AuthFormModal } from 'widgets/AuthForm'
import { NotificationsList } from 'entities/Notification'

export default function App() {
	const dispatch = useAppDispatch()
	const isAuth = useSelector(getIsAuth)
	const isMounted = useSelector(getIsMounted)
	const user = useSelector(getUser)

	useEffect(() => {
		(async() =>{
			if (!isMounted || (isAuth && !user)){
				if(localStorage.getItem('token')) {
					await dispatch(fetchUser())
				}
				dispatch(userActions.mount())
			}})()
			
	}, [isMounted, isAuth, user])

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
