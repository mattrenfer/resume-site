import Script from 'next/script';
import './globals.scss';

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
            {/* The Ceevee template + vendor CSS are imported at the top of
                globals.css (not linked here) so that globals.css overrides
                them correctly — see the comment in that file. */}
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
