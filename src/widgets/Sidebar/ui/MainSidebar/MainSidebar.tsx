import { Link } from 'react-router-dom'
import Button from 'shared/ui/Button/ui/Button'
import Heading from 'shared/ui/Heading/Heading'

export default function MainSidebar() {
	return (
		<>
			<Button as={Link} to={'/play'} color='bg-secondary'>
				<Heading size={3}>PLAY NOW</Heading>
			</Button>
		</>
	)
}
