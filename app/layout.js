import Script from 'next/script';
import './globals.css';

export const metadata = {
    title: 'Matthew Russell Renfer - Software Engineer',
    description:
        'Collaborative Software Engineer & UX strategist with 15+ years industry experience delivering performant, scalable digital solutions.',
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
        <html lang='en'>
            <head>
                {/* Ceevee design system + vendor styles (served from public/). */}
                <link rel='stylesheet' href='/css/styles.css' />
                <link rel='stylesheet' href='/css/vendor.css' />
            </head>
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
