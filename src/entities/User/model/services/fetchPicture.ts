import { createAsyncThunk } from '@reduxjs/toolkit'
import { StateSchema } from 'app/store'
import { File } from 'megajs'
import { getUser } from '../selectors/userSelectors'

export const fetchPicture = createAsyncThunk<string | undefined, void, { rejectValue: string, state: StateSchema }>(
	'userSlice/fetchPicture',
	async (_, thunkAPI) => {
		try {
			const avatar = getUser(thunkAPI.getState())?.avatar
			if (!avatar) {
				return thunkAPI.rejectWithValue('')
			}
			const file = File.fromURL(avatar) // Загрузка изображения с сервера
			await file.loadAttributes()
			const buffer = await file.downloadBuffer({})
			// Создание объекта URL для данных Blob
			const objectURL = URL.createObjectURL(new Blob([buffer.buffer]))
            
			// Установка состояния imageSrc для отображения изображения
			if (objectURL) return objectURL
			
		} catch (error) {
			console.error('Ошибка при загрузке изображения:', error)
		}
        

	}
)
