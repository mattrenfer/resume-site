'use client';

// Loads the GTM container (via the perf-tuned @next/third-parties integration)
// and captures first-touch attribution on mount. Renders nothing until a
// container ID is provided, so it's inert on builds without one.
//
// Consent Mode defaults (deny-by-default) are set in app/layout.js BEFORE this
// loads; the full consent banner arrives in Phase 4.

import { useEffect } from 'react';
import { GoogleTagManager } from '@next/third-parties/google';
import { captureAttribution } from '@/lib/analytics/utm';

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export default function Analytics() {
    useEffect(() => {
        captureAttribution();
    }, []);

    return GTM_ID ? <GoogleTagManager gtmId={GTM_ID} /> : null;
}
