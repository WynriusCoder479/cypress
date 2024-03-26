'use client'

import { InputHTMLAttributes, forwardRef } from 'react'
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
	form: any
	name: string
	label?: string
	type?: string
	disabled?: boolean
	placeholder?: string
	formMessage?: boolean
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
	(
		{
			form,
			type,
			name,
			label,
			disabled,
			formMessage,
			className,
			placeholder,
			...props
		},
		ref
	) => {
		return (
			<FormField
				control={form.control}
				name={name}
				render={({ field }) => (
					<FormItem>
						{label && <FormLabel>{label}</FormLabel>}
						<FormControl>
							<Input
								{...field}
								{...props}
								ref={ref}
								type={type}
								placeholder={placeholder}
								disabled={disabled}
								className={cn('placeholder:opacity-50', className)}
							/>
						</FormControl>
						{formMessage && <FormMessage />}
					</FormItem>
				)}
			/>
		)
	}
)

FormInput.displayName = 'FormInput'

export default FormInput
