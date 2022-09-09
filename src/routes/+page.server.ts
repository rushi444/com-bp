import type { User } from '@prisma/client'

import { error, type ServerLoad } from '@sveltejs/kit'

import { client } from '$lib/client/trpc'
import { auth } from '$lib/prismaClient'

export const load: ServerLoad = async event => {
	const { lucia } = await event.parent()
	console.log({ lucia })

	const loadData = await auth.load(event)

	console.log({ loadData })

	const health = await client(fetch).query('health:status')

	const users = await client(fetch).query('user:all')

	const user = await client(fetch).query('user:getById', { userId: 'cl7ikqnya00120ml4mel52ecj' })

	if (health) return { health, users, name: user }

	throw error(404, 'Not found')
}

export type LoadData = {
	health?: string
	users: User[]
	name?: string
}
