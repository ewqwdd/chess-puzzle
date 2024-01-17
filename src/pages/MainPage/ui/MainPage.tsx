import { HStack, VStack } from 'shared/ui/Flex'
import Heading from 'shared/ui/Heading/Heading'
import QueenIcon from 'shared/icons/figures/Queen_white.svg'
import RookIcon from 'shared/icons/figures/Rook_white.svg'
import KingIcon from 'shared/icons/figures/King_black.svg'
import styles from './MainPage.module.less'
import { ClassNames } from 'shared/lib/ClassaNames/ClassNames'
import { ColorMapper } from 'shared/lib/ColorMapper/ColorMapper'
import Button from 'shared/ui/Button/ui/Button'
import { Link } from 'react-router-dom'
import Content from './Content/Content'

export default function MainPage() {
	return (
		<VStack>
			<Heading size={1} align='center' className={styles.heading}>
				CHESS PUZZLES
			</Heading>
			<HStack justify='center' className={styles.figuresWrapper}>
				<RookIcon className={styles.figure} />
				<QueenIcon className={styles.figure} />
				<KingIcon
					className={ClassNames(styles.figure, {}, [
						ColorMapper('dark', 'text'),
					])}
				/>
			</HStack>
			<Button as={Link} to={'/play'} className={styles.play}>
				PLAY NOW
			</Button>
			<Content />
		</VStack>
	)
}
