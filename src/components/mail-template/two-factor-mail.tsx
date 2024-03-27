import MailWrapper from '@/components/mail-template/mail-wrapper'

interface VerificationMailProps {
	token: string
}

const TwoFactorMail = ({ token }: VerificationMailProps) => {
	return (
		<MailWrapper title='2fa'>
			<div className='flex flex-col items-center justify-center space-y-12'>
				<h3 className='text-2xl font-bold leading-4 tracking-wider'>
					Two Factor Code
				</h3>
				<div className='flex flex-col gap-y-6'>
					<div className='w-fit self-center rounded-md border-2 border-foreground/70 p-2'>
						<p className='text-center text-4xl font-bold tracking-wider'>
							{token}
						</p>
					</div>
					<p className='text-center text-foreground/70'>
						For security reasons, please do not share <br /> this
						&rdquo;Code&rdquo; with anyone.
					</p>
				</div>
			</div>
		</MailWrapper>
	)
}

export default TwoFactorMail
