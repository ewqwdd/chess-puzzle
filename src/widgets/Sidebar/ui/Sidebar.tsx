import { ClassNames } from 'shared/lib/ClassaNames/ClassNames'
import styles from './Sidebar.module.less'
import { ColorMapper } from 'shared/lib/ColorMapper/ColorMapper'
import { VStack } from 'shared/ui/Flex'
import { Logo } from 'shared/ui/logo'

interface SidebarProps {
	className?: string
}

export default function Sidebar({className}: SidebarProps) {
	return (
		<VStack align='align-center' className={ClassNames(className, {}, [ColorMapper('item-dark', 'bg'), styles.sidebar,])}>
			<Logo className={styles.logo} />
		</VStack> 
	)
}
