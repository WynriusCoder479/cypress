import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'

import { db } from '@/lib/db'
import authConfig from '@/lib/auth.config'

import { getUserbyId } from '@/repositories/user'
import { getTwoFactorConfirmationByUserId } from '@/repositories/two-factor'
import { getAccountByUserId } from '@/repositories/account'

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut
} = NextAuth({
	pages: {
		signIn: '/auth/login',
		error: '/auth/error'
	},
	events: {
		async linkAccount({ user }) {
			await db.user.update({
				where: {
					id: user.id
				},
				data: {
					emailVerified: new Date()
				}
			})
		}
	},
	callbacks: {
		async signIn({ user, account }) {
			if (account?.provider !== 'credentials') return true

			const existingUser = await getUserbyId(user.id!)

			if (!existingUser?.emailVerified) return false

			if (existingUser.isTwoFactorEnabled) {
				const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
					existingUser.id
				)

				if (!twoFactorConfirmation) return false

				await db.twoFactorComfirmation.delete({
					where: {
						id: twoFactorConfirmation.id
					}
				})
			}

			return true
		},
		async session({ token, session }) {
			if (token.sub && session.user) {
				session.user.id = token.sub
			}

			if (session.user) {
				session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean
			}

			if (session.user) {
				session.user.name = token.name
				session.user.email = token?.email!
				session.user.isOAuth = token.isOAuth as boolean
			}

			return session
		},
		async jwt({ token }) {
			if (!token.sub) return token

			const existingUser = await getUserbyId(token.sub)

			if (!existingUser) return token

			const existingAccount = await getAccountByUserId(existingUser.id)

			token.isOauth = !!existingAccount
			token.name = existingUser.name
			token.email = existingUser.email
			token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled

			return token
		}
	},
	adapter: PrismaAdapter(db),
	session: {
		strategy: 'jwt'
	},
	...authConfig
})

export const currentUser = async () => {
	const session = await auth()

	return session?.user
}
