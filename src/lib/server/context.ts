import type { inferAsyncReturnType } from '@trpc/server'

import * as trpc from '@trpc/server'

import { prismaClient } from '$lib/prismaClient'

export const createContext = async () => ({ prisma: prismaClient })

type Context = inferAsyncReturnType<typeof createContext>

export function createRouter() {
	return trpc.router<Context>()
}
