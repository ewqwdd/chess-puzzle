export interface User {
    id: number
    username: string
    email: string
    firstName?: string
    lastName?: string
    description?: string
    avatar?: string
    avatarUrl?: string
}

export interface UserSchema{
    user?: User
    isLoading?: boolean
    error?: string
    isAuth?: boolean
    isMounted?: boolean
    avatarLoading?: boolean
}

export interface ReturnToken {
    access_token: string
}