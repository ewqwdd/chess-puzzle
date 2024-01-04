import { createAsyncThunk } from '@reduxjs/toolkit'
import { ReturnToken } from '../types/User'
import { AxiosError } from 'axios'
import $createApi from 'shared/api/api'
import { authFormActions } from 'widgets/AuthForm/model'

interface Credentials {
    username: string
    password: string
}

export const login = createAsyncThunk<void, Credentials, { rejectValue: string }>(
	'userSlice/login',
	async ({password, username}, thunkAPI) => {
		try {
			const {data} = await $createApi(thunkAPI.dispatch).post<ReturnToken>('/auth/signin', {password, username})

			localStorage.setItem('token', data.access_token)
			thunkAPI.dispatch(authFormActions.close())
		} catch(err) {
			if (err instanceof AxiosError) {
				if (err.response?.status === 401) {
					return thunkAPI.rejectWithValue('Incorrect credentials!')
				}
				return thunkAPI.rejectWithValue('Internal server error! Please try again later.')
			}
			return thunkAPI.rejectWithValue('Internal server error! Please try again later.')
		}
	}
)