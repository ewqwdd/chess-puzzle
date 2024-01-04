import { HTMLAttributes, memo } from 'react'
import { ClassNames } from 'shared/lib/ClassaNames/ClassNames'
import styles from './Enabled.module.less'

type EnabledProps = HTMLAttributes<HTMLButtonElement>

export default memo(function Enabled({className, ...props}: EnabledProps) {
	return (
		<button {...props} className={ClassNames(className, {}, [styles.enabled])} />
	)
}
)