import Link from 'next/link';
import { getAllPosts, formatDate } from '@/lib/posts';
import styles from './thoughts.module.css';

export const metadata = {
    title: 'Thoughts — Matthew Renfer',
    description:
        'Essays, observations, and long-form writing by Matthew Renfer.',
};

export default function ThoughtsIndex() {
    const posts = getAllPosts();

    return (
        <section className={styles.thoughts}>
            <div className={styles.inner}>
                <header className={styles.masthead}>
                    <p className={styles.kicker}>Thoughts</p>
                    <h1 className={styles.tagline}>Yeah, I&apos;ve got some...</h1>
                </header>

                {posts.length === 0 ? (
                    <p className={styles.empty}>Nothing published yet.</p>
                ) : (
                    <ul className={styles.postList}>
                        {posts.map(post => (
                            <li key={post.slug} className={styles.postItem}>
                                <Link
                                    href={`/thoughts/${post.slug}`}
                                    className={styles.postLink}
                                >
                                    <h2 className={styles.postTitle}>
                                        {post.title}
                                    </h2>
                                    {post.date && (
                                        <time className={styles.postDate}>
                                            {formatDate(post.date)}
                                        </time>
                                    )}
                                    <p className={styles.postExcerpt}>
                                        {post.excerpt}
                                    </p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}

                <p className={styles.backHome}>
                    <Link href='/'>← Back home</Link>
                </p>
            </div>
        </section>
    );
}
