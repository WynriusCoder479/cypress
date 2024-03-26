'use client'

import { ReactNode } from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import FormHeader from '@/components/auth/form-header'
import Social from '@/components/auth/social'
import { BackButton } from '@/components/auth/back-button'
import { Button } from '@/components/ui/button'
import { LuArrowLeft } from 'react-icons/lu'

interface FormWrapperProps {
	children: ReactNode
	headerLabel: string
	headerQuote: string
	backButtonLabel: string
	backButtonHref: string
	showSocial?: boolean
}

const FormWrapper = ({
	children,
	headerLabel,
	headerQuote,
	backButtonHref,
	backButtonLabel,
	showSocial
}: FormWrapperProps) => {
	return (
		<Card className=' w-full border-none bg-transparent md:w-[80%]'>
			<CardHeader>
				<FormHeader
					label={headerLabel}
					quote={headerQuote}
				/>
			</CardHeader>
			<CardContent className='flex flex-col gap-y-4'>
				{showSocial && (
					<>
						<Social />
						<Separator className='mt-4' />
					</>
				)}
				{children}
			</CardContent>
			<CardFooter>
				<BackButton
					label={backButtonLabel}
					href={backButtonHref}
				/>
			</CardFooter>
		</Card>
	)
}

export default FormWrapper
