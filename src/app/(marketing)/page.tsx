import Footer from '@/components/global/footer'
import Heading from '@/components/global/heading'
import Heros from '@/components/global/heros'

export default function Home() {
	return (
		<div className='relative flex min-h-full flex-col bg-background'>
			<div className='flex flex-1 flex-col items-center justify-center gap-y-2 pb-10 text-center md:justify-start'>
				<Heading />
				<Heros />
			</div>
			<Footer />
		</div>
	)
}
