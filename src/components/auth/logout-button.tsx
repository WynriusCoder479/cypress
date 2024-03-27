'use client'

import { logout } from '@/actions/auth/logout'
import { ReactNode } from 'react'

interface LogoutButtonProps {
	children: ReactNode
}

const LogoutButton = ({ children }: LogoutButtonProps) => {
	const onClick = () => {
		logout()
	}

	return (
		<span
			onClick={onClick}
			className='cursor-pointer'
		>
			{children}
		</span>
	)
}

export default LogoutButton
