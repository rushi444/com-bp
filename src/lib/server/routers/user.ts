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
			const user = await ctx.prisma.user.findUnique({ where: { id: input.userId } })
			return user
		}
	})
	.mutation('register', {
		input: z.object({
			email: z.string().email(),
			password: z.string()
		}),
		resolve: async ({ input, ctx }) => {
			const createUser = await auth.createUser('email', input.email, {
				password: input.password,
				user_data: {
					email: input.email
				}
			})

			ctx.setHeaders({ 'set-cookie': createUser.cookies })

			return
		}
	})
	.mutation('login', {
		input: z.object({
			email: z.string(),
			password: z.string()
		}),
		resolve: async ({ input, ctx }) => {
			const authenticateUser = await auth.authenticateUser('email', input.email, input.password)

			ctx.setHeaders({ 'set-cookie': authenticateUser.cookies })

			return
		}
	})
