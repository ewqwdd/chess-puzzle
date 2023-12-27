import { ReactNode } from 'react'
import { ClassNames } from 'shared/lib/ClassaNames/ClassNames'
import { Color, ColorMapper } from 'shared/lib/ColorMapper/ColorMapper'
import styles from './Button.module.less'

interface ButtonProps<T extends React.ElementType> {
    children: ReactNode
    color?: Color
    square?: boolean
    inverted?: boolean
	as?: T
	className?: string
}

const secondColorMap: DeepPartial<Record<Color, Color>> = {
	'bg-primary': 'dark',
	'bg-secondary': 'bg-primary',
	'item': 'bg-secondary',
	'item-dark': 'dark',
	'primary': 'secondary',
	'secondary': 'item'
}

const textColorMap: DeepPartial<Record<Color, Color>> = {
	'bg-primary': 'secondary',
	'bg-secondary': 'primary',
	'item': 'primary',
	'item-dark': 'secondary',
	'primary': 'bg-secondary',
	'secondary': 'bg-primary'
}

export default function Button<T extends React.ElementType = 'button'>({
	children, 
	className, 
	inverted, 
	color = 'item', 
	square, 
	as, 
	...props
}: ButtonProps<T>
	& Omit<React.ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>) {
	const Component = as || 'button'
	return (
		<Component 
			{...props}
			className={
				ClassNames(
					className, 
					{}, 
					[
						ColorMapper(secondColorMap[color], 'bg', inverted),
						ColorMapper(textColorMap[color], 'text', inverted),
						styles.btn
					]
				)
			}>
			<div 
				className={
					ClassNames(
						ColorMapper(color, 'bg', inverted), 
						{}, 
						[
							styles.main
						]
					)
				}>
				{children}
			</div>
		</Component>
	)
}
