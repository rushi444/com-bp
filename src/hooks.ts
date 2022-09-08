import type { Handle } from '@sveltejs/kit'

import { createTRPCHandle } from 'trpc-sveltekit'
import cookie from 'cookie'

import { router, responseMeta } from '$lib/server'
import { createContext } from '$lib/server/context'
import { prismaClient } from '$lib/prismaClient'

export const handle: Handle = async ({ event, resolve }) => {
	// const cookieHeader = event.request.headers.get('cookie')
	// const cookies = cookie.parse(cookieHeader ?? '')

	// console.log({req: event.request.headers})

	// const session = await prismaClient.user.findUnique({ where: { userAuthToken: cookies.session } })
	// console.log({ session })
	// if (session?.username) {
	// 	event.locals.user = { username: session.username }
	// }

	const response = await createTRPCHandle({
		url: '/trpc',
		router,
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		createContext,
		responseMeta,
		event,
		resolve
	})

	return response
}
