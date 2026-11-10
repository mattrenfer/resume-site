import Link from 'next/link';
import { Young_Serif, Newsreader } from 'next/font/google';
import Features from './Features';
import HandfulMotion from './HandfulMotion';
import styles from './handful.module.scss';

export const metadata = {
    title: 'Handful — Matthew Renfer',
    description:
        'Handful is a simple CRM that opens on a front page telling you who needs you today. What it does and how it was built.',
};

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

// Both "Try the demo" buttons post here, the same way the badge on Handful's own
// sign-in page does. Handful signs the visitor in as the demo account on its
// server and opens the dashboard, so one click lands them in the app.
// If Handful ever limits /api/demo to requests from its own pages, these buttons
// will stop working; point them at https://handful.matthewrenfer.com/login instead.
const DEMO_ACTION = 'https://handful.matthewrenfer.com/api/demo';

// Set this to the repo URL once it's public. The link appears on its own.
const GITHUB_URL = null;

const IMAGE_PATH = '/images/portfolio/handful';

// Desktop screenshots are 2560 wide (1280 at 2x); phone screenshots are 1179 wide (393 at 3x).
const DASHBOARD = { src: 'dashboard.webp', width: 2560, height: 2116 };

const HERO_ALT =
    "Handful's dashboard, laid out like a newspaper front page. The lead story is Tom Okafor, marked Still on your list, with the task Check in about the spring planting plan. A column headed Also next lists Dana Whitfield, Marcus Bell and Priya Nair. Counts of clients and tasks sit at the bottom.";

// The sentence that lights up word by word. The last part is the highlight.
const IDEA = [
    {
        text: 'Most CRMs are a database you have to read. In Handful, the most urgent task becomes the lead story, and the',
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
            height: 4194,
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
        text: "Open tasks, most urgent first. Dates read as words, like Today, Tuesday or Still on your list.",
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
            height: 4194,
            alt: "Handful's dashboard on a phone in dark mode, with cream type on near-black.",
        },
        phone: {
            src: 'phone-dark.webp',
            width: 1179,
            height: 4194,
            alt: "Handful's dashboard on a phone in dark mode, with cream type on near-black.",
        },
    },
];

const FLOW = ['Add a client.', 'Add a task.', 'Write a note.'];

const BUILD_NOTES = [
    "Row Level Security keeps each person's data private in the database itself, so a bug in the interface can't expose it.",
    'Urgency is a few small functions: sort by due date, break ties by priority, turn dates into words.',
    'Colors live in one set of tokens with light and dark values, so the theme changes in one place.',
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
                <p className={styles.tagline}>Just enough CRM.</p>
                <p className={styles.summary}>
                    A simple client tracker that opens on a front page telling
                    you who needs you today.
                </p>
                <p className={styles.side}>
                    <a href='#how-it-was-built' className={styles.textLink}>
                        How it was built
                    </a>
                    <br />
                    Early release. The demo account is filled with sample
                    clients.
                </p>
            </header>

            <section
                data-m='shot-section'
                className={styles.shotSection}
                aria-label='The Handful dashboard'
            >
                <div data-m='shot' className={styles.shot}>
                    <Shot shot={DASHBOARD} alt={HERO_ALT} fetchPriority='high' />
                    <div data-m='spin' className={styles.spin}>
                        <form action={DEMO_ACTION} method='post' className={styles.demoForm}>
                            <button type='submit' className={styles.seal}>
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
            </section>

            <section
                data-m='idea'
                className={`${styles.idea} ${styles.paper}`}
                aria-labelledby='origin-story'
            >
                <h2 id='origin-story' className={`${styles.kicker} ${styles.kickerOnPaper}`}>
                    Origin story
                </h2>
                <Words />
                <div className={styles.story}>
                    <p data-m='story' className={styles.storyText}>
                        A small business was using two CRMs to manage its
                        clients. One was simple but lacked features. The other
                        had everything but was hard to use. I wanted something
                        between them: low tech, intuitive and human. A point of
                        touch with another person, not a stale tracker.
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
                <h2 id='how-it-was-built-heading' className={styles.heading}>
                    How it was built
                </h2>
                <p className={styles.lead}>
                    Built with AI-assisted workflows (Claude Code).
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
                            Before: stat cards and links, and you work out who
                            needs you.
                        </figcaption>
                    </figure>
                    <figure>
                        <Shot
                            shot={DASHBOARD}
                            alt="The same account in Handful: Tom Okafor is the lead story, and the counts have moved to the bottom of the page."
                            loading='lazy'
                        />
                        <figcaption>
                            After: the same data, and the page tells you.
                        </figcaption>
                    </figure>
                </div>

                {GITHUB_URL && (
                    <p className={styles.next}>
                        <a href={GITHUB_URL} className={styles.textLink}>
                            Read the code on GitHub
                        </a>
                    </p>
                )}
                <p className={styles.back}>
                    <Link href='/#portfolio' className={styles.textLink}>
                        ← Back to portfolio
                    </Link>
                </p>
            </section>

            <section data-m='close' className={styles.close} aria-label='Try Handful'>
                <form action={DEMO_ACTION} method='post' className={styles.closeRow}>
                    <button type='submit' className={styles.cta}>
                        Try the demo
                    </button>
                </form>
                <div data-m='wordmark' className={styles.wordmark} aria-hidden='true'>
                    <span className={styles.wordmarkHand}>Hand</span>
                    <span className={styles.wordmarkFul}>ful</span>
                </div>
            </section>
        </HandfulMotion>
    );
}
