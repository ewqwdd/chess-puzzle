import { Route, Routes } from 'react-router'
import { AppRoutes, RoutesEnum } from '../config/routes'
import { Suspense } from 'react'
import { Spinner } from 'shared/ui/Spinner'
import AuthRequired from './AuthRequired'
import { useTitle } from './SetTitle'
import styles from './Routes.module.less'

export default function RoutesConfig() {

	useTitle()
	return (
		<Suspense fallback={<Spinner className={styles.spinner} />}>
			<Routes>
				{Object.keys(AppRoutes).map((elem) => <Route key={elem} path={elem} element={
					<>
						{AppRoutes[elem as RoutesEnum].requireAuth ? 
							<AuthRequired>
								<>
									{AppRoutes[elem as RoutesEnum].component}
								</>
							</AuthRequired> : 
							AppRoutes[elem as RoutesEnum].component}
					</>
				} 
				
				/>)}
			</Routes>
		</Suspense>
	)
}
