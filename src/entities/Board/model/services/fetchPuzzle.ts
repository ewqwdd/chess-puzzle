import { createAsyncThunk } from '@reduxjs/toolkit'
import { Puzzle } from '../types/Board'
import { StateSchema } from 'app/store'
import $createApi from 'shared/api/api'
import { AxiosError } from 'axios'

export const fetchPuzzle = createAsyncThunk<{playerWhite: boolean} & Puzzle, string | undefined, {state: StateSchema, rejectValue: string}>(
	'boardSlice/fetchPuzzle',
	// @ts-expect-error sdsadasdas
	async (id, ThunkApi) => {
		try {
			const {data} = await $createApi(ThunkApi.dispatch).get<Puzzle>(`puzzles/${id ?? ''}`)
			if (!data) {
				return ThunkApi.rejectWithValue('You have solved all puzzles!')
			}
			return {...data, playerWhite: true}
		}
		catch(err) {
			if (err instanceof AxiosError) {
				return ThunkApi.rejectWithValue('Couldn\'t load a puzzle, try again later')
			}
		}
		
	}
)