import { NotificationProps } from 'entities/Notification/ui/Notification/Notification'
import { ReactNode } from 'react'

export interface NotificationsContextSchema {
    notifications: Record<number, NotificationProps>
    add: (chilren: ReactNode, props?: Omit<NotificationProps, 'children'>) => void
    del: (index: number) => void
}