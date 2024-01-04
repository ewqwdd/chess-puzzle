import { getIsAuth, getIsLoading, getIsMounted, getUser } from './model/selectors/userSelectors'
import { fetchUser } from './model/services/fetchUser'
import { login } from './model/services/login'
import { userActions, userReducer } from './model/slice/userSlice'
import { ReturnToken, User, UserSchema } from './model/types/User'

export {
	type UserSchema,
	type ReturnToken,
	userReducer,
	userActions,
	login,
	fetchUser,
	getIsAuth,
	getIsLoading,
	getIsMounted,
	getUser,
	type User
}