import MailWrapper from '@/components/mail-template/mail-wrapper'
import { Button } from '../ui/button'

interface VerificationMailProps {
	href: string
}

const ResetPasswordMail = ({ href }: VerificationMailProps) => {
	return (
		<MailWrapper title='Reset password'>
			<div className='flex flex-col items-center justify-center space-y-12'>
				<h3 className='text-2xl font-bold leading-4 tracking-wider'>
					You&apos;re forgot passwrod
				</h3>
				<div className='flex flex-col gap-y-6'>
					<Button
						asChild
						size='lg'
						className='text-lg font-bold'
					>
						<a href={href}>Change Password</a>
					</Button>
					<p className='text-foreground/70'>
						Click &rdquo;Change Password&rdquo; to change password
					</p>
				</div>
			</div>
		</MailWrapper>
	)
}

export default ResetPasswordMail
