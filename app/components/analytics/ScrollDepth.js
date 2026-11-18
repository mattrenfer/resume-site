'use client';

// Sends scroll_depth once each at 25, 50, 75 and 100% of a page, so we can see
// how far visitors read (used on the Handful case study).

import { useEffect } from 'react';
import { track } from '@/lib/analytics/events';

const MARKS = [25, 50, 75, 100];

export default function ScrollDepth({ page }) {
    useEffect(() => {
        const sent = new Set();
        let ticking = false;

        const check = () => {
            ticking = false;
            const max = document.documentElement.scrollHeight - window.innerHeight;
            const percent = max > 0 ? (window.scrollY / max) * 100 : 100;
            for (const mark of MARKS) {
                // 98 counts as the bottom: the last pixels are often unreachable.
                if (!sent.has(mark) && percent >= Math.min(mark, 98)) {
                    sent.add(mark);
                    track({ event: 'scroll_depth', page, percent: mark });
                }
            }
            if (sent.size === MARKS.length) window.removeEventListener('scroll', onScroll);
        };
        const onScroll = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(check);
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [page]);

    return null;
}
