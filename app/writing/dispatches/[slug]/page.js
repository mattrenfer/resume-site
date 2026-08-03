import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
    getAllPosts,
    getPublishedSlugs,
    getPostBySlug,
    formatDate,
} from '@/lib/posts';
import siteConfig from '@/app/siteConfig';
import styles from '../../writing.module.scss';

// Static export: enumerate every published slug at build time. Any path not
// listed here 404s (dynamicParams off) since there's no server to render them.
// (An empty array is illegal for a dynamic route under `output: export`, so we
// always enumerate; the feature flag is enforced in the component below.)
export function generateStaticParams() {
    return getPublishedSlugs('posts').map(slug => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
    if (!siteConfig.features.dispatches) return {};
    const post = await getPostBySlug(params.slug, 'posts');
    if (!post) return {};
    return { title: `${post.title} — Dispatches — Matthew Renfer` };
}

// Chronological dispatch number for a slug: oldest published = No. 1.
function dispatchNumber(slug) {
    const posts = getAllPosts('posts'); // newest-first
    const idx = posts.findIndex(p => p.slug === slug);
    return idx === -1 ? null : posts.length - idx;
}

export default async function DispatchPage({ params }) {
    // Feature gate: when Dispatches is off, these routes render as 404s.
    if (!siteConfig.features.dispatches) notFound();

    const post = await getPostBySlug(params.slug, 'posts');
    if (!post) notFound();

    const number = dispatchNumber(params.slug);

    return (
        <section className={styles.page}>
            <article className={styles.article}>
                <p className={styles.backLink}>
                    <Link href='/writing/dispatches'>← Dispatches</Link>
                </p>

                <header className={styles.articleHeader}>
                    <p className={styles.dispatchMeta}>
                        {number != null && (
                            <span className={styles.dispatchNo}>
                                Dispatch No. {number}
                            </span>
                        )}
                        {post.date && (
                            <span className={styles.filed}>
                                Filed: {formatDate(post.date)}
                            </span>
                        )}
                    </p>
                    <h1 className={styles.articleTitle}>{post.title}</h1>
                </header>

                <div
                    className={styles.prose}
                    dangerouslySetInnerHTML={{ __html: post.contentHtml }}
                />

                <p className={styles.backLink}>
                    <Link href='/writing/dispatches'>
                        ← Back to Dispatches
                    </Link>
                </p>
            </article>
        </section>
    );
}
