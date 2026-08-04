'use client';

// Fires `writing_read` once per page when the visitor has actually engaged with
// a piece — either scrolled ~75% through it OR dwelled ~30s (whichever first).
// Short pieces (a poem that fits on screen) can't hit the scroll threshold, so
// the dwell timer is what captures a genuine read there.

import { useEffect, useRef } from 'react';
import { track } from '@/lib/analytics/events';

interface ReadTrackerProps {
    slug: string;
    collection: 'dispatches' | 'poetry';
}

const SCROLL_THRESHOLD = 0.75;
const DWELL_MS = 30000;

export default function ReadTracker({ slug, collection }: ReadTrackerProps) {
    const fired = useRef(false);

    useEffect(() => {
        const fire = () => {
            if (fired.current) return;
            fired.current = true;
            track({ event: 'writing_read', slug, collection });
            cleanup();
        };

        const onScroll = () => {
            const reached =
                (window.scrollY + window.innerHeight) /
                document.documentElement.scrollHeight;
            // require a real scroll so a short page doesn't fire on load
            if (window.scrollY > 100 && reached >= SCROLL_THRESHOLD) fire();
        };

        const timer = window.setTimeout(fire, DWELL_MS);
        window.addEventListener('scroll', onScroll, { passive: true });

        function cleanup() {
            window.clearTimeout(timer);
            window.removeEventListener('scroll', onScroll);
        }
        return cleanup;
    }, [slug, collection]);

    return null;
}
