import { Cell } from 'entities/Board/model/types/Board'
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
}

export default function BoardCell({cell, isBlack, figureClick, isEnabled, enabledClick}: BoardCellProps) {
	return (
		<CellComp 
			black={isBlack}
			onClick={enabledClick}
		>
			{cell.figure?.type ? 
				<FigureComp 
					onClick={figureClick}
					type={cell.figure.type} 
					color={cell.figure.color} /> : null}
			{isEnabled ? <div className={styles.enabled}><Enabled /></div> : null}
		</CellComp>
	)
}
