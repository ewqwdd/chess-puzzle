import { ColorMapper } from 'shared/lib/ColorMapper/ColorMapper'
import styles from './App.module.less'
import { HStack } from 'shared/ui/Flex'
import RoutesConfig from './router/ui/Routes'
import { Sidebar } from 'widgets/Sidebar'

export default function App() {
	return (
		<div className={ColorMapper('bg-primary', 'bg')}>
			<HStack gap={20} className={styles.page}>
				<>
					<RoutesConfig />
					<Sidebar />
				</>
			</HStack>
		</div>
	)
}
