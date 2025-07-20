<script lang="ts">
	import type { RenderParameters } from './client.d.js';
	import { turnstile } from './client.js';

	const params: RenderParameters = $props();
</script>

<div {@attach turnstile(params)}></div>
