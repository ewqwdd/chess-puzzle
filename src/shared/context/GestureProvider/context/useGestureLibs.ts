import { useContext } from 'react'
import { GestureContext } from './GestureContext'
import { GestureProvider } from './types'

export const useGestureLibs = () => useContext(GestureContext) as { [K in keyof GestureProvider]-?: GestureProvider[K] }