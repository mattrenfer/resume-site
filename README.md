# matthewrenfer.com

Personal portfolio and writing platform for Matthew Renfer, Front-End Engineer.

**Live:** https://matthewrenfer.com

Built as a static site with Next.js and deployed continuously to AWS Lightsail
behind a CDN. Beyond the portfolio homepage, it includes a file-based writing
platform (`/writing`) where posts are authored in Markdown and published by
committing a file — no CMS, no database.

---

## Tech stack

- **Next.js 14** (App Router, static export) + **React 18**
- **SCSS / CSS Modules** for styling; CSS custom properties for theming
- **next/font** — self-hosted Inter, IBM Plex Serif, and Lora (no third-party font requests)
- **Framer Motion** — entrance and interaction animations
- **Markdown pipeline** — `gray-matter` + `remark` / `remark-html` for the writing platform
- **GitHub Actions → AWS Lightsail** (Bitnami nginx) behind an Amazon CloudFront distribution

---

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to ./out
```

Requires Node 20+ (CI builds on Node 24).

---

## Project structure

```
app/
├── layout.js            # Root layout; self-hosted fonts, global styles
├── page.js              # Homepage (composes the section components)
├── siteConfig.js        # Single source of truth for site content
├── globals.scss         # Override layer over the base template styles
├── components/          # Hero, About, Specialties, Portfolio, Resume, Footer
└── writing/             # Writing platform: hub + dispatches/ & poetry/ (index + [slug])
lib/
└── posts.js             # Markdown pipeline (gray-matter + remark)
posts/                   # Dispatches (Markdown)
poems/                   # Poetry (Markdown)
scripts/
└── optimize-images.mjs  # Generate WebP from source JPGs (dev-only)
public/                  # Static assets, plus the base Ceevee template CSS
.github/workflows/       # deploy.yml — CI/CD to Lightsail
```

---

## Writing platform

Posts live as Markdown files with frontmatter (`title`, `date`, `tags`). The
folder is the publish gate — dropping a `.md` file in `posts/` (dispatches) or
`poems/` (poetry) and committing it makes it live at `/writing/...`. Slugs come
from the filename; poems preserve line breaks (verse) via `remark-breaks`.

The Dispatches section is gated behind a `features.dispatches` flag in
`siteConfig.js`.

---

## Deployment

Push to `main` → GitHub Actions builds the static export and ships it over SSH to
the Lightsail origin; the CloudFront distribution serves it. Static assets
(`/_next/static`) are content-hashed and cached immutably; HTML is served fresh
so deploys appear immediately. Full runbook in [`DEPLOY.md`](./DEPLOY.md).

---

## Performance

Recent Lighthouse audit (mobile, Slow 4G throttling):

| Performance | Accessibility | Best Practices | SEO |
| :---------: | :-----------: | :------------: | :-: |
|     91      |      100      |      100       | 100 |

Optimizations shipped (Performance 67 → 91): self-hosted fonts to remove the
render-blocking font request, server-rendered hero text so the largest paint
doesn't wait on JS, WebP images (~70–80% smaller) via `<picture>`, immutable
cache headers, and reserved layout to cut layout shift. FCP 3.2s → 0.9s,
LCP 6.6s → 3.2s, CLS 0.12 → 0.03.

---

## Credits

Homepage styling started from the **Ceevee** template (v2.0.0) and was migrated
from Create React App to Next.js, then reskinned and extended. Icons: Font
Awesome. Fonts: Inter, IBM Plex Serif, Lora.
