import Navbar from '@/components/global/navbar'
import { Metadata } from 'next'
import { ReactNode } from 'react'

interface MarketingLayoutProps {
	children: ReactNode
}

export const metadata = {
	title: 'Marketing'
} satisfies Metadata

const MarketingLayout = ({ children }: MarketingLayoutProps) => {
	return (
		<>
			<Navbar />
			<div className='container '>{children}</div>
		</>
	)
}

export default MarketingLayout
