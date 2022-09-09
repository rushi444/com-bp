// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { User } from '@prisma/client'
// and what to do when importing types
declare namespace App {
	interface Locals {
		user?: {
			username?: string
		}
	}
	// interface PageData {}
	// interface Platform {}
}

declare namespace Lucia {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	interface UserData extends Omit<User, 'id' | 'identifier_token' | 'hashed_password'> {}
}
