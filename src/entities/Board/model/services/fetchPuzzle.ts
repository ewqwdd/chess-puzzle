import { createAsyncThunk } from '@reduxjs/toolkit'
import { FigurePosition, Move } from '../types/Board'
import { StateSchema } from 'app/store'
import { FigureTypes } from 'entities/Figure'

export const fetchPuzzle = createAsyncThunk<{data: FigurePosition[], playerWhite: boolean, puzzle: Move[]}, void, {state: StateSchema}>(
	'boardSlice/fetchPuzzle',
	async () => {
		await new Promise((resolve) => setTimeout(() => {resolve('')}, 500))
		const data: FigurePosition[] = [
			{
				figure: FigureTypes.PAWN,
				isAlly: true,
				position: [6, 2]
			},
			{
				figure: FigureTypes.PAWN,
				isAlly: true,
				position: [6, 3]
			},
			{
				figure: FigureTypes.PAWN,
				isAlly: false,
				position: [4, 2]
			},
			{
				figure: FigureTypes.BISHOP,
				isAlly: false,
				position: [0, 7]
			},
			{
				figure: FigureTypes.KING,
				isAlly: true,
				position: [0, 3]
			},
			{
				figure: FigureTypes.KNIGHT,
				isAlly: true,
				position: [3, 4]
			},
			{
				figure: FigureTypes.QUEEN,
				isAlly: true,
				position: [5, 7]
			},
			{
				figure: FigureTypes.ROOK,
				isAlly: false,
				position: [4, 7]
			},
			{
				figure: FigureTypes.KING,
				isAlly: false,
				position: [2, 7]
			}
		]
		const puzzle: Move[] = [
			{
				move: [[5, 7], [5, 2]]
			},
			{
				move: [[0, 7], [1, 6]]
			},
			{
				move: [[6, 3], [5, 3]]
			}
		]
		return {data, playerWhite: true, puzzle}
	}
)