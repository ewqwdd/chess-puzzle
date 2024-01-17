import { createAsyncThunk } from '@reduxjs/toolkit'
import $createApi from 'shared/api/api'
import { SolvedPuzzle } from '../types/types'

interface Params {id: number, page: number}
interface Return {pages: number, puzzles: SolvedPuzzle[]}

const limit = 3

export const fetchSolved = createAsyncThunk<Return, Params, { rejectValue: string }>(
	'statsSlice/fetchSolved',
	async ({id, page}, ThunkApi) => {
		try{
			const {data} = await $createApi(ThunkApi.dispatch).get<Return>(`users/solved/${id}`, {
				params: {
					page,
					limit
				}
			})
			return data
		}
		catch(err) {
			return ThunkApi.rejectWithValue('Server Error')
		}
	}
)