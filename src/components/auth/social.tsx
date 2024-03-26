'use client'

import { Button } from '@/components/ui/button'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { LuArrowRight } from 'react-icons/lu'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { DEFAULT_LOGIN_REDIRECT } from '@/constants/routes'

const Social = () => {
	const searchParams = useSearchParams()
	const callbackUrl = searchParams.get('callbaclUrl')

	const onLoginWithProvider = (provider: 'google' | 'github') => {
		signIn(provider, {
			callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT
		})
	}

	return (
		<div className='mt-10 flex w-full flex-col items-center space-y-2'>
			<Button
				size='lg'
				className='w-full gap-4 bg-transparent text-base'
				variant='outline'
				onClick={() => onLoginWithProvider('google')}
			>
				<FcGoogle className='h-6 w-6' />
				<p>Continue with Google</p>
				<LuArrowRight className='right-2 h-6 w-6' />
			</Button>
			<Button
				size='lg'
				className='w-full gap-4 bg-transparent text-base'
				variant='outline'
				onClick={() => onLoginWithProvider('github')}
			>
				<FaGithub className='h-6 w-6' />
				<p>Continue with Google</p>
				<LuArrowRight className='right-2 h-6 w-6' />
			</Button>
		</div>
	)
}

export default Social
