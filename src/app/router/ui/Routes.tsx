import { Route, Routes } from 'react-router'
import { AppRoutes, RoutesEnum } from '../config/routes'
import { Suspense } from 'react'
import { Spinner } from 'shared/ui/Spinner'

export default function RoutesConfig() {
	return (
		<Suspense>
			<Routes>
				{Object.keys(AppRoutes).map( elem => <Route key={elem} path={elem} element={
					<Suspense fallback={<Spinner />}>
						{AppRoutes[elem as RoutesEnum].component}
					</Suspense>
				} />)}
			</Routes>
		</Suspense>
	)
}
