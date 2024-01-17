import { lazy } from 'react'

const SideBarDesktopAsync = lazy(async() => await import('./SidebarDesktop'))

export default SideBarDesktopAsync