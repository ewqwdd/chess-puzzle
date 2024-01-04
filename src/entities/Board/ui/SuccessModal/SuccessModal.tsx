import { Link } from 'react-router-dom'
import { ClassNames } from 'shared/lib/ClassaNames/ClassNames'
import Button from 'shared/ui/Button/ui/Button'
import { HStack, VStack } from 'shared/ui/Flex'
import Heading from 'shared/ui/Heading/Heading'
import { Modal } from 'shared/ui/Modal'
import styles from './SucessModal.module.less'
import ConfettiExplosion from 'react-confetti-explosion'

interface SuccessModalProps {
    isVisible?: boolean
    next?: () => void
}

export default function SuccessModal({isVisible, next}: SuccessModalProps) {
	return (
		<Modal isVisible={isVisible} parent={document.getElementById('board')!}>
			<VStack className={ClassNames(styles.modal)} align='align-center' justify='center' gap={76}>
				<Heading size={1}>
					Correct!
				</Heading>
				<HStack justify='between' className={styles.buttons}>
					<Button onClick={next} color='item'>
						<Heading size={2}>
							Next
						</Heading>
					</Button>
					<Button as={Link} to='/' color='bg-secondary'>
						<Heading size={2}>
							Home
						</Heading>
					</Button>
				</HStack>
				<ConfettiExplosion zIndex={101} duration={3000} style={{bottom: 50}}/> : 
			</VStack>
		</Modal>
	)
}
