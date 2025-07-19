import { expect, test } from '@playwright/test';

test.describe('Home page', () => {
	// runs before each test in this describe block
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('injects Cloudflare Turnstile script in head', async ({ page }) => {
		// look inside <head> for the exact script tag
		const script = page.locator(
			'head script[src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"][defer]'
		);
		// assert that exactly one such script exists
		await expect(script).toHaveCount(1);
	});
});
