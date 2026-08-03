import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkBreaks from 'remark-breaks';

// Content collections live in top-level folders of markdown files.
// `posts` = dispatches (shared with the legacy /thoughts page); `poems` = poetry.
function collectionDir(collection) {
    return path.join(process.cwd(), collection);
}

/**
 * Normalize a frontmatter date to a 'YYYY-MM-DD' string.
 * YAML auto-parses an unquoted `2026-05-28` into a JS Date at UTC midnight;
 * naively String()-ing that yields a local-timezone mess ("Wed May 27 ...").
 * Reading it back in UTC recovers exactly the date that was written.
 */
function toISODate(value) {
    if (!value) return '';
    if (value instanceof Date) return value.toISOString().slice(0, 10);
    return String(value);
}

/**
 * Read every .md file in a collection, returning items as lightweight metadata
 * sorted newest-first. The slug is derived from the filename, never the title.
 * The folder is the publish gate: any .md file present is live (keep drafts out
 * of the folder). Defaults to `posts` (dispatches) so existing callers work.
 */
export function getAllPosts(collection = 'posts') {
    const dir = collectionDir(collection);
    if (!fs.existsSync(dir)) return [];

    return fs
        .readdirSync(dir)
        .filter(file => file.endsWith('.md'))
        .map(file => {
            const slug = file.replace(/\.md$/, '');
            const raw = fs.readFileSync(path.join(dir, file), 'utf8');
            const { data, content } = matter(raw);
            return {
                slug,
                title: data.title || slug,
                date: toISODate(data.date),
                tags: data.tags || [],
                excerpt: data.excerpt || excerptFromBody(content),
            };
        })
        .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Slugs of published items in a collection — used by generateStaticParams. */
export function getPublishedSlugs(collection = 'posts') {
    return getAllPosts(collection).map(post => post.slug);
}

/**
 * Full item by slug: frontmatter meta + rendered HTML. Returns null only if the
 * file is missing (so the route can 404).
 *
 * `preserveLineBreaks` turns single newlines into <br> (remark-breaks) — poems
 * need this, since standard Markdown otherwise collapses verse into prose.
 */
export async function getPostBySlug(
    slug,
    collection = 'posts',
    { preserveLineBreaks = false } = {},
) {
    const fullPath = path.join(collectionDir(collection), `${slug}.md`);
    if (!fs.existsSync(fullPath)) return null;

    const { data, content } = matter(fs.readFileSync(fullPath, 'utf8'));

    const processor = preserveLineBreaks
        ? remark().use(remarkBreaks).use(html)
        : remark().use(html);
    const processed = await processor.process(content);

    return {
        slug,
        title: data.title || slug,
        date: toISODate(data.date),
        tags: data.tags || [],
        contentHtml: processed.toString(),
    };
}

/** Format a YYYY-MM-DD string as e.g. "May 20, 2026" (timezone-safe). */
export function formatDate(dateStr) {
    if (!dateStr) return '';
    const [y, m, d] = dateStr.split('-').map(Number);
    if (!y || !m || !d) return dateStr;
    const date = new Date(Date.UTC(y, m - 1, d));
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
    });
}

/** First ~150 chars of body text, with markdown noise lightly stripped. */
function excerptFromBody(body) {
    const text = body
        .replace(/^#.*$/gm, '') // headings
        .replace(/[#*_>`~\[\]()!-]/g, '') // common md punctuation
        .replace(/\s+/g, ' ')
        .trim();
    return text.length > 150 ? `${text.slice(0, 150).trim()}…` : text;
}
