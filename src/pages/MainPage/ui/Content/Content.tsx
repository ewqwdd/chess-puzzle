import { BrowserView, MobileView } from 'react-device-detect'
import { VStack } from 'shared/ui/Flex'
import styles from './Content.module.less'
import AutoPlayBoard from './AutoPlayBoard/ui/AutoPlayBoard'
import Heading from 'shared/ui/Heading/Heading'
import { Paragraph } from 'shared/ui/Paragraph'
import PuzzleIcon from 'shared/icons/general/puzzle.svg'
import { ColorMapper } from 'shared/lib/ColorMapper/ColorMapper'
import { ClassNames } from 'shared/lib/ClassaNames/ClassNames'

export default function Content() {
	return (
		<>
			<BrowserView>
				<div className={ClassNames(styles.cardsWrapper, {}, [styles.grid])}>
					<AutoPlayBoard />
					<VStack as='ul' className={styles.list} gap={2}>
						<Heading size={3} as='li' color='secondary' align='center'>
							Interactive lessons from top trainers.
						</Heading>
						<PuzzleIcon className={ColorMapper('item', 'text')}/>
						<Heading size={4} as='li' margin align='center'>
							Chess Puzzles
						</Heading>
						<Paragraph size={3} textAlign='center' as='li' color='secondary'>
							Solve puzzles to enhance tactical vision.
						</Paragraph>
						<Paragraph textAlign='center' size={3} as='li' color='secondary'>
							Recognize combination patterns.
						</Paragraph>
						<Paragraph size={3} textAlign='center' as='li' color='secondary'>
							Have fun solving over 500 thousand puzzles.
						</Paragraph>
					</VStack>
				</div>
			</BrowserView>
			<MobileView>
				<VStack className={styles.cardsWrapper}>
					<AutoPlayBoard />
					<VStack as='ul' className={styles.list} gap={2}>
						<Heading size={3} as='li' color='secondary' align='center'>
							Interactive lessons from top trainers.
						</Heading>
						<PuzzleIcon className={ColorMapper('item', 'text')}/>
						<Heading size={4} as='li' margin align='center'>
							Chess Puzzles
						</Heading>
						<Paragraph size={3} textAlign='center' as='li' color='secondary'>
							Solve puzzles to enhance tactical vision.
						</Paragraph>
						<Paragraph textAlign='center' size={3} as='li' color='secondary'>
							Recognize combination patterns.
						</Paragraph>
						<Paragraph size={3} textAlign='center' as='li' color='secondary'>
							Have fun solving over 500 thousand puzzles.
						</Paragraph>
					</VStack>
				</VStack>
			</MobileView>
		</>
	)
}
