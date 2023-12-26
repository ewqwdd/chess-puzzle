import { CombinedState, Reducer, ReducersMapObject, configureStore } from '@reduxjs/toolkit'
import { StateSchema } from '../types/types'
import { createReducerManager } from './reducerManager'
import { boardReducer } from 'entities/Board'

export const createReduxStore = (initialState?: StateSchema, asyncReducers?: DeepPartial<ReducersMapObject>) => {

	const rootReducers = {
		...asyncReducers,
		board: boardReducer
	}
	const reducerManager = createReducerManager(rootReducers)

	const store = configureStore({
		reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
		preloadedState: initialState,
		devTools: _IS_DEV_
	})

	return store
}

type store = ReturnType<typeof createReduxStore>
export type AppDispatch = store['dispatch']