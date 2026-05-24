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
```

## Example

### `+page.svelte`

```svelte
<script lang="ts">
    import { PUBLIC_TURNSTILE_SITE_KEY } from '$env/static/public';
    import { turnstile } from '@battlefieldduck/turnstile-svelte';
</script>

<form method="POST">
    <label>
        Email
        <input name="email" type="email" />
    </label>
    <label>
        Password
        <input name="password" type="password" />
    </label>
    <div {@attach turnstile({ sitekey: PUBLIC_TURNSTILE_SITE_KEY })}></div>
    <button>Log in</button>
</form>
```

### `+page.server.ts`

```ts
import { fail } from '@sveltejs/kit';
import { TURNSTILE_SECRET_KEY } from '$env/static/private';
import { validateTurnstile } from '@battlefieldduck/turnstile-svelte/server';
import type { Actions } from './$types';

export const actions = {
    default: async (event) => {
        const data = await event.request.formData();

        const validation = await validateTurnstile({
            secret: TURNSTILE_SECRET_KEY,
            response: data.get('cf-turnstile-response'),
            remoteip: event.getClientAddress()
        });

        if (!validation.success) {
            console.warn('Turnstile failed', { errors: validation['error-codes'] });
            return fail(400, { error: 'Invalid verification' });
        }

        // Token is valid - process the form

        const email = data.get('email');
        const password = data.get('password');

        return { success: true };
    }
} satisfies Actions;
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
