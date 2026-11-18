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
// Submit buttons (like "Try the demo") leave the site the moment the form
// submits, which can cut the event off. For those, the submit waits until GTM
// confirms the event was handled, or 800ms at most, then goes ahead.

import { useEffect } from 'react';
import { track } from '@/lib/analytics/events';

const WAIT_MS = 800;

function detailsOf(el) {
    const details = {};
    for (const [key, value] of Object.entries(el.dataset)) {
        if (key.startsWith('track') && key !== 'track') {
            details[key[5].toLowerCase() + key.slice(6)] = value;
        }
    }
    return details;
}

export default function ClickTracker() {
    useEffect(() => {
        const onClick = e => {
            const el = e.target.closest?.('[data-track]');
            if (!el) return;
            const payload = { event: el.dataset.track, ...detailsOf(el) };

            const form = el.type === 'submit' ? el.form : null;
            const gtmReady = typeof window !== 'undefined' && window.google_tag_manager;
            if (!form || !gtmReady || e.defaultPrevented) {
                track(payload);
                return;
            }

            // Hold the submit until GTM has handled the event (or time runs out).
            e.preventDefault();
            let done = false;
            const go = () => {
                if (done) return;
                done = true;
                form.submit();
            };
            track({ ...payload, eventCallback: go, eventTimeout: WAIT_MS });
            setTimeout(go, WAIT_MS + 100);
        };
        // Capture phase, so it runs even if a component stops the click.
        document.addEventListener('click', onClick, true);
        return () => document.removeEventListener('click', onClick, true);
    }, []);

    return null;
}
