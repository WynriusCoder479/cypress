'use client'

import { register } from '@/actions/auth/register'
import { RegisterSchema } from '@/schemas/user'
import { RegisterSchemaType } from '@/schemas/user/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import FormWrapper from '@/components/auth/form-wrapper'
import { Form } from '@/components/ui/form'
import FormInput from '@/components/ui/form-input'
import FormArlet from '@/components/auth/form-alert'
import { Button } from '@/components/ui/button'
import { LuLoader2 } from 'react-icons/lu'

const RegisterForm = () => {
	const [error, setError] = useState<string | undefined>('')
	const [success, setSuccess] = useState<string | undefined>('')

	const form = useForm<RegisterSchemaType>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			email: '',
			password: '',
			name: ''
		}
	})

	const { isPending, mutate: registerMutate } = useMutation({
		mutationFn: async (values: RegisterSchemaType) => await register(values),
		onSuccess: data => {
			if (data.error) {
				setError(data.error)
				return
			}

			if (data.success) {
				setSuccess(data.success)
				return
			}
		}
	})

	return (
		<FormWrapper
			headerLabel='Register'
			headerQuote='Create an account'
			backButtonLabel='Already have an account'
			backButtonHref='/auth/login'
			showSocial
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(values => registerMutate(values))}
					className='space-y-6'
				>
					<div className='space-y-4'>
						<FormInput
							form={form}
							name='name'
							placeholder='John Doe'
							label='Name'
							type='text'
							formMessage
							disabled={isPending}
							className='bg-transparent focus:bg-secondary'
						/>
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
							type='email'
							formMessage
							disabled={isPending}
							className='bg-transparent focus:bg-secondary'
						/>
					</div>
					<FormArlet
						type='success'
						message={success}
					/>
					<FormArlet
						type='error'
						message={error}
					/>
					<Button
						type='submit'
						className='w-full'
						disabled={isPending}
					>
						{isPending && <LuLoader2 className='mr-2 h-4 w-4 animate-spin' />}{' '}
						Create an account
					</Button>
				</form>
			</Form>
		</FormWrapper>
	)
}

export default RegisterForm
