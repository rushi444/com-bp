import superjson from 'superjson'

import { createRouter } from './context'
import { HealthRouter, UserRouter } from './routers'

export const responseMeta = () => ({})

export const router = createRouter()
	.merge('health:', HealthRouter)
	.merge('user:', UserRouter)
	.transformer(superjson)

export type Router = typeof router
