import { Button } from '@/components/ui/button'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'
import { LuArrowLeft } from 'react-icons/lu'

interface AuthLayoutProps {
	children: ReactNode
}

export const metadata = {
	title: 'Auth'
} satisfies Metadata

const AuthLayout = ({ children }: AuthLayoutProps) => {
	return (
		<div className='flex h-full items-center justify-center px-4 sm:px-28 lg:px-2 xl:px-0'>
			<div className='flex h-[50rem] w-[1208px] overflow-hidden rounded-lg'>
				<div className='relative hidden w-1/2 bg-radial-at-t from-primary via-primary/50 to-transparent lg:block'>
					<Button
						variant='ghost'
						size='sm'
						className='absolute left-3 top-3 hover:bg-primary/50'
						asChild
					>
						<Link href='/'>
							<LuArrowLeft className='h-5 w-5' />
						</Link>
					</Button>

					<div className='flex h-full w-full flex-col items-center justify-start space-y-8 px-8 py-12'>
						<Image
							src='/logo/cypress-logo-light.png'
							alt='logo'
							width={800}
							height={400}
							className='h-40 w-80 dark:hidden'
						/>
						<Image
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
						<Image
							src='/images/documents.png'
							alt='documents'
							fill
							className='object-contain dark:hidden'
						/>
						<Image
							src='/images/documents-dark.png'
							alt='documents'
							width={500}
							height={500}
							className='hidden object-contain dark:block'
						/>
						<div className='flex w-full items-center justify-between p-2'>
							<Button
								variant='ghost'
								size='sm'
								className='hover:bg-primary/50'
							>
								Privacy Policy
							</Button>
							<Button
								variant='ghost'
								size='sm'
								className='hover:bg-primary/50'
							>
								Terms & Conditions
							</Button>
						</div>
					</div>
				</div>
				<div className='relative flex w-full flex-1 justify-center bg-secondary/50 p-8 lg:items-start'>
					<Button
						variant='ghost'
						size='sm'
						asChild
						className='absolute left-2 top-2 lg:hidden'
					>
						<Link href='/'>
							<LuArrowLeft className='h-5 w-5' />
						</Link>
					</Button>
					{children}
				</div>
			</div>
		</div>
	)
}

export default AuthLayout
