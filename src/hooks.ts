import type { Handle } from '@sveltejs/kit'

import { createTRPCHandle } from 'trpc-sveltekit'

import { router, responseMeta } from '$lib/server'
import { createContext } from '$lib/server/context'

export const handle: Handle = async ({ event, resolve }) => {
	const response = await createTRPCHandle({
		url: '/trpc',
		router,
		createContext,
		responseMeta,
		event,
		resolve
	})

	return response
}
