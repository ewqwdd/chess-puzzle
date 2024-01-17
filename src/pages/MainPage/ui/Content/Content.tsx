import { BrowserView, MobileView } from 'react-device-detect'
import { HStack, VStack } from 'shared/ui/Flex'
import Card from '../Card/Card'
import { cardsText } from 'pages/MainPage/config/text'
import Box from '../Box/Box'
import styles from './Content.module.less'

export default function Content() {
	return (
		<>
			<BrowserView>
				<HStack className={styles.cardsWrapper}>
					<Card {...cardsText[0]} />
					<Box />
					<Card {...cardsText[1]} />
				</HStack>
			</BrowserView>
			<MobileView>
				<VStack className={styles.cardsWrapper}>
					<Box />
					<VStack gap={12}>
						<Card {...cardsText[0]} />
						<Card {...cardsText[1]} />
					</VStack>
				</VStack>
			</MobileView>
		</>
	)
}
