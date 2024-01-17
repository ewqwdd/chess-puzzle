import { ReactNode } from 'react'
import styles from './Card.module.less'
import { ClassNames } from 'shared/lib/ClassaNames/ClassNames'
import { ColorMapper } from 'shared/lib/ColorMapper/ColorMapper'
import { Paragraph } from 'shared/ui/Paragraph'

interface CardProps {
    children: ReactNode
    onClick?: () => void
    disabled?: boolean
}

export default function Card({children, onClick, disabled}: CardProps) {
	return (
		<div className={ClassNames(styles.pageCard, {[styles.disabled]: !!disabled}, [ColorMapper('dark')])} onClick={onClick}>
			<Paragraph size={2}>
				{children}
			</Paragraph>
		</div>
	)
}
