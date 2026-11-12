import Link from 'next/link';
import { Young_Serif, Newsreader } from 'next/font/google';
import Footer from '../../components/footer/footer';
import siteConfig from '../../siteConfig';
import Features from './Features';
import HandfulMotion from './HandfulMotion';
import styles from './handful.module.scss';

const DESCRIPTION =
    'A simple client tracker, built for the handful of people who count on you. What it does and how it was built.';

// The title, description and image LinkedIn and other sites show when the page is shared.
export const metadata = {
    title: 'Handful — Matthew Renfer',
    description: DESCRIPTION,
    alternates: { canonical: '/portfolio/handful/' },
    openGraph: {
        type: 'article',
        url: '/portfolio/handful/',
        siteName: 'Matthew Renfer',
        title: 'Handful — Matthew Renfer',
        description: DESCRIPTION,
        images: [
            {
                url: '/images/portfolio/handful/share.jpg',
                width: 1200,
                height: 630,
                alt: "Handful's dashboard, laid out like a newspaper front page, with a Try the demo badge.",
            },
        ],
    },
    twitter: { card: 'summary_large_image' },
};

const RESUME_URL = `/${siteConfig.personal.resume.fileName}${siteConfig.personal.resume.version}`;

// Handful's own display faces, used for the big statements and the closing
// wordmark. The header stays in the site's Lora.
const youngSerif = Young_Serif({
    subsets: ['latin'],
    weight: '400',
    display: 'swap',
    variable: '--font-young-serif',
});
const newsreader = Newsreader({
    subsets: ['latin'],
    weight: '600',
    style: 'italic',
    display: 'swap',
    variable: '--font-newsreader',
    // Next has no fallback metrics for Newsreader and logs an error without this.
    adjustFontFallback: false,
});

// Both "Try the demo" badges post here, the same way the badge on Handful's own
// sign-in page does. Handful signs the visitor in as the demo account on its
// server and opens the dashboard, so one click lands them in the app.
// If Handful ever limits /api/demo to requests from its own pages, these buttons
// will stop working; point them at https://handful.matthewrenfer.com/login instead.
const DEMO_ACTION = 'https://handful.matthewrenfer.com/api/demo';

// Handful's code on GitHub (public). Set to null to hide the link.
const GITHUB_URL = 'https://github.com/mattrenfer/handful';

const IMAGE_PATH = '/images/portfolio/handful';

// Desktop screenshots are 2560 wide (1280 at 2x); phone screenshots are 1179 wide (393 at 3x).
const DASHBOARD = { src: 'dashboard.webp', width: 2560, height: 2116 };

const HERO_ALT =
    "Handful's dashboard, laid out like a newspaper front page. The lead story is Tom Okafor, marked Still on your list, with the task Check in about the spring planting plan. A column headed Also next lists Dana Whitfield, Marcus Bell and Priya Nair. Counts of clients and tasks sit at the bottom.";

// The sentence that lights up word by word. The last part is the highlight.
const IDEA = [
    {
        text: 'Client trackers can easily become spreadsheet mazes. With Handful, the most urgent task becomes the lead story, and the',
    },
    { text: 'person is the headline.', highlight: true },
];

// Each feature has a desktop screen for the wide layout and a phone screen for the narrow one.
const FEATURES = [
    {
        title: 'The front page',
        text: 'The most urgent task becomes the lead story, and the person is the headline.',
        desktop: {
            ...DASHBOARD,
            alt: "Handful's dashboard, with Tom Okafor as the lead story.",
        },
        phone: {
            src: 'phone-dashboard.webp',
            width: 1179,
            height: 4278,
            alt: "Handful's dashboard on a phone. Tom Okafor is the lead story.",
        },
    },
    {
        title: 'Your people',
        text: 'Every client gets their name in headline type, with their details below it and the next thing you owe them beside it.',
        desktop: {
            src: 'clients.webp',
            width: 2560,
            height: 3010,
            alt: "Handful's Your people page. Each client's name is a headline with contact details below it and the next task beside it.",
        },
        phone: {
            src: 'phone-clients.webp',
            width: 1179,
            height: 6183,
            alt: "Handful's Your people page on a phone, listing each client with the next task.",
        },
    },
    {
        title: 'One page per person',
        text: 'Your notes and what comes next for that person, side by side.',
        desktop: {
            src: 'client-page.webp',
            width: 2560,
            height: 2122,
            alt: "Handful's page for Priya Nair, with a dated note on the left and her next task on the right.",
        },
        phone: {
            src: 'phone-client-page.webp',
            width: 1179,
            height: 3684,
            alt: "Handful's page for Priya Nair on a phone, with a dated note and her next task.",
        },
    },
    {
        title: "What's next",
        text: 'Open tasks, most urgent first. Due dates read as words: "Today," "Tuesday" or "Still on your list."',
        desktop: {
            src: 'tasks.webp',
            width: 2560,
            height: 3268,
            alt: "Handful's What's next page, listing tasks most urgent first with due dates written as words.",
        },
        phone: {
            src: 'phone-tasks.webp',
            width: 1179,
            height: 7569,
            alt: "Handful's What's next page on a phone, with tasks most urgent first.",
        },
    },
    {
        title: 'On your phone, day or night',
        text: "It works on a phone and follows your device's light or dark setting.",
        dark: true,
        desktop: {
            src: 'phone-dark.webp',
            width: 1179,
            height: 4278,
            alt: "Handful's dashboard on a phone in dark mode, with cream type on near-black.",
        },
        phone: {
            src: 'phone-dark.webp',
            width: 1179,
            height: 4278,
            alt: "Handful's dashboard on a phone in dark mode, with cream type on near-black.",
        },
    },
];

