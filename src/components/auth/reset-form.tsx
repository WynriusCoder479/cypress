'use client'

import { reset } from '@/actions/auth/reset'
import { ResetSchema } from '@/schemas/user'
import { ResetSchemaType } from '@/schemas/user/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import FormWrapper from '@/components/auth/form-wrapper'
import FormArlet from '@/components/auth/form-alert'
import { Form } from '@/components/ui/form'
import FormInput from '@/components/ui/form-input'
import { Button } from '@/components/ui/button'
import { LuLoader2 } from 'react-icons/lu'

const ResetForm = () => {
	const [error, setError] = useState<string | undefined>('')
	const [success, setSuccess] = useState<string | undefined>('')

	const form = useForm<ResetSchemaType>({
		resolver: zodResolver(ResetSchema),
		defaultValues: {
			email: ''
		}
	})

	const { isPending, mutate: resetMutate } = useMutation({
		mutationFn: async (values: ResetSchemaType) => await reset(values),
		onSuccess: data => {
			setError(data.error)
			setSuccess(data.success)
		}
	})

	return (
		<FormWrapper
			headerLabel='Forgot your password'
			headerQuote='Use your registered email to change your new password'
			backButtonLabel='Back to login'
			backButtonHref='/auth/login'
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(values => resetMutate(values))}
					className='space-y-6'
				>
					<div className='space-y-4'>
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
						Send reset email
					</Button>
				</form>
			</Form>
		</FormWrapper>
	)
}

export default ResetForm
