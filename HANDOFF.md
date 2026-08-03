# Project Handoff — matthewrenfer.com

Working notes for picking this up on another machine. Last updated after the
"retire particles + trim Ceevee CSS" cleanup.

## What this is

Personal site + writing platform, migrated from Create React App to **Next.js 14
(App Router, static export)**. Work happens on the **`dev`** branch; `main` is the
old CRA site, kept intact until the new version is ready to ship.

## Quick start on a new machine

```bash
git clone <repo> resume-site
cd resume-site
git checkout dev
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to ./out
```

Node 20+ recommended. If something seems cached/stale, stop the dev server,
delete `.next/`, and restart.

## Where things live

| Path | What |
|------|------|
| `app/page.js` | Homepage — composes the section components |
| `app/components/*` | Hero, About, Specialties, Portfolio, Resume, Footer (+ unused Header, Testimonials) |
| `app/layout.js` | Root layout; imports `globals.scss`, loads FontAwesome |
| `app/globals.scss` | **Your override layer** + imports the Ceevee `styles.css`/`vendor.css` |
| `public/css/styles.css` | Ceevee template (trimmed; being phased out in the redesign) |
| `app/siteConfig.js` | Site content + config |
| `app/writing/` | The writing platform: hub + `dispatches/` & `poetry/` (each with index + `[slug]`), `writing.module.scss` |
| `lib/posts.js` | Markdown pipeline (gray-matter + remark-html) |
| `posts/*.md` | Blog posts — currently sample/placeholder content to replace |
| `DEPLOY.md` | Deployment (Lightsail / Bitnami nginx via GitHub Actions) |

## Critical gotchas (learned the hard way — read before touching CSS)

- **Edit colors ONLY in `app/globals.scss`** (`--color-1` / `--color-2`, ~lines 17–18).
  `styles.css`'s `:root` is the template default and is **always overridden** by
  `globals.scss` (which imports it at the top so the override layer wins).
- **Always use `var(--name)` in values.** A bare `--color-2` is invalid CSS and is
  silently ignored — this caused hours of "why won't the color change."
- The light/dark **variants** (`--color-1-light`, etc.) auto-derive from the base
  via `color-mix` — you don't set them by hand.
- **CSS is now the single source of truth for color.** Particles are gone, so
  nothing reads colors from JS anymore.
- **`output: 'export'` is gated to production** in `next.config.js` — leaving it on
  in dev makes `/writing/dispatches/[slug]` 500 with a bogus "missing generateStaticParams".
- If a CSS edit does nothing: confirm you're editing `globals.scss` (not a stray
  `globals.css`), that the dev server is running, and hard-refresh (`Ctrl+Shift+R`).

## What's next — the redesign

Target aesthetic: **rugged leather journal / refined outdoorsy professional writer**
— deliberately the opposite of the current techy/minimalist Ceevee look.

Planned sequence:
1. ✅ **Done:** retire particles + trim dead Ceevee CSS (preloader, header/nav,
   testimonials, CTA, contact, forms, etc. — ~1,400 lines).
2. **Establish the journal aesthetic on `/writing` first** — it's self-contained in
   `writing.module.scss`, low-risk, and becomes the design north star.
3. **Reskin the homepage** to match, replacing the remaining Ceevee section styles
   with owned SCSS as you go (this is where the rest of `styles.css` retires).

## Open loose ends

- [ ] **Deploy:** add GitHub repo secrets `LIGHTSAIL_HOST`, `LIGHTSAIL_USER` (`bitnami`),
      `LIGHTSAIL_SSH_KEY`, `LIGHTSAIL_TARGET` (`/opt/bitnami/nginx/html`) — see `DEPLOY.md`
      — then merging `dev` → `main` triggers the first real deploy.
- [ ] Replace the sample posts in `posts/` with real writing.
- [x] Rename `/thoughts` → `/writing` (now `app/writing/` with `dispatches/` + `poetry/`).
- [ ] Dispatches is gated off via `features.dispatches` in `siteConfig.js` — flip to `true` to publish it.
- [ ] Delete the now-dead component files `app/components/header/` and
      `app/components/testimonials/` (not rendered; their CSS is already gone).
- [ ] `theme.colors` in `siteConfig.js` is now unused (vestigial) — remove or keep as reference.

## Git state

- Branch: **`dev`**. `main` = old CRA site (don't merge until ready).
- Recent commits: CRA→Next migration → theming/SCSS centralization → particle + Ceevee CSS cleanup.
