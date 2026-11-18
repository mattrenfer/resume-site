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
    | { event: 'nav_click'; label: string; location: string; from_page?: string }
    | { event: 'writing_read'; slug: string; collection: 'dispatches' | 'poetry' }
    // From data-track attributes (see ClickTracker): any event name, string details.
    | { event: string; [detail: string]: string | number | undefined };

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

// GA4 sends events in batches a few seconds after they happen, so an event
// from a link that loads another page on this site in the same tab is lost
// with the old page. Save it instead; the next page sends it on load
// (sendPendingEvents, called by ClickTracker).
const PENDING_KEY = 'mr_pending_events';

// True when clicking this link will load another page of this site in the
// same tab (not a same-page anchor, new tab or modified click).
export function leavesPageInSameTab(link: HTMLAnchorElement, e?: MouseEvent): boolean {
    if (e && (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)) return false;
    if (link.target && link.target !== '_self') return false;
    if (link.hasAttribute('download')) return false;
    let url: URL;
    try {
        url = new URL(link.href, window.location.href);
    } catch {
        return false;
    }
    if (url.origin !== window.location.origin) return false;
    const samePage = url.pathname === window.location.pathname && url.search === window.location.search;
    return !samePage;
}

export function trackAfterNavigation(payload: AnalyticsEvent): void {
    if (typeof window === 'undefined') return;
    try {
        const queue = JSON.parse(sessionStorage.getItem(PENDING_KEY) || '[]');
        queue.push({ ...payload, from_page: window.location.pathname });
        sessionStorage.setItem(PENDING_KEY, JSON.stringify(queue));
    } catch {
        track(payload); // storage blocked: best effort
    }
}

export function sendPendingEvents(): void {
    if (typeof window === 'undefined') return;
    try {
        const queue = JSON.parse(sessionStorage.getItem(PENDING_KEY) || '[]');
        sessionStorage.removeItem(PENDING_KEY);
        queue.forEach((payload: AnalyticsEvent) => track(payload));
    } catch {
        // nothing to send
    }
}

// Use from a link's onClick: sends now, or after the next page loads if the
// link is about to load another page of this site.
export function trackLink(payload: AnalyticsEvent, e: { currentTarget: EventTarget | null; nativeEvent?: MouseEvent }): void {
    const link = e.currentTarget as HTMLAnchorElement | null;
    if (link && link.tagName === 'A' && leavesPageInSameTab(link, e.nativeEvent)) {
        trackAfterNavigation(payload);
    } else {
        track(payload);
    }
}
