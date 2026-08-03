import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import styles from '../writing.module.scss';

export const metadata = {
    title: 'Poetry — Matthew Renfer',
    description: 'Poems by Matthew Renfer.',
};

export default function PoetryIndex() {
    const poems = getAllPosts('poems'); // newest-first

    return (
        <section className={styles.page}>
            <div className={styles.inner}>
                <header className={styles.masthead}>
                    <h1 className={styles.kicker}>Poetry</h1>
                </header>

                {poems.length === 0 ? (
                    <p className={styles.empty}>No poems yet.</p>
                ) : (
                    <ul className={styles.postList}>
                        {poems.map(poem => (
                            <li key={poem.slug} className={styles.postItem}>
                                <Link
                                    href={`/writing/poetry/${poem.slug}`}
                                    className={styles.postLink}
                                >
                                    <h2 className={styles.poemTitle}>
                                        {poem.title}
                                    </h2>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}

                <p className={styles.backHome}>
                    <Link href='/writing'>← Writing</Link>
                </p>
            </div>
        </section>
    );
}
