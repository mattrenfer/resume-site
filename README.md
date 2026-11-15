# matthewrenfer.com

Personal portfolio and writing platform for Matthew Renfer, Senior Front-End Engineer.

**Live:** https://matthewrenfer.com

Built as a static site with Next.js and deployed continuously to AWS Lightsail
behind a CDN. Beyond the portfolio homepage, it includes a file-based writing
platform (`/writing`) where posts are authored in Markdown and published by
committing a file — no CMS, no database.

---

## Tech stack

- **Next.js 14** (App Router, static export) + **React 18**
- **SCSS / CSS Modules** for styling; CSS custom properties for theming
- **next/font/local** — Lora and Source Sans 3, bundled in `app/fonts` (no font requests at build or run time)
- **Framer Motion** — the scroll progress bar
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
├── layout.js            # Root layout; fonts, global styles
├── page.js              # Homepage (composes the section components)
├── siteConfig.js        # Single source of truth for site content
├── globals.scss         # Site-wide styles (tokens, base, links)
├── styles/              # _tokens (design tokens), _base, _section (shared mixins)
├── fonts/               # Bundled woff2 files + fonts.js
├── components/          # Hero, Selected work, More work, About, Résumé, Contact, Footer (each with a CSS module)
└── writing/             # Writing platform: hub + dispatches/ & poetry/ (index + [slug])
lib/
└── posts.js             # Markdown pipeline (gray-matter + remark)
posts/                   # Dispatches (Markdown)
poems/                   # Poetry (Markdown)
scripts/
└── optimize-images.mjs  # Generate WebP from source JPGs (dev-only)
public/                  # Static assets
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

## Design principles

The site's style is **"PNW Professional"**: muted, earthy and put together.
Functional minimalism with personality. Every element earns its place.

**Decision order:** structure and fit first, then color (on-palette only), then
construction and detail. If something doesn't earn its place, cut it.

- **Tokens, not values.** Colors, type sizes, spacing, radii and motion live in
  `app/styles/_tokens.scss`. Components use the semantic tokens
  (`--color-surface`, `--color-text-muted`, `--color-accent`, `--space-6`, …),
  never raw hex values. A section sets `data-surface="light"` or `"dark"` and
  the tokens follow.
- **One accent.** Burgundy on light surfaces, dusty rose on dark. Everything
  else is warm neutrals (charcoal, stone, ink, cream). Forest and olive are in
  the palette for tags, used sparingly or not at all.
- **Texture over color.** Contrast comes from alternating dense and airy
  sections and a subtle paper grain, not from loud color, gradients or glow.
- **Borders over shadows.** Thin warm rules separate content. Corners are small
  and consistent (2–6px). No drop shadows, glassmorphism or gloss.
- **Type does the work.** Lora for reading and headings, Source Sans 3 for UI.
  Headings get their presence from weight and spacing, not size or color.
  Body text stays within a comfortable measure (about 65–75 characters).
- **Quiet interaction.** One solid button style plus an outlined companion.
  Text links underline in the accent and change color only on hover. Motion is
  ease-out and under 250ms, and switches off with `prefers-reduced-motion`.
- **One flourish per page, at most:** one animation, one interactive element,
  or one bold visual. Not all three.
- **Accessible by default.** Text contrast at least 4.5:1 (measured, not
  eyeballed), visible focus outlines, real buttons for actions, and pages
  that read fine without JavaScript.
- **Images:** natural light, slightly warm and desaturated, matte.

Checklist for any change: on-palette and on-token, contrast measured, checked at
desktop, tablet and phone, no console errors, and it still makes sense with
reduced motion.

---

## Credits

The homepage started from the **Ceevee** template (v2.0.0) and was migrated from
Create React App to Next.js. In November 2026 it was redesigned from the template
up (see Design principles); the template CSS is no longer used. Icons: Font
Awesome. Fonts: Lora, Source Sans 3 (SIL Open Font License).
