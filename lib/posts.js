import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

/**
 * Read every .md file in posts/, returning published posts as lightweight
 * metadata sorted newest-first. The slug is derived from the filename, never
 * the title. Drafts (status !== 'published') are excluded.
 */
export function getAllPosts() {
    if (!fs.existsSync(postsDirectory)) return [];

    return fs
        .readdirSync(postsDirectory)
        .filter(file => file.endsWith('.md'))
        .map(file => {
            const slug = file.replace(/\.md$/, '');
            const raw = fs.readFileSync(
                path.join(postsDirectory, file),
                'utf8',
            );
            const { data, content } = matter(raw);
            return {
                slug,
                title: data.title || slug,
                date: data.date ? String(data.date) : '',
                tags: data.tags || [],
                status: data.status || 'draft',
                excerpt: data.excerpt || excerptFromBody(content),
            };
        })
        .filter(post => post.status === 'published')
        .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Slugs of published posts — used by generateStaticParams for SSG. */
export function getPublishedSlugs() {
    return getAllPosts().map(post => post.slug);
}

/**
 * Full post by slug: frontmatter meta + rendered HTML. Returns null if the
 * file is missing or the post is not published (so the route can 404).
 */
export async function getPostBySlug(slug) {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) return null;

    const { data, content } = matter(fs.readFileSync(fullPath, 'utf8'));
    if ((data.status || 'draft') !== 'published') return null;

    const processed = await remark().use(html).process(content);

    return {
        slug,
        title: data.title || slug,
        date: data.date ? String(data.date) : '',
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
