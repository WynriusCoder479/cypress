'use client'

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot
} from '@/components/ui/input-otp'

interface FormInputOtpProps {
	form: any
	name: string
	label?: string
	type?: string
	disabled?: boolean
	formMessage?: boolean
}

const FormInputOtp = ({
	form,
	name,
	label,
	type,
	disabled,
	formMessage
}: FormInputOtpProps) => {
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					{label && <FormLabel>{label}</FormLabel>}
					<FormControl>
						<InputOTP
							maxLength={6}
							disabled={disabled}
							type={type}
							{...field}
						>
							<InputOTPGroup>
								<InputOTPSlot index={0} />
								<InputOTPSlot index={1} />
								<InputOTPSlot index={2} />
							</InputOTPGroup>
							<InputOTPSeparator />
							<InputOTPGroup>
								<InputOTPSlot index={3} />
								<InputOTPSlot index={4} />
								<InputOTPSlot index={5} />
							</InputOTPGroup>
						</InputOTP>
					</FormControl>
					{formMessage && <FormMessage />}
				</FormItem>
			)}
		/>
	)
}

export default FormInputOtp
