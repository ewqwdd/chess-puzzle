import {
	ForwardedRef,
	HTMLAttributes,
	forwardRef,
	useCallback,
	useState,
} from 'react'
import styles from './ImageUpload.module.less'
import ImageIcon from 'shared/icons/general/img.svg'
import { ClassNames } from 'shared/lib/ClassaNames/ClassNames'
import { ColorMapper } from 'shared/lib/ColorMapper/ColorMapper'
import { VStack } from 'shared/ui/Flex'
import { Paragraph } from 'shared/ui/Paragraph'

export default forwardRef(function ImageUpload(
	{
		className,
		preview,
		clear,
		...props
	}: HTMLAttributes<HTMLInputElement> & { preview?: File, clear: () => void },
	ref: ForwardedRef<HTMLInputElement>,
) {
	const [isDragOver, setIsDragOver] = useState<boolean>(false)


	const setDragTrue = useCallback(() => {
		setIsDragOver(true)
	}, [])

	const setDragFalse = useCallback(() => {
		setIsDragOver(false)
	}, [])

	return (
		<div
			onDragEnter={setDragTrue}
			onDragLeave={setDragFalse}
			className={ClassNames(
				className,
				{
					[ColorMapper('dark', 'bg')]: !isDragOver,
					[ColorMapper('item-medium', 'bg')]: isDragOver,
					[styles.border]: isDragOver,
				},
				[ColorMapper('primary', 'text'), styles.wrapper],
			)}
		>
			<input {...props} type='file' ref={ref} accept="image/*"/>
			{preview ? 
				<img src={URL.createObjectURL(preview)} className={styles.image} /> :
				<VStack
					align='align-center'
					justify='center'
					className={styles.image}
				>
					<ImageIcon />
				</VStack>
			}
			{preview ? (
				<Paragraph size={1} className={styles.cross} onClick={clear}>
					X
				</Paragraph>
			) : null}
		</div>
	)
})
