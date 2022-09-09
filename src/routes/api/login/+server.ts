import type { RequestHandler } from '@sveltejs/kit'
import { auth } from '$lib/prismaClient'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const POST: RequestHandler = async ({ request }) => {
	const { email, password } = await request.json()

	if (!email || !password) {
		return {
			status: 400
		}
	}
	try {
		const authenticateUser = await auth.authenticateUser('email', email, password)
		return new Response(undefined, {
			status: 302,
			// @ts-ignore
			headers: {
				'set-cookie': authenticateUser.cookies,
				location: '/'
			}
		})
	} catch (e) {
		const error = e as Error
		if (
			error.message === 'AUTH_INVALID_IDENTIFIER_TOKEN' ||
			error.message === 'AUTH_INVALID_PASSWORD'
		) {
			return {
				status: 400,
				body: JSON.stringify({
					error: 'Incorrect email or password.'
				})
			}
		}
		// database connection error
		return {
			status: 500,
			body: JSON.stringify({
				error: 'Unknown error.'
			})
		}
	}
}
