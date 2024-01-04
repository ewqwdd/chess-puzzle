import { ReactNode, memo, useMemo } from 'react'
import { Provider } from 'react-redux'
import { store } from '../model/store/store'

interface StoreProviderProps {
    children: ReactNode
    // initialState?: StateSchema
    // asyncReducers?: DeepPartial<ReducersMapObject>
}

export default memo(function StoreProvider({children}: StoreProviderProps) {
	const store_ = useMemo(() => store, [])
	return (
		<Provider store={store_}>
			{children}
		</Provider>
	)
})
