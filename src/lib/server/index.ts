import type { TurnstileVerificationRequest, TurnstileVerificationResponse } from "./types.js";

export async function siteverify(data: TurnstileVerificationRequest): Promise<TurnstileVerificationResponse> {
    // Validate the token by calling the
    // "/siteverify" API endpoint.
    const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
    const result = await fetch(url, {
        body: JSON.stringify(data),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const outcome: TurnstileVerificationResponse = await result.json();

    return outcome;
}