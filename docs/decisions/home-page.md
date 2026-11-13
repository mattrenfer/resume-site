# Home page decisions

Recorded after the fact (November 2026) from PRs #6 to #16. Each entry gives the design decision first, then how it was implemented.

---

## Positioning: "Senior Front-End Engineer," not full-stack
- **Decided:** 2026-11-11
- **Context:** Handful has a database and auth, which raised whether to call yourself full-stack.
- **Options:** Full-stack engineer; Senior Front-End Engineer; Design Engineer.
- **Choice:** Stay Senior Front-End Engineer, and use Handful to show the T-shape (deep front end, working range across the stack).
- **Why:** It matches 15+ years of evidence. Full-stack would invite back-end interview questions the résumé doesn't support. "Design Engineer" is a useful adjacent search term, not the title.
- **Gave up:** Some full-stack job searches.

## Lead with the work
- **Decided:** 2026-11-11, PR #9
- **Context:** The single biggest improvement to the home page. Visitors had to scroll past About and Specialties to find any work.
- **Options:** Rewrite About Me first; add hero buttons plus a "Selected work" section right after the hero.
- **Choice:** Hero buttons ("See my work", "Résumé") and a Selected work section with one large card and two smaller ones.
- **Why:** Hiring managers skim. The work is the evidence, so it goes first. Three cards reads as curated; four starts to feel like the full grid again.
- **Gave up:** About Me no longer gets the first scroll.
- **Implementation:** `app/components/selectedWork/`. Cards are listed in `siteConfig.selectedWork` by portfolio `id`, plus a summary and link text. Name, company, image, alt text and link come from the portfolio list, so a project is described in one place. External links open in a new tab and end in ↗; on-site links end in →.

## Which three projects
- **Decided:** 2026-11-11
- **Options:** Handful, Yamaha, GaSSO; or swap Yamaha for the SnapCare rebrand.
- **Choice:** Handful, Yamaha, GaSSO.
- **Why:** Each card shows something the others don't: Handful = depth (idea to shipped product), GaSSO = scale (five-month app plus migration), Yamaha = current, modern headless stack, and a name people recognize. SnapCare would repeat GaSSO's "big WordPress project" point.
- **Gave up:** SnapCare's larger scope in the top slot. It stays one click away in More work.

## Yamaha card as the role, not one feature
- **Decided:** 2026-11-12, PR #10
- **Why:** "A small feature" undersold the contract. Framing the card as "Web Developer (Contract)" with the installation instructions as the pictured example carries the whole role. The title matches the Career section.

## Page order and no repetition
- **Decided:** 2026-11-12, PRs #10/#11
- **Context:** Selected work, then the full grid repeated the same three projects; contact was buried inside About; Specialties sat apart from the résumé.
- **Choice:** Hero, Selected work, More work (the grid minus the three), About, Career, Specialties, Education, Get in touch, footer.
- **Why:** Who you are, best work, more work, about you, track record, then how to reach you. Nothing repeats; contact comes when a visitor has just finished looking.
- **Implementation:** `portfolio.js` filters out `selectedWork` ids. Contact became its own component (`app/components/contact/`) with `id="contact"`, so the Handful page's "Get in touch" still lands. Specialties moved inside `resume.js` as a row, which also fixed two sections sharing `id="resume"`. The 9-card grid centers its last card on the two-column tablet layout (`.folio-list { justify-content: center }`).

## About Me
- **Decided:** 2026-11-12, PR #10
- **Context:** The old text was generic ("creative problem-solver", "collaboration and positivity").
- **Choice:** Matthew's own rewrite: how work arrives ("from detailed specs to hallway conversations") and how he handles both, where he learned it (unnamed university, agencies, in-house), then personal projects and the writing background.
- **Why:** Specific moments convince; claims don't. Employers stay unnamed because the Career section names them a scroll later.
- **Design:** Centered column, left-aligned text (centered paragraphs are hard to read), a small rose "About Me" label and the first paragraph as a larger serif lead, so the strongest line carries the section.
- **Implementation:** The text lives in `about.js` (it links to Handful). `siteConfig.about.bio` is kept as a reference copy only.

## Static title instead of the typewriter
- **Decided:** 2026-11-12, PR #10
- **Options:** Keep five rotating titles; one title; a typed line of specific phrases ("Turning hallway conversations into shipped work").
- **Choice:** One static "Senior Front-End Engineer". Matthew rejected the typed line.
- **Why:** One title to remember. The rotating labels were generic and diluted the positioning, and constantly changing text is hard for screen readers. The tagline dropped its own "Senior Front-End Engineer" so it doesn't repeat the title above it.
- **Gave up:** Motion in the hero. A quiet draw-in of the underlines was offered and not taken up.

## Contact as buttons
- **Decided:** 2026-11-12, PR #10
- **Choice:** "Email me" (solid), "LinkedIn" and "Résumé" (outline), with the address underneath as copyable text.
- **Why:** One clear primary action, matching the hero's button style. The address stays for people without a mail app.
- **Implementation:** `EmailLink` gained a `label` prop. The address is still assembled in the browser, so scrapers reading the HTML don't see it.

## Project popup: dark, link under the description
- **Decided:** 2026-11-12, PR #10
- **Why:** The template's "Live Site" button floated on the screenshot and covered it (the SnapCare logo). Read order should be: see the work, read what you did, then go look. Dark matches the cards so card-to-popup feels like one design.
- **Implementation:** `folio-modal__link`. "Visit the live site ↗" for external links (with "(opens in a new tab)" for screen readers); "Read the case study →" for on-site links. The popup scrolls as one piece, and the image is capped at 44vh so the link fits on a laptop screen.

## More work: captions instead of a hover overlay
- **Decided:** 2026-11-12, PR #10
- **Why:** The teal-to-burgundy hover overlay hid the screenshot and used mismatched black/white text. Phones have no hover, so the project names never showed there. Captions under each image match Selected work.

## Social icons: color and a small lift
- **Decided:** 2026-11-12, PR #10
- **Why:** The spin had nothing to do with what the icons do. Rose plus a 2px lift is quiet and consistent; there's no lift with reduced motion, and a visible focus outline was added.

## Color: one accent, no teal
- **Decided:** 2026-11-12, PR #10
- **Context:** Four accents (teal, burgundy, brick red, rose) and teal-to-burgundy gradients.
- **Choice:** Rose (`--color-1: #c47a86`) is the only accent. Links use a darker rose (`--color-link: #a34d5c`) to pass 4.5:1 on light backgrounds. Progress bar and underlines are solid rose.
- **Why:** Teal was the one cool color on a warm page. One accent reads as a system.

## Hero background: burgundy, then paper, then white
- **Decided:** 2026-11-12, PRs #14, #15, #16
- **Context:** People said the burgundy hero was too dark and didn't match the site.
- **History:**
  1. **Paper** (#14): a warm off-white hero, the résumé section in paper too, and a warm ink family for the dark sections. Chosen for warmth and its tie to Handful's paper.
  2. **Spotlight, lifted photo, grain, rose title and keywords** (#15): the flat paper lost the old gradient's depth, so a radial spotlight and a photo shadow brought it back, plus a subtle paper grain. Black-on-paper read as plain, so the title and the three keywords turned rose (rose in two places, name and buttons stay ink).
  3. **White** (#16), current: the warm paper clashed with the pure white type on the dark sections. Options were warming the white type or making everything neutral. Matthew chose neutral white.
- **Why white:** Crisp, no warm/cool mix, and the rose stands out more on white. Matthew had hesitated on the beige twice.
- **Gave up:** Some warmth, and the visual echo of Handful's paper.
- **Kept from #15:** Spotlight (now gray), lifted photo, grain (now neutral), rose title and keywords.

## No light/dark toggle
- **Decided:** 2026-11-12
- **Why:** Visitors come once; nobody sets a preference on a site they'll see once. The page alternates light and dark sections on purpose, and a toggle would flatten that. Handful already shows theming skill.

## Implementation: color tokens
- **Decided:** 2026-11-12, PR #14 (values changed in #16)
- **What:** `:root` in `app/globals.scss` defines `--paper`, `--paper-edge`, `--ink`, `--ink-soft`, `--dark`, `--dark-2`, next to `--color-1` and `--color-link`.
- **Why:** Changing the palette from paper to white was a values-only change. This is the "orthogonal" property the process doc asks for.
- **Note:** The names `--paper` and `--ink` stayed when the values became white and near-black. They mean "light surface" and "dark text".

## Hero height on short screens
- **Decided:** 2026-11-11, PR #9
- **Why:** The template's hero was a fixed 100vh with overflow hidden, so new buttons pushed the social icons off short laptops and phones. It's now `min-height: 100vh` and grows. (This rule was briefly deleted in PR #10 and caught by a screenshot check.)
