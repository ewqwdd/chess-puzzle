import { lazy } from 'react'

const AuthFormAsync = lazy(async() => await import('./AuthForm'))

export default AuthFormAsync