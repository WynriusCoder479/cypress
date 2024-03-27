'use server'

import { db } from '@/lib/db'
import { getPasswordResetTokenByToken } from '@/repositories/tokens'
import { getUserByEmail } from '@/repositories/user'
import { NewPasswordSchema } from '@/schemas/user'
import { NewPasswordSchemaType } from '@/schemas/user/types'
import bcrypt from 'bcryptjs'

export const newPassword = async (
	values: NewPasswordSchemaType,
	token: string | null
) => {
	if (!token)
		return {
			error: 'Missing token!'
		}

	const validatedFields = NewPasswordSchema.safeParse(values)

	if (!validatedFields.success)
		return {
			error: 'Invalid fieldes'
		}

	const { password } = validatedFields.data

	const existingToken = await getPasswordResetTokenByToken(token)

	if (!existingToken)
		return {
			error: 'Invalid token'
		}

	const hasExpired = new Date(existingToken.expires) < new Date()

	if (hasExpired)
		return {
			error: 'Token has expired!'
		}

	const existingUser = await getUserByEmail(existingToken.email)

	if (!existingUser)
		return {
			error: 'User not found!'
		}

	const hashedPassword = await bcrypt.hash(password, 10)

	await db.user.update({
		where: {
			id: existingUser.id
		},
		data: {
			password: hashedPassword
		}
	})

	await db.passwordResetToken.delete({
		where: {
			id: existingToken.id
		}
	})

	return {
		success: 'Password updated! You can back to login!'
	}
}
