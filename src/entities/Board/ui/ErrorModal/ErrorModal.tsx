import { ClassNames } from 'shared/lib/ClassaNames/ClassNames'
import { Modal } from 'shared/ui/Modal'
import styles from './ErrorModal.module.less'
import Button from 'shared/ui/Button/ui/Button'
import { memo } from 'react'
import { HStack, VStack } from 'shared/ui/Flex'
import { Link } from 'react-router-dom'
import Heading from 'shared/ui/Heading/Heading'
import { Paragraph } from 'shared/ui/Paragraph'
import { ColorMapper } from 'shared/lib/ColorMapper/ColorMapper'

interface FetchErrorModalProps {
    onClose?: () => void
	retry?: () => void
	title?: string
	text?: string
	isVisible?: boolean
}

export default memo(function FetchErrorModal({onClose, retry, title, text, isVisible}: FetchErrorModalProps) {

	return (
		<Modal onClose={onClose} isVisible={isVisible} parent={document.getElementById('board')!}>
			<VStack 
				className={ClassNames(styles.modal, {}, [ColorMapper('item-dark', 'bg')])} 
				align='align-center' 
				justify='center' 
				gap={76}>
				<Heading size={2} align='center'>
					{title}
				</Heading>
				<Paragraph size={1} color='secondary'>
					{text}
				</Paragraph>
				<HStack justify='between' className={styles.buttons}>
					<Button onClick={retry} color='item'>
						<Heading size={2}>
							Retry
						</Heading>
					</Button>
					<Button as={Link} to='/' color='bg-secondary'>
						<Heading size={2}>
							Home
						</Heading>
					</Button>
				</HStack>
			</VStack>
		</Modal>
	)
})
