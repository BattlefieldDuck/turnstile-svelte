// import { page } from '@vitest/browser/context';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Page from './+page.svelte';

describe('Cloudflare Turnstile script injection', () => {
	it('should include the Turnstile script in <head>', () => {
		render(Page);

		// Look for the exact src URL and defer attribute
		const script = document.head.querySelector(
			'script[src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"][defer]'
		);
		expect(script).toBeTruthy();
	});
});
