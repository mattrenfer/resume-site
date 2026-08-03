import Link from 'next/link';
import { getAllPosts, formatDate } from '@/lib/posts';
import styles from './writing.module.scss';

export const metadata = {
    title: 'Writing — Matthew Renfer',
    description: 'Dispatches and poetry by Matthew Renfer.',
};

const HUB_LIMIT = 4; // how many items to preview per section on the hub

export default function WritingHub() {
    const dispatches = getAllPosts('posts'); // newest-first
    const poems = getAllPosts('poems');
    const totalDispatches = dispatches.length;

    return (
        <section className={styles.page}>
            <div className={styles.inner}>
                <header className={styles.masthead}>
                    <h1 className={styles.kicker}>Writing</h1>
                </header>

                {/* ---- Dispatches ---- */}
                <section className={styles.hubSection}>
                    <h2 className={styles.sectionHeading}>Dispatches</h2>

                    {totalDispatches === 0 ? (
                        <p className={styles.empty}>No dispatches filed yet.</p>
                    ) : (
                        <ul className={styles.postList}>
                            {dispatches.slice(0, HUB_LIMIT).map((post, i) => (
                                <li
                                    key={post.slug}
                                    className={styles.postItem}
                                >
                                    <Link
                                        href={`/writing/dispatches/${post.slug}`}
                                        className={styles.postLink}
                                    >
                                        <p className={styles.dispatchMeta}>
                                            <span className={styles.dispatchNo}>
                                                Dispatch No.{' '}
                                                {totalDispatches - i}
                                            </span>
                                            <span className={styles.filed}>
                                                Filed: {formatDate(post.date)}
                                            </span>
                                        </p>
                                        <h3 className={styles.postTitle}>
                                            {post.title}
                                        </h3>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}

                    <p className={styles.viewAll}>
                        <Link href='/writing/dispatches'>
                            View all dispatches →
                        </Link>
                    </p>
                </section>

                {/* ---- Poetry ---- */}
                <section className={styles.hubSection}>
                    <h2 className={styles.sectionHeading}>Poetry</h2>

                    {poems.length === 0 ? (
                        <p className={styles.empty}>No poems yet.</p>
                    ) : (
                        <ul className={styles.postList}>
                            {poems.slice(0, HUB_LIMIT).map(poem => (
                                <li
                                    key={poem.slug}
                                    className={styles.postItem}
                                >
                                    <Link
                                        href={`/writing/poetry/${poem.slug}`}
                                        className={styles.postLink}
                                    >
                                        <h3 className={styles.poemTitle}>
                                            {poem.title}
                                        </h3>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}

                    <p className={styles.viewAll}>
                        <Link href='/writing/poetry'>View all poetry →</Link>
                    </p>
                </section>

                <p className={styles.backHome}>
                    <Link href='/'>← Back home</Link>
                </p>
            </div>
        </section>
    );
}
