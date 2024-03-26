import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

const Heros = () => {
	return (
		<div className='flex flex-col items-center gap-6 pt-14 md:flex-row'>
			<div>
				<Image
					src='/images/documents.png'
					alt='documents'
					width={350}
					height={350}
					className='object-contain dark:hidden'
				/>
				<Image
					src='/images/documents-dark.png'
					alt='documents-dark'
					width={350}
					height={350}
					className='hidden object-contain dark:block'
				/>
			</div>
			<div className='hidden md:block'>
				<Image
					src='/images/reading.png'
					alt='reading'
					width={350}
					height={350}
					className=' object-contain dark:hidden'
				/>
				<Image
					src='/images/reading-dark.png'
					alt='reading-dark'
					width={350}
					height={350}
					className='hidden object-contain dark:block'
				/>
			</div>
		</div>
	)
}

export default Heros
