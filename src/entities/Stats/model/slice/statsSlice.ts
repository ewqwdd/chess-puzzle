import { createSlice } from '@reduxjs/toolkit'
import { StatsSchema } from '../types/types'
import { fetchStats } from '../service/fetchStats'

const initialState: StatsSchema = {
	puzzles: []
}

const statsSlice = createSlice({
	name: 'statsSlice',
	initialState,
	reducers: {
		clear(state) {
			state.puzzles = []
		}
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
		build.addCase(fetchStats.fulfilled, (state, {payload}) => {
			state.puzzles = payload
			state.isLoading = false
		})
	}
})

export const statsActions = statsSlice.actions
export const statsReducer = statsSlice.reducer