import { ElementType, memo } from 'react'
import Flex, { FlexProps } from '../Flex/Flex'

export default memo(function VStack<C extends ElementType>({children, ...props}: Omit<FlexProps<C>, 'direction'>) {
	return (
		<Flex {...props} direction="column">{children}</Flex>
	)
}
)