import { createContext } from 'react'
import { GestureProvider } from './types'

export const GestureContext = createContext<GestureProvider>({
	isImported: false
})