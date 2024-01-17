import { isDesktop } from 'react-device-detect'
import { Suspense, memo } from 'react'
import SidebarMobileAsync from './SidebarMobile/SidebarMobile.async'
import { HStack } from 'shared/ui/Flex'
import { Spinner } from 'shared/ui/Spinner'
import SideBarDesktopAsync from './SidebarDesktop/SidebarDesktop.async'
interface SidebarProps {
	className?: string
}

export default memo(function Sidebar({ className }: SidebarProps) {
	return (
		<Suspense
			fallback={
				<HStack justify='center'>
					<Spinner />
				</HStack>
			}
		>
			{isDesktop ? (
				<SideBarDesktopAsync className={className} />
			) : <SidebarMobileAsync />}
		</Suspense>
	)
})
