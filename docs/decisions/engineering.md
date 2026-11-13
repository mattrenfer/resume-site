# Engineering decisions

Implementation-level choices: how the code is organized, built, checked and shipped.

## Static export on Lightsail
- **What:** Next.js 14 App Router with `output: 'export'`. GitHub Actions builds on every push to `main` and ships the `out/` folder to Lightsail over SSH (tar), behind CloudFront.
- **Why:** The site has no server-side features, so static files are fast, cheap and simple to host.
- **Consequence:** Merging to `main` deploys to production. There is no staging step, so verification happens before merge.

## Styling: template CSS plus overrides
- **What:** The original Ceevee template CSS (`public/css/styles.css`) still loads first. `app/globals.scss` overrides it, and new components use CSS modules.
- **Why:** Replacing the template wholesale would be a large rewrite. Overrides let the site change section by section.
- **Cost:** The template styles every button, link, heading and image, so new components must reset those (for example, the feature heading buttons on the Handful page). Specificity surprises happen; the Handful card's hover "jump" came from a `:hover` rule that also set `display`.
- **Direction:** As sections are redone, move them to CSS modules and tokens, and shrink the template.

## Content in siteConfig
- **What:** `app/siteConfig.js` holds the portfolio, career, skills, Selected work and résumé file details.
- **Why:** Content changes without touching components. Selected work references portfolio ids, so a project is described once.
- **Exception:** About Me lives in `about.js` because it contains a link.

## Images
- **What:** WebP for screenshots, JPG plus WebP for thumbnails (1205×903 for new ones), and explicit `width`/`height` on every image.
- **Why:** Small files, and explicit dimensions prevent layout shift as images load.
- **Rule:** Never commit raw screenshots into `public/`. Everything there deploys.

## Fonts
- **What:** `next/font/google` (Inter, IBM Plex Serif, Lora, Young Serif, Newsreader).
- **Why:** Self-hosted at build time, with no render-blocking request to Google.
- **Known issue:** The build downloads the fonts from Google, and that failed twice on 2026-11-12 (`next/font` "Cannot read properties of null"). A re-run fixed it both times. Fix: bundle the font files with `next/font/local` so builds don't depend on Google.

## Accessibility baseline
- **What:** Text contrast measured to 4.5:1, focus-visible outlines, motion only without `prefers-reduced-motion`, screen-reader text for new-tab links, the email assembled client-side (spam), and pages that read fine without JavaScript.

## Verification
- **What:** Each change is built and checked with Playwright screenshots at desktop, tablet and phone sizes, plus console-error and contrast checks, before the PR is opened.
- **Why:** Screenshots caught real regressions: the hero rule deleted in PR #10, the More work overlay text, and the popup link hidden below the fold.

## Git and PRs
- **What:** One branch and PR per change, always based on `main`. Commit messages and PR descriptions say what and why.
- **Lesson:** PR #10 was stacked on #9's branch. GitHub doesn't retarget a stacked PR unless the base branch is deleted, so merging #10 landed in a branch that doesn't deploy, and PR #11 was needed. Rule: check every PR's base is `main` before calling it ready.
- **Suggestion:** Turn on "Automatically delete head branches" in the repo settings.
