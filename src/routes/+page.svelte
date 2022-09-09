<script lang="ts">
	import type { LoadData } from './+page.server'

	export let data: LoadData
</script>

<h1>Welcome to SvelteKit, {data?.props.user.email}</h1>

<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
