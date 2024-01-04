import { ReactNode } from 'react'
import { ClassNames } from 'shared/lib/ClassaNames/ClassNames'
import styles from './Paragraph.module.less'
import { Color, ColorMapper } from 'shared/lib/ColorMapper/ColorMapper'

type size = 1 | 2 | 3 | 4
type weight = 700 | 600 | 500 | 400 | 300 | 200
type textAlign = 'center' | 'left' | 'right'

interface ParagraphProps<T extends React.ElementType> {
    children: ReactNode
    size?: size
	as?: T
    weight?: weight
	className?: string
    textAlign?: textAlign
	color?: Color
}

const sizeMapper = (size: size): string => styles['size' + size]
const weightMapper = (weight: weight): string => styles['weight' + weight]
const textAlignMapper = (textAlign: textAlign): string => styles[textAlign]



export default function Paragraph<T extends React.ElementType = 'p'>({
	children, 
	as, 
	className, 
	size = 2,
	weight = 400,
	textAlign = 'left',
	color = 'primary',
	...props
}: ParagraphProps<T>
	& Omit<React.ComponentPropsWithoutRef<T>, keyof ParagraphProps<T>>) {
	const Component = as || 'p'
	return (
		<Component 
			{...props} 
			className={
				ClassNames(
					className, 
					{}, 
					[
						sizeMapper(size), 
						weightMapper(weight), 
						textAlignMapper(textAlign), 
						ColorMapper(color, 'text')
					]
				)
			}>
			{children}
		</Component>
	)
}
