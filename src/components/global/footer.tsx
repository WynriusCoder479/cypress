import { Button } from '@/components/ui/button'
import Image from 'next/image'

const Footer = () => {
	return (
		<div className='bottom-0 z-50 flex w-full items-center bg-background'>
			<div className='hidden md:block'>
				<Image
					src='/logo/cypress-logo-dark.png'
					alt='logo-dark'
					width={600}
					height={200}
					className='hidden h-10 w-fit dark:block'
				/>
				<Image
					src='/logo/cypress-logo-light.png'
					alt='logo-dark'
					width={600}
					height={200}
					className='h-10 w-fit dark:hidden'
				/>
			</div>
			<div className='flex w-full items-center justify-between gap-x-2 text-muted-foreground md:ml-auto md:justify-end'>
				<Button
					variant='ghost'
					size='sm'
				>
					Privacy Policy
				</Button>
				<Button
					variant='ghost'
					size='sm'
				>
					Terms & Conditions
				</Button>
			</div>
		</div>
	)
}

export default Footer
