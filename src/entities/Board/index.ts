import { getBoard, getCurrent, getEnabled, getIsCompleted, getIsFailed, getIsLoading, getPuzzle } from './model/selectors/selectors'
import { boardReducer } from './model/slice/boardSlice'
import { BoardCells, BoardSchema, CellCords, Puzzle, playerColor } from './model/types/Board'
import Board from './ui/Board'
import FailedModal from './ui/FailedModal/FailedModal'

export {
	Board,
	boardReducer,
	getBoard,
	playerColor,
	getEnabled,
	getIsLoading,
	getCurrent,
	getIsFailed,
	FailedModal,
	getIsCompleted,
	getPuzzle,
	type Puzzle
}
export type { BoardSchema, BoardCells, CellCords }
