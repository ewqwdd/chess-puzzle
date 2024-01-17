import { User } from 'entities/User'
import { RegisterOptions } from 'react-hook-form'

export const inputOptions: Record<keyof Omit<User, 'id'>, RegisterOptions> = {
	description: {
		maxLength: 300,
	},
	email: {
		minLength: 2,
		required: true
	},
	firstName: {
		minLength: 2,
	},
	lastName: {
		minLength: 2,
	},
	username: {
		minLength: 5,
		maxLength: 18,
		required: true,
	},
	avatar: {},
	avatarUrl: {}
}