import { createSelector } from '@reduxjs/toolkit'
import { StateSchema } from 'app/store'

export const getBoard = (state: StateSchema) => state.board?.board || []
export const getIsLoading = (state: StateSchema) => state.board?.isLoading
export const getEnabled = (state: StateSchema) => state.board?.enabled || []
export const getCurrent = (state: StateSchema) => state.board?.current
export const getIsFailed = (state: StateSchema) => state.board?.failed
export const getIsBlocked = (state: StateSchema) => state.board?.blocked
export const getId = (state: StateSchema) => state.board?.id
export const getPuzzle = (state: StateSchema) => state.board?.puzzle
export const getSaving = (state: StateSchema) => state.board?.saved
export const getError = (state: StateSchema) => state.board?.error
export const getSavedError = createSelector(
	(state: StateSchema) => state.board?.saved.error, 
	(err) => err
)
export const getSavedIsLoading = createSelector(
	(state: StateSchema) => state.board?.saved.isLoading, 
	(isLoading) => isLoading
)
export const getSavedIsSuccess = createSelector(
	(state: StateSchema) => state.board?.saved.isSuccess, 
	(isSuccess) => isSuccess
)
export const getIsCompleted = createSelector((state: StateSchema) => state.board?.puzzle, 
	(puzzle) => Array.isArray(puzzle) && !puzzle.length)

