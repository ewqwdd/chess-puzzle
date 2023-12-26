import { getBoard, getCurrent, getEnabled, getIsLoading } from './model/selectors/selectors'
import { boardReducer } from './model/slice/boardSlice'
import { BoardCells, BoardSchema, CellCords, playerColor } from './model/types/Board'
import Board from './ui/Board'

export {
	Board,
	boardReducer,
	getBoard,
	playerColor,
	getEnabled,
	getIsLoading,
	getCurrent
}
export type { BoardSchema, BoardCells, CellCords }
