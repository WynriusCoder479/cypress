'use client'

import { ThemeProviderProps } from 'next-themes/dist/types'
import { ThemeProvider as NextThemeProvider } from 'next-themes'

const ThemeProvoder = ({ children, ...props }: ThemeProviderProps) => {
	return (
		<NextThemeProvider
			attribute='class'
			defaultTheme='dark'
			enableSystem
			disableTransitionOnChange
			{...props}
		>
			{children}
		</NextThemeProvider>
	)
}

export default ThemeProvoder
