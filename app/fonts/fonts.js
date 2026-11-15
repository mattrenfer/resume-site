// The site's fonts, bundled in the repo (latin subset, woff2) and served by
// next/font/local. Loading them from Google at build time failed several
// deploys in November 2026, so nothing here touches the network.
//
// Pairing (PNW Professional): Lora for reading and headings, Source Sans 3
// for UI. Young Serif and Newsreader are Handful's own display faces, used
// only on /portfolio/handful/.
//
// Source files: fonts.gstatic.com (Google Fonts, SIL Open Font License).

import localFont from 'next/font/local';

export const lora = localFont({
    src: [
        { path: './Lora-Variable.woff2', weight: '400 700', style: 'normal' },
        { path: './Lora-Italic-Variable.woff2', weight: '400 700', style: 'italic' },
    ],
    display: 'swap',
    variable: '--font-lora',
    fallback: ['Georgia', 'serif'],
});

export const sourceSans = localFont({
    src: [
        { path: './SourceSans3-Variable.woff2', weight: '400 700', style: 'normal' },
        { path: './SourceSans3-Italic-Variable.woff2', weight: '400 700', style: 'italic' },
    ],
    display: 'swap',
    variable: '--font-source-sans',
    fallback: ['system-ui', 'sans-serif'],
    // Source Sans 3 runs smaller than Inter at the same font-size (shorter
    // x-height). Scaling the glyphs keeps every existing size and layout where
    // it was instead of retuning each rule.
    declarations: [{ prop: 'size-adjust', value: '108%' }],
});

export const youngSerif = localFont({
    src: './YoungSerif-Regular.woff2',
    weight: '400',
    display: 'swap',
    variable: '--font-young-serif',
    fallback: ['Georgia', 'serif'],
});

export const newsreader = localFont({
    src: './Newsreader-SemiBoldItalic.woff2',
    weight: '600',
    style: 'italic',
    display: 'swap',
    variable: '--font-newsreader',
    fallback: ['Georgia', 'serif'],
});
