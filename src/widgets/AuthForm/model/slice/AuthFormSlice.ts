import { createSlice } from '@reduxjs/toolkit'
import { AuthFormSchema } from '../types/authForm'

const initialState: AuthFormSchema = {
	isOpen: false,
	isRegister: false
}


const authFormSlice = createSlice({
	name: 'authFormSlice',
	initialState,
	reducers: {
		open(state) {
			state.isOpen = true
		},
		close(state) {
			state.isOpen = false
		},
		setRegister(state) {
			state.isRegister = true
		},
		setLogin(state) {
			state.isRegister = false
		}
	}
})

export const authFormActions = authFormSlice.actions
export const authFormReducer = authFormSlice.reducer