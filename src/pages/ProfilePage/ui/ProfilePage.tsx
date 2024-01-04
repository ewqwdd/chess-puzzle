import { ClassNames } from 'shared/lib/ClassaNames/ClassNames'
import styles from './ProfilePage.module.less'
import { ColorMapper } from 'shared/lib/ColorMapper/ColorMapper'
import { useSelector } from 'react-redux'
import { User, getIsAuth, getIsMounted, getUser } from 'entities/User'
import { Profile } from 'widgets/Profile'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { useNavigate } from 'react-router'
import DynamicModuleLoader from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader'
import {
	fetchStats,
	getError,
	getIsLoading,
	getStats,
	statsReducer,
} from 'entities/Stats'
import { useCallback, useEffect } from 'react'
import { Spinner } from 'shared/ui/Spinner'
import { useSearchParams } from 'react-router-dom'
import { putProfile } from '../model/service/putProfile'
import { getErrors, getIsFullfilled, getServerError, getIsLoading as getSavedIsLoading } from '../model/selectors/selectors'
import { useNotify } from 'entities/Notification'
import { editProfileRedcuer } from '../model/slice/profileEditSlice'

export default function ProfilePage() {
	const {add} = useNotify()
	const user = useSelector(getUser)
	const isAuth = useSelector(getIsAuth)
	const isMounted = useSelector(getIsMounted)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const stats = useSelector(getStats)
	const error = useSelector(getError)
	const statsLoading = useSelector(getIsLoading)
	const [searchParams, setSearchParams] = useSearchParams()
	const editServerError = useSelector(getServerError)
	const editValidationErrors = useSelector(getErrors)
	const editIsFullfilled = useSelector(getIsFullfilled)
	const editIsLoading = useSelector(getSavedIsLoading)

	useEffect(() => {
		if (user) {
			dispatch(fetchStats(user.id))
		}
	}, [user])

	useEffect(() => {
		if(editServerError) add(editServerError)
	}, [editServerError])

	useEffect(() => {
		if(editValidationErrors) {
			Object.values(editValidationErrors).forEach(elem => add(elem))
		}
	}, [editValidationErrors])

	if (isMounted && !isAuth) {
		navigate(-1)
		return
	}

	const toggleEdit = useCallback(() => {
		setSearchParams(prev => {
			if (prev.get('edit')) prev.delete('edit')
			else prev.set('edit', 'true')
			return prev
		})
	}, [setSearchParams])

	const submit = useCallback((user: DeepPartial<User>) => {
		dispatch(putProfile(user))
	}, [])

	useEffect(() => {
		if (editIsFullfilled) {
			setSearchParams(prev => {
				prev.delete('edit')
				return prev
			})
		}
	}, [editIsFullfilled])

	return (
		<DynamicModuleLoader
			reducers={{
				stats: statsReducer,
				editProfile: editProfileRedcuer
			}}
		>
			<div
				className={ClassNames(styles.layout, {}, [
					ColorMapper('item-dark', 'bg'),
				])}
			>
				{user ? (
					<Profile
						user={user}
						{...stats}
						statsError={error}
						statsLoading={statsLoading}
						edit={!!searchParams.get('edit')}
						toggleEdit={toggleEdit}
						onSubmit={submit}
					/>
				) : (
					<Spinner />
				)}
				{editIsLoading && <Spinner className={styles.spinner} />}
			</div>
		</DynamicModuleLoader>
	)
}
