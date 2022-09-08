import type { inferAsyncReturnType } from '@trpc/server'
import type { RequestEvent } from '@sveltejs/kit'

import * as trpc from '@trpc/server'

import { prismaClient } from '$lib/prismaClient'

export const createContext = async ({ request, setHeaders }: RequestEvent) => ({
	prisma: prismaClient,
	req: request,
	setHeaders
})

type Context = inferAsyncReturnType<typeof createContext>

export function createRouter() {
	return trpc.router<Context>()
}
