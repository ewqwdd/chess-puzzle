/* eslint-disable react/prop-types */
import { NotificationProps } from 'entities/Notification/ui/Notification/Notification'
import { ReactNode, useCallback, useMemo, useState } from 'react'
import { notificationsContext } from '../context/NotificationsContext'

interface NotificationsProviderProps {
    children: ReactNode
}

export default function NotificationsProvider({children}: NotificationsProviderProps) {
	const [notifications, setNotifications] = useState<Record<number, NotificationProps>>({})
    
	const add = useCallback((children: ReactNode, props?: Omit<NotificationProps, 'children'>) => {
		
		setNotifications(prev => {
			let id = props?.id
			if(!Number.isInteger(props?.id)) {
				const keys = Object.keys(prev)
				id = keys.length + Math.random() * 1000
				while(keys.includes(String(id))) {
					id = keys.length + Math.random() * 1000
				}
			}
			return {...prev, [id!]: {children, ...props}}}
		)
	}, [])

	const del = useCallback((id: number) => {
		setNotifications(notifications => {
			const newArr = {...notifications}
			delete newArr[id]
			return newArr
		})
	}, [])

	const value = useMemo(() => ({
		notifications,
		add,
		del
	}), [notifications, del, add])

	return (
		<notificationsContext.Provider value={value}>
			{children}
		</notificationsContext.Provider>
	)
}
