import { HTMLAttributes, ReactNode, memo } from 'react'
import { ClassNames } from 'shared/lib/ClassaNames/ClassNames'
import { ColorMapper } from 'shared/lib/ColorMapper/ColorMapper'
import styles from './Cell.module.less'

interface CellProps extends HTMLAttributes<HTMLDivElement>{
    children?: ReactNode
    black?: boolean
    className?: string
}

export default memo(function Cell({black, children, className, ...props}: CellProps) {
	return (
		<div {...props} className={ClassNames(className, {}, [ColorMapper('bg-secondary', 'bg', !black), styles.cell])}>
			{children}
		</div>
	)
}
)