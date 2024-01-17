import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { User, userActions } from 'entities/User'
import $createApi from 'shared/api/api'
import { EditErrors } from '../types/types'

export interface Props extends Omit<User, 'avatar'> {
	avatar?: File
} 

export const putProfile = createAsyncThunk<void, DeepPartial<Props>, {rejectValue: EditErrors | string}>(
	'editProfileSlice/putProfile',
	async (user, thunkAPI) => {
		try {
			const form = new FormData()
			if (user.avatar) {
				// @ts-expect-error asdasdas
				form.append('avatar', user.avatar)
			  }
			  if (user.description) form.append('description', user.description)
			  if (user.email) form.append('email', user.email)
			  if (user.firstName) form.append('firstName', user.firstName)
			  if (user.lastName) form.append('lastName', user.lastName)
			  if (user.username) form.append('username', user.username)

			const { data } = await $createApi(thunkAPI.dispatch).put('users', form)
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