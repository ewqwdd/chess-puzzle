import { createAsyncThunk } from '@reduxjs/toolkit'
import { User } from '../types/User'
import { AxiosError } from 'axios'
import $createApi from 'shared/api/api'

export const fetchUser = createAsyncThunk<User, void, { rejectValue: string }>(
	'userSlice/fetchUser',
	async (_, thunkAPI) => {
		try {

			const {data: user} = await $createApi(thunkAPI.dispatch).get<User>('/users')

			return user
		} catch(err) {
			if (err instanceof AxiosError) {
				if (err.response?.status === 401) {
					return thunkAPI.rejectWithValue('Not authorized')
				}
				return thunkAPI.rejectWithValue('Internal server error! Please try again later.')
			}
			return thunkAPI.rejectWithValue('Internal server error! Please try again later.')
		}

	}
)
