import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { User, UserSchema } from '../types/User'
import { fetchUser } from '../services/fetchUser'
import { login } from '../services/login'

const initialState: UserSchema = {
	isMounted: false
}

const userSlice = createSlice({
	name: 'userSlice',
	initialState,
	reducers: {
		logout(state) {
			localStorage.removeItem('token')
			state.user = undefined
			state.isAuth = undefined
		},
		mount(state) {
			state.isMounted = true
		},
		setUser(state, action: PayloadAction<User>) {
			state.user = action.payload
		}
	},
	extraReducers: (build) => {
		build.addCase(fetchUser.pending, (state) => {
			state.isLoading = true
			state.user = undefined
		})
		build.addCase(fetchUser.fulfilled, (state, action) => {
			state.isLoading = false
			state.user = action.payload
			state.isAuth = true
		})
		build.addCase(fetchUser.rejected, (state, action) => {
			state.isLoading = false
			state.error = action.payload
			state.isAuth = false
			state.isMounted = true
		})
		build.addCase(login.pending, (state) => {
			state.isLoading = true
			state.isAuth = false
			localStorage.removeItem('token')
			state.user = undefined
		})
		build.addCase(login.rejected, (state, action) => {
			state.isLoading = false
			state.error = action.payload
		})
		build.addCase(login.fulfilled, (state) => {
			state.isAuth = true
		})
	}
})

export const userActions = userSlice.actions
export const userReducer = userSlice.reducer

// const userSlice = createSlice({
// 	name: 'userSlice',
// 	initialState,
// 	reducers: {
// 		logout(state) {
// 			localStorage.removeItem('token')
// 			state.user = undefined
// 			state.isAuth = undefined
// 		},
// 		mount(state) {
// 			state.isMounted = true
// 		}
// 	},
// 	extraReducers: (build) => {



// 	}
// })

// export const userReducer = userSlice.reducer
// export const userActions = userSlice.actions