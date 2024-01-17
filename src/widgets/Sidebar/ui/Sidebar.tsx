import { isDesktop } from 'react-device-detect'
import { memo } from 'react'
import SidebarDesktop from './SidebarDesktop/SidebarDesktop'
import SidebarMobile from './SidebarMobile/SidebarMobile'
interface SidebarProps {
	className?: string
}

export default memo(function Sidebar({ className }: SidebarProps) {
	return isDesktop ? (
		<SidebarDesktop className={className} />
	) : (
		<SidebarMobile />
	)
})
