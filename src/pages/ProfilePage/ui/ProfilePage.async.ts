import { lazy } from 'react'

const ProfilePageAsync = lazy(async() => await import('./ProfilePage'))

export default ProfilePageAsync