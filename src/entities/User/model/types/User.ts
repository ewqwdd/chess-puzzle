export interface User {
    id: number
    username: string
    email: string
    firstName?: string
    lastName?: string
    description?: string
    avatar?: string
}

export interface UserSchema{
    user?: User
    isLoading?: boolean
    error?: string
    isAuth?: boolean
    isMounted?: boolean
}

export interface ReturnToken {
    access_token: string
}