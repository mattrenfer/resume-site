# Handful showcase decisions (/portfolio/handful/)

Recorded after the fact (November 2026). The first build (November 10) predates these PRs; its reasoning comes from working notes.

---

## Real screenshots only
- **Decided:** 2026-11-10
- **Why:** Canvas mock-ups and HTML recreations of the app were rejected because they misrepresent it. Screenshots are 2x captures of the live demo, and their alt text is checked against the actual images whenever they change.

## Header in the site's style, not Handful's
- **Decided:** 2026-11-10
- **Why:** A big two-tone Handful wordmark at the top read as a double masthead next to the app screenshot's own wordmark. The page header uses the site's type (italic "Handful", rose rule, tagline, summary), and the app's wordmark appears only in the app and in the closing section.

## Motion
- **Decided:** 2026-11-10
- **Choice:** Scroll motion in the style of tegra.nyc / score.vestris.ai, with GSAP ScrollTrigger.
- **Why:** Matthew rejected boxy, template-like layouts.
- **Implementation:** `HandfulMotion.js` runs only with JavaScript and without reduced motion; the page reads fine without it. Elements are found by `data-m="..."` so the CSS module's hashed class names stay out of the script. ScrollTrigger re-measures after fonts and late images load, because they change the page height. A "Scroll" cue was added after a visitor didn't know to scroll.

## "What it does" rotates instead of pinning
- **Decided:** 2026-11-10
- **Why:** A self-rotating feature list with clickable headings replaced a pinned scroll section. Clicking a heading stops the rotation; it also waits while focus is inside or the section is off screen. On phones and with reduced motion it's a plain list.
- **Implementation:** `Features.js`. On tall tablets the frame height is `min(76vh, 48vw)` (PR #8), because 76vh left most of an upright iPad frame empty. Below 861px each feature shows a phone-sized crop (max 40rem wide, 10:13), because full-width crops nearly filled a small tablet (PR #12).

## Authorship line
- **Decided:** 2026-11-10
- **Choice:** "Built with AI-assisted workflows (Claude Code)."
- **Why:** It must never imply Matthew built Handful alone. The line is honest and short; the bullets below it explain the system he can defend in an interview.

## Ending
- **Decided:** 2026-11-11, PR #5
- **Choice:** A smaller wordmark with the "Try the demo" badge as the call to action, the GitHub link moved into "How it was built", and the site footer at the bottom.
- **Why:** One clear action at the end (the badge), and the page ends the same way as the home page.

## Tagline
- **Decided:** 2026-11-11
- **Choice:** "for the handful of people who count on you" replaced "Just enough CRM", in Newsreader italic, rose, with a muted summary underneath.
- **Why:** It works the name in and drops the jargon. The first italic (Lora) leaned too little to read as italic, and the tagline and summary said the same thing, so the tagline got its own face and spacing.

## LinkedIn visitors
- **Decided:** 2026-11-11 to 11-12, PRs #7, #10
- **Context:** The page is shared on LinkedIn, so visitors land here first.
- **Choice:** Open Graph tags with a 1200×630 share image, a quiet "by Matthew Renfer" byline under the summary, and sign-off links ("See more of my work →", "Résumé →", "Get in touch →").
- **Options tried for the top:** a full site bar, the name alone at top left, the name centered above the title. All read as navigation and took attention from the showcase.
- **Why the byline:** It says whose work this is without competing with the opening. "Made by Matthew Renfer" was removed from the sign-off as obvious.

## Plain words instead of "CRM"
- **Decided:** 2026-11-12, PR #12
- **Why:** Not every visitor knows the term. The page uses one vocabulary: "a simple client tracker." The "before" screenshot's alt text keeps "Simple CRM" because that was the old app's real name.

## How it was built: the request lifecycle
- **Decided:** 2026-11-12, PR #10
- **Choice:** Four bullets: the request lifecycle (named, then explained as a round trip from form to database and back), the database having the final say (RLS and constraints, since Zod can be bypassed), versioned migrations with a two-user RLS test, and the deploy (Vercel, Resend, nightly demo reset).
- **Why:** It shows understanding of the whole system rather than a list of features. It matches Handful's own `docs/how-it-works.md`, and every claim was checked against the Handful codebase.
- **Gave up:** The urgency-sorting and design-token bullets.
