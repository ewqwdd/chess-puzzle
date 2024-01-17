import { memo, useEffect } from 'react'
import { BoardCells, CellCords, playerColor } from '../model/types/Board'
import { HStack } from 'shared/ui/Flex'
import BoardCell from './BoardCell/BoardCell'
import { Spinner } from 'shared/ui/Spinner'
import styles from './Board.module.less'

interface BoardProps {
	stop?: () => void
	reset?: () => void
	clear?: () => void
	saveResult?: () => void
	figureClick?: (cords: CellCords) => () => void
	enabledClick?: (cords: CellCords) => () => void
	boardCells?: BoardCells
	isLoading?: boolean
	enabled?: CellCords[]
	isCompleted?: boolean
	isBlocked?: boolean
	savedIsLoading?: boolean
}

export default memo(function Board({
	stop,
	clear,
	saveResult,
	enabledClick,
	figureClick,
	boardCells = [],
	enabled = [],
	isBlocked,
	isCompleted,
	isLoading,
	savedIsLoading,
}: BoardProps) {

	useEffect(() => {
		if (isCompleted) {
			stop?.()
			saveResult?.()
		}
	}, [isCompleted])

	return (
		<div>
			{isLoading || savedIsLoading ? (
				<Spinner className={styles.spinner} />
			) : null}
			{boardCells.map((row, rowIndex) => (
				<HStack key={rowIndex}>
					{row.map((elem, colIndex) => {
						const isBlack =
							(colIndex + (rowIndex % 2 === 0 ? 1 : 0)) % 2 === 0
						const cords: CellCords = [rowIndex, colIndex]
						const isEnabled = !!enabled.find(
							(cord) =>
								cord[0] === rowIndex && cord[1] === colIndex,
						)
						return (
							<BoardCell
								playerColor={playerColor.WHITE}
								altColor={playerColor.BLACK}
								cell={elem}
								isBlack={isBlack}
								key={colIndex}
								figureClick={
									elem?.figure?.isAlly && figureClick
										? figureClick?.(cords)
										: () => {}
								}
								isEnabled={isEnabled}
								enabledClick={
									isEnabled ? enabledClick?.(cords) : clear
								}
								blocked={isBlocked}
								cellCords={[rowIndex, colIndex]}
							/>
						)
					})}
				</HStack>
			))}

		</div>
	)
})
