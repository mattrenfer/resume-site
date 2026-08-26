import { remark } from 'remark';
import html from 'remark-html';
import remarkBreaks from 'remark-breaks';

const SPACE = process.env.CONTENTFUL_SPACE_ID;
const ENV = process.env.CONTENTFUL_ENVIRONMENT;
const TOKEN = process.env.CONTENTFUL_DELIVERY_TOKEN;

export const fetchGraphQL = async query => {
    try {
        const res = await fetch(
            `https://graphql.contentful.com/content/v1/spaces/${SPACE}/environments/${ENV}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${TOKEN}`,
                },
                body: JSON.stringify({ query }),
            },
        );
        const json = await res.json();
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        if (json.errors) {
            console.error(json.errors);
            throw new Error('GraphQL errors');
        }
        return json.data;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch data from Contentful');
    }
};

export const getAllPoems = async () => {
    const query = `{ 
    poemCollection(order: publishedDate_DESC) { 
        items { 
            slug 
            title 
            publishedDate 
            tags 
            } 
        }  
    }`;

    const data = await fetchGraphQL(query);
    return (data?.poemCollection?.items || []).map(item => ({
        slug: item.slug,
        title: item.title,
        date: item.publishedDate.slice(0, 10),
        tags: item.tags,
    }));
};

export const getPoemSlugs = async () => {
    const query = `{ poemCollection { items { slug } } }`;
    const data = await fetchGraphQL(query);
    return data?.poemCollection?.items?.map(item => item.slug) || [];
};

export const getPoemBySlug = async slug => {
    const query = `{ poemCollection(limit: 1, where: { slug: "${slug}" }) { items { slug title publishedDate tags body} } }`;
    const data = await fetchGraphQL(query);

    const item = data?.poemCollection?.items?.[0];
    if (!item) return null;

    const processed = await remark()
        .use(remarkBreaks)
        .use(html, { sanitize: false })
        .process(item.body);

    return {
        slug: item.slug,
        title: item.title,
        date: item.publishedDate.slice(0, 10),
        tags: item.tags,
        contentHtml: processed.toString(),
    };
};
