import { Cell, CellCords, playerColor } from 'entities/Board/model/types/Board'
import { MouseEventHandler, memo, useCallback } from 'react'
import CellComp from 'shared/ui/Cell/Cell'
import Enabled from 'shared/ui/Enabled/ui/Enabled'
import { FigureComp } from 'shared/ui/Figure'
import styles from './BoardCell.module.less'
import { ClassNames } from 'shared/lib/ClassaNames/ClassNames'
import { useDrop } from 'react-dnd'

interface BoardCellProps {
    isBlack: boolean
    cell: Cell
	cellCords: CellCords
    figureClick: () => void
    isEnabled?: boolean
    enabledClick?: () => void
    playerColor: playerColor
    altColor: playerColor
	blocked?: boolean
}

export default memo(function BoardCell({cell, isBlack, figureClick, isEnabled, enabledClick, playerColor, altColor, blocked}: BoardCellProps) {
	
	  const [{isOver}, drop] = useDrop(
		() => ({
		  accept: 'piece',
		  drop: () => {
				enabledClick?.()
		  },
		  collect: (monitor) => ({
				isOver: !!monitor.isOver()
		  }),
		}),
		[isEnabled]
	  )

	  const figureClickModified = useCallback<MouseEventHandler<HTMLButtonElement>>((e) => {
		e.stopPropagation()
		figureClick()
	  }, [figureClick])
	
	return (
		<CellComp 
			ref={drop}
			black={isBlack}
			onClick={!blocked ? enabledClick : undefined}
			className={ClassNames('', {[styles.blocked]: !!blocked, [styles.over]: isOver})}
		>
			{cell.figure?.type ? 
				<FigureComp 
					figureDrag={figureClick}
					onClick={!blocked ? figureClickModified : undefined}
					type={cell.figure.type}
					color={cell.figure.isAlly ? playerColor : altColor} /> : null}
			{isEnabled ? <div className={styles.enabled}><Enabled /></div> : null}
		</CellComp>
	)
}
)