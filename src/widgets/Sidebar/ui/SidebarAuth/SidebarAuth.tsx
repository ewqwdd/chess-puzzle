import { getIsAuth, getIsMounted, userActions } from 'entities/User'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import Button from 'shared/ui/Button/ui/Button'
import { HStack } from 'shared/ui/Flex'
import { Paragraph } from 'shared/ui/Paragraph'
import { authFormActions } from 'widgets/AuthForm/model'
import styles from './SidebarAuth.module.less'
import { ClassNames } from 'shared/lib/ClassaNames/ClassNames'
import { SmallProfile } from 'widgets/SmallProfile'

export default function SidebarAuth() {
	const isAuth = useSelector(getIsAuth)
	const isMounted = useSelector(getIsMounted)
	const dispatch = useAppDispatch()

	const logout = useCallback(() => {
		dispatch(userActions.logout())
	}, [])
	const login = useCallback(() => {
		dispatch(authFormActions.setLogin())
		dispatch(authFormActions.open())
	}, [])
	const register = useCallback(() => {
		dispatch(authFormActions.setRegister())
		dispatch(authFormActions.open())
	}, [])

	if (!isMounted) {
		return null
	}
	let content
	if (isAuth) {
		content = <SmallProfile logout={logout} />
	} else {
		content = (
			<HStack
				gap={8}
				className={ClassNames(styles.authButtons)}
			>
				<Button color='bg-secondary' onClick={login}>
					<Paragraph as='span' size={2}>
						LOG IN
					</Paragraph>
				</Button>
				<Button color='bg-primary' onClick={register}>
					<Paragraph as='span' size={2}>
						REGISTER
					</Paragraph>
				</Button>
			</HStack>
		)
	}

	return content
}