const FLOW = ['Add your people.', 'Schedule a task.', 'Write a note.'];

const BUILD_NOTES = [
    'Every change follows the same request lifecycle: a round trip from the form to the database and back. A form collects and validates the input (React Hook Form and Zod), a submit handler passes it to a data layer, and the data layer sends it to Supabase. The database checks it and stores it, and the saved row comes back up to update the screen.',
    "The database has the final say. Zod gives quick feedback in the browser, but it can be bypassed. Row Level Security and constraints in Postgres decide who can touch a row and what's valid, so a bug in the interface can't expose another person's data.",
    'The schema lives in versioned migrations, and a two-user SQL test checks every Row Level Security rule.',
    "It's deployed on Vercel with a custom domain and email through Resend, and the public demo resets every night.",
];

function Shot({ shot, alt = shot.alt, ...rest }) {
    return (
        <img
            src={`${IMAGE_PATH}/${shot.src}`}
            width={shot.width}
            height={shot.height}
            alt={alt}
            decoding='async'
            {...rest}
        />
    );
}

// Split into words at render time, so the sentence can light up one word at a time.
function Words() {
    const words = part =>
        part.text.split(' ').map((word, i) => (
            <span key={i} data-m='word' className={styles.word}>
                {word}{' '}
            </span>
        ));
    return (
        <p data-m='words' className={styles.words}>
            {IDEA.map((part, i) =>
                part.highlight ? (
                    <em key={i} className={styles.highlight}>
                        {words(part)}
                    </em>
                ) : (
                    <span key={i}>{words(part)}</span>
                ),
            )}
        </p>
    );
}

