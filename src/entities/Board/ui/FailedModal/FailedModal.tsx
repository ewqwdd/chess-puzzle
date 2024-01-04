import { ClassNames } from 'shared/lib/ClassaNames/ClassNames'
import { Modal } from 'shared/ui/Modal'
import styles from './FailedModal.module.less'
import Button from 'shared/ui/Button/ui/Button'
import { memo } from 'react'
import { HStack, VStack } from 'shared/ui/Flex'
import { Link } from 'react-router-dom'
import Heading from 'shared/ui/Heading/Heading'

interface FailedModalProps {
    isVisible?: boolean
    onClose?: () => void
	retry?: () => void
}

export default memo(function FailedModal({isVisible, onClose, retry}: FailedModalProps) {

	return (
		<Modal onClose={onClose} isVisible={isVisible} parent={document.getElementById('board')!}>
			<VStack className={ClassNames(styles.modal)} align='align-center' justify='center' gap={76}>
				<Heading size={1}>
					Incorrect
				</Heading>

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
