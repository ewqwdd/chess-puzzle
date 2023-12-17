import { MutableRefObject, memo, useEffect, useRef, useState } from 'react'
import Heading from 'shared/ui/Heading/Heading'
import styles from './Logo.module.less'
import { ClassNames } from 'shared/lib/ClassaNames/ClassNames'
import { ColorMapper } from 'shared/lib/ColorMapper/ColorMapper'

interface LogoProps {
    className?: string
}

export default memo(function Logo({className}: LogoProps) {
	const headingRef = useRef() as MutableRefObject<HTMLHeadingElement>
	const max = Math.max(headingRef.current?.clientWidth, headingRef.current?.clientHeight)
	const [pos, setPos] = useState<number>(0)
	const intervalRef = useRef<ReturnType<typeof setInterval>>()

	useEffect(() => {
		intervalRef.current = setInterval(() => {
			const min = Math.min(headingRef.current?.clientWidth, headingRef.current?.clientHeight)
			setPos(Math.random() * min)
		}, 2000)

		return () => {
			clearInterval(intervalRef.current)
		}
	}, [])

	return (
		<Heading ref={headingRef} size={2} color="primary" align="center" className={ClassNames(className, {}, [styles.logo, ColorMapper('bg-secondary', 'bg')])}>
            CHESS PUZZLES
			<span className={styles.ripple} style={{
				left: pos,
				top: pos,
				width: max,
				height: max,
				translate: `${headingRef.current?.clientHeight >=headingRef.current?.clientWidth ? '-50%' : '0'} ${headingRef.current?.clientHeight <= headingRef.current?.clientWidth ? '-50%' : '0'}`
			}}/>
		</Heading>
	)
}
)