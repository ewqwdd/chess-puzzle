import { ClassNames } from 'shared/lib/ClassaNames/ClassNames'
import styles from './Spinner.module.less'
import { memo } from 'react'

interface SpinnerProps {
    className?: string
}

export default memo(function Spinner({className}: SpinnerProps) {
	return (
		<span className={ClassNames(className, {}, [styles.loader])}/>
	)
}
)