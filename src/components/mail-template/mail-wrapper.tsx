/* eslint-disable @next/next/no-img-element */
import { Button } from '@/components/ui/button'
import { ReactNode } from 'react'
import { Tailwind, Html, Head, Body } from '@react-email/components'

interface MailWrapperProps {
	title: string
	children: ReactNode
}

const MailWrapper = ({ children, title }: MailWrapperProps) => {
	return (
		<Html>
			<Tailwind>
				<Head>
					<title>{title}</title>
				</Head>
				<Body>
					<div className='flex h-fit w-[604px] overflow-hidden rounded-lg'>
						<div className='relative bg-radial-at-t from-primary via-primary/50 to-transparent lg:block'>
							<div className='flex h-full w-full flex-col items-center justify-start space-y-8 px-8 py-12'>
								<img
									src='/logo/cypress-logo-light.png'
									alt='logo'
									width={800}
									height={400}
									className='h-40 w-80 dark:hidden'
								/>
								<img
									src='/logo/cypress-logo-dark.png'
									alt='logo'
									width={800}
									height={400}
									className='hidden h-40 w-80 dark:block'
								/>
								<p className='text-center text-lg opacity-50'>
									Cypress is the connected workspace where better, faster work
									happens.
								</p>

								<div className='p-4'>{children}</div>

								<div className='flex w-full items-center justify-between p-2'>
									<Button
										variant='link'
										size='sm'
										className='text-foreground/50'
									>
										Privacy Policy
									</Button>
									<Button
										variant='link'
										size='sm'
										className='text-foreground/50'
									>
										Terms & Conditions
									</Button>
								</div>
							</div>
						</div>
					</div>
				</Body>
			</Tailwind>
		</Html>
	)
}

export default MailWrapper
