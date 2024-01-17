import { createSelector } from '@reduxjs/toolkit'
import { StateSchema } from 'app/store'
import { setBoard } from 'entities/Board'

export const getStats = createSelector(
	(state: StateSchema) => state.stats?.averageTime,
	(state: StateSchema) => state.stats?.solved,
	(averageTime, solved) => ({
		averageTime,
		solved,
	}),
)

export const getError = (state: StateSchema) => state.stats?.error
export const getErrorPuzzles = (state: StateSchema) => state.stats?.errorPuzzles
export const getIsLoading = (state: StateSchema) => state.stats?.isLoading
export const getIsLoadingPuzzles = (state: StateSchema) => state.stats?.isLoadingPuzzles
export const getPagesNumber = (state: StateSchema) => state.stats?.pagesNumber || 1

export const getBoards = createSelector(
	(state: StateSchema) => state.stats?.puzzles,
	(puzzles) =>
		puzzles?.map((elem) => {
			console.log(elem)
			return {
				board: setBoard(
					typeof elem.puzzle === 'string' ? JSON.parse(elem.puzzle).board : elem.puzzle.board,
					Array(8)
						.fill(null)
						.map(() =>
							Array(8)
								.fill(null)
								.map(() => ({ atacked: [] })),
						),
				).board,
				id: elem.id,
			}
		}),
)