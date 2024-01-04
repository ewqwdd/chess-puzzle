import { createAsyncThunk } from '@reduxjs/toolkit'
import { Puzzle } from '../types/Board'
import { StateSchema } from 'app/store'
import $createApi from 'shared/api/api'
import { AxiosError } from 'axios'
import { getId } from '../selectors/selectors'
import { getTimer } from 'entities/Timer/model/selectors/selector'

export const savePuzzle = createAsyncThunk<void, void, {state: StateSchema, rejectValue: string}>(
	'boardSlice/savePuzzle',
	async (_, ThunkApi) => {
		const state = ThunkApi.getState()
		const id = getId(state)
		const time = getTimer(state)
		if (!id) {
			return ThunkApi.rejectWithValue('Couldn\'t identify puzzle')
		}
		if (!time) {
			return ThunkApi.rejectWithValue('Couldn\'t get solution time')
		}
		try {
			await $createApi(ThunkApi.dispatch).post<Puzzle>(`puzzles/complete/${id}`, {
				time
			})
			return
		}
		catch(err) {
			if (err instanceof AxiosError) {
				return ThunkApi.rejectWithValue('Couldn\'t save your solution, try again later')
			}
		}
		
	}
)