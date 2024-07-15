<script lang="ts">
	import { onMount } from 'svelte';
	
	const load = () => import('../lib/editor.svelte');
	
	let Editor: Awaited<ReturnType<typeof load>>['default'];
	
	onMount(async () => {
		Editor = (await load()).default;
	});
</script>

<svelte:component this={Editor}>
</svelte:component>
