import { dev } from '$app/environment'
import pkg from '@prisma/client'
import lucia from 'lucia-sveltekit'
import prisma from '@lucia-sveltekit/adapter-prisma'

const { PrismaClient } = pkg

export const prismaClient = new PrismaClient()

export const auth = lucia({
	adapter: prisma(prismaClient),
	secret: 'aWmJoT0gOdjh2-Zc2Zv3BTErb29qQNWEunlj',
	env: dev ? 'DEV' : 'PROD'
})
