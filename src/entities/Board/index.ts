import { getBoard, getCurrent, getEnabled, getIsCompleted, getIsFailed, getIsLoading } from './model/selectors/selectors'
import { boardReducer } from './model/slice/boardSlice'
import { BoardCells, BoardSchema, CellCords, playerColor } from './model/types/Board'
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
	getIsCompleted
}
export type { BoardSchema, BoardCells, CellCords }
