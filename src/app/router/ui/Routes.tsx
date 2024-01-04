import { Route, Routes } from 'react-router'
import { AppRoutes, RoutesEnum } from '../config/routes'
import { Suspense } from 'react'
import { Spinner } from 'shared/ui/Spinner'
import AuthRequired from './AuthRequired'

export default function RoutesConfig() {
	return (
		<Suspense fallback={<Spinner />}>
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
