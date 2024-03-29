import { ElementType, HTMLAttributes, ReactNode, memo } from 'react'
import { ClassNames } from 'shared/lib/ClassaNames/ClassNames'
import styles from './Flex.module.less'

type direction = 'column' | 'row'
type align = 'align-center' | 'align-stretch' | 'align-start' | 'align-end'
type justify = 'center' | 'around' | 'start' | 'end' | 'between'

export interface FlexProps<C extends ElementType,> extends HTMLAttributes<HTMLDivElement> {
    direction?: direction
    align?: align
    justify?: justify
    className?: string
    children: ReactNode
    gap?: number
    as?: C
}

export default memo(function Flex<C extends ElementType = 'div'>({align = 'align-stretch', as: Cmp, className, gap, direction = 'row', justify = 'start', children, style, ...props}: FlexProps<C>) {
	const ElementType = Cmp || 'div' as React.ElementType
	return (
		<ElementType 
			{...props}
			style={{gap, ...style}}
			className={ClassNames(className, {}, [styles.flex, styles[align], styles[direction], styles[justify]])}>{children}</ElementType>
	)
}
)