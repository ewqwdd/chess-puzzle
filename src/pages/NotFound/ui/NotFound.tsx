import { ErrorPageTemplate } from 'widgets/ErrorPageTemplate'
import Heading from 'shared/ui/Heading/Heading'
import Text from 'shared/ui/Text/Text'

export default function NotFound() {
	return (
		<ErrorPageTemplate>
			<Heading size={1} margin align='center' color='primary'>
				404
			</Heading>
			<Text size='s' align='center' color='secondary'>
				Page not found.
			</Text>
		</ErrorPageTemplate>
	)
}
