import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { BoardSchema, CellCords } from '../types/Board'
import { fetchPuzzle } from '../services/fetchPuzzle'
import { setBoard } from '../helpers/setBoard'
import { clearAtackedCells, setAttackedCellsForAll } from 'entities/Figure/helpers/attackedCells'
import { FigureTypes, figureMap } from 'entities/Figure'
import { getAllowed } from 'entities/Figure/model/getAllowed/filter/getAllowed'
import captureSound from 'shared/sound/capture.wav'
import moveSound from 'shared/sound/move-self.wav'
import { savePuzzle } from '../services/savePuzzle'

const capture = new Audio(captureSound)
const move = new Audio(moveSound)


const initialState: BoardSchema = {
	board: Array(8).fill(null).map(() => Array(8).fill(null).map(() => ({atacked: []}))),
	current: undefined,
	enabled: [],
	allyKingPos: [7, 4],
	enemyKingPos: [0, 4],
	saved: {}
}

const boardSlice = createSlice({
	name: 'boardSlice',
	initialState,
	reducers: {
		setCurrent(state, action: PayloadAction<CellCords>) {
			state.current = action.payload
			const [row, col] = action.payload
			const cell = state.board[row][col]
			if (!cell.figure?.type) return
			const enabled = getAllowed[cell.figure.type](action.payload, [...state.board], state.allyKingPos) ?? []
			state.enabled = enabled
		},

		move(state, action: PayloadAction<CellCords>) {
			const {board, current} = state
			let isKilled: boolean
			if (!current) return
			const [rowPrev, colPrev] = current
			const [row, col] = action.payload
			const arrMove = [...current, ...action.payload]
			const figure = board[rowPrev][colPrev].figure
			if(!figure) return
			if(board[row][col].figure) {
				isKilled = true
			}
			else {
				isKilled = false
			}
			state.lastMove = {
				move: [current, [row, col]],
				killed: board[row][col].figure?.type
			}
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
			state.blocked = true
			if (state.puzzle?.[0].move.flat(1).every((elem, index) => elem === arrMove[index])) {
				state.puzzle.shift()
			}
			else {
				state.failed = true
			}

			if(isKilled) {
				capture.play()
			}
			else {
				move.play()
			}
		},
		
		moveFree(state, action: PayloadAction<[CellCords, CellCords]>) {
			const [[row, col], [rowNext, colNext]] = action.payload
			state.board[rowNext][colNext].figure = state.board[row][col].figure
			state.board[row][col].figure = undefined
		}, 

		reverseLast(state) {
			if(!state.lastMove) return
			const [[row, col], [rowNext, colNext]] = state.lastMove.move
			const killed = state.lastMove.killed
			state.board[row][col].figure = state.board[rowNext][colNext].figure
			state.board[rowNext][colNext].figure = killed ? figureMap(killed, false) : undefined
			state.failed = false
			state.blocked = false
		}, 

		clearCurrent(state) {
			state.current = undefined
			state.enabled = []
		},

		moveNext(state) {
			if (state.failed) return
			if(!state.puzzle?.length || state.puzzle.length<=1) return
			const [[row, col], [rowNext, colNext]] = state.puzzle[0].move
			const figure = state.board[row][col].figure
			const figureNext = state.board[rowNext][colNext].figure
			state.board[rowNext][colNext].figure = figure
			state.board[row][col].figure = undefined
			state.puzzle.shift()
			state.blocked = false
			if(figureNext) {
				capture.play()
			}
			else {
				move.play()
			}
		},

		setAllyKingPos(state, action: PayloadAction<CellCords>) {
			state.allyKingPos = action.payload
		},

		setEnemyKingPos(state, action: PayloadAction<CellCords>) {
			state.enemyKingPos = action.payload
		},

		clear(state) {
			state.board = Array(8).fill(null).map(() => Array(8).fill(null).map(() => ({atacked: []})))
			state.id = undefined
			state.allyKingAtacked = undefined
			state.current = undefined
			state.enabled = undefined
			state.blocked = undefined
			state.puzzle = undefined
		}
	},
	extraReducers: (build) => {
		build.addCase(fetchPuzzle.pending, (state) => {
			state.isLoading = true
			state.board = Array(8).fill(null).map(() => Array(8).fill(null).map(() => ({atacked: []})))
			state.id = undefined
			state.allyKingAtacked = undefined
			state.current = undefined
			state.enabled = undefined
			state.blocked = undefined
			state.puzzle = undefined
			state.error = undefined
			state.failed = undefined
		})

		build.addCase(fetchPuzzle.fulfilled, (state, action) => {
			state.id = action.payload.id
			state.isLoading = false
			const {allyKingPos, board, enemyKingPos} = setBoard(action.payload.board, state.board)
			state.board = board
			state.puzzle = action.payload.puzzle
			if (allyKingPos) state.allyKingPos = allyKingPos
			if (enemyKingPos) state.enemyKingPos = enemyKingPos
		})

		build.addCase(fetchPuzzle.rejected, (state, action) => {
			state.isLoading = false
			state.error = action.payload as string
		})

		build.addCase(savePuzzle.pending, (state) => {
			state.saved.isLoading = true
		})

		build.addCase(savePuzzle.rejected, (state, action) => {
			state.saved.error = action.payload
		})

		build.addCase(savePuzzle.fulfilled, (state) => {
			state.saved.isSuccess = true
			state.saved.isLoading = false
		})
	}
})

export const boardReducer = boardSlice.reducer
export const boardActions = boardSlice.actions
