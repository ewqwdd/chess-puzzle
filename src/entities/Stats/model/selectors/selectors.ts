import { createSelector } from '@reduxjs/toolkit'
import { StateSchema } from 'app/store'

export const getStats = createSelector(
	(state: StateSchema) => state.stats?.puzzles,
	(puzzles) => {
		const solved = puzzles?.length ?? 1
		const averageTime = (puzzles?.reduce((acc, elem) => acc + elem.time, 0) ?? 0) / solved
		return {
			solved,
			averageTime
		}
	}
)

export const getError = (state: StateSchema) => state.stats?.error
export const getIsLoading = (state: StateSchema) => state.stats?.isLoading
