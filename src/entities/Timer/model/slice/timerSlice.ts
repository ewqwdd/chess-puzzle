import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { TimerSchema } from '../types/types'

const initialState: TimerSchema = {
	timer: 0
}

const timerSlice = createSlice({
	name: 'timerSlice',
	initialState,
	reducers: {
		setTimer(state, action: PayloadAction<number | undefined>) {
			state.timer = action.payload ??  state.timer + 1
		}
	}
})

export const timerActions = timerSlice.actions
export const timerReducer = timerSlice.reducer