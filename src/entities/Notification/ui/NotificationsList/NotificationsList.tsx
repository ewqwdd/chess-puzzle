import { useNotify } from 'entities/Notification/model/hooks/useNotify'
import Notification from '../Notification/Notification'
import { memo, useCallback } from 'react'

export default memo(function NotificationsList() {

	const {notifications, del} = useNotify()

	const deleteNot = useCallback((index: number) => {
		return () => {
			del(index)
		}
	}, [del])
	return (
		<>
			{Object.entries(notifications).map(([index, elem]) => <Notification delete={deleteNot(Number(index))} key={index} {...elem} />)}
		</>
	)
}
)