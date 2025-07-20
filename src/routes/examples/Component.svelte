<script lang="ts">
	import { Turnstile } from '$lib/index.js';

	function callback(token: string) {
		console.log(`Challenge Success ${token}`);
	}
</script>

<Turnstile sitekey="1x00000000000000000000AA" {callback} />
