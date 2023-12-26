import { getAllowedLineDirections } from '../Figure'

const indexes = [
	[1, 1],
	[1, -1],
	[-1, -1],
	[-1, 1]
]

export const getAllowedBishop = getAllowedLineDirections(indexes)