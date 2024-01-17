import { CardProps } from 'pages/MainPage/config/text'
import styles from './Card.module.less'
import { ClassNames } from 'shared/lib/ClassaNames/ClassNames'
import { ColorMapper } from 'shared/lib/ColorMapper/ColorMapper'
import { VStack } from 'shared/ui/Flex'
import Heading from 'shared/ui/Heading/Heading'
import { Paragraph } from 'shared/ui/Paragraph'


export default function Card({ heading, paragraph }: CardProps) {
	return (
		<VStack
			gap={6}
			className={ClassNames(styles.card, {}, [
				ColorMapper('bg-secondary', 'bg'),
			])}
		>
			{heading ? <Heading size={3}>{heading}</Heading> : null}
			{paragraph ? (
				<Paragraph color='secondary' size={4}>
					{paragraph}
				</Paragraph>
			) : null}
		</VStack>
	)
}
