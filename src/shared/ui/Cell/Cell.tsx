import { ForwardedRef, HTMLAttributes, ReactNode, forwardRef } from 'react'
import { ClassNames } from 'shared/lib/ClassaNames/ClassNames'
import { ColorMapper } from 'shared/lib/ColorMapper/ColorMapper'
import styles from './Cell.module.less'

interface CellProps extends HTMLAttributes<HTMLDivElement>{
    children?: ReactNode
    black?: boolean
    className?: string
	width?: number
}

export default forwardRef(function CellComp({black, children, className, width, ...props}: CellProps, ref: ForwardedRef<HTMLDivElement>) {
	return (
		<div 
			ref={ref}
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