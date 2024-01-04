import { MainSidebar, PlaySidebar } from 'widgets/Sidebar'
import { RouteProps, RoutesEnum } from './routes'

export const sideBarRoutes: DeepPartial<Record<RoutesEnum, RouteProps>> = {
	'/play': {
		component: <PlaySidebar />
	},
	'*': {
		component: <MainSidebar />
	}
} 

