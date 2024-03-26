'use client'

import { LoginSchemaType } from '@/schemas/user/types'
import { LoginSchema } from '@/schemas/user'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { login } from '@/actions/auth/login'
import { Form } from '@/components/ui/form'
import FormInputOtp from '@/components/ui/form-input-otp'
import FormInput from '@/components/ui/form-input'
import { Button } from '@/components/ui/button'
import { LuLoader2 } from 'react-icons/lu'
import FormArlet from '@/components/auth/form-alert'
import FormWrapper from './form-wrapper'
import Link from 'next/link'

const LoginForm = () => {
	const searchParams = useSearchParams()
	const callbackUrl = searchParams.get('callbackUrl')
	const urlError =
		searchParams.get('error') === 'OAuthAccountNotLinked'
			? 'Email already in use with different provider!'
			: ''

	const [showTwoFactor, setShowTwoFactor] = useState<boolean>(false)
	const [error, setError] = useState<string | undefined>('')
	const [success, setSuccess] = useState<string | undefined>('')

	const form = useForm<LoginSchemaType>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const { isPending, mutate: loginMutate } = useMutation({
		mutationFn: async (values: LoginSchemaType) =>
			await login(values, callbackUrl),
		onSuccess: data => {
			console.log(data)

			if (data?.error) {
				form.reset()
				setError(data.error)
			}

			if (data?.success) {
				form.reset()
				setSuccess(data.success)
			}

			if (data?.twoFactor) setShowTwoFactor(true)
		},
		onError: () => setError('Something went wrong')
	})

	return (
		<FormWrapper
			headerLabel='Login'
			headerQuote='Welcome back'
			backButtonLabel={`Don't have an account`}
			backButtonHref='/auth/register'
			showSocial
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(values => {
						console.log(values)
						loginMutate(values)
					})}
					className='space-y-6'
				>
					<div className='space-y-4'>
						{showTwoFactor && (
							<div className='flex w-full justify-center '>
								<FormInputOtp
									form={form}
									name='code'
									label='Two Factor Code'
									disabled={isPending}
									formMessage
								/>
							</div>
						)}

						{!showTwoFactor && (
							<>
								<FormInput
									form={form}
									name='email'
									placeholder='john.doe@email.com'
									label='Email'
									type='email'
									formMessage
									disabled={isPending}
									className='bg-transparent focus:bg-secondary'
								/>
								<FormInput
									form={form}
									name='password'
									placeholder='******'
									label='Password'
									type='password'
									formMessage
									disabled={isPending}
									className='bg-transparent focus:bg-secondary'
								/>
								<Button
									size='sm'
									variant='link'
									asChild
									className='px-0 font-normal'
								>
									<Link href='/auth/reset'>Forgot password?</Link>
								</Button>
							</>
						)}
					</div>
					<FormArlet
						type='success'
						message={success}
					/>
					<FormArlet
						type='error'
						message={error || urlError}
					/>
					<Button
						type='submit'
						className='w-full'
						disabled={isPending}
					>
						{isPending && <LuLoader2 className='mr-2 h-4 w-4 animate-spin' />}{' '}
						{showTwoFactor ? 'Confirm' : 'Login'}
					</Button>
				</form>
			</Form>
		</FormWrapper>
	)
}

export default LoginForm
