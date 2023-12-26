import { lazy } from 'react'

const PlayPageAsync = lazy(async() => await import('./PlayPage'))

export default PlayPageAsync