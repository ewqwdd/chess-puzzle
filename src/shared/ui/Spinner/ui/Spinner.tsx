import { ClassNames } from 'shared/lib/ClassaNames/ClassNames'
import styles from './Spinner.module.less'

interface SpinnerProps {
    className?: string
}

export default function Spinner({className}: SpinnerProps) {
	return (
		<span className={ClassNames(className, {}, [styles.loader])}/>
	)
}
