import { createContext } from 'react'

export type ThemeType = 'swamp'

export interface ThemeContextType {
    theme?: ThemeType
    setTheme?: (value: ThemeType) => void
}

export const ThemeContext = createContext<ThemeContextType>({})
