import { ReactNode, memo, useCallback, useMemo, useState } from 'react'
import { THEME_KEY } from 'shared/keys'
import { ThemeContext, ThemeContextType, ThemeType } from './ThemeContext'

interface ThemeProviderProps {
    children: ReactNode
}

export default memo(function ThemeProvider({children}: ThemeProviderProps) {

	const [theme, setTheme] = useState<ThemeType>(localStorage.getItem(THEME_KEY) as ThemeType || 'swamp')
	document.body.className = theme

	const setClassname = useCallback((val: ThemeType) => {
		document.body.className = val
		setTheme(val)
	}, [])

	const memoValue = useMemo<ThemeContextType>(() => {
		return {
			theme,
			setClassname
		}
	}, [theme])

	return (
		<ThemeContext.Provider value={memoValue}>
			{children}
		</ThemeContext.Provider>
	)
})