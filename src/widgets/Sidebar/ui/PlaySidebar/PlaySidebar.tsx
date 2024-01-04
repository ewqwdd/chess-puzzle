import { Timer } from 'entities/Timer'
import Heading from 'shared/ui/Heading/Heading'

export default function PlaySidebar() {
	return (
		<>
			<Heading align='left' size={3} color='secondary'>
                Your time:
			</Heading>
			{/* <Timer /> */}
		</>
	)
}
