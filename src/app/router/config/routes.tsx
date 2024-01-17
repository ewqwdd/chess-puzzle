import { MainPage } from 'pages/MainPage'
import { NotFound } from 'pages/NotFound'
import { PlayPage } from 'pages/PlayPage'
import { PlayPageId } from 'pages/PlayPageId'
import { ProfilePage } from 'pages/ProfilePage'
import { ReactNode } from 'react'

export enum RoutesEnum {
    MAIN = '/',
    PROFILE = '/profile',
    PLAY = '/play',
	ALL = '*',
	PUZZLEID = 'puzzles/:id'
}

export type Routes = ValueOf<RoutesEnum>

export interface RouteProps {
    component: ReactNode
    requireAuth?: boolean
	title?: string
}

export const AppRoutes: Record<RoutesEnum, RouteProps> = {
	'/': {
		component: <MainPage />,
		title: 'CHESS PUZZLES'
	},
	'/play': {
		component: <PlayPage />,
		requireAuth: true,
		title: 'Play'
	},
	'/profile': {
		component: <ProfilePage />,
		requireAuth: true
	},
	'*': {
		component: <NotFound />,
		title: '404'
	},
	'puzzles/:id': {
		component: <PlayPageId />,
		requireAuth: true,
		title: 'Play'
	}
} 

