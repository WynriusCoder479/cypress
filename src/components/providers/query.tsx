'use client'

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'
import { ReactNode, useState } from 'react'

interface QueryProviderProps {
	children: ReactNode
}

const QueryProvider = ({ children }: QueryProviderProps) => {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 5 * 1000
					}
				}
			})
	)

	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
		</QueryClientProvider>
	)
}

export default QueryProvider
