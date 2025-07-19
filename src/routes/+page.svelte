<script lang="ts">
	import { turnstile } from '$lib/client.js';
	import type { RenderParameters } from '$lib/client.d.js';
	import { onMount, untrack } from 'svelte';

	// render
	let render = $state<'implicit' | 'explicit'>('explicit');

	// for implicit render only
	onMount(() => {
		(window as any).callback = callback;
	});

	// sitekey
	const options = [
		{ key: '1x00000000000000000000AA', description: 'Always passes', visibility: 'visible' },
		{ key: '2x00000000000000000000AB', description: 'Always blocks', visibility: 'visible' },
		{ key: '1x00000000000000000000BB', description: 'Always passes', visibility: 'invisible' },
		{ key: '2x00000000000000000000BB', description: 'Always blocks', visibility: 'invisible' },
		{
			key: '3x00000000000000000000FF',
			description: 'Forces an interactive challenge',
			visibility: 'visible'
		}
	] as const;

	// callback
	let _token = $state('');

	function callback(token: string) {
		_token = token;
		console.log('llll');
	}

	// params
	let params: RenderParameters = $state<RenderParameters>({
		sitekey: options[0].key,
		theme: 'light',
		size: 'normal'
	});

	$effect(() => {
		render;
		params.sitekey;
		params.theme;
		params.size;
		untrack(() => {
			_token = '';
		});
	});

	const highlight = (data: string) => {
		return data
			.replace(/"(.*?)":/g, '<span style="color:#9CDCFE;">"$1"</span>:') // Keys: orange/yellow
			.replace(/: "(.*?)"/g, ': <span style="color:#CE9178;">"$1"</span>') // String values: green
			.replace(/: (\d+)/g, ': <span style="color:#B5CEA8;">$1</span>') // Number values: blue
			.replace(/: (true|false)/g, ': <span style="color:#569CD6;">$1</span>') // Boolean values: magenta/orange
			.replace(/: null/g, ': <span style="color:#808080;">null</span>'); // null values
	};

	const command = highlight('npm install @battlefieldduck/turnstile-svelte');
	const input = $derived(highlight(JSON.stringify(params, null, 4)));
	const output = $derived(highlight(JSON.stringify({ token: _token }, null, 4)));
</script>

<div class="topbar">
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
			href="https://github.com/uppsync/cloudflare-turnstile-svelte"
			target="_blank"
			rel="noopener"
			class="topbar-button"
		>
			GitHub ↗
		</a>
	</div>
</div>

<div class="container">
	<div class="left panel-top-gradient">
		<h2>Turnstile Svelte Playground</h2>

		<p class="panel-desc">
			Explore Cloudflare Turnstile by changing render mode, sitekey, theme and size to see live
			behavior and emitted tokens. Watch how each option affects the widget and the token it emits.
		</p>

		<fieldset>
			<legend>Select Render Mode</legend>
			<div class="radio-pair">
				<label><input type="radio" bind:group={render} value="explicit" /> Explicit</label>
				<label><input type="radio" bind:group={render} value="implicit" /> Implicit</label>
			</div>
		</fieldset>

		<fieldset>
			<legend>Select Dummy Sitekey</legend>
			<table>
				<thead>
					<tr>
						<th></th>
						<th>Sitekey</th>
						<th>Description</th>
						<th>Visibility</th>
					</tr>
				</thead>
				<tbody>
					{#each options as option}
						<tr
							onclick={() => (params.sitekey = option.key)}
							class:selected={params.sitekey === option.key}
							style="cursor: pointer;"
						>
							<td>
								<input
									type="radio"
									bind:group={params.sitekey}
									value={option.key}
									name="sitekey"
									class="radio-table"
								/>
							</td>
							<td><code>{option.key}</code></td>
							<td>{option.description}</td>
							<td>{option.visibility}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</fieldset>

		<fieldset>
			<legend>Select Theme</legend>
			<div class="radio-pair">
				<label>
					<input type="radio" bind:group={params.theme} value="light" />
					Light
				</label>
				<label><input type="radio" bind:group={params.theme} value="dark" />Dark</label>
				<label>
					<input type="radio" bind:group={params.theme} value="auto" />
					Auto
				</label>
			</div>
		</fieldset>

		<fieldset>
			<legend>Select Widget Size</legend>
			<div class="radio-pair">
				<label>
					<input type="radio" bind:group={params.size} value="normal" />
					<span>Normal</span>
				</label>
				<label>
					<input type="radio" bind:group={params.size} value="flexible" />
					<span>Flexible</span>
				</label>
				<label>
					<input type="radio" bind:group={params.size} value="compact" />
					<span>Compact</span>
				</label>
			</div>
		</fieldset>
	</div>

	<div class="right panel-top-gradient">
		{#key [params.sitekey, params.theme, params.size]}
			<h2>Turnstile Widget</h2>
			<pre>{@html command}</pre>
			<h3>Render</h3>
			{#if render === 'explicit'}
				<p>Explicitly render the Turnstile widget</p>
				<div
					{@attach turnstile({
						sitekey: params.sitekey,
						theme: params.theme,
						size: params.size,
						callback
					})}
				></div>
			{:else}
				<p>Implicitly render the Turnstile widget</p>
				<div
					{@attach turnstile()}
					data-sitekey={params.sitekey}
					data-theme={params.theme}
					data-size={params.size}
					data-callback="callback"
				></div>
			{/if}
		{/key}
		<h3>Params</h3>
		<pre>{@html input}</pre>
		<h3>Output</h3>
		<pre>{@html output}</pre>
	</div>
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
		<a href="https://github.com/uppsync/cloudflare-turnstile-svelte" target="_blank">
			View on GitHub
		</a>.
	</p>
</footer>
