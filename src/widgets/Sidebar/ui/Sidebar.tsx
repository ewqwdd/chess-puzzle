import { ClassNames } from 'shared/lib/ClassaNames/ClassNames'
import styles from './Sidebar.module.less'
import { ColorMapper } from 'shared/lib/ColorMapper/ColorMapper'
import { VStack } from 'shared/ui/Flex'
import { Logo } from 'shared/ui/logo'
import SidebarRoutesConfig from 'app/router/ui/SidebarRoutes'
import { memo } from 'react'
import { Paragraph } from 'shared/ui/Paragraph'
import SidebarAuth from './SidebarAuth/SidebarAuth'
import HomeLink from './HomeLink/HomeLink'

interface SidebarProps {
	className?: string
}

export default memo(function Sidebar({className}: SidebarProps) {
	return (
		<VStack align='align-center' gap={16} className={ClassNames(className, {}, [ColorMapper('item-dark', 'bg'), styles.sidebar,])}>
			<Logo className={styles.logo} />
			<Paragraph size={3} className={ClassNames(ColorMapper('secondary', 'text'), {}, [styles.slogan])} textAlign='center'>
				Unleash Your Strategy: Solve, Checkmate, Repeat!
			</Paragraph>
			<HomeLink />
			<SidebarRoutesConfig />
			<SidebarAuth />
		</VStack> 
	)
}
)
