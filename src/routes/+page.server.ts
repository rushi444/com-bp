import type { User } from '@prisma/client'

import { error, type Load } from '@sveltejs/kit'

import { client } from '$lib/client/trpc'

export const load: Load = async ({ fetch }) => {
	const health = await client(fetch).query('health:status')

	const users = await client(fetch).query('user:all')

	const user = await client(fetch).query('user:getById', { userId: 'cl7ikqnya00120ml4mel52ecj' })

	if (health) return { health, users, name: user?.name }

	throw error(404, 'Not found')
}

export type LoadData = {
	health?: string
	users: User[]
	name?: string
}
