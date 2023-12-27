import { getAllowedLineDirections } from '../Figure'

const indexes = [
	[1, 1],
	[1, -1],
	[-1, -1],
	[-1, 1],
	[1, 0],
	[0, -1],
	[-1, 0],
	[0, 1]
]

export const getAllowedQueen = getAllowedLineDirections(indexes)