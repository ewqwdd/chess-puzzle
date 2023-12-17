import { NotFound } from 'pages/NotFound'
import { ReactNode } from 'react'

export enum RoutesEnum {
    MAIN = '/',
    PROFILE = '/profile',
    PLAY = '/play',
	ALL = '*'
}

export type Routes = ValueOf<RoutesEnum>

interface RouteProps {
    component: ReactNode
    requireAuth?: boolean
}

export const AppRoutes: Record<RoutesEnum, RouteProps> = {
	'/': {
		component: <>hello world</>
	},
	'/play': {
		component: <></>
	},
	'/profile': {
		component: <></>
	},
	'*': {
		component: <NotFound />
	}
} 

