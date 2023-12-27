import { MouseEventHandler, memo, useCallback } from 'react'
import { BoardCells, CellCords, playerColor } from '../model/types/Board'
import { HStack } from 'shared/ui/Flex'
import BoardCell from './BoardCell/BoardCell'
import { boardActions } from '../model/slice/boardSlice'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import FailedModal from './FailedModal/FailedModal'

interface BoardProps {
	boardCells: BoardCells
	enabled: CellCords[]
	current?: CellCords
	isFailed?: boolean
	isCompleted?: boolean
}

export default memo(function Board({boardCells, enabled, isFailed}: BoardProps) {

	const dispatch = useAppDispatch()

	const figureClick = useCallback((cords: CellCords): MouseEventHandler<HTMLButtonElement> => {
		return (e) => {
			e.stopPropagation()
			dispatch(boardActions.setCurrent(cords))
		}
	}, [dispatch])

	const enabledClick = useCallback((cords: CellCords) => {
		return () => {
			dispatch(boardActions.move(cords))
			setTimeout(() => {
				dispatch(boardActions.moveNext())
			}, 500)
		}
	}, [dispatch])

	const clear = useCallback(() => {
		dispatch(boardActions.clearCurrent())
	}, [dispatch])

	const retry = useCallback(() => {
		dispatch(boardActions.reverseLast())
	}, [])
	
	return (
		<div>
			{boardCells.map(
				(row, rowIndex) => (
					<HStack key={rowIndex}>{
						row.map((elem, colIndex) => {
							const isBlack = (colIndex + (rowIndex % 2 === 0 ? 1 : 0)) % 2 === 0
							const cords: CellCords = [rowIndex, colIndex]
							const isEnabled = !!enabled.find(cord => cord[0] === rowIndex && cord[1] === colIndex)
							return (
								<BoardCell
									playerColor={playerColor.WHITE}
									altColor={playerColor.BLACK}
									cell={elem} 
									isBlack={isBlack} 
									key={colIndex} 
									figureClick={figureClick(cords)}
									isEnabled={isEnabled}
									enabledClick={isEnabled ? enabledClick(cords) : clear}
								/>
							)
							
						})
					}</HStack>
				)
			)}
			<FailedModal isVisible={isFailed} retry={retry} />
			
		</div>
	)
}
)