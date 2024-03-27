'use server'

import { sendPasswordResetEmail } from '@/lib/mail'
import { generatePasswordResetToken } from '@/repositories/tokens'
import { getUserByEmail } from '@/repositories/user'
import { ResetSchema } from '@/schemas/user'
import { ResetSchemaType } from '@/schemas/user/types'

export const reset = async (values: ResetSchemaType) => {
	const validatedFields = ResetSchema.safeParse(values)

	if (!validatedFields.success)
		return {
			error: 'Invalid email'
		}

	const { email } = validatedFields.data

	const existingUser = await getUserByEmail(email)

	if (!existingUser)
		return {
			error: 'User not found!'
		}

	const passwordResetToken = await generatePasswordResetToken(email)

	await sendPasswordResetEmail(
		passwordResetToken.email,
		passwordResetToken.token
	)

	return {
		success: 'Reset password email sent!'
	}
}
