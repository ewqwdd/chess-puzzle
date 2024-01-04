import { StateSchema } from 'app/store'

export const getUser = (state: StateSchema) => state.user.user
export const getIsLoading = (state: StateSchema) => state.user.isLoading
export const getError = (state: StateSchema) => state.user.error
export const getIsAuth = (state: StateSchema) => state.user.isAuth
export const getIsMounted = (state: StateSchema) => state.user.isMounted

