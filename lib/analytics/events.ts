// Typed analytics events pushed to the GTM dataLayer.
//
// Every event carries the persistent attribution (see ./utm) so any conversion
// can be traced back to its original source. `track()` is a safe no-op until a
// GTM container is active, so it can be wired into components now.

import { getAttribution } from './utm';

export type AnalyticsEvent =
    | { event: 'nav_click'; section?: string; label?: string; location?: string }
    | { event: 'cta_click'; label: string; location?: string }
    | { event: 'portfolio_open'; item: string; company?: string }
    | { event: 'selected_work_click'; project: string }
    | { event: 'outbound_click'; url: string; label?: string; location?: string }
    | { event: 'resume_download'; file: string; location?: string }
    | { event: 'contact_click'; method: string }
    | { event: 'social_click'; network: string; location?: string }
    | { event: 'demo_start'; location: string }
    | { event: 'scroll_depth'; page: string; percent: number }
    | { event: 'writing_read'; slug: string; collection: 'dispatches' | 'poetry' }
    // From data-track attributes (see ClickTracker): any event name, string details.
    | { event: string; [detail: string]: string | number | undefined | (() => void) };

declare global {
    interface Window {
        dataLayer?: Record<string, unknown>[];
    }
}

export function track(payload: AnalyticsEvent): void {
    if (typeof window === 'undefined') return;
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({ ...getAttribution(), ...payload });
}
