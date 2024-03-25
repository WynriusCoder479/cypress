import { Metadata } from 'next'
import { ReactNode } from 'react'

interface MarketingLayoutProps {
	children: ReactNode
}

export const metadata = {
	title: 'Marketing'
} satisfies Metadata

const MarketingLayout = ({ children }: MarketingLayoutProps) => {
	return <div>{children}</div>
}

export default MarketingLayout
