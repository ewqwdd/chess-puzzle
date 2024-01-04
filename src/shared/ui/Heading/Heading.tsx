import { ReactNode, forwardRef, memo, useMemo } from 'react'
import { ClassNames } from 'shared/lib/ClassaNames/ClassNames'
import { Color, ColorMapper } from 'shared/lib/ColorMapper/ColorMapper'
import styles from './Heading.module.less'

type HeadingSize = 1 | 2 | 3 | 4
type Align = 'center' | 'left' | 'right'

interface HeadingProps <T extends React.ElementType> {
    size?: HeadingSize
    margin?: boolean
    className?: string
    color?: Color
    inverted?: boolean
    children: ReactNode
    align?: Align
	as?: T
}

export type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<
  C
>['ref'];

type TagType = 'h1' | 'h2' | 'h3' | 'h4'

const headingMap = (size: HeadingSize): TagType => 'h' + size.toString() as TagType

const marginMap = (size: HeadingSize) => styles['m' + size.toString()]

function Heading <T extends React.ElementType = 'h1'>(
	props: HeadingProps<T> & 
			Omit<React.ComponentPropsWithRef<T>, 
			keyof HeadingProps<T>>, 
	ref: PolymorphicRef<T>) {

	const {children, className, color, inverted, margin, size = 1, align = 'left', as: Cmp, ...rest} = props

	const Tag = useMemo(() => Cmp ? Cmp : headingMap(size), [size])
	return (
		<Tag 
			ref={ref}
			className={ClassNames(
				className, 
				{[marginMap(size)]: Boolean(margin)}, 
				[ColorMapper(color, 'text', inverted), styles[headingMap(size)], styles[align]])
			}
			{...rest}
		>
			{children}
		</Tag>
	)
}

export default memo(forwardRef(Heading)) as typeof Heading

