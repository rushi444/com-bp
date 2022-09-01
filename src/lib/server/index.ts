import type { inferAsyncReturnType } from '@trpc/server'

import * as trpc from '@trpc/server'
import trpcTransformer from 'trpc-transformer'

import { HealthRouter } from './health'

export const createContext = async () => ({})

export const responseMeta = () => ({})

export const router = trpc
	.router<inferAsyncReturnType<typeof createContext>>()
	.merge('health:', HealthRouter)
	.transformer(trpcTransformer)

export type Router = typeof router
