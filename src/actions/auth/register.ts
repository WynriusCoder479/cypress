'use server'

import { db } from '@/lib/db'
import { sendVerificationEmail } from '@/lib/mail'
import { generateVerificationToken } from '@/repositories/tokens'
import { getUserByEmail } from '@/repositories/user'
import { RegisterSchema } from '@/schemas/user'
import { RegisterSchemaType } from '@/schemas/user/types'
import bcrypt from 'bcryptjs'

export const register = async (values: RegisterSchemaType) => {
	const validatedFields = RegisterSchema.safeParse(values)

	if (!validatedFields.success)
		return {
			error: 'Invalid fields!'
		}

	const { email, password, name } = validatedFields.data

	const hashedPassword = await bcrypt.hash(password, 10)

	const existingUser = await getUserByEmail(email)

	if (existingUser)
		return {
			error: 'Email already in use!'
		}

	await db.user.create({
		data: {
			name,
			email,
			password: hashedPassword
		}
	})

	const verificationToken = await generateVerificationToken(email)

	await sendVerificationEmail(verificationToken.email, verificationToken.token)

	return {
		success: 'Confirmation email sent!'
	}
}
