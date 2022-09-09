<script lang="ts">
	import { client } from '$lib/client/trpc'

	const register = async (event: SubmitEvent) => {
		const data = new FormData(event.target as HTMLFormElement)
		const email = data.get('email') as string
		const password = data.get('password') as string

		await client().mutation('user:register', { email, password })
	}
</script>

<form on:submit|preventDefault={register} method="post">
	<div>
		<label for="email">Username</label>
		<input id="email" name="email" />
	</div>

	<div>
		<label for="password">Password</label>
		<input id="password" name="password" type="password" required />
	</div>

	<button type="submit">Sign Up</button>
</form>
