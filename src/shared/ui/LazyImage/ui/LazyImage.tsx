import { useEffect, useRef, useState } from 'react'
import { ClassNames } from 'shared/lib/ClassaNames/ClassNames'
import { Color } from 'shared/lib/ColorMapper/ColorMapper'
import { Skeleton } from 'shared/ui/Skeleton'
import styles from './LazyImage.module.less'

interface LazyImageFill {
    src?: string;
    fill: true;
    width?: never;
    height?: never;
    absolute?: boolean
    color: Color
    className?: string
} 

interface LazyImageWidthHeight {
    src?: string;
    width: number;
    height: number;
    fill?: false;
    absolute?: boolean
    color?: Color
    className?: string
}

type LazyImageProps = LazyImageWidthHeight | LazyImageFill;

export default function LazyImage({src, width, fill, height, absolute, color, className}: LazyImageProps) {
	const [status, setStatus] = useState<'loaded' | 'error' | 'loading'>('loading')
	const [isViewed, setIsViewed] = useState<boolean>(false)
	const imgRef = useRef<HTMLImageElement>(null)

	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) {
				setIsViewed(true)
				console.log('intersected')
			}
		}, 
		{
			rootMargin: '10%'
		})
		if(!imgRef.current) return
		observer.observe(imgRef.current)

		return () => observer.disconnect()
	}, [])

	return (
		<>
			{isViewed ? 
				<img 
					src={src}
					ref={imgRef}
					onLoad={() => setStatus('loaded')}
					onError={() => setStatus('error')}
					className={ClassNames(className, {[styles.fill]: !!fill}, [])}
					style={{
						position: absolute ? 'absolute' : undefined,
						width,
						height
					}}
				/> : null}
			{status === 'loading' ? 
				<Skeleton 
					absolute={absolute}
					fill={fill}
					height={height}
					width={width}
					color={color}
					icon='img'
				/>
				:
				null
			}
		</>
	)
}
