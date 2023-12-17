import { CombinedState, Reducer, configureStore } from '@reduxjs/toolkit'
import { StateSchema } from '../types/types'
import { createReducerManager } from './reducerManager'

export const createReduxStore = (initialState?: StateSchema, asyncReducers?: DeepPartial<StateSchema>) => {

	const rootReducers:StateSchema = {
		...asyncReducers
	}
	const reducerManager = createReducerManager(rootReducers)

	const store = configureStore({
		reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
		preloadedState: initialState,
		devTools: _IS_DEV_
	})

	return store
}