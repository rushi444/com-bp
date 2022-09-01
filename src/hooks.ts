import type { Handle } from '@sveltejs/kit'

import { createTRPCHandle } from 'trpc-sveltekit'

import { router, createContext, responseMeta } from '$lib/server'

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
