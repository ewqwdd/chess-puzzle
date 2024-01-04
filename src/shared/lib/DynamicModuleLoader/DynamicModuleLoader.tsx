import { Reducer } from '@reduxjs/toolkit'
import { ReduxStoreWithManager, StateSchema, StateSchemaKey } from 'app/store/model/types/types'
import { ReactNode, useEffect } from 'react'
import { useStore } from 'react-redux'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'

interface DynamicModuleLoaderProps {
    reducers: ReducerList
    destroyOnUnMount?: boolean
    children: ReactNode
}

export type ReducerList = { [name in StateSchemaKey]?: Reducer<NonNullable<StateSchema[name]>> }


export default function DynamicModuleLoader({children, reducers, destroyOnUnMount}: DynamicModuleLoaderProps) {
	
	const store = useStore() as ReduxStoreWithManager
	const dispatch = useAppDispatch()
    
	useEffect(() => {
		Object.entries(reducers).forEach(([name, reducer]) => {
			if (Object.keys(store.reducerManager.getReducerMap()).includes(name)) return
			store.reducerManager.add(name as StateSchemaKey, reducer)
			dispatch({ type: `@INIT ${name} reducer` })
		})

		return () => {
			if (destroyOnUnMount) {
				Object.keys(reducers).forEach((name) => {
					store.reducerManager.remove(name as StateSchemaKey)
					dispatch({ type: `@DESTROY ${name} reducer` })
				})
			}
		}
	}, [])
    
	return children
}
