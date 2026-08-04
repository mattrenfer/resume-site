import Script from 'next/script';
import { Inter, IBM_Plex_Serif, Lora } from 'next/font/google';
// Template + vendor CSS are imported here (bundled + minified into the Next CSS)
// BEFORE globals.scss, so globals.scss remains the override layer that wins.
import '../public/css/styles.css';
import '../public/css/vendor.css';
import './globals.scss';

// Self-hosted fonts (no render-blocking third-party request). Each exposes a CSS
// variable consumed by the stylesheets: --font-1 (Inter), --font-2 (IBM Plex
// Serif, homepage headings), --font-lora (the /writing serif).
const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    display: 'swap',
    variable: '--font-inter',
});
const ibmPlexSerif = IBM_Plex_Serif({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    style: ['normal', 'italic'],
    display: 'swap',
    variable: '--font-ibm',
});
const lora = Lora({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
    style: ['normal', 'italic'],
    display: 'swap',
    variable: '--font-lora',
});

export const metadata = {
    title: 'Matthew Russell Renfer - Front-End Engineer',
    description:
        'Collaborative Front-End Engineer & UX strategist with 15+ years industry experience delivering performant, scalable digital solutions.',
    icons: {
        icon: '/favicon.ico',
        apple: '/logo192.png',
    },
    manifest: '/manifest.json',
};

export const viewport = {
    themeColor: '#000000',
};

export default function RootLayout({ children }) {
    return (
        <html
            lang='en'
            className={`${inter.variable} ${ibmPlexSerif.variable} ${lora.variable}`}
        >
            {/* id="top" is the anchor target for the footer "back to top" link.
                No ss-preload class: the preloader was retired, and adding it
                without ss-loaded would leave .s-hero permanently hidden. */}
            <body id='top'>
                {children}
                <Script
                    src='/js/vendor/fontawesome/all.min.js'
                    strategy='afterInteractive'
                />
            </body>
        </html>
    );
}
