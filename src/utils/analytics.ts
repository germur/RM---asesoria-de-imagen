type EventParameters = Record<string, string | number | boolean>;

/** Only non-identifying interaction data belongs in Analytics. */
export function trackEvent(name: string, parameters: EventParameters = {}) {
    const analyticsWindow = window as Window & {
        gtag?: (command: string, event: string, parameters: EventParameters) => void;
    };
    analyticsWindow.gtag?.('event', name, {
        ...parameters,
        transport_type: 'beacon',
    });
}
