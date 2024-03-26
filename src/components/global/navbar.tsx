import { currentUser } from '@/lib/auth'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { LuMenu } from 'react-icons/lu'

const Navbar = async () => {
	const user = await currentUser()

	return (
		<div className='sticky inset-0 z-50 border-b bg-background shadow-md'>
			<div className='container flex items-center justify-between px-4 py-2'>
				<Link
					href='/'
					className='flex items-center'
				>
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
				</Link>

				<aside className='flex items-center gap-4'>
					<Button
						asChild
						className='font-bold'
						size='sm'
					>
						<Link href='/dashboard'>{user ? 'Dashboard' : 'Get Started'}</Link>
					</Button>
				</aside>
			</div>
		</div>
	)
}

export default Navbar
