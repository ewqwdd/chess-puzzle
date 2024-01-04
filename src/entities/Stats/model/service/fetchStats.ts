import { createAsyncThunk } from '@reduxjs/toolkit'
import $createApi from 'shared/api/api'
import { SolvedPuzzle } from '../types/types'

export const fetchStats = createAsyncThunk<SolvedPuzzle[], number, { rejectValue: string }>(
	'statsSlice/fetchStats',
	async (id, ThunkApi) => {
		try{
			const {data} = await $createApi(ThunkApi.dispatch).get<SolvedPuzzle[]>(`users/stats/${id}`)
			return data
		}
		catch(err) {
			return ThunkApi.rejectWithValue('Server Error')
		}
	}
)