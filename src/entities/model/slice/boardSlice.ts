import { createSlice } from '@reduxjs/toolkit'
import { Board } from '../types/Board'

const initialState: Board = {
	board: Array(8).fill(null).map(() => Array(8).fill(null).map(() => ({atacked: []})))
}

const boardSlice = createSlice({
	name: 'boardSlice',
	initialState,
	reducers: {}
})

export const boardReducers = boardSlice.reducer
export const boardActions = boardSlice.actions
