import { useContext } from 'react'
import { notificationsContext } from '../context/NotificationsContext'

export const useNotify = () => useContext(notificationsContext)