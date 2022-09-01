<script lang="ts">
	import type { LoadData } from './+page.server'

	export let data: LoadData
</script>

<h1>Welcome to SvelteKit, {data?.name}</h1>
<h2>Status: {data.health}</h2>
<p>{JSON.stringify(data?.users)}</p>

<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
