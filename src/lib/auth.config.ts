import argon2 from 'argon2'
import { NextAuthConfig } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'

import { LoginSchema } from '@/schemas/user'

import { getUserByEmail } from '@/repositories/user'

export default {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET
		}),
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET
		}),
		CredentialsProvider({
			async authorize(credentials) {
				const validatedFields = LoginSchema.safeParse(credentials)

				if (validatedFields.success) {
					const { email, password } = validatedFields.data

					const user = await getUserByEmail(email)

					if (!user || !user.password) return null

					const verifiedPassword = await argon2.verify(user.password, password)

					if (verifiedPassword) return user
				}

				return null
			}
		})
	]
} satisfies NextAuthConfig
