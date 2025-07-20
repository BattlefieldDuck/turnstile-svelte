<script lang="ts">
	import { onMount } from 'svelte';
	import { turnstile } from '$lib/index.js';

	onMount(() => {
		(window as any).callback = callback;
	});

	function callback(token: string) {
		console.log(`Challenge Success ${token}`);
	}
</script>

<div {@attach turnstile()} data-sitekey="1x00000000000000000000AA" data-callback="callback"></div>
