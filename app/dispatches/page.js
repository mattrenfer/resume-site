import Link from 'next/link';
import { getAllPosts, formatDate } from '@/lib/posts';
import styles from './dispatches.module.scss';

export const metadata = {
    title: 'Dispatches — Matthew Renfer',
    description: 'Field notes and long-form writing by Matthew Renfer.',
};

export default function DispatchesIndex() {
    const posts = getAllPosts(); // newest-first
    const total = posts.length;

    return (
        <section className={styles.dispatches}>
            <div className={styles.inner}>
                <header className={styles.masthead}>
                    <h1 className={styles.kicker}>Dispatches</h1>
                    <br />
                    <p className={styles.tagline}>Life's field notes</p>
                </header>

                {total === 0 ? (
                    <p className={styles.empty}>No dispatches filed yet.</p>
                ) : (
                    <ul className={styles.postList}>
                        {posts.map((post, i) => {
                            // chronological numbering: oldest = No. 1
                            const number = total - i;
                            return (
                                <li key={post.slug} className={styles.postItem}>
                                    <Link
                                        href={`/dispatches/${post.slug}`}
                                        className={styles.postLink}
                                    >
                                        <p className={styles.dispatchMeta}>
                                            <span className={styles.dispatchNo}>
                                                Dispatch No. {number}
                                            </span>
                                            <span className={styles.sep}>
                                                {' '}
                                                —{' '}
                                            </span>
                                            <span className={styles.filed}>
                                                Filed: {formatDate(post.date)}
                                            </span>
                                        </p>
                                        <h2 className={styles.postTitle}>
                                            {post.title}
                                        </h2>
                                        <p className={styles.postExcerpt}>
                                            {post.excerpt}
                                        </p>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                )}

                <p className={styles.backHome}>
                    <Link href='/'>← Back home</Link>
                </p>
            </div>
        </section>
    );
}
