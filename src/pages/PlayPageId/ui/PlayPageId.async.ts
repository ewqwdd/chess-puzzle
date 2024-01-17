import { lazy } from 'react'

const PlayPageIdAsync = lazy(async() => await import('./PlayPageId'))

export default PlayPageIdAsync