import { VStack } from 'shared/ui/Flex'
import { Input, InputProps } from 'shared/ui/Input'
import { ForwardedRef, ReactNode, forwardRef } from 'react'
import { Paragraph } from 'shared/ui/Paragraph'

interface InputWithErrorProps extends InputProps {
    children: ReactNode
}

export default forwardRef(function InputWithError({children, ...props}: InputWithErrorProps, ref: ForwardedRef<HTMLInputElement>) {
	return (
		<VStack gap={4}>
			<Input
				ref={ref}
				{...props}
			/>
			{children ? <Paragraph size={4} color='warning'>
				{children}
			</Paragraph> : null}
		</VStack>
	)
}
)

