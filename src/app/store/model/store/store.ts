import { Action, CombinedState, Reducer, ReducersMapObject, configureStore } from '@reduxjs/toolkit'
import { StateSchema } from '../types/types'
import { createReducerManager } from './reducerManager'
import { timerReducer } from 'entities/Timer'
import { userReducer } from 'entities/User'
import { authFormReducer } from 'widgets/AuthForm/model'

export const createReduxStore = (initialState?: StateSchema, asyncReducers?: DeepPartial<ReducersMapObject>) => {

	console.log(userReducer)
	const rootReducers: ReducersMapObject<StateSchema, Action<unknown>> = {
		...asyncReducers,
		timer: timerReducer,
		user: userReducer,
		authForm: authFormReducer
	}
	const reducerManager = createReducerManager(rootReducers)

	const store = configureStore({
		reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
		preloadedState: initialState,
		devTools: _IS_DEV_,
		middleware: (getDefaultMiddleware) => getDefaultMiddleware({
			serializableCheck: false
		})
	}) 
	//@ts-expect-error ToO difficult to add a new propety to Redux store
	store.reducerManager = reducerManager
	console.log(reducerManager.getReducerMap())
	return store
}

export const store = createReduxStore()

type store = ReturnType<typeof createReduxStore>
export type AppDispatch = store['dispatch']