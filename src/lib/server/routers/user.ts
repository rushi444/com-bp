import { createRouter } from '$lib/server/context'
import { z } from 'zod'

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
			const user = await ctx.prisma.user.findUnique({ where: { id: input.userId } })
			return user
		}
	})
