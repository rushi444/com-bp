import { z } from 'zod'

import { createRouter } from '$lib/server/context'
import { auth } from '$lib/prismaClient'

export const UserRouter = createRouter()
	.query('all', {
		resolve: ({ ctx }) => {
			const users = ctx.prisma.user.findMany()
			return users
		}
	})
	.query('getById', {
		input: z.object({
			userId: z.string()
		}),
		resolve: async ({ input, ctx }) => {
			console.log(ctx.req.headers)
			const usera = await auth.validateRequest(ctx.req)

			console.log({ usera })
			const user = await ctx.prisma.user.findUnique({ where: { id: input.userId } })
			return user
		}
	})
