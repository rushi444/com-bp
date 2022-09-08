<script lang="ts">
	import { client } from '$lib/client/trpc'

	const register = async (event: SubmitEvent) => {
		const data = new FormData(event.target as HTMLFormElement)
		const username = data.get('username') as string
		const password = data.get('password') as string

		await client().mutation('user:login', { username, password })
	}
</script>

<form on:submit|preventDefault={register} method="post">
	<div>
		<label for="username">Username</label>
		<input id="username" name="username" />
	</div>

	<div>
		<label for="password">Password</label>
		<input id="password" name="password" type="password" required />
	</div>

	<button type="submit">Sign Up</button>
</form>
