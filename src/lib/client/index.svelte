<script lang="ts">
	import type { RenderParameters } from './types.js';
	import { turnstile } from './index.js';

	const params: RenderParameters = $props();
</script>

<div {@attach turnstile(params)}></div>
