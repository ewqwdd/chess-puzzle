import { lazy } from 'react'

const PlaySidebarAsync = lazy(async() => await import('./PlaySidebar'))

export default PlaySidebarAsync