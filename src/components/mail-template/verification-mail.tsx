import MailWrapper from '@/components/mail-template/mail-wrapper'
import { Button } from '../ui/button'

interface VerificationMailProps {
	href: string
}

const VerificationMail = ({ href }: VerificationMailProps) => {
	return (
		<MailWrapper title='verification'>
			<div className='flex flex-col items-center justify-center space-y-12'>
				<h3 className='text-2xl font-bold leading-4 tracking-wider'>
					Verification Your Email
				</h3>
				<div className='flex flex-col gap-y-6'>
					<Button
						asChild
						size='lg'
						className='text-lg font-bold'
					>
						<a href={href}>Confirmation</a>
					</Button>
					<p className='text-foreground/70'>
						Click &rdquo;Confirmation&rdquo; to verify email
					</p>
				</div>
			</div>
		</MailWrapper>
	)
}

export default VerificationMail
