import { StateSchema } from 'app/store'

export const getBoard = (state: StateSchema) => state.board?.board || []
export const getIsLoading = (state: StateSchema) => state.board?.isLoading
export const getEnabled = (state: StateSchema) => state.board.enabled || []
export const getCurrent = (state: StateSchema) => state.board.current
