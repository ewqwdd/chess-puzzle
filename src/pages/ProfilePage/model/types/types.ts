import { User } from 'entities/User'

export type EditErrors = DeepPartial<Record<keyof User, string[]>>

export interface EditProfileSchema {
    errors?: EditErrors
    serverError?: string
    isLoading?: boolean
    isFullfiled?: boolean
}