import { createAsyncThunk } from '@reduxjs/toolkit'
import { FigurePosition, playerColor } from '../types/Board'
import { StateSchema } from 'app/store'
import { Bishop, Pawn } from 'entities/Figure'
import { King } from 'entities/Figure/model/King'

export const fetchPuzzle = createAsyncThunk<FigurePosition[], void, {state: StateSchema}>(
	'boardSlice/fetchPuzzle',
	async () => {
		await new Promise((resolve) => setTimeout(() => {resolve('')}, 500))
		const data: FigurePosition[] = [
			{
				figure: new Pawn(true, playerColor.WHITE),
				position: [6, 2]
			},
			{
				figure: new Pawn(true, playerColor.WHITE),
				position: [6, 3]
			},
			{
				figure: new Pawn(false, playerColor.BLACK),
				position: [4, 2]
			},
			{
				figure: new Bishop(false, playerColor.BLACK),
				position: [0, 7]
			},
			{
				figure: new King(true, playerColor.WHITE),
				position: [0, 2]
			}
		]
		return data
	}
)