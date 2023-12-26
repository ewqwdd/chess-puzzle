import { AnyAction, Reducer, ReducersMapObject, CombinedState } from '@reduxjs/toolkit'
import { BoardSchema } from 'entities/Board'

export interface StateSchema {
    board: BoardSchema
}

export type StateSchemaKey = keyof StateSchema
 
export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>,
    add: (key: StateSchemaKey, reducer: Reducer) => void
    remove: (key: StateSchemaKey) => void
    // true - вмонтирован, false - демонтирован
}