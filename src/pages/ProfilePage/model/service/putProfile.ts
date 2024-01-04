import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { User, userActions } from 'entities/User'
import $createApi from 'shared/api/api'
import { EditErrors } from '../types/types'

export const putProfile = createAsyncThunk<void, DeepPartial<User>, {rejectValue: EditErrors | string}>(
	'editProfileSlice/putProfile',
	async (user, thunkAPI) => {
		try {
			const { data } = await $createApi(thunkAPI.dispatch).put('users', user)
			thunkAPI.dispatch(userActions.setUser(data))
			return
		} catch(err) {
			if(err instanceof AxiosError) {
				if (err.response?.status === 400) {
					const mes = err.response.data
					const formErrors: Record<string, string> = {}
					if (Array.isArray(mes)) {
						mes.forEach(elem => {
							if (typeof elem === 'string') {
								const index = elem.split(' ')[0]
								if (!index) return
								formErrors[index] = elem
							}
						})
					}
					return thunkAPI.rejectWithValue(formErrors as EditErrors)
				}
			}
			return thunkAPI.rejectWithValue('Internal Server Error!')
		}
        
	}
)