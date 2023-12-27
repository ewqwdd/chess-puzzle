import { Cell, playerColor } from 'entities/Board/model/types/Board'
import { MouseEventHandler } from 'react'
import CellComp from 'shared/ui/Cell/Cell'
import Enabled from 'shared/ui/Enabled/ui/Enabled'
import { FigureComp } from 'shared/ui/Figure'
import styles from './BoardCell.module.less'

interface BoardCellProps {
    isBlack: boolean
    cell: Cell
    figureClick: MouseEventHandler<HTMLButtonElement>
    isEnabled?: boolean
    enabledClick?: () => void
    playerColor: playerColor
    altColor: playerColor
}

export default function BoardCell({cell, isBlack, figureClick, isEnabled, enabledClick, playerColor, altColor}: BoardCellProps) {
	return (
		<CellComp 
			black={isBlack}
			onClick={enabledClick}
		>
			{cell.figure?.type ? 
				<FigureComp 
					onClick={figureClick}
					type={cell.figure.type} 
					color={cell.figure.isAlly ? playerColor : altColor} /> : null}
			{isEnabled ? <div className={styles.enabled}><Enabled /></div> : null}
		</CellComp>
	)
}
