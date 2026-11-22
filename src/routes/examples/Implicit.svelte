<script lang="ts">
	import { onMount } from 'svelte';
	import { turnstile } from '$lib/index.js';

	onMount(() => {
		(
			window as unknown as {
				turnstile: {
					render: (el: string | HTMLElement, opts?: Record<string, unknown>) => string;
					reset: (id?: string) => void;
					remove: (id?: string) => void;
					execute: (el?: string | HTMLElement, opts?: Record<string, unknown>) => void;
					getResponse: (id?: string) => string | undefined;
					isExpired: (id?: string) => boolean;
				};
				[key: string]: unknown;
			}
		).callback = callback;
	});

	function callback(token: string) {
		console.log(`Challenge Success ${token}`);
	}
</script>

<div {@attach turnstile()} data-sitekey="1x00000000000000000000AA" data-callback="callback"></div>
