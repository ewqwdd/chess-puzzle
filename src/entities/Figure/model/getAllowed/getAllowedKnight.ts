import { BoardCells, CellCords } from 'entities/Board'

const indexes = [
	[2, 1],
	[1, 2],
	[1, -2],
	[-2, 1],
	[2, -1],
	[-1, 2],
	[-1, -2],
	[-2, -1]

]
export const buildGetAllowedKnight = (indexes:number[][]) => 
	([row, col]: CellCords, board: BoardCells, boardSize: number) => {
		const isAlly = board[row][col].figure?.isAlly
		const allowed: CellCords[] = []
		for(const [indexI, indexJ] of indexes){
			const i = row+indexI
			const j = col+indexJ
			if ((i<boardSize && i>=0) && (j<boardSize && j>=0) && board[i][j].figure?.isAlly !== isAlly) {
				allowed.push([i, j])
			}
		}
		return allowed
	}


export const getAllowedKnight = buildGetAllowedKnight(indexes)