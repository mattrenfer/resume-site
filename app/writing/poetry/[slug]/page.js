import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPublishedSlugs, getPostBySlug } from '@/lib/posts';
import styles from '../../writing.module.scss';

// Static export: enumerate every published poem slug at build time.
export function generateStaticParams() {
    return getPublishedSlugs('poems').map(slug => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
    const poem = await getPostBySlug(params.slug, 'poems');
    if (!poem) return {};
    return { title: `${poem.title} — Poetry — Matthew Renfer` };
}

export default async function PoemPage({ params }) {
    // preserveLineBreaks: verse needs single newlines kept as <br>
    const poem = await getPostBySlug(params.slug, 'poems', {
        preserveLineBreaks: true,
    });
    if (!poem) notFound();

    return (
        <section className={styles.page}>
            <article className={styles.article}>
                <p className={styles.backLink}>
                    <Link href='/writing/poetry'>← Poetry</Link>
                </p>

                <header className={styles.poemHeader}>
                    <h1 className={styles.poemHeadTitle}>{poem.title}</h1>
                </header>

                <div
                    className={styles.poemBody}
                    dangerouslySetInnerHTML={{ __html: poem.contentHtml }}
                />

                <p className={styles.backLink}>
                    <Link styles='mt-5' href='/writing/poetry'>
                        ← Back to Poetry
                    </Link>
                </p>
            </article>
        </section>
    );
}
