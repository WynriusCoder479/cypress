import { currentUser } from '@/lib/auth'
import { cn } from '@/lib/utils'
import React from 'react'
import { Button } from '@/components/ui/button'

import { LuArrowRight } from 'react-icons/lu'
import Link from 'next/link'

const Heading = async () => {
	const user = await currentUser()

	return (
		<div className='max-w-3xl space-y-8 pt-10'>
			<h1 className={cn('text-3xl font-bold', 'md:text-6xl', 'sm:text-5xl')}>
				Your Ideas, Documents, & Plans. Unified. Welcomr to{' '}
				<span className='text-primary underline underline-offset-2'>
					Cypress
				</span>
			</h1>
			<h3 className={cn('text-base font-medium', 'md:text-2xl', 'sm:text-xl')}>
				<span className='text-primary/70'>Cypress</span> is the connected
				workspace where <br /> better, faster work happens.
			</h3>
			<Button
				asChild
				className='p-7 text-2xl'
			>
				<Link href='/dashboard'>
					{user ? 'Dashboard' : 'Get Stated'}
					<LuArrowRight className='ml-2 h-4 w-4' />
				</Link>
			</Button>
		</div>
	)
}

export default Heading
