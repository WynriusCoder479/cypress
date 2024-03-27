'use client'

import { newPassword } from '@/actions/auth/new-password'
import { NewPasswordSchema } from '@/schemas/user'
import { NewPasswordSchemaType } from '@/schemas/user/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import FormWrapper from '@/components/auth/form-wrapper'
import FormArlet from '@/components/auth/form-alert'
import { Form } from '@/components/ui/form'
import FormInput from '@/components/ui/form-input'
import { Button } from '@/components/ui/button'
import { LuLoader2 } from 'react-icons/lu'

const NewPasswordForm = () => {
	const searchParams = useSearchParams()
	const token = searchParams.get('token')

	const [error, setError] = useState<string | undefined>('')
	const [success, setSuccess] = useState<string | undefined>('')

	const form = useForm<NewPasswordSchemaType>({
		resolver: zodResolver(NewPasswordSchema),
		defaultValues: {
			password: ''
		}
	})

	const { isPending, mutate: newPasswordMutate } = useMutation({
		mutationFn: async (values: NewPasswordSchemaType) =>
			await newPassword(values, token),
		onSuccess: data => {
			form.reset()
			setError(data.error)
			setSuccess(data.success)
		}
	})

	return (
		<FormWrapper
			headerLabel='New password'
			headerQuote='Enter a new password to change old password'
			backButtonHref='/auth/login'
			backButtonLabel='Back to login'
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(values => newPasswordMutate(values))}
					className='space-y-6'
				>
					<div className='space-y-4'>
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
					</div>
					<FormArlet
						type='error'
						message={error}
					/>
					<FormArlet
						type='success'
						message={success}
					/>
					<Button
						type='submit'
						disabled={isPending}
						className='w-full'
					>
						{isPending && <LuLoader2 className='mr-2 h-4 w-4 animate-spin' />}{' '}
						Reset password
					</Button>
				</form>
			</Form>
		</FormWrapper>
	)
}

export default NewPasswordForm
