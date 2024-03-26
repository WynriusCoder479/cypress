import { ReactNode } from 'react'
import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react'
import { auth } from '@/lib/auth'

interface SessionProviderProps {
	children: ReactNode
}

const SessionProvider = async ({ children }: SessionProviderProps) => {
	const session = await auth()

	return (
		<NextAuthSessionProvider session={session}>
			{children}
		</NextAuthSessionProvider>
	)
}

export default SessionProvider
