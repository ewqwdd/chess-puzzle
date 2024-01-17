import { ClassNames } from 'shared/lib/ClassaNames/ClassNames'
import CellPattern from '../CellPattern/CellPattern'
import styles from './Box.module.less'

export default function Box() {
	return (
		<div className={styles.perpectiveWrapper}>
			<div className={styles.boxWrapper}>
				<div className={ClassNames(styles.front, {}, [])}>
					<CellPattern invert />
				</div>
				<div className={ClassNames(styles.left, {}, [])}>
					<CellPattern />
				</div>
				<div className={ClassNames(styles.right, {}, [])}>
					<CellPattern />
				</div>
				<div className={ClassNames(styles.top, {}, [])}>
					<CellPattern invert />
				</div>
				<div className={ClassNames(styles.back, {}, [])}>
					<CellPattern invert />
				</div>
				<div className={ClassNames(styles.bottom, {}, [])}>
					<CellPattern invert />
				</div>
			</div>
		</div>
	)
}
