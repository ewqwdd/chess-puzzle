import { ReactNode } from 'react'
import { ClassNames } from 'shared/lib/ClassaNames/ClassNames'
import { VStack } from 'shared/ui/Flex'
import styles from './ErrorPageTemplate.module.less'
import Cell from 'shared/ui/Cell/Cell'

interface ErrorPageTemplateProps {
    children: ReactNode
    className?: string
}

const black = [1, 3, 4, 5 ]
const white = [1, 2, 3, 4 ]

export default function ErrorPageTemplate({children, className}: ErrorPageTemplateProps) {
	return (
		<VStack align='align-center' justify='center' className={ClassNames(className, {}, [styles.page])}>
			{children}
			{black.map(elem => 
				<Cell 
					key={elem} 
					black 
					className={ClassNames(styles.cell, {}, [styles[elem.toString() + 'b']])} />)}
			{white.map(elem => 
				<Cell 
					key={elem} 
					className={ClassNames(styles.cell, {}, [styles[elem]])} />)}
		</VStack>
	)
}
