import { createSlice } from '@reduxjs/toolkit'
import { StatsSchema } from '../types/types'
import { fetchStats } from '../service/fetchStats'
import { fetchSolved } from '../service/fetchSolved'

const initialState: StatsSchema = {
	puzzles: [],
}

const statsSlice = createSlice({
	name: 'statsSlice',
	initialState,
	reducers: {
		clear(state) {
			state.puzzles = []
		},
	},
	extraReducers:  (build) => {
		build.addCase(fetchStats.pending, (state) => {
			state.error = undefined
			state.isLoading = true
		})
		build.addCase(fetchStats.rejected, (state, {payload}) => {
			state.error = payload
			state.isLoading = false
		})
		build.addCase(fetchStats.fulfilled, (state, {payload: {avgTime, solved}}) => {
			state.averageTime = avgTime
			state.solved = solved
			state.isLoading = false
		})
		build.addCase(fetchSolved.pending, (state) => {
			state.isLoadingPuzzles = true
			state.errorPuzzles = undefined
		})
		build.addCase(fetchSolved.rejected, (state, {payload}) => {
			state.isLoadingPuzzles = false
			state.errorPuzzles = payload
		})
		build.addCase(fetchSolved.fulfilled, (state, {payload: {pages, puzzles}}) => {
			state.isLoadingPuzzles = false
			state.puzzles = puzzles
			state.pagesNumber = pages
		})
	}
})

export const statsActions = statsSlice.actions
export const statsReducer = statsSlice.reducer