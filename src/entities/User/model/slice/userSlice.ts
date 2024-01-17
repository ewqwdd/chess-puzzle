import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { User, UserSchema } from '../types/User'
import { fetchUser } from '../services/fetchUser'
import { login } from '../services/login'
import { fetchPicture } from '../services/fetchPicture'
import { register } from '../services/register'

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
		},
		setAvatar(state, action: PayloadAction<string>) {
			if (!state.user) return 
			state.user.avatar = undefined
			state.user.avatarUrl = action.payload
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
		build.addCase(register.pending, (state) => {
			state.isLoading = true
			state.isAuth = false
			localStorage.removeItem('token')
			state.user = undefined
		})
		build.addCase(register.rejected, (state, action) => {
			state.isLoading = false
			state.error = action.payload
		})
		build.addCase(register.fulfilled, (state) => {
			state.isAuth = true
		})
		build.addCase(fetchPicture.pending, (state) => {
			state.avatarLoading = true 
		})
		build.addCase(fetchPicture.fulfilled, (state, {payload}) => {
			state.avatarLoading = false 
			if (payload && state.user) {
				state.user.avatarUrl = payload
			}
		})
		build.addCase(fetchPicture.rejected, (state) => {
			state.avatarLoading = false 
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