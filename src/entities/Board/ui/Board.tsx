import { memo, useEffect } from 'react'
import { BoardCells, CellCords, playerColor } from '../model/types/Board'
import { HStack } from 'shared/ui/Flex'
import BoardCell from './BoardCell/BoardCell'
import FailedModal from './FailedModal/FailedModal'
import SuccessModal from './SuccessModal/SuccessModal'
import { Spinner } from 'shared/ui/Spinner'
import styles from './Board.module.less'
import ErrorModal from './ErrorModal/ErrorModal'

interface BoardProps {
	stop: () => void
	reset: () => void
	clear?: () => void
	retry?: () => void
	retryFetch?: () => void
	saveResult?: () => void
	figureClick?: (cords: CellCords) => () => void
	enabledClick?: (cords: CellCords) => () => void
	boardCells?: BoardCells
	isLoading?: boolean
	enabled?: CellCords[]
	isFailed?: boolean
	isCompleted?: boolean
	isBlocked?: boolean
	error?: string
	savedIsLoading?: boolean
	savedError?: string
}

export default memo(function Board({
	stop,
	clear,
	retry,
	retryFetch,
	saveResult,
	enabledClick,
	figureClick,
	boardCells = [],
	enabled = [],
	error,
	isBlocked,
	isCompleted,
	isFailed,
	isLoading,
	savedError,
	savedIsLoading,
}: BoardProps) {
	
	useEffect(() => {
		if (isCompleted) {
			stop()
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
									elem.figure?.isAlly && figureClick
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
			<FailedModal isVisible={isFailed} retry={retry} />
			<SuccessModal isVisible={isCompleted} />
			<ErrorModal
				isVisible={!!error}
				text={error}
				title='Failed to load Puzzle'
				retry={retryFetch}
			/>
			<ErrorModal
				isVisible={!!savedError}
				text={'Please try again later'}
				title='Failed to save your result'
			/>
		</div>
	)
})
