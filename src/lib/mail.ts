import ResetPasswordEmailTemplate from '@/components/mail-template/reset-password-email-template'
import TwoFactorEmailTemplate from '@/components/mail-template/two-factor-code-email-template'
import VerificationEmailTemplate from '@/components/mail-template/verification-email-template'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const domain = process.env.NEXT_PUBLIC_APP_URL

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
	await resend.emails.send({
		from: 'Cypress <cypress-mail@resend.dev>',
		to: email,
		subject: '2FA Code',
		react: TwoFactorEmailTemplate({ token })
	})
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
	const resetLink = `${domain}/auth/new-password?token=${token}`

	await resend.emails.send({
		from: 'Cypress <cypress-mail@resend.dev>',
		to: email,
		subject: 'Reset your password',
		react: ResetPasswordEmailTemplate({ href: resetLink })
	})
}

export const sendVerificationEmail = async (email: string, token: string) => {
	const confirmLink = `${domain}/auth/new-verification?token=${token}`

	await resend.emails.send({
		from: 'Cypress <cypress-mail@resend.dev>',
		to: email,
		subject: 'Confirm your email',
		react: VerificationEmailTemplate({ href: confirmLink })
	})
}
