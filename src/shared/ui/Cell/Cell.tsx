import { HTMLAttributes, ReactNode, memo } from 'react'
import { ClassNames } from 'shared/lib/ClassaNames/ClassNames'
import { ColorMapper } from 'shared/lib/ColorMapper/ColorMapper'
import styles from './Cell.module.less'

interface CellProps extends HTMLAttributes<HTMLDivElement>{
    children?: ReactNode
    black?: boolean
    className?: string
	width?: number
}

export default memo(function CellComp({black, children, className, width, ...props}: CellProps) {
	return (
		<div 
			{...props} 
			className={ClassNames(className, {}, [ColorMapper('bg-secondary', 'bg', !black), styles.cell])}
			style={{
				width
			}}
		>
			{children}
		</div>
	)
}
)