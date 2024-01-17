import Button from 'shared/ui/Button/ui/Button'
import BurgerIcon from 'shared/icons/general/hamburger.svg'
import styles from './SidebarMobile.module.less'
import { Logo } from 'shared/ui/logo'
import { useCallback, useEffect } from 'react'
import { ClassNames } from 'shared/lib/ClassaNames/ClassNames'
import { ColorMapper } from 'shared/lib/ColorMapper/ColorMapper'
import CrossIcon from 'shared/icons/general/cross.svg'
import { HStack, VStack } from 'shared/ui/Flex'
import { Paragraph } from 'shared/ui/Paragraph'
import HomeLink from '../HomeLink/HomeLink'
import SidebarRoutesConfig from 'app/router/ui/SidebarRoutes'
import SidebarAuth from '../SidebarAuth/SidebarAuth'
import { useLocation } from 'react-router-dom'
import { GestureProvider, useGestureLibs } from 'shared/context/GestureProvider'
import { Spinner } from 'shared/ui/Spinner'

function SidebarMobileContent() {
	const {Gesture, Spring} = useGestureLibs()
	const location = useLocation()
	const [{ x, opacity, display }, api] = Spring.useSpring(() => ({
		x: window.innerWidth,
		opacity: 0,
		display: 'none',
	}))

	const closeDrawer = useCallback(() => {
		api.start({
			x: window.innerWidth,
			display: 'none',
			opacity: 0,
			immediate: false,
			config: Spring.config.gentle,
		})
	}, [api])
	const openDrawer = useCallback(() => {
		api.start({
			x: 0,
			opacity: 1,
			display: 'block',
			immediate: false,
			config: Spring.config.gentle,
		})
	}, [api])

	const bind = Gesture.useDrag(
		({ last, cancel, velocity: [vx], direction: [dx], movement: [mx] }) => {
			if (mx < -40) cancel()

			if (last) {
				if (mx > 200 || (vx > 0.5 && dx > 0)) {
					closeDrawer()
				} else {
					openDrawer()
				}
			} else {
				api.start({ x: mx, immediate: false })
			}
		},
		{
			from: () => [x.get(), 0],
			filterTaps: true,
			bounds: { left: 0 },
			rubberband: true,
		},
	)

	useEffect(() => {
		closeDrawer()
	}, [location])

	return (
		<>
			<Button
				color='dark'
				className={styles.btn}
				square
				onClick={openDrawer}
			>
				<BurgerIcon />
			</Button>
			<Spring.a.div
				className={styles.overlay}
				style={{ opacity, display }}
				onClick={closeDrawer}
			/>
			<Spring.a.div
				className={ClassNames(styles.sidebar, {}, [
					ColorMapper('item-dark', 'bg'),
				])}
				style={{
					x: x,
				}}
				{...bind()}
			>
				<VStack align='align-center' gap={12}>
					<HStack className={styles.logoWrapper} align='align-start' gap={6}>
						<HStack className={styles.logo} justify='center'>
							<Logo size={3}/>
						</HStack>
						<Button
							color='dark'
							className={styles.btn}
							square
							onClick={closeDrawer}
						>
							<CrossIcon />
						</Button>
					</HStack>	
					<Paragraph size={3} className={ClassNames(ColorMapper('secondary', 'text'), {}, [styles.slogan])} textAlign='center'>
				Unleash Your Strategy: Solve, Checkmate, Repeat!
					</Paragraph>
					<HomeLink />
					<SidebarRoutesConfig />
					<SidebarAuth />
				</VStack>
			</Spring.a.div>
		</>
	)
}

function SidebarLoader() {
	const {isImported} = useGestureLibs()
	
	if (!isImported) return <Spinner />

	return <SidebarMobileContent /> 
}

export default function SidebarWrapper() {

	return(
		<GestureProvider>
			<SidebarLoader /> 
		</GestureProvider>
	)
}