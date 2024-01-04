import { RegisterOptions } from 'react-hook-form'
import { FieldErrors } from 'shared/types/types'

export const FormErrorMap = (options: RegisterOptions): DeepPartial<Record<FieldErrors, string>> => ({
	maxLength: `This field mustn't be longer than ${options.maxLength} symbols`,
	minLength: `This field must be longer than ${options.minLength} symbols`,
	pattern: 'Invalid pattern. Please follow the specified pattern.',
	required: 'This field is required.',
	max: `This value has to be less than ${options.max}`,
	min: `This value has to be more than ${options.min}`,
})