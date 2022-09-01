import * as trpc from '@trpc/server'

export const HealthRouter = trpc.router().query('status', {
	resolve: () => `Look I'm working`
})
