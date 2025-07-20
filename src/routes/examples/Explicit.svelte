<script lang="ts">
	import { turnstile } from '$lib/index.js';

	function callback(token: string) {
		console.log(`Challenge Success ${token}`);
	}
</script>

<div {@attach turnstile({ sitekey: '1x00000000000000000000AA', callback })}></div>
