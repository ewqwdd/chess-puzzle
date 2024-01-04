import { NotFound } from 'pages/NotFound'
import { PlayPage } from 'pages/PlayPage'
import { ProfilePage } from 'pages/ProfilePage'
import { ReactNode } from 'react'

export enum RoutesEnum {
    MAIN = '/',
    PROFILE = '/profile',
    PLAY = '/play',
	ALL = '*'
}

export type Routes = ValueOf<RoutesEnum>

export interface RouteProps {
    component: ReactNode
    requireAuth?: boolean
}

export const AppRoutes: Record<RoutesEnum, RouteProps> = {
	'/': {
		component: <>hello world</>
	},
	'/play': {
		component: <PlayPage />,
		requireAuth: true
	},
	'/profile': {
		component: <ProfilePage />,
		requireAuth: true
	},
	'*': {
		component: <NotFound />
	}
} 

