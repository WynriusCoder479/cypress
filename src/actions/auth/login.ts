'use server'

import { DEFAULT_LOGIN_REDIRECT } from '@/constants/routes'
import { signIn } from '@/lib/auth'
import { db } from '@/lib/db'
import { sendTwoFactorTokenEmail, sendVerificationEmail } from '@/lib/mail'
import {
	generateTwoFactorToken,
	generateVerificationToken,
	getTwoFactorTokenByEmail
} from '@/repositories/tokens'
import { getTwoFactorConfirmationByUserId } from '@/repositories/two-factor'
import { getUserByEmail } from '@/repositories/user'
import { LoginSchema } from '@/schemas/user'
import { LoginSchemaType } from '@/schemas/user/types'
import { AuthError } from 'next-auth'

export const login = async (
	values: LoginSchemaType,
	callbackUrl?: string | null
) => {
	const validatedFields = LoginSchema.safeParse(values)

	if (!validatedFields.success) {
		return { error: 'Invalid fields!' }
	}

	const { email, password, code } = validatedFields.data

	const existingUser = await getUserByEmail(email)

	if (!existingUser || !existingUser.email || !existingUser.password) {
		return { error: 'Email does not exist!' }
	}

	if (!existingUser.emailVerified) {
		const verificationToken = await generateVerificationToken(
			existingUser.email
		)

		await sendVerificationEmail(
			verificationToken.email,
			verificationToken.token
		)

		return { success: 'Confirmation email sent!' }
	}

	if (existingUser.isTwoFactorEnabled && existingUser.email) {
		if (code) {
			const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email)

			if (!twoFactorToken) {
				return { error: 'Invalid code!' }
			}

			if (twoFactorToken.token !== code) {
				return { error: 'Invalid code!' }
			}

			const hasExpired = new Date(twoFactorToken.expires) < new Date()

			if (hasExpired) {
				return { error: 'Code expired!' }
			}

			await db.twoFactorToken.delete({
				where: { id: twoFactorToken.id }
			})

			const existingConfirmation = await getTwoFactorConfirmationByUserId(
				existingUser.id
			)

			if (existingConfirmation) {
				await db.twoFactorComfirmation.delete({
					where: { id: existingConfirmation.id }
				})
			}

			await db.twoFactorComfirmation.create({
				data: {
					userId: existingUser.id
				}
			})
		} else {
			const twoFactorToken = await generateTwoFactorToken(existingUser.email)
			await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token)

			return {
				twoFactor: true,
			}
		}
	}

	try {
		await signIn('credentials', {
			email,
			password,
			redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT
		})
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return { error: 'Invalid credentials!' }
				default:
					return { error: 'Something went wrong!' }
			}
		}

		throw error
	}
}
