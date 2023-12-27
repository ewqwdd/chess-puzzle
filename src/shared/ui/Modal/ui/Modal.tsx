import { ReactNode, memo, useEffect, useState } from 'react'
import { ClassNames } from 'shared/lib/ClassaNames/ClassNames'
import { Overlay } from 'shared/ui/Overlay'
import { Portal } from 'shared/ui/Portal'
import styles from './Modal.module.less'

interface ModalProps {
    onClose?: () => void
    children: ReactNode
    classname?: string
    isVisible?: boolean
    parent?: HTMLElement
	portal?: boolean
	scaleAnim?: boolean
}

export default memo(function Modal({children, classname, isVisible = false, onClose, parent, portal, scaleAnim}: ModalProps) {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	
	useEffect(() => {
		if(isVisible) {
			setIsOpen(true)
		}
		else {
			setTimeout(() => {
				setIsOpen(false)
			}, 300)
		}
	}, [isVisible])

	const content = (
		<Overlay isVisible={isOpen} isClosing={!isVisible} onClose={onClose}>
			<div className={
				ClassNames(
					classname, 
					{[styles.close]: !isVisible && !!scaleAnim, [styles.appear]: !!scaleAnim}, 
					[styles.modal]
				)
			}>
				    {children}
			</div>
		</Overlay>
	)

	if(portal || parent) {
		return (
			<Portal element={parent}>
				{content}
			</Portal>
		)
	}
	return(
		<>
			{content}
		</>
	)
}
)