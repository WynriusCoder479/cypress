import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { Site } from '@/constants/site'
import ThemeProvider from '@/components/providers/theme'
import SessionProvider from '@/components/providers/session'
import QueryProvider from '@/components/providers/query'

const font = Inter({ subsets: ['latin', 'vietnamese'] })

export const metadata: Metadata = {
	title: {
		default: Site.name,
		template: `%s | ${Site.name}`
	},
	description: Site.description,
	icons: {
		icon: [
			{
				media: Site.icon.light.media,
				url: Site.icon.light.url,
				href: Site.icon.light.href
			},
			{
				media: Site.icon.dark.media,
				url: Site.icon.dark.url,
				href: Site.icon.dark.href
			}
		]
	}
}

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang='en'
			suppressHydrationWarning
		>
			<body className={font.className}>
				<SessionProvider>
					<QueryProvider>
						<ThemeProvider>{children}</ThemeProvider>
					</QueryProvider>
				</SessionProvider>
			</body>
		</html>
	)
}
