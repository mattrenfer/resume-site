'use client';

// One site-wide click listener for analytics, so server-rendered components can
// be tracked without becoming client components.
//
// Mark any link or button with data-track="<event name>" plus data-track-*
// attributes for its details:
//
//   <a href="#work" data-track="cta_click" data-track-label="See my work"
//      data-track-location="hero">
//
// pushes { event: 'cta_click', label: 'See my work', location: 'hero' } to the
// GTM dataLayer (with attribution, via track()).
//
// GA4 sends events in batches a few seconds later, so a click that loads another
// page in the same tab would lose its event. For links to other pages of this
// site, the event is saved and sent when the next page loads. Actions that
// leave the site (like "Try the demo") open in a new tab instead.

import { useEffect } from 'react';
import { leavesPageInSameTab, sendPendingEvents, track, trackAfterNavigation } from '@/lib/analytics/events';

export default function ClickTracker() {
    useEffect(() => {
        sendPendingEvents();

        const onClick = e => {
            const el = e.target.closest?.('[data-track]');
            if (!el) return;
            const details = {};
            for (const [key, value] of Object.entries(el.dataset)) {
                if (key.startsWith('track') && key !== 'track') {
                    details[key[5].toLowerCase() + key.slice(6)] = value;
                }
            }
            const payload = { event: el.dataset.track, ...details };
            if (el.tagName === 'A' && leavesPageInSameTab(el, e)) {
                trackAfterNavigation(payload);
            } else {
                track(payload);
            }
        };
        // Capture phase, so it runs even if a component stops the click.
        document.addEventListener('click', onClick, true);
        return () => document.removeEventListener('click', onClick, true);
    }, []);

    return null;
}
