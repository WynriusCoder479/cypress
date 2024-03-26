import { cn } from '@/lib/utils'
import {
	FaExclamationTriangle,
	FaExclamationCircle,
	FaCheckCircle
} from 'react-icons/fa'

interface FormArletProps {
	message?: string
	type: 'success' | 'error' | 'warning'
}

const FormArlet = ({ message, type }: FormArletProps) => {
	const alertIcon = () => {
		switch (type) {
			case 'success':
				return <FaCheckCircle className='h-4 w-4' />
			case 'error':
				return <FaExclamationCircle className='h-4 w-4' />
			default:
				return <FaExclamationTriangle className='h-4 w-4' />
		}
	}

	if(!message) return null

	return (
		<div
			className={cn('flex items-center gap-x-2 rounded-md p-3 text-sm', {
				'bg-destructive/15 text-destructive': type === 'error',
				'bg-emerald-500/15 text-emerald-500': type === 'success',
				'bg-yellow-500/15 text-yellow-500': type === 'warning'
			})}
		>
			{alertIcon()}
			<p>{message}</p>
		</div>
	)
}

export default FormArlet
