import crypto from 'crypto'
import { db } from '@/lib/db'
import { v4 as uuidv4 } from 'uuid'
import {
	RESET_PASSWORD_TOKEN_EXPIRES,
	TWO_FACTOR_TOKEN_EXPIRES,
	VERIFICATION_TOKEN_EXPRIRES
} from '@/constants/expires'

export const getTwoFactorTokenByToken = async (token: string) => {
	try {
		const twoFactorToken = await db.twoFactorToken.findUnique({
			where: {
				token
			}
		})

		return twoFactorToken
	} catch {
		return null
	}
}

export const getTwoFactorTokenByEmail = async (email: string) => {
	try {
		const twoFactorToken = await db.twoFactorToken.findFirst({
			where: {
				email
			}
		})

		return twoFactorToken
	} catch {
		return null
	}
}

export const getPasswordResetTokenByToken = async (token: string) => {
	try {
		const passwordResetToken = await db.passwordResetToken.findUnique({
			where: { token }
		})

		return passwordResetToken
	} catch {
		return null
	}
}

export const getPasswordResetTokenByEmail = async (email: string) => {
	try {
		const passwordResetToken = await db.passwordResetToken.findFirst({
			where: { email }
		})

		return passwordResetToken
	} catch {
		return null
	}
}

export const getVerificationTokenByToken = async (token: string) => {
	try {
		const verificationToken = await db.verificationToken.findUnique({
			where: { token }
		})

		return verificationToken
	} catch {
		return null
	}
}

export const getVerificationTokenByEmail = async (email: string) => {
	try {
		const verificationToken = await db.verificationToken.findFirst({
			where: { email }
		})

		return verificationToken
	} catch {
		return null
	}
}

export const generateTwoFactorToken = async (email: string) => {
	const token = crypto.randomInt(100_00, 1_000_000).toString()
	const expires = new Date(new Date().getTime() + TWO_FACTOR_TOKEN_EXPIRES)

	const existingToken = await getTwoFactorTokenByEmail(email)

	if (existingToken)
		await db.twoFactorToken.delete({
			where: {
				id: existingToken.id
			}
		})

	const twoFactorToken = await db.twoFactorToken.create({
		data: {
			email,
			token,
			expires
		}
	})

	return twoFactorToken
}

export const generatePasswordResetToken = async (email: string) => {
	const token = uuidv4()
	const expires = new Date(new Date().getTime() + RESET_PASSWORD_TOKEN_EXPIRES)

	const existingToken = await getPasswordResetTokenByEmail(email)

	if (existingToken)
		await db.passwordResetToken.delete({
			where: {
				id: existingToken.id
			}
		})

	const passwordResetToken = await db.passwordResetToken.create({
		data: {
			email,
			token,
			expires
		}
	})

	return passwordResetToken
}

export const generateVerificationToken = async (email: string) => {
	const token = uuidv4()
	const expires = new Date(new Date().getTime() + VERIFICATION_TOKEN_EXPRIRES)

	const existingToken = await getVerificationTokenByEmail(email)

	if (existingToken)
		await db.verificationToken.delete({
			where: {
				id: existingToken.id
			}
		})

	const verificationToken = await db.verificationToken.create({
		data: {
			email,
			token,
			expires
		}
	})

	return verificationToken
}
