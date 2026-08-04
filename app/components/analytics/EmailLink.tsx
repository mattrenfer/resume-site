'use client';

// Spam-resistant, trackable email link.
//
// The full address is assembled only in the browser (after hydration), so the
// static HTML that scrapers read never contains `user@domain` — it shows an
// obfuscated, non-clickable fallback. Once JS runs, it upgrades to a real
// clickable mailto and fires the contact_click conversion event.

import { useEffect, useState } from 'react';
import { track } from '@/lib/analytics/events';

interface EmailLinkProps {
    user: string;
    domain: string;
    className?: string;
}

export default function EmailLink({ user, domain, className }: EmailLinkProps) {
    const [address, setAddress] = useState<string | null>(null);

    useEffect(() => {
        setAddress(`${user}@${domain}`);
    }, [user, domain]);

    // SSR / no-JS fallback: readable but not a plain, scrapeable address.
    if (!address) {
        return (
            <span className={className}>
                {user} [at] {domain}
            </span>
        );
    }

    return (
        <a
            href={`mailto:${address}`}
            className={className}
            onClick={() => track({ event: 'contact_click', method: 'email' })}
        >
            {address}
        </a>
    );
}
