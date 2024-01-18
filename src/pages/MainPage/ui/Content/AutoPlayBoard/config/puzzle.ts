import { Move } from 'entities/Board/model/types/Board'
import { FigureTypes } from 'entities/Figure'

export const puzzle: Move[] = [
	{
		move: [
			[
				4,
				2
			],
			[
				3,
				3
			]
		],
		killed: FigureTypes.QUEEN
	},
	{
		move: [
			[
				0,
				2
			],
			[
				2,
				4
			]
		]
	},
	{
		move: [
			[
				3,
				3
			],
			[
				2,
				4
			]
		]
	}
]