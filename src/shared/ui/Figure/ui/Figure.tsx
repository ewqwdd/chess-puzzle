import { FigureTypes } from 'entities/Figure'
import { HTMLAttributes, ReactNode, memo, useEffect, useState } from 'react'
import BishopWhite from 'shared/icons/figures/Bishop_white.svg'
import KingWhite from 'shared/icons/figures/King_white.svg'
import KnightWhite from 'shared/icons/figures/Knight_white.svg'
import PawnWhite from 'shared/icons/figures/Pawn_white.svg'
import QueenWhite from 'shared/icons/figures/Queen_white.svg'
import RookWhite from 'shared/icons/figures/Rook_white.svg'
import KingBlack from 'shared/icons/figures/King_black.svg'
import BishopBlack from 'shared/icons/figures/Bishop_black.svg'
import KnightBlack from 'shared/icons/figures/Knight_black.svg'
import PawnBlack from 'shared/icons/figures/Pawn_black.svg'
import QueenBlack from 'shared/icons/figures/Queen_black.svg'
import RookBlack from 'shared/icons/figures/Rook_black.svg'
import { playerColor } from 'entities/Board'
import styles from './Figure.module.less'
import { ClassNames } from 'shared/lib/ClassaNames/ClassNames'
import { DragPreviewImage, useDrag } from 'react-dnd'

const figuresMapWhite: Record<FigureTypes, ReactNode> = {
	bishop: <BishopWhite />,
	king: <KingWhite />,
	knight: <KnightWhite />,
	pawn: <PawnWhite />,
	queen: <QueenWhite />,
	rook: <RookWhite />,
}

const figuresMapBlack: Record<FigureTypes, ReactNode> = {
	bishop: <BishopBlack />,
	king: <KingBlack />,
	knight: <KnightBlack />,
	pawn: <PawnBlack />,
	queen: <QueenBlack />,
	rook: <RookBlack />,
}

interface FigureProps extends HTMLAttributes<HTMLButtonElement>{
    color?: playerColor
    type: FigureTypes
	figureDrag?: () => void

}

export default memo(function Figure({color, type, className, onClick, figureDrag, ...props}: FigureProps) {
	const [{isDragging}, drag, preview] = useDrag(() => ({
		type: 'piece',
		collect: monitor => ({
		  isDragging: !!monitor.isDragging(),
		}),
	  }))
	const [image, setImage] = useState<string>()

	  useEffect(() => {
		import(`shared/images/figures/${type.charAt(0).toUpperCase() + type.substring(1)}_${color}.png`).then(
			(data) => {
				setImage(data.default)
			}
		)
	  }, [type])

	useEffect(() => {
		if (isDragging) {
			figureDrag?.()
		}
	}, [isDragging])
	return (
		<>
			<DragPreviewImage connect={preview} src={image ?? ''} />
			<button ref={drag} {...props} onClick={onClick} className={ClassNames(className, {}, [styles.figure])}>
				{color === playerColor.BLACK ? figuresMapBlack[type] : figuresMapWhite[type]}
			</button>
		</>
	)
}
)
