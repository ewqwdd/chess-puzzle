import { Link } from 'react-router-dom'
import { HStack } from 'shared/ui/Flex'
import Heading from 'shared/ui/Heading/Heading'
import HomeIcon from 'shared/icons/general/home.svg'
import styles from './HomeLink.module.less'
import { ColorMapper } from 'shared/lib/ColorMapper/ColorMapper'
import { ClassNames } from 'shared/lib/ClassaNames/ClassNames'

export default function HomeLink() {
	return (
		<Link to="/">
			<HStack className={ClassNames(ColorMapper('primary', 'text'), {}, [styles.linkWrapper])} justify='between' align='align-center'>
				<HomeIcon className={styles.icon}/>
				<Heading size={3}>
					Home
				</Heading>
			</HStack>
		</Link>
	)
}
