import { ErrorPageTemplate } from 'widgets/ErrorPageTemplate'
import Heading from 'shared/ui/Heading/Heading'
import Text from 'shared/ui/Text/Text'
import { memo } from 'react'

export default memo(function ErrorPage() {
	return (
		<ErrorPageTemplate>
			<Heading size={1} margin align='center' color='primary'>
				Oops! Something went srong.
			</Heading>
			<Text size='s' align='center' color='secondary'>
				Try to reload page.
			</Text>
		</ErrorPageTemplate>
	)
})
