import { ComponentProps, Suspense, memo, useCallback, useEffect, useMemo } from 'react'
import { Modal } from 'shared/ui/Modal'
import AuthFormAsync from '../AuthForm.async'
import { VStack } from 'shared/ui/Flex'
import { Spinner } from 'shared/ui/Spinner'
import styles from './AuthForm.module.less'
import { Inputs } from '../AuthForm'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { getIsAuth, getIsLoading, login } from 'entities/User'
import { useSelector } from 'react-redux'
import { getIsOpen, getIsRegister } from 'widgets/AuthForm/model/selectors'
import { authFormActions } from 'widgets/AuthForm/model'
import { useLocation, useNavigate } from 'react-router'
import { useNotify } from 'entities/Notification'
import { getError } from 'entities/User/model/selectors/userSelectors'

export default memo(function AuthFormModal() {

	const dispatch = useAppDispatch() 
	const isOpen = useSelector(getIsOpen)
	const isRegister = useSelector(getIsRegister)
	const isAuth = useSelector(getIsAuth)
	const location = useLocation()
	const navigate = useNavigate()
	const {add} = useNotify()
	const isLoading = useSelector(getIsLoading)
	const error = useSelector(getError)

	useEffect(() => {
		if (isAuth) {
			add('Successfull login', {})
			if(location?.state?.from) {
				navigate(location.state.from)
			}
		} 
	}, [isAuth])

	const close = useCallback(() => {
		dispatch(authFormActions.close())
	}, [])

	const loginForm = useCallback(async ({email, password}: Inputs) => {
		dispatch(login({username: email, password}))
	}, [])

	const loginValues = useMemo((): ComponentProps<typeof AuthFormAsync> => ({
		onSubmit: loginForm 
	}), [])

	return (
		<Modal scaleAnim portal isVisible={isOpen} onClose={close}>
			<VStack>
				<Suspense fallback={<Spinner className={styles.spinner}/>}>
					<AuthFormAsync {...isRegister ? loginValues : loginValues} isLoading={isLoading} error={error} />
				</Suspense>
			</VStack>
		</Modal>
	)
}
)