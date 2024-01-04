import { ClassNames } from 'shared/lib/ClassaNames/ClassNames'
import { Color, ColorMapper } from 'shared/lib/ColorMapper/ColorMapper'
import styles from './Skeleton.module.less'
import { Suspense, lazy } from 'react'
import { Spinner } from 'shared/ui/Spinner'
import { HStack } from 'shared/ui/Flex'

enum icons {
	img = 'img',
}

const loadIcon = async (icon: ValueOf<icons>) => {
	switch (icon) {
	case icons.img:
		return await import('shared/icons/general/img.svg')
	default:
		throw new Error('Asset not found')
	}
}

interface SkeletonProps {
	color?: Color
	className?: string
	width?: number | string
	height?: number | string
	fill?: boolean
	absolute?: boolean
	icon?: ValueOf<icons>
    animate?: boolean
}

export default function Skeleton({
	absolute,
	className,
	color = 'dark',
	fill,
	height,
	width,
	icon = icons.img,
	animate
}: SkeletonProps) {
	const IconComponent = icon ? lazy(() => loadIcon(icon)) : null
	return (
		<HStack
			align='align-center'
			justify='center'
			className={ClassNames(
				className,
				{
					[styles.fill]: !!fill,
					[styles.absolute]: !!absolute,
					'animate-pulse': !!animate
				},
				[ 
					ColorMapper(color, 'bg'),
					styles.wrapper
				],
			)}
			style={{
				height,
				width,
			}}
		>
			{IconComponent ? (
				<Suspense fallback={<Spinner />}>
					<IconComponent />
				</Suspense>
			) : null}
		</HStack>
	)
}
