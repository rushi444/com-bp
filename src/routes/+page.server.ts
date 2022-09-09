import type { User } from '@prisma/client'

import { error, type ServerLoad } from '@sveltejs/kit'

import { client } from '$lib/client/trpc'
import { auth } from '$lib/prismaClient'

export const load: ServerLoad = async event => {
	const loadData = await auth.load(event)

	if (loadData.lucia?.user.user_id) {
		const user = await client(fetch).query('user:getById', { userId: loadData.lucia.user.user_id })

		if (user) {
			return {
				props: {
					user
				}
			}
		}
	}

	throw error(404, 'Not found')
}

export type LoadData = {
	props: {
		user: User
	}
}
