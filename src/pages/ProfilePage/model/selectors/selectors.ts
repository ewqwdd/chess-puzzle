import { StateSchema } from 'app/store'

export const getErrors = (state: StateSchema) => state.editProfile?.errors
export const getServerError = (state: StateSchema) => state.editProfile?.serverError
export const getIsLoading = (state: StateSchema) => state.editProfile?.isLoading
export const getIsFullfilled = (state: StateSchema) => state.editProfile?.isFullfiled
