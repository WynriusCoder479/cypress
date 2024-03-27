import LogoutButton from '@/components/auth/logout-button'
import ResetPasswordMail from '@/components/mail-template/reset-password'
import TwoFactorMail from '@/components/mail-template/two-factor-mail'
import VerificationMail from '@/components/mail-template/verification-mail'

const DashboardPage = () => {
	return (
		<div className='flex flex-col items-center gap-4 p-4'>
			DashboardPage
			<LogoutButton>Logout</LogoutButton>
			<VerificationMail href='http://localhost:3000/new-verofication' />
			<ResetPasswordMail href='http://localhost:3000/reset-password' />
			<TwoFactorMail token='123456' />
		</div>
	)
}

export default DashboardPage
