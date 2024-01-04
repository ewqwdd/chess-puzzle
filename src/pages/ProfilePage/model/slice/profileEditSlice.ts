import { createSlice } from '@reduxjs/toolkit'
import { EditProfileSchema } from '../types/types'
import { putProfile } from '../service/putProfile'

const initialState: EditProfileSchema = {}

const editProfileSlice = createSlice({
	name: 'profileEditSlice',
	initialState,
	reducers: {
		clearErrors(state) {
			state.errors = undefined
			state.serverError = undefined
		},
	},
	extraReducers: (build) => {
		build.addCase(putProfile.pending, (state) => {
			state.isLoading = true
			state.errors = undefined
			state.serverError = undefined
			state.isFullfiled = undefined
		})
		build.addCase(putProfile.rejected, (state, { payload }) => {
			state.isLoading = false
			if (typeof payload === 'string') {
				state.serverError = payload
			} else {
				state.errors = payload
			}
		})
		build.addCase(putProfile.fulfilled, (state) => {
			state.isLoading = false
			state.isFullfiled = true
		})
	},
})

export const editProfileActions = editProfileSlice.actions
export const editProfileRedcuer = editProfileSlice.reducer
