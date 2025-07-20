<script lang="ts">
	import Explicit from './Explicit.svelte';
	import ExplicitCode from './Explicit.svelte?raw';
	import Implicit from './Implicit.svelte';
	import ImplicitCode from './Implicit.svelte?raw';
	import Component from './Component.svelte';
	import ComponentCode from './Component.svelte?raw';

	const options = ['explicit', 'implicit', 'component'] as const;
	let example = $state<(typeof options)[number]>(options[0]);
	const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
	const fixImport = (code: string) => {
		return code
			.replace(/\$lib\/index.js/g, '@battlefieldduck/turnstile-svelte')
			.replaceAll('\t', '    ');
	};
	const code = $derived.by(() => {
		switch (example) {
			case 'explicit':
				return fixImport(ExplicitCode);
			case 'implicit':
				return fixImport(ImplicitCode);
			case 'component':
				return fixImport(ComponentCode);
		}
	});

	const highlightCode = () => {
		document.querySelectorAll('.svelte').forEach((el) => {
			(window as any).hljs.highlightBlock(el);
		});
	};

	$effect(() => {
		code;
		highlightCode();
	});
</script>

<div class="left panel-top-gradient">
	<h2>Turnstile Svelte Examples</h2>

	<p class="panel-desc">
		Explore how to use the Turnstile Svelte library in three render modes: explicit, implicit, and
		component. Select a radio option to switch modes and see how the widget and emitted token
		change.
	</p>

	<fieldset>
		<legend>Select Example</legend>
		<div class="radio-pair">
			{#each options as option}
				<label>
					<input type="radio" bind:group={example} value={option} />{capitalize(option)}
				</label>
			{/each}
		</div>
	</fieldset>

	{#key code}
		<pre><code class="svelte">{code}</code></pre>
	{/key}
</div>

<div class="right panel-top-gradient">
	<h2>Turnstile Widget Preview</h2>

	{#if example === 'explicit'}
		<p class="panel-desc">
			<strong>Explicit render:</strong> Recommended. You get full control of the div container so you
			can freely add classes, data attributes, or other customization.
		</p>
		<Explicit />
	{:else if example === 'implicit'}
		<p class="panel-desc">
			<strong>Implicit render:</strong> Less recommended because callbacks must be exposed as a global
			function, but it can be useful in certain edge cases.
		</p>
		<Implicit />
	{:else if example === 'component'}
		<p class="panel-desc">
			<strong>Component usage:</strong> Easiest to drop in, but offers the least control over the underlying
			Turnstile element (you cannot add arbitrary attributes directly).
		</p>
		<Component />
	{/if}
</div>
