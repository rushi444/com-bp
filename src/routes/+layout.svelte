<script lang="ts">
	import { Lucia } from 'lucia-sveltekit/client'
</script>

<svelte:head>
	<title>SvelteKit Auth</title>
</svelte:head>

<Lucia>
	<nav>
		<a href="/">Home</a>

		<a href="/auth/login">Login</a>
		<a href="/auth/register">Register</a>

		<a href="/protected">Admin</a>
		<a href="/auth/logout">Log out</a>
	</nav>
	<slot />
</Lucia>
