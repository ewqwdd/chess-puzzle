import { createContext } from 'react'
import { NotificationsContextSchema } from '../types/NotificationsContextSchema'

export const notificationsContext = createContext<NotificationsContextSchema>({
	add: () => {},
	notifications: {},
	del: () => {}
})