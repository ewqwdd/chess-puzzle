import { useContext } from 'react'
import { ThemeContext } from '../ui/ThemeContext'

export const useTheme = () => useContext(ThemeContext)