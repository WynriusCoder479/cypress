'use client'

import { newVerification } from '@/actions/auth/new-verification'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import FormArlet from '@/components/auth/form-alert'
import FormWrapper from '@/components/auth/form-wrapper'
import { BeatLoader } from 'react-spinners'

const NewVerificationForm = () => {
	const [error, setError] = useState<string | undefined>('')
	const [success, setSuccess] = useState<string | undefined>('')

	const searchParams = useSearchParams()

	const token = searchParams.get('token')

	const {} = useQuery({
		queryKey: [token],
		queryFn: async () => {
			if (success || error) return

			if (!token) {
				setError('Missing token!')
				return
			}

			const res = await newVerification(token)

			if (res) {
				setError(res.error)
				setSuccess(res.success)

				return
			}

			setError('Something went wrong!')
			return
		}
	})

	return (
		<FormWrapper
			headerLabel='Verification'
			headerQuote='Confirm your verificarion'
			backButtonLabel='Back to login'
			backButtonHref='/auth/login'
		>
			<div className='flex items-center justify-center'>
				{!success && !error && <BeatLoader />}
				<FormArlet
					type='success'
					message={success}
				/>
				{!success && (
					<FormArlet
						type='error'
						message={error}
					/>
				)}
			</div>
		</FormWrapper>
	)
}

export default NewVerificationForm
