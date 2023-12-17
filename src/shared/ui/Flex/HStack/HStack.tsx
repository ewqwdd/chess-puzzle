import { memo } from 'react'
import Flex, { FlexProps } from '../Flex/Flex'

export default memo(function HStack({children, ...props}: Omit<FlexProps, 'direction'>) {
	return (
		<Flex {...props} direction="row">{children}</Flex>
	)
}
)