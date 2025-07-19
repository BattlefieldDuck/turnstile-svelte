export interface TurnstileVerificationRequest {
    /**
     * Required. Your widget’s secret key.
     * Can be found in the Turnstile dashboard under widget settings.
     */
    secret: string;

    /**
     * Required. The token (response) provided by the Turnstile client-side widget.
     * Sent after the user completes the challenge.
     */
    response: string;

    /**
     * Optional. The visitor's IP address.
     * Helps Cloudflare with additional verification checks.
     */
    remoteip?: string;

    /**
     * Optional. A UUID associated with the response to ensure idempotent handling.
     * Prevents duplicate processing of the same verification request.
     */
    idempotency_key?: string;
}

export type TurnstileErrorCode =
    | "missing-input-secret"
    | "invalid-input-secret"
    | "missing-input-response"
    | "invalid-input-response"
    | "bad-request"
    | "timeout-or-duplicate"
    | "internal-error";

export interface TurnstileSuccessResponse {
    /**
     * Always true for a successful verification.
     */
    success: true;

    /**
     * ISO timestamp when the challenge was solved.
     */
    challenge_ts: string;

    /**
     * Hostname where the challenge was served.
     */
    hostname: string;

    /**
     * Optional error codes (usually empty on success).
     */
    "error-codes": [];

    /**
     * Optional action passed from the frontend widget.
     */
    action?: string;

    /**
     * Optional cdata passed from the frontend widget.
     */
    cdata?: string;

    /**
     * Optional metadata (enterprise only).
     */
    metadata?: {
        ephemeral_id?: string;
    };
}

export interface TurnstileErrorResponse {
    /**
     * Always false for a failed verification.
     */
    success: false;

    /**
     * One or more error codes explaining the failure.
     */
    "error-codes": TurnstileErrorCode[];

    /**
     * Optionally present even on failure if the response was partially parseable.
     */
    challenge_ts?: string;
    hostname?: string;
    action?: string;
    cdata?: string;
    metadata?: {
        ephemeral_id?: string;
    };
}

export type TurnstileVerificationResponse =
    | TurnstileSuccessResponse
    | TurnstileErrorResponse;
