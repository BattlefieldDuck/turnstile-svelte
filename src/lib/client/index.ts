import type { Attachment } from 'svelte/attachments';
import type { RenderParameters } from './types.js';

export function turnstile(params?: RenderParameters): Attachment<HTMLDivElement> {
	return (element: HTMLDivElement) => {
		let widgetId: string | undefined

		// Implicitly render the Turnstile widget, add cf-turnstile class name
		if (!params) {
			const token = 'cf-turnstile';
			if (!element.classList.contains(token)) {
				element.classList.add(token);
			}
		}

		const onloadTurnstileCallback = () => {
			widgetId = params ? window.turnstile?.render(element, params) : window.turnstile?.implicitRender();
		}

		if (window.turnstile) {
			onloadTurnstileCallback();
		} else {
			const script = document.createElement('script');
			const query = params ? '?render=explicit' : '';
			script.src = `https://challenges.cloudflare.com/turnstile/v0/api.js${query}`;
			script.defer = true;

			if (params) {
				script.addEventListener('load', onloadTurnstileCallback);
			}

			document.head.appendChild(script);
		}

		return () => {
			if (widgetId) {
				window.turnstile?.remove(widgetId);
				widgetId = undefined;
			}
		}
	};
}
