import { createRouter } from '$lib/server/context'

export const HealthRouter = createRouter().query('status', {
	resolve: () => `Look I'm working`
})
