import { ForwardedRef, ReactNode, forwardRef, memo, useMemo } from 'react'
import { ClassNames } from 'shared/lib/ClassaNames/ClassNames'
import { Color, ColorMapper } from 'shared/lib/ColorMapper/ColorMapper'
import styles from './Heading.module.less'

type HeadingSize = 1 | 2 | 3 | 4
type Align = 'center' | 'left' | 'right'

interface HeadingProps {
    size?: HeadingSize
    margin?: boolean
    className?: string
    color?: Color
    inverted?: boolean
    children: ReactNode
    align?: Align
}

type TagType = 'h1' | 'h2' | 'h3' | 'h4'

const headingMap = (size: HeadingSize): TagType => 'h' + size.toString() as TagType

const marginMap = (size: HeadingSize) => styles['m' + size.toString()]

export default memo(forwardRef(function Heading(props: HeadingProps, ref: ForwardedRef<HTMLHeadingElement>) {
	// eslint-disable-next-line react/prop-types
	const {children, className, color, inverted, margin, size = 1, align = 'left'} = props

	const Tag = useMemo(() => headingMap(size), [size])
	return (
		<Tag 
			ref={ref}
			className={ClassNames(
				className, 
				{[marginMap(size)]: Boolean(margin)}, 
				[ColorMapper(color, 'text', inverted), styles[Tag], styles[align]])
			}>
			{children}
		</Tag>
	)
}))

