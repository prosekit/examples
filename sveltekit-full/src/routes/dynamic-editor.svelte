<script lang="ts">
	import { onMount } from 'svelte';
	
	let Editor: any;
	
	onMount(async () => {
		Editor = (await import('../lib/editor.svelte')).default;
	});
</script>

<svelte:component this={Editor}>
</svelte:component>
