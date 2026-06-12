import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPublishedSlugs, getPostBySlug, formatDate } from '@/lib/posts';
import styles from '../dispatches.module.scss';

// Static export: enumerate every published slug at build time. Any path not
// listed here 404s (dynamicParams off) since there's no server to render them.
export function generateStaticParams() {
    return getPublishedSlugs().map(slug => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
    const post = await getPostBySlug(params.slug);
    if (!post) return {};
    return { title: `${post.title} — Matthew Renfer` };
}

export default async function PostPage({ params }) {
    const post = await getPostBySlug(params.slug);
    if (!post) notFound();

    return (
        <section className={styles.dispatches}>
            <article className={styles.article}>
                <p className={styles.backLink}>
                    <Link href='/dispatches'>← Dispatches</Link>
                </p>

                <header className={styles.articleHeader}>
                    <h1 className={styles.articleTitle}>{post.title}</h1>
                    {post.date && (
                        <time className={styles.articleDate}>
                            {formatDate(post.date)}
                        </time>
                    )}
                </header>

                <div
                    className={styles.prose}
                    dangerouslySetInnerHTML={{ __html: post.contentHtml }}
                />

                <p className={styles.backLink}>
                    <Link href='/dispatches'>← Back to Dispatches</Link>
                </p>
            </article>
        </section>
    );
}
