import { Suspense } from 'react'
import { Route, Routes } from 'react-router'
import { Spinner } from 'shared/ui/Spinner'
import { sideBarRoutes } from '../config/sidebarRoutes'
import { RoutesEnum } from '../config/routes'

export default function SidebarRoutesConfig() {
	return (
		<Suspense fallback={<Spinner />}>
			<Routes>
				{Object.keys(sideBarRoutes).map( elem => <Route key={elem} path={elem} element={
					<Suspense fallback={<Spinner />}>
						{/* @ts-expect-error sdadasd */}
						{sideBarRoutes[elem as RoutesEnum]?.component}
					</Suspense>
				} 
				
				/>)}
			</Routes>
		</Suspense>
	)
}