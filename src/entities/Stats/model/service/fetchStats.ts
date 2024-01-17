import { createAsyncThunk } from '@reduxjs/toolkit'
import $createApi from 'shared/api/api'

interface ReturnType {
	avgTime: number
	solved: number
}

export const fetchStats = createAsyncThunk<ReturnType, number, { rejectValue: string }>(
	'statsSlice/fetchStats',
	async (id, ThunkApi) => {
		try{
			const {data} = await $createApi(ThunkApi.dispatch).get<ReturnType>(`users/stats/${id}`)
			return data
		}
		catch(err) {
			return ThunkApi.rejectWithValue('Server Error')
		}
	}
)