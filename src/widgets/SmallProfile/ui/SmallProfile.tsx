import { ClassNames } from 'shared/lib/ClassaNames/ClassNames'
import styles from './SmallProfile.module.less'
import { ColorMapper } from 'shared/lib/ColorMapper/ColorMapper'
import { HStack, VStack } from 'shared/ui/Flex'
import { useSelector } from 'react-redux'
import { getUser } from 'entities/User'
import { Skeleton } from 'shared/ui/Skeleton'
import Button from 'shared/ui/Button/ui/Button'
import { Paragraph } from 'shared/ui/Paragraph'
import Heading from 'shared/ui/Heading/Heading'
import { Link } from 'react-router-dom'
import { ProfileImage } from 'shared/ui/ProfileImage'

interface SmallProfileProps {
	className?: string
	logout?: () => void
}

export default function SmallProfile({ className, logout }: SmallProfileProps) {
	const user = useSelector(getUser)

	return (
		<VStack
			className={ClassNames(className, {}, [
				ColorMapper('item-medium', 'bg'),
				styles.wrapper,
			])}
		>
			<HStack gap={20}>
				{user?.avatar ? (
					<ProfileImage className={styles.avatar} />
				) : (
					<Skeleton color={'secondary'} className={ClassNames(styles.skeleton, {}, [ColorMapper('dark', 'text')])} />
				)}
				<VStack gap={8} align='align-start' className={styles.right}>
					<Heading size={4} as={Link} to={'/profile'}>
						{user?.username}
					</Heading>
					<Paragraph size={3} color='secondary'>
						{((user?.firstName ?? '') && ' ') + (user?.lastName ?? '') || user?.email}
					</Paragraph>
					{logout && (
						<Button color='bg-primary' onClick={logout}>
							<Paragraph as='span' size={2}>
						LOG OUT
							</Paragraph>
						</Button>
					)}
				</VStack>
			</HStack>
			
		</VStack>
	)
}
