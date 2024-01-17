import { ColorMapper } from 'shared/lib/ColorMapper/ColorMapper'
import styles from './CellPattern.module.less'

interface CellPattern {
	invert?: boolean
}

export default function CellPattern({ invert }: CellPattern) {
	let content = (
		<>
			<div className={ColorMapper('bg-secondary', 'bg')} />
			<div className={ColorMapper('secondary', 'bg')} />
			<div className={ColorMapper('secondary', 'bg')} />
			<div className={ColorMapper('bg-secondary', 'bg')} />
		</>
	)

	if (invert) {
		content = (
			<>
				<div className={ColorMapper('secondary', 'bg')} />
				<div className={ColorMapper('bg-secondary', 'bg')} />
				<div className={ColorMapper('bg-secondary', 'bg')} />
				<div className={ColorMapper('secondary', 'bg')} />
			</>
		)
	}

	return <div className={styles.grid}>{content}</div>
}
