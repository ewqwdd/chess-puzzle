import { memo } from 'react'
import Flex, { FlexProps } from '../Flex/Flex'

export default memo(function VStack({children, ...props}: Omit<FlexProps, 'direction'>) {
	return (
		<Flex {...props} direction="column">{children}</Flex>
	)
}
)