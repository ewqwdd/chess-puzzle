import { ReactNode, memo, useMemo } from 'react'
import { Provider } from 'react-redux'
import { createReduxStore } from '../model/store/store'
import { StateSchema } from '../model/types/types'
import { ReducersMapObject } from '@reduxjs/toolkit'

interface StoreProviderProps {
    children: ReactNode
    initialState?: StateSchema
    asyncReducers?: DeepPartial<ReducersMapObject>
}

export default memo(function StoreProvider({children, asyncReducers, initialState}: StoreProviderProps) {
	const store = useMemo(() => createReduxStore(initialState, asyncReducers), [])
	return (
		<Provider store={store}>
			{children}
		</Provider>
	)
})
