<script lang="ts">
	import type { Snippet } from 'svelte';
	import '../app.css';
	import { base } from '$app/paths';
	import { page } from '$app/state';

	let { children }: { children: Snippet } = $props();
</script>

<div class="topbar">
	<nav class="main-nav" aria-label="Main">
		<a href="{base}/" class="brand">turnstile-svelte</a>
		<a
			href="{base}/"
			class:selected={page.url.pathname === `${base}/`}
			aria-current={page.url.pathname === `${base}/` ? 'page' : undefined}
		>
			Playground
		</a>
		<a
			href="{base}/examples"
			class:selected={page.url.pathname === `${base}/examples`}
			aria-current={page.url.pathname === `${base}/examples` ? 'page' : undefined}
		>
			Examples
		</a>
	</nav>
	<div class="topbar-actions">
		<a
			href="https://developers.cloudflare.com/turnstile/"
			target="_blank"
			rel="noopener"
			class="topbar-button"
		>
			Cloudflare Turnstile docs ↗
		</a>
		<a
			href="https://github.com/BattlefieldDuck/turnstile-svelte"
			target="_blank"
			rel="noopener"
			class="topbar-button"
		>
			GitHub ↗
		</a>
	</div>
</div>

<div class="container">
	{@render children()}
</div>

<footer class="footer">
	<p>
		This library is maintained by the
		<a href="https://github.com/BattlefieldDuck" target="_blank" rel="noopener">
			@BattlefieldDuck
		</a>. Not affiliated with or endorsed by Cloudflare. Cloudflare Turnstile is a product by
		<a href="https://www.cloudflare.com" class="cloudflare" target="_blank" rel="noopener">
			Cloudflare
		</a>.
	</p>
	<p class="footer-sub">
		turnstile-svelte is an open-source npm package for easily integrating
		<a
			href="https://developers.cloudflare.com/turnstile/"
			class="cloudflare"
			target="_blank"
			rel="noopener"
		>
			Cloudflare Turnstile
		</a>
		with Svelte and SvelteKit. It simplifies client-side rendering of Turnstile widgets via a declarative,
		flexible API.
		<a href="https://github.com/BattlefieldDuck/turnstile-svelte" target="_blank">
			View on GitHub
		</a>.
	</p>
</footer>
