import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { BoardSchema, CellCords } from '../types/Board'
import { fetchPuzzle } from '../services/fetchPuzzle'
import { setBoard } from '../helpers/setBoard'
import { clearAtackedCells, setAttackedCellsForAll } from 'entities/Figure/helpers/attackedCells'
import { FigureTypes } from 'entities/Figure'

const initialState: BoardSchema = {
	board: Array(8).fill(null).map(() => Array(8).fill(null).map(() => ({atacked: []}))),
	current: undefined,
	enabled: [],
	allyKingPos: [7, 4],
	enemyKingPos: [0, 4]
}

const boardSlice = createSlice({
	name: 'boardSlice',
	initialState,
	reducers: {
		setCurrent(state, action: PayloadAction<CellCords>) {
			state.current = action.payload
			const [row, col] = action.payload
			const cell = state.board[row][col]
			const enabled = cell.figure?.getAllowed?.(action.payload, [...state.board], state.allyKingPos) ?? []
			state.enabled = enabled
		},

		move(state, action: PayloadAction<CellCords>) {
			const {board, current} = state
			if (!current) return
			const [rowPrev, colPrev] = current
			const [row, col] = action.payload
			const figure = board[rowPrev][colPrev].figure
			if(!figure) return
			board[row][col].figure = figure
			board[rowPrev][colPrev].figure = undefined
			clearAtackedCells(board)
			setAttackedCellsForAll(board)
			if (figure.type === FigureTypes.KING) {
				if (figure.isAlly) state.allyKingPos = action.payload
				else state.enemyKingPos = action.payload
			}
			state.current = undefined
			state.enabled = []
		},

		clearCurrent(state) {
			state.current = undefined
			state.enabled = []
		},

		setAllyKingPos(state, action: PayloadAction<CellCords>) {
			state.allyKingPos = action.payload
		},

		setEnemyKingPos(state, action: PayloadAction<CellCords>) {
			state.enemyKingPos = action.payload
		}
	},
	extraReducers: (build) => {
		build.addCase(fetchPuzzle.pending, (state) => {
			state.isLoading = true
		})

		build.addCase(fetchPuzzle.fulfilled, (state, action) => {
			state.isLoading = false
			const {allyKingPos, board, enemyKingPos} = setBoard(action.payload, state.board)
			state.board = board
			if (allyKingPos) state.allyKingPos = allyKingPos
			if(enemyKingPos) state.enemyKingPos = enemyKingPos
		})
	}
})

export const boardReducer = boardSlice.reducer
export const boardActions = boardSlice.actions
