import { client } from '$lib/client/trpc'
import { error, type Load } from '@sveltejs/kit'

export const load: Load = async ({ fetch }) => {
	const health = await client(fetch).query('health:status')

	if (health) return { health }

	throw error(404, 'Not found')
}

export type LoadData = {
	health?: string
}
