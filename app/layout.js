import Script from 'next/script';
import { lora, sourceSans } from './fonts/fonts';
import Analytics from './components/analytics/Analytics';
// Site-wide styles: design tokens, a small base, and links (see globals.scss).
// Everything else is in component CSS modules. The old Ceevee template CSS is
// no longer loaded.
import './globals.scss';

// Fonts are bundled in app/fonts (see fonts.js). Each exposes a CSS variable:
// --font-source-sans (UI, mapped to --font-1) and --font-lora (reading and
// headings, mapped to --font-2), both set in globals.scss.

export const metadata = {
    // Lets pages give relative share-image and page URLs.
    metadataBase: new URL('https://matthewrenfer.com'),
    title: 'Matthew Russell Renfer - Senior Front-End Engineer',
    description:
        'Collaborative Front-End Engineer & UX strategist with 15+ years industry experience delivering performant, scalable digital solutions.',
    icons: {
        icon: '/favicon.ico',
        apple: '/logo192.png',
    },
    manifest: '/manifest.json',
    // Defaults for link previews (LinkedIn and others). Pages can override them.
    openGraph: {
        type: 'website',
        siteName: 'Matthew Renfer',
        title: 'Matthew Russell Renfer - Senior Front-End Engineer',
        description:
            'Collaborative Front-End Engineer & UX strategist with 15+ years industry experience delivering performant, scalable digital solutions.',
    },
};

export const viewport = {
    themeColor: '#000000',
};

export default function RootLayout({ children }) {
    return (
        <html
            lang='en'
            className={`${sourceSans.variable} ${lora.variable}`}
        >
            {/* id="top" is the anchor target for the footer "back to top" link.
                No ss-preload class: the preloader was retired, and adding it
                without ss-loaded would leave .s-hero permanently hidden. */}
            <body id='top'>
                {/* Consent Mode v2 defaults, set BEFORE GTM loads.
                    Interim (build phase): analytics granted so real data flows;
                    ad storage stays denied (no ads on this site). Phase 4 adds
                    the consent banner and revisits the opt-in vs opt-out default. */}
                <Script id='consent-default' strategy='beforeInteractive'>
                    {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'granted'});`}
                </Script>
                {children}
                <Analytics />
                <Script
                    src='/js/vendor/fontawesome/all.min.js'
                    strategy='afterInteractive'
                />
            </body>
        </html>
    );
}
