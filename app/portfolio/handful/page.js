import Link from 'next/link';
import writing from '../../writing/writing.module.scss';
import styles from './handful.module.scss';

export const metadata = {
    title: 'Handful — Matthew Renfer',
    description:
        'Handful is a simple CRM that opens on a front page telling you who needs you today. What it does and how it was built.',
};

// Both "Try the demo" buttons post here, the same way the badge on Handful's own
// sign-in page does. Handful signs the visitor in as the demo account on its
// server and opens the dashboard, so one click lands them in the app.
// If Handful ever limits /api/demo to requests from its own pages, these buttons
// will stop working; point them at https://handful.matthewrenfer.com/login instead.
const DEMO_ACTION = 'https://handful.matthewrenfer.com/api/demo';

// Set this to the repo URL once it's public. The link appears on its own.
const GITHUB_URL = null;

const IMAGE_PATH = '/images/portfolio/handful';

const HERO_ALT =
    "Handful's dashboard, laid out like a newspaper front page. The lead story is Tom Okafor, marked Still on your list, with the task Check in about the spring planting plan. A column headed Also next lists Dana Whitfield, Marcus Bell and Priya Nair. Counts of clients and tasks sit at the bottom.";

const FEATURES = [
    {
        title: 'Your people',
        text: 'Every client gets their name in headline type, with their details below it and the next thing you owe them beside it.',
        image: 'after-clients.png',
        width: 1265,
        height: 830,
        alt: "Handful's Your people page. Each client's name is a headline with company and contact details below it. The next task sits beside each name, such as Dana Whitfield, Send the proposal, Today.",
    },
    {
        title: "What's next",
        text: "Open tasks, most urgent first. Dates read as words, like Today, Tuesday or Still on your list.",
        image: 'after-tasks.png',
        width: 1265,
        height: 960,
        alt: "Handful's What's next page, listing tasks most urgent first. Check in about the spring planting plan is marked Still on your list, Send the proposal is marked Today, and later tasks show a weekday.",
    },
    {
        title: 'One page per person',
        text: 'Your notes and what comes next for that person, side by side.',
        image: 'after-client-page.png',
        width: 1265,
        height: 720,
        alt: "Handful's page for a client named Priya Nair, with the name as a large headline, a dated note on the left, and the next task with its status on the right.",
    },
    {
        title: 'On your phone, day or night',
        text: "It works on a phone and follows your device's light or dark setting.",
        image: 'after-phone-dark.png',
        width: 640,
        height: 2093,
        alt: "Handful's dashboard on a phone in dark mode, with cream type on near-black. Tom Okafor is the lead story, under a teal label reading Still on your list.",
        narrow: true,
    },
];

const BUILD_NOTES = [
    "Row Level Security keeps each person's data private in the database itself, so a bug in the interface can't expose it.",
    'Urgency is a few small functions: sort by due date, break ties by priority, turn dates into words.',
    'Colors live in one set of tokens with light and dark values, so the theme changes in one place.',
];

export default function HandfulPage() {
    return (
        <main className={writing.page}>
            <div className={styles.inner}>
                <header className={styles.hero}>
                    <h1 className={styles.title}>Handful</h1>
                    <p className={styles.tagline}>Just enough CRM.</p>
                    <p className={styles.summary}>
                        A simple client tracker that opens on a front page
                        telling you who needs you today.
                    </p>
                    <div className={styles.actions}>
                        <form action={DEMO_ACTION} method='post' className={styles.demoForm}>
                            <button type='submit' className={styles.cta}>
                                Try the demo
                            </button>
                        </form>
                        <a href='#how-it-was-built' className={styles.textLink}>
                            How it was built
                        </a>
                    </div>
                </header>

                <figure className={styles.heroImage}>
                    <img
                        src={`${IMAGE_PATH}/after-dashboard.png`}
                        alt={HERO_ALT}
                        width={1265}
                        height={977}
                    />
                    {/* The same badge as on Handful's sign-in page, on the screenshot's corner */}
                    <form action={DEMO_ACTION} method='post' className={styles.badge}>
                        <button type='submit' className={styles.seal}>
                            <img
                                src={`${IMAGE_PATH}/badge.webp`}
                                width={900}
                                height={900}
                                alt='Try the demo'
                            />
                        </button>
                    </form>
                </figure>

                <section
                    className={styles.section}
                    aria-labelledby='origin-story'
                >
                    <h2 id='origin-story' className={styles.heading}>
                        Origin story
                    </h2>
                    <p className={styles.lead}>
                        Most CRMs are a database you have to read. In Handful,
                        the most urgent task becomes the lead story, and the
                        person is the headline.
                    </p>
                    <p className={styles.body}>
                        A small business was using two CRMs to manage its
                        clients. One was simple but lacked features. The other
                        had everything but was hard to use. I wanted something
                        between them: low tech, intuitive and human. A point of
                        touch with another person, not a stale tracker.
                    </p>
                </section>

                <section
                    className={styles.section}
                    aria-labelledby='what-it-does'
                >
                    <h2 id='what-it-does' className={styles.heading}>
                        What it does
                    </h2>
                    {FEATURES.map(feature => (
                        <article
                            key={feature.title}
                            className={
                                feature.narrow
                                    ? `${styles.feature} ${styles.featureNarrow}`
                                    : styles.feature
                            }
                        >
                            <div>
                                <h3 className={styles.featureTitle}>
                                    {feature.title}
                                </h3>
                                <p className={styles.body}>{feature.text}</p>
                            </div>
                            <img
                                className={styles.shot}
                                src={`${IMAGE_PATH}/${feature.image}`}
                                alt={feature.alt}
                                width={feature.width}
                                height={feature.height}
                                loading='lazy'
                                decoding='async'
                            />
                        </article>
                    ))}
                </section>

                <section
                    id='how-it-was-built'
                    className={styles.section}
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
                                className={styles.shot}
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
                            <img
                                className={styles.shot}
                                src={`${IMAGE_PATH}/after-dashboard.png`}
                                alt='The same account in Handful: Tom Okafor is the lead story, and the counts have moved to the bottom of the page.'
                                width={1265}
                                height={977}
                                loading='lazy'
                                decoding='async'
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
                </section>

                <p className={writing.backHome}>
                    <Link href='/#portfolio'>← Back to portfolio</Link>
                </p>
            </div>
        </main>
    );
}
