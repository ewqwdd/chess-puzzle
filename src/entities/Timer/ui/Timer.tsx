
import { useSelector } from 'react-redux'
import { getTimer } from '../model/selectors/selector'
import Heading from 'shared/ui/Heading/Heading'
import styles from './Timer.module.less'
import { ClassNames } from 'shared/lib/ClassaNames/ClassNames'
import { ColorMapper } from 'shared/lib/ColorMapper/ColorMapper'
import { memo } from 'react'
import TimerToString from './TimerToString'


export default memo(function Timer() {
	
	const timer = useSelector(getTimer)

	return (
		<Heading className={ClassNames(styles.timer, {}, [ColorMapper('bg-primary', 'bg')])}>
			<TimerToString timer={timer}/>
		</Heading>
	)
}
)