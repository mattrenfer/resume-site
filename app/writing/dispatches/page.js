import Link from 'next/link';
import { getAllPosts, formatDate } from '@/lib/posts';
import styles from '../writing.module.scss';

export const metadata = {
    title: 'Dispatches — Matthew Renfer',
    description: 'Field notes and long-form writing by Matthew Renfer.',
};

export default function DispatchesIndex() {
    const posts = getAllPosts('posts'); // newest-first
    const total = posts.length;

    return (
        <section className={styles.page}>
            <div className={styles.inner}>
                <header className={styles.masthead}>
                    <h1 className={styles.kicker}>Dispatches</h1>
                    <br />
                    <p className={styles.tagline}>Life&apos;s field notes</p>
                </header>

                {total === 0 ? (
                    <p className={styles.empty}>No dispatches filed yet.</p>
                ) : (
                    <ul className={styles.postList}>
                        {posts.map((post, i) => {
                            // chronological numbering: oldest = No. 1
                            const number = total - i;
                            return (
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
                                                Dispatch No. {number}
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
                    <Link href='/writing'>← Writing</Link>
                </p>
            </div>
        </section>
    );
}
