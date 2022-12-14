import type { Handle } from '@sveltejs/kit'

import { createTRPCHandle } from 'trpc-sveltekit'

import { router, responseMeta } from '$lib/server'
import { createContext } from '$lib/server/context'
import { auth } from '$lib/prismaClient'
import { sequence } from '@sveltejs/kit/hooks'

const handleTRPC: Handle = async ({ event, resolve }) => {
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

const handleAuth = auth.handleAuth

export const handle: Handle = sequence(handleTRPC, handleAuth)
