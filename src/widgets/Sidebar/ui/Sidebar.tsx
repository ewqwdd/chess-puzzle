import { isDesktop } from 'react-device-detect'
import { Suspense, memo } from 'react'
import SidebarDesktop from './SidebarDesktop/SidebarDesktop'
import SidebarMobileAsync from './SidebarMobile/SidebarMobile.async'
import { HStack } from 'shared/ui/Flex'
import { Spinner } from 'shared/ui/Spinner'
interface SidebarProps {
	className?: string
}

export default memo(function Sidebar({ className }: SidebarProps) {
	return isDesktop ? (
		<SidebarDesktop className={className} />
	) : (
		<Suspense fallback={
			<HStack justify='center'>
				<Spinner />
			</HStack>
		}>
			<SidebarMobileAsync />
		</Suspense>
	)
})
