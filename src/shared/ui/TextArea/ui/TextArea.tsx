import { ForwardedRef, HTMLAttributes, forwardRef } from 'react'
import styles from './TextArea.module.less'
import { ClassNames } from 'shared/lib/ClassaNames/ClassNames'
import { ColorMapper } from 'shared/lib/ColorMapper/ColorMapper'

type Variant = 'mui' | 'default'

interface TextAreaProps extends HTMLAttributes<HTMLTextAreaElement> {
	className?: string
	variant?: Variant
    placeholder?: string
}

const mapColor: Record<Variant, string> = {
	default: ClassNames(ColorMapper('item-medium', 'bg'), {}, [
		ColorMapper('secondary', 'text'),
	]),
	mui: ClassNames(ColorMapper('primary', 'text'), {}, []),
}

export default forwardRef(function TextArea(
	{ className, variant = 'default', ...props }: TextAreaProps,
	ref: ForwardedRef<HTMLTextAreaElement>,
) {
	return (
		<textarea
			ref={ref}
			className={ClassNames(className, {}, [
				styles[variant],
				mapColor[variant],
				styles.textarea
			])}
			{...props}
		/>
	)
})
