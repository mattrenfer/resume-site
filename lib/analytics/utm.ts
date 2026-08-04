// Persistent UTM / source attribution.
//
// On first touch, capture any `utm_*` params (and an off-site referrer) and
// persist them, so the original source survives across navigations and can be
// attached to every event. This is the "persistent UTM / source attribution"
// capability from the résumé, running live on the site.

const STORAGE_KEY = 'mr_attribution';

const UTM_KEYS = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
] as const;

export interface Attribution {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_term?: string;
    utm_content?: string;
    landing_referrer?: string;
    captured_at?: string;
}

export function getAttribution(): Attribution {
    if (typeof window === 'undefined') return {};
    try {
        return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '{}');
    } catch {
        return {};
    }
}

/**
 * First-touch capture: records the original source once and never overwrites it,
 * so a later same-session visit without UTMs doesn't clobber where they came from.
 */
export function captureAttribution(): Attribution {
    if (typeof window === 'undefined') return {};

    const existing = getAttribution();
    if (existing.captured_at) return existing;

    const params = new URLSearchParams(window.location.search);
    const attr: Attribution = {};
    for (const key of UTM_KEYS) {
        const value = params.get(key);
        if (value) attr[key] = value;
    }
    const referrer = document.referrer;
    if (referrer && !referrer.includes(window.location.host)) {
        attr.landing_referrer = referrer;
    }
    attr.captured_at = new Date().toISOString();

    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(attr));
    } catch {
        // storage blocked (private mode / consent denied) — just don't persist
    }
    return attr;
}