export default function HandfulPage() {
    return (
        <>
            <HandfulMotion
                className={`${styles.page} ${youngSerif.variable} ${newsreader.variable}`}
                motionClass={styles.motion}
            >
                <div data-m='bg' className={styles.bg} aria-hidden='true' />

                {/* Shown at the top of the page only, so visitors know there's more below. */}
                <button type='button' data-m='cue' className={styles.cue}>
                    Scroll
                    <svg viewBox='0 0 16 16' aria-hidden='true'>
                        <path d='M3 6l5 5 5-5' />
                    </svg>
                </button>

                <header data-m='hero' className={styles.hero}>
                    <h1 className={styles.title}>Handful</h1>
                    <div className={styles.ornament} aria-hidden='true' />
                    <p className={styles.tagline}>
                        for the handful of people who count on you
                    </p>
                    <p className={styles.summary}>
                        A simple client tracker with a front page headlining who
                        needs you today.
                    </p>
                    {/* Visitors from LinkedIn land here first, so the page says whose work this is. */}
                    <p className={styles.byline}>
                        by{' '}
                        <Link href='/' className={styles.bylineLink}>
                            Matthew Renfer
                        </Link>
                    </p>
                </header>

                <section
                    data-m='shot-section'
                    className={styles.shotSection}
                    aria-label='The Handful dashboard'
                >
                    {/* On a wide screen this rises from the bottom of the window on load. */}
                    <div className={styles.arrive}>
                        <div data-m='shot' className={styles.shot}>
                            <Shot
                                shot={DASHBOARD}
                                alt={HERO_ALT}
                                fetchPriority='high'
                            />
                            <div data-m='spin' className={styles.spin}>
                                <form
                                    action={DEMO_ACTION}
                                    method='post'
                                    className={styles.demoForm}
                                >
                                    <button
                                        type='submit'
                                        className={styles.seal}
                                    >
                                        <img
                                            src={`${IMAGE_PATH}/badge.webp`}
                                            width={900}
                                            height={900}
                                            alt='Try the demo'
                                        />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    data-m='idea'
                    className={`${styles.idea} ${styles.paper}`}
                    aria-labelledby='origin-story'
                >
                    <h2
                        id='origin-story'
                        className={`${styles.kicker} ${styles.kickerOnPaper}`}
                    >
                        Origin story
                    </h2>
                    <Words />
                    <div className={styles.story}>
                        <p data-m='story' className={styles.storyText}>
                            A small business was using two different apps to
                            keep track of its clients. One was simple but lacked
                            features; the other had everything but was hard to
                            use. I wanted to build something low tech, intuitive
                            and human. A simple point of touch with another
                            person. Most of us don&apos;t have thousands of
                            contacts. We have a handful of people who count on
                            us.
                        </p>
                        <p data-m='flow-lines' className={styles.flowLines}>
                            {FLOW.map(line => (
                                <span key={line} data-m='flow-line'>
                                    {line}{' '}
                                </span>
                            ))}
                        </p>
                    </div>
                </section>

                <Features features={FEATURES} imagePath={IMAGE_PATH} />

                <section
                    id='how-it-was-built'
                    data-m='how'
                    className={styles.built}
                    aria-labelledby='how-it-was-built-heading'
                >
                    <h2
                        id='how-it-was-built-heading'
                        className={styles.heading}
                    >
                        How it was built
                    </h2>
                    <p className={styles.lead}>
                        Built with AI-assisted workflows (Claude Code).
                        {GITHUB_URL && (
                            <>
                                {' '}
                                <a
                                    href={GITHUB_URL}
                                    className={styles.textLink}
                                >
                                    The code is on GitHub
                                </a>
                                .
                            </>
                        )}
                    </p>
                    <p className={styles.stack}>
                        Next.js 15, React 19, TypeScript, Tailwind 4, Supabase
                        (Postgres and Auth), Vercel, Resend
                    </p>
                    <ul className={styles.notes}>
                        {BUILD_NOTES.map(note => (
                            <li key={note}>{note}</li>
                        ))}
                    </ul>

                    <div className={styles.compare}>
                        <figure>
                            <img
                                src={`${IMAGE_PATH}/before-dashboard.png`}
                                alt='The earlier version, called Simple CRM: a welcome heading, three stat cards with colored numbers, and two link cards for managing clients and tasks.'
                                width={1265}
                                height={560}
                                loading='lazy'
                                decoding='async'
                            />
                            <figcaption>
                                Before: stat cards and links, and you work out
                                who needs you.
                            </figcaption>
                        </figure>
                        <figure>
                            <Shot
                                shot={DASHBOARD}
                                alt='The same account in Handful: Tom Okafor is the lead story, and the counts have moved to the bottom of the page.'
                                loading='lazy'
                            />
                            <figcaption>
                                After: the same data, and the page tells you.
                            </figcaption>
                        </figure>
                    </div>

                    <div className={styles.signOff}>
                        <ul className={styles.signOffLinks}>
                            <li>
                                <a href='/#work' className={styles.textLink}>
                                    See more of my work →
                                </a>
                            </li>
                            <li>
                                <a
                                    href={RESUME_URL}
                                    className={styles.textLink}
                                >
                                    Résumé →
                                </a>
                            </li>
                            <li>
                                <a href='/#contact' className={styles.textLink}>
                                    Get in touch →
                                </a>
                            </li>
                        </ul>
                    </div>
                </section>

                <section
                    data-m='close'
                    className={styles.close}
                    aria-label='Try Handful'
                >
                    {/* The wordmark with the demo badge stamped on its corner, like the dashboard at the top. */}
                    <div data-m='wordmark' className={styles.closeMark}>
                        <div className={styles.wordmark} aria-hidden='true'>
                            <span className={styles.wordmarkHand}>Hand</span>
                            <span className={styles.wordmarkFul}>ful</span>
                        </div>
                        <div data-m='close-spin' className={styles.closeSeal}>
                            <form
                                action={DEMO_ACTION}
                                method='post'
                                className={styles.demoForm}
                            >
                                <button type='submit' className={styles.seal}>
                                    <img
                                        src={`${IMAGE_PATH}/badge.webp`}
                                        width={900}
                                        height={900}
                                        alt='Try the demo'
                                        loading='lazy'
                                    />
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </HandfulMotion>
            {/* The site's own footer, so the page ends the way the home page does. */}
            <Footer siteConfig={siteConfig} />
        </>
    );
}
