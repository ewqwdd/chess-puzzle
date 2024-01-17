import { AnyAction, Reducer, ReducersMapObject, EnhancedStore } from '@reduxjs/toolkit'
import { BoardSchema } from 'entities/Board'
import { StatsSchema } from 'entities/Stats'
import { TimerSchema } from 'entities/Timer'
import { UserSchema } from 'entities/User'
import { EditProfileSchema } from 'pages/ProfilePage'
import { AuthFormSchema } from 'widgets/AuthForm/model'

export interface StateSchema {
    board?: BoardSchema
    timer: TimerSchema
    user: UserSchema
    authForm: AuthFormSchema
    stats?: StatsSchema
    editProfile?: EditProfileSchema
}

export type StateSchemaKey = keyof StateSchema
 
export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>
    reduce: (state: StateSchema, action: AnyAction) => StateSchema,
    add: (key: StateSchemaKey, reducer: Reducer) => void
    remove: (key: StateSchemaKey) => void
    // true - вмонтирован, false - демонтирован
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema>{
    reducerManager: ReducerManager
}