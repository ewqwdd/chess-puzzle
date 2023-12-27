import { ReactNode} from 'react'
import { ClassNames } from 'shared/lib/ClassaNames/ClassNames'
import styles from './Overlay.module.less'
import { VStack } from 'shared/ui/Flex'

interface OverlayProps {
    children: ReactNode
    isVisible?: boolean
    className?: string
    onClose?: () => void
    isClosing?: boolean
}

export default function Overlay({children, className, isVisible = false, onClose, isClosing = false}: OverlayProps) {

	return (
		<VStack 
			justify='center'
			align='align-center'
			onClick={onClose}
			className={ClassNames(className, {[styles.visible]: isVisible, [styles.close]: isClosing}, [styles.overlay])}
		>
			{children}
		</VStack>
	)
}
