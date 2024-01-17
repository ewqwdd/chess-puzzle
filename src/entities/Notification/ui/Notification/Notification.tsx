import { Portal } from 'shared/ui/Portal'
import { createContainer } from '../Container/Container'
import { HTMLAttributes, ReactNode, memo, useCallback, useEffect, useState } from 'react'
import { ClassNames } from 'shared/lib/ClassaNames/ClassNames'
import { ColorMapper } from 'shared/lib/ColorMapper/ColorMapper'
import { Paragraph } from 'shared/ui/Paragraph'
import { HStack } from 'shared/ui/Flex'
import styles from './Notification.module.less'
import CrossIcon from 'shared/icons/general/cross.svg'

const container = createContainer()

type color = 'primary' | 'secondary' | 'warning' | 'error'

const colorMapper: Record<color, string> = {
	error: ClassNames(ColorMapper('error', 'bg'), {}, [ColorMapper('primary', 'text')]),
	primary: ClassNames(ColorMapper('item-dark', 'bg'), {}, [ColorMapper('secondary', 'text')]),
	secondary: ClassNames(ColorMapper('item-dark', 'bg'), {}, [ColorMapper('primary', 'text')]),
	warning: ClassNames(ColorMapper('warning', 'bg'), {}, [ColorMapper('primary', 'text')]),
}

export interface NotificationProps extends Omit<HTMLAttributes<HTMLDivElement>, 'id'> {
    color?: color
    children: ReactNode
    className?: string
    delete?: () => void
	id?: number
}

export default memo(function Notification({children, color = 'primary', className, delete: del}: NotificationProps) {
	const [isClosing, setIsClosing] = useState<boolean>(false)
	const [isHover, setIsHover] = useState<boolean>(false)

	const close = useCallback(() => {
		if (!del) return
		setIsClosing(true)
		setTimeout(() => {
			del?.()  
			setIsClosing(false)
		}, 300)
	}, [del])

	const hoverTrue = useCallback(() => {
		setIsHover(true)
	}, [])

	const hoverFalse = useCallback(() => {
		setIsHover(false)
	}, [])

	useEffect(() => {
		let timeout: NodeJS.Timeout
		if (!isHover) {
			timeout = setTimeout(() => {
				if(!isHover) {
					close()
				}
			}, 4000)
		}
		
		return () => {
			clearTimeout(timeout)
		}
	}, [isHover, close])

	return (
		<Portal element={container}>
			<Paragraph 
				onMouseEnter={hoverTrue}
				onMouseLeave={hoverFalse}
				as={HStack}
				size={1}
				className={ClassNames(className, {[styles.slideOut]: isClosing}, [colorMapper[color], styles.notification])}>
				{children}
				<CrossIcon className={styles.cross} onClick={close}/>
			</Paragraph>
		</Portal>
	)
}
)