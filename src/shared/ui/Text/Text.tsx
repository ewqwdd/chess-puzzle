import { ReactNode } from 'react'
import { ClassNames } from 'shared/lib/ClassaNames/ClassNames'
import styles from './Text.module.less'
import { Color, ColorMapper } from 'shared/lib/ColorMapper/ColorMapper'

type Size = 'm' | 's' | 'xs'
type Align = 'center' | 'left' | 'right'


interface TextProps {
    children: ReactNode
    className?: string
    align?: Align
    color?: Color
    size?: Size
}


export default function Text({children, className, align = 'left', color, size = 's'}: TextProps) {
	return (
		<p className={ClassNames(
			className, 
			{}, 
			[
				styles[align],
				ColorMapper(color),
				styles[size]
			]
		)}>
			{children}
		</p>
	)
}
