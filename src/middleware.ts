import {
	DEFAULT_LOGIN_REDIRECT,
	authRoutes,
	publicRoutes
} from '@/constants/routes'
import NextAuth from 'next-auth'
import authConfig from './lib/auth.config'

const { auth } = NextAuth(authConfig)

export default auth(req => {
	const { nextUrl } = req
	const isLoggedIn = !!req.auth

	const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
	const isAuthRoute = authRoutes.includes(nextUrl.pathname)

	if (isAuthRoute) {
		if (isLoggedIn) {
			return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
		}
	}

	if (!isLoggedIn && !isPublicRoute) {
		let callbackUrl = nextUrl.pathname
		if (nextUrl.search) {
			callbackUrl += nextUrl.search
		}

		const encodedCallbackUrl = encodeURIComponent(callbackUrl)

		return Response.redirect(
			new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
		)
	}

	// return null
})

export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}
