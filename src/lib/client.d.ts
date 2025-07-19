export interface RenderParameters {
    /**
     * The unique sitekey for your widget. Each widget's sitekey is created upon widget creation.
     * Data Attribute: data-sitekey
     */
    sitekey: string;

    /**
     * A customer-defined value (max 32 alphanumeric characters including _ and -) to differentiate widgets
     * under the same sitekey in analytics. Returned upon validation.
     * Data Attribute: data-action
     */
    action?: string;

    /**
     * A customer payload (max 255 alphanumeric characters including _ and -) that is attached to the challenge
     * throughout its issuance and returned upon validation.
     * Data Attribute: data-cdata
     */
    cData?: string;

    /**
     * A callback invoked upon successful completion of the challenge. It receives the token that can be validated.
     * Data Attribute: data-callback
     */
    callback?: (token: string) => void;

    /**
     * A callback invoked when there is an error (e.g., network error or challenge failure).
     * Data Attribute: data-error-callback
     */
    'error-callback'?: () => void;

    /**
     * Execution controls when to obtain the widget token: either on render (default) or on execute.
     * Data Attribute: data-execution
     */
    execution?: 'render' | 'execute';

    /**
     * A callback invoked when the challenge token expires; it does not reset the widget.
     * Data Attribute: data-expired-callback
     */
    'expired-callback'?: () => void;

    /**
     * A callback invoked before the challenge enters interactive mode.
     * Data Attribute: data-before-interactive-callback
     */
    'before-interactive-callback'?: () => void;

    /**
     * A callback invoked after the challenge has left interactive mode.
     * Data Attribute: data-after-interactive-callback
     */
    'after-interactive-callback'?: () => void;

    /**
     * A callback invoked when the client/browser is not supported by Turnstile.
     * Data Attribute: data-unsupported-callback
     */
    'unsupported-callback'?: () => void;

    /**
     * The widget theme. Possible values: "light", "dark", or "auto" (default which respects user preference).
     * Data Attribute: data-theme
     */
    theme?: 'light' | 'dark' | 'auto';

    /**
     * Language in which to display the widget. Should be either "auto" (default) or an ISO 639-1
     * code (e.g. "en", "fr") or language-country code (e.g. "en-US").
     * Data Attribute: data-language
     */
    language?: string;

    /**
     * The tabindex of the Turnstile iframe, intended for accessibility. Default value is 0.
     * Data Attribute: data-tabindex
     */
    tabindex?: number;

    /**
     * A callback invoked when the widget presents an interactive challenge but the challenge was not solved
     * within the allotted time. This callback can be used to reset the widget.
     * Data Attribute: data-timeout-callback
     */
    'timeout-callback'?: () => void;

    /**
     * Controls whether an input element with the response token is automatically created.
     * Defaults to true.
     * Data Attribute: data-response-field
     */
    'response-field'?: boolean;

    /**
     * The name of the input element that will receive the response token.
     * Defaults to "cf-turnstile-response".
     * Data Attribute: data-response-field-name
     */
    'response-field-name'?: string;

    /**
     * The widget size. Possible values: "normal", "flexible", or "compact".
     * Data Attribute: data-size
     */
    size?: 'normal' | 'flexible' | 'compact';

    /**
     * Controls whether the widget should automatically retry obtaining a token if it did not succeed.
     * Can be "auto" (default, will retry automatically) or "never" to disable retry.
     * Data Attribute: data-retry
     */
    retry?: 'auto' | 'never';

    /**
     * When retry is set to auto, this number (in milliseconds) controls the time between retry attempts.
     * Must be a positive integer less than 900,000. Defaults to 8000.
     * Data Attribute: data-retry-interval
     */
    'retry-interval'?: number;

    /**
     * Automatically refreshes the token when it expires.
     * Can be set to "auto" (default), "manual", or "never".
     * Data Attribute: data-refresh-expired
     */
    'refresh-expired'?: 'auto' | 'manual' | 'never';

    /**
     * Controls whether the widget should automatically refresh upon entering an interactive challenge and
     * observing a timeout. Applies only to widgets of managed mode.
     * Can be "auto" (default), "manual", or "never".
     * Data Attribute: data-refresh-timeout
     */
    'refresh-timeout'?: 'auto' | 'manual' | 'never';

    /**
     * Controls when the widget is visible.
     * Possible values: "always" (default), "execute", or "interaction-only".
     * Data Attribute: data-appearance
     */
    appearance?: 'always' | 'execute' | 'interaction-only';

    /**
     * Allows Cloudflare to gather feedback from visitors when the widget fails.
     * Can be set to true (default) or false.
     * Data Attribute: data-feedback-enabled
     */
    'feedback-enabled'?: boolean;
}

declare global {
    interface Window {
        turnstile?: {
            execute: (container: string | HTMLElement, jsParams?: RenderParameters) => void;
            getResponse: (widgetId?: string) => string | undefined;
            implicitRender: () => string | undefined;
            ready: (callback: () => void) => void;
            remove: (widgetId: string) => void;
            render: (container: string | HTMLElement, params: RenderParameters) => string | undefined;
            reset: (widgetId?: string) => void;
        };
    }
}
