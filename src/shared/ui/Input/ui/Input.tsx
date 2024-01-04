import {
	ForwardedRef,
	InputHTMLAttributes,
	ReactNode,
	forwardRef,
	memo,
} from 'react'
import { ClassNames } from 'shared/lib/ClassaNames/ClassNames'
import styles from './Input.module.less'
import { ColorMapper } from 'shared/lib/ColorMapper/ColorMapper'

enum colors {
	primary = 'primary',
	secondary = 'secondary',
}

type Variant = 'default' | 'mui'

const inputColorsMapDefault: Record<colors, string> = {
	primary: ClassNames(styles.primary, {}, [
		ColorMapper('item-medium', 'bg'),
		ColorMapper('secondary', 'text'),
	]),
	secondary: ClassNames(styles.secondary, {}, [
		ColorMapper('item-dark', 'bg'),
		ColorMapper('secondary', 'text'),
	]),
}
const inputColorsMapMUI: Record<colors, string> = {
	primary: ClassNames(styles.primary, {}, [
		ColorMapper('primary', 'text'),
	]),
	secondary: ClassNames(styles.secondary, {}, [
		ColorMapper('primary', 'text'),
	]),
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	color?: colors
	start?: ReactNode
	end?: ReactNode
	variant?: Variant
}

const Input = forwardRef(function Input(
	{
		color = colors.primary,
		start,
		end,
		className,
		variant = 'default',
		...props
	}: InputProps,
	ref: ForwardedRef<HTMLInputElement>,
) {
	return (
		<div
			className={ClassNames(
				className,
				{
					[styles.leftP]: !start,
					[styles.rightP]: !end,
					[inputColorsMapDefault[color]]: variant ==='default',
					[inputColorsMapMUI[color]]: variant ==='mui',
				},
				[styles.wrapper, styles[variant]],
			)}
		>
			{start ? (
				<span className={ClassNames(styles.start, {}, [styles.side])}>
					{start}
				</span>
			) : null}
			<input {...props} className={styles.input} ref={ref} />
			{end ? (
				<span className={ClassNames(styles.end, {}, [styles.side])}>
					{end}
				</span>
			) : null}
		</div>
	)
})

export default memo(Input)
