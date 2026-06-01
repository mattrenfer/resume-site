/** @type {import('next').NextConfig} */
const nextConfig = {
    // Static HTML export — produces an `out/` directory of static files,
    // matching the current "build static assets, serve them" deployment model.
    //
    // Only enabled for production builds: `next dev` has a bug where
    // `output: 'export'` makes dynamic routes (/thoughts/[slug]) 500 with a
    // bogus "missing generateStaticParams()" error. Dev renders the route
    // on-demand instead; `npm run build` still produces the full static export.
    ...(process.env.NODE_ENV === 'production' ? { output: 'export' } : {}),

    // The static export has no Image Optimization server, so images must be
    // served as-is. Components use plain <img>, so this is just a safety net.
    images: {
        unoptimized: true,
    },

    // Emit `out/thoughts/index.html` style paths so nginx can serve them
    // without extra rewrite rules.
    trailingSlash: true,
};

module.exports = nextConfig;
