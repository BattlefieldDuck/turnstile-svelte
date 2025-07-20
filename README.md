# turnstile-svelte

<img align="right" width="100" height="100" src="https://github.com/BattlefieldDuck/turnstile-svelte/blob/main/static/favicon-96x96.png?raw=true">

[![Node.js Build](https://github.com/BattlefieldDuck/turnstile-svelte/actions/workflows/node.js.yml/badge.svg)](https://github.com/BattlefieldDuck/turnstile-svelte/actions/workflows/node.js.yml)
![NPM Type Definitions](https://img.shields.io/npm/types/%40battlefieldduck%2Fturnstile-svelte)
[![NPM Version](https://img.shields.io/npm/v/%40battlefieldduck%2Fturnstile-svelte)](https://www.npmjs.com/package/@battlefieldduck/turnstile-svelte)
![NPM Downloads](https://img.shields.io/npm/dw/%40battlefieldduck%2Fturnstile-svelte)
![NPM Downloads](https://img.shields.io/npm/d18m/%40battlefieldduck%2Fturnstile-svelte)
![NPM License](https://img.shields.io/npm/l/%40battlefieldduck%2Fturnstile-svelte)

A lightweight and declarative [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) integration for Svelte and SvelteKit.

**Live playground**: [battlefieldduck.github.io/turnstile-svelte](https://battlefieldduck.github.io/turnstile-svelte)

## Installation

```bash
npm install @battlefieldduck/turnstile-svelte
````

## Example

```svelte
<script lang="ts">
    import { turnstile } from '@battlefieldduck/turnstile-svelte';

    function callback(token: string) {
        console.log('Challenge Success:', token);
    }
</script>

<div {@attach turnstile({ sitekey: '1x00000000000000000000AA', callback })}></div>
```

## Docs

* [Live Examples & Playground](https://battlefieldduck.github.io/turnstile-svelte)
* [Cloudflare Turnstile Docs](https://developers.cloudflare.com/turnstile/)

## Contributing
Contributions are welcome! Please feel free to submit pull requests or open issues.

![https://github.com/BattlefieldDuck/turnstile-svelte/graphs/contributors](https://contrib.rocks/image?repo=BattlefieldDuck/turnstile-svelte)

## License
turnstile-svelte is licensed under the MIT License. See the `LICENSE` file for more details.

## Stargazers over time
[![Stargazers over time](https://starchart.cc/BattlefieldDuck/turnstile-svelte.svg?variant=adaptive)](https://starchart.cc/BattlefieldDuck/turnstile-svelte)
