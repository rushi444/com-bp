import { z } from 'zod'
import argon2 from 'argon2'
import cookie from 'cookie'

import { createRouter } from '$lib/server/context'

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
		input: z.object({ username: z.string(), password: z.string() }),
		resolve: async ({ input, ctx }) => {
			const newUser = await ctx.prisma.user.create({
				data: {
					username: input.username,
					passwordHash: await argon2.hash(input.password)
				}
			})

			return newUser
		}
	})
	.mutation('login', {
		input: z.object({ username: z.string(), password: z.string() }),
		resolve: async ({ input, ctx }) => {
			const user = await ctx.prisma.user.findUnique({ where: { username: input.username } })

			const passwordMatch = user && (await argon2.verify(user.passwordHash, input.password))

			if (!passwordMatch) {
				throw new Error('Incorrect password')
			}

			ctx.setHeaders({
				'set-cookie': cookie.serialize('session', user?.userAuthToken || '', {
					// send cookie for every page
					path: '/',
					// server side only cookie so you can't use `document.cookie`
					httpOnly: true,
					// only requests from same site can send cookies
					// and serves to protect from CSRF
					// https://developer.mozilla.org/en-US/docs/Glossary/CSRF
					sameSite: 'strict',
					// only sent over HTTPS
					secure: process.env.NODE_ENV === 'production',
					// set cookie to expire after a month
					maxAge: 60 * 60 * 24 * 30
				})
			})

			return user
		}
	})
