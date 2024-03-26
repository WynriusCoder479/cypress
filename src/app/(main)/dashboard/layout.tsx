import { Metadata } from 'next'
import { ReactNode } from 'react'

interface DashboardLayoutProps {
	children: ReactNode
}

export const metadata = {
	title: 'Dashboard'
} satisfies Metadata

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
	return <div>{children}</div>
}

export default DashboardLayout
