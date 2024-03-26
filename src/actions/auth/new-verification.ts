'use server'

import { db } from '@/lib/db'
import { getVerificationTokenByToken } from '@/repositories/tokens'
import { getUserByEmail } from '@/repositories/user'

export const newVerification = async (token: string) => {
	const exitingToken = await getVerificationTokenByToken(token)

	if (!exitingToken)
		return {
			error: "Token doesn't exist!"
		}

	const hasExpired = new Date(exitingToken.expires) < new Date()

	if (hasExpired)
		return {
			error: 'Token has expired!'
		}

	const existingUser = await getUserByEmail(exitingToken.email)

	if (!existingUser)
		return {
			error: "Email doesn't not exist!"
		}

	await db.user.update({
		where: {
			id: existingUser.id
		},
		data: {
			emailVerified: new Date(),
			email: exitingToken.email
		}
	})

	await db.verificationToken.delete({
		where: {
			id: exitingToken.id
		}
	})

	return {
		success: 'Email verified'
	}
}
