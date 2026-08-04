# matthewrenfer.com — Analytics Instrumentation & Live Dashboard

**Project knowledge doc. Drop this into the Claude Project's knowledge, then work against it conversation-by-conversation.**

---

## North star

Instrument matthewrenfer.com with GA4 + Google Tag Manager and surface a **live, interactive dashboard on the site itself** — built as a custom React component, not an embedded iframe.

This is not "add analytics to my site." It is a **portfolio proof of positioning**: a working demonstration that I'm a front-end engineer who instruments what he builds and proves impact. A visitor watching real traffic and behavior render live, in a dashboard I built, on my own homepage, *is the argument the resume makes* — shown instead of claimed. It also mirrors the exact stack from the Yamaha contract (GA4, GTM, Looker Studio, persistent UTM tracking, cross-domain attribution), which makes the site the live evidence behind that experience.

A note on honesty, because it matters here: a personal site has modest traffic, and the dashboard will show real, possibly small numbers. That's fine and it stays real — the skill on display is the *instrumentation and the build*, not the traffic volume. Same framing as the resume: this is about visibility, not vanity metrics. Don't fake or inflate anything.

---

## Stack & hard constraints

- **Next.js 14.2.5**, React 18, Sass, framer-motion, vanilla-tilt. Content is markdown-driven (gray-matter + remark) — the writing/essays pages.
- **Confirm App Router vs Pages Router before building.** The install method and the dashboard API route differ between them; this doc covers both paths where they diverge.
- **Do not regress the performance work.** The site just went through Lighthouse fixes (hero LCP, render-blocking, CLS image dims, caching headers). Adding GTM is the single most likely thing to undo those gains. GTM must load with a non-blocking strategy, and **Lighthouse must be re-run before and after the GTM install** to confirm LCP/FCP didn't move. If the score drops, the instrumentation is wrong, not the perf work.

---

## Architecture decision

The instinct is "GA4 → Looker Studio embed." Reject that as the primary build. An embedded Looker iframe proves I can configure a Google product; it does not prove I can build an interactive front-end fed by a data API. The whole point is to demonstrate the harder, more differentiated skill.

**Chosen architecture — three layers:**

1. **Instrumentation: GTM + GA4.** GTM container fires events into GA4. This is the layer that matches the resume keywords and the Yamaha work, and it's the honest, industry-standard tracking setup. Persistent UTM capture and source attribution live here.

2. **Data access: GA4 Data API via a server-side Next.js route.** A server route (never client-side — credentials stay on the server) queries the GA4 Data API with a service account and returns clean JSON. This is where the front-end-plus-data story gets proven: I'm not embedding someone's dashboard, I'm pulling the data and shaping it myself.

3. **Presentation: a custom React dashboard component.** Renders the JSON with my own charts and interactions, styled to match the site. This is the piece that says "I build interactive front-ends," not just "I lay out content."

**On "live":** be precise, don't over-promise. GA4 has two data surfaces:
- **Realtime Data API** — genuinely live (active users now, events in the last 30 min, limited dimensions). Use this for the "live" hero numbers of the dashboard.
- **Core Data API** — richer (traffic sources, engagement, trends over time) but has GA4's processing latency (minutes to ~24–48h depending on the metric). Use this for the trend/attribution panels, cached and revalidated every few minutes.

That split gives a dashboard that *feels* live where it can be, and is honest about latency where it can't. If truly-real-time on specific high-value events becomes important later, an optional first-party event log (serverless KV) is a clean phase-2 add — but it's not needed for v1 and it loses the GA4-story alignment, so don't lead with it.

**Keep Looker Studio in your back pocket, not on the site.** It's still worth building a Looker Studio version of this in parallel *off-site*, purely because it's a literal resume keyword and a recruiter might ask "can you do Looker?" — but the on-site dashboard is the custom React build.

---

## Tracking plan

Events to configure in GTM → GA4. Beyond GA4's automatic `page_view`, capture intent and journey. Aim for events that tell a *recruiter-relevant* story: where did visitors come from, did they look at the work, did they reach out.

| Event | Fires when | Why it matters |
|---|---|---|
| `nav_click` | A main-nav / section link is clicked | Which sections draw attention (About / Work / Writing / Contact) |
| `portfolio_open` | A portfolio item / case-study modal opens (e.g. SnapCare) | Engagement with the actual work |
| `outbound_click` | Click to an external live site or GitHub repo | High-signal: they wanted to see the real thing |
| `resume_download` | Résumé PDF downloaded | Highest-intent action on the site |
| `contact_click` | Email link or contact CTA clicked | Conversion — the outcome the site exists for |
| `social_click` | LinkedIn / GitHub / etc. icon clicked | Intent + which channel |
| `writing_read` | Scroll depth ≥ ~75% or N seconds on an essay/poem page | Engagement with the writing — proves the writer thread lands |

**Persistent UTM capture + attribution (do this — it's the Yamaha differentiator made live).** On first load, read any `utm_*` params, persist them (cookie / localStorage) so the source survives across page navigations, and attach them to key events. This means when a recruiter arrives from a LinkedIn post or a specific job board, the dashboard can attribute the visit and any resulting contact click back to that source. That's the exact "persistent UTM / source attribution" capability from the resume, running on my own site. Respect the privacy notes below.

---

## Dashboard spec

A single interactive panel on the site (its own route, or a section of the home page). Suggested panels:

- **Live now** (Realtime API): active users, events in the last 30 min. This is the "it's alive" moment.
- **Where visitors come from** (attribution): source / medium / campaign breakdown, powered by the persistent-UTM work. This is the marquee panel — it's the differentiator visualized.
- **What they engage with**: top sections/pages, portfolio opens, writing reads.
- **High-intent actions**: résumé downloads, contact clicks, outbound-to-GitHub/live-site counts — the funnel from "landed" to "reached out."
- **Interactivity**: at least one real interactive control (date-range toggle, or filter by source) so it's demonstrably a built UI, not a static render. This is the bit that separates it from a screenshot.

Charts: keep dependencies lean given the perf constraint. A small library (or hand-rolled SVG, which doubles as a front-end-depth flex) over a heavy charting bundle. Whatever's chosen, lazy-load the dashboard so it never touches the initial LCP path.

---

## Privacy & safety

The dashboard is **public**, so:

- **Aggregate only.** No IPs, no individual sessions, no anything that could identify a specific visitor. GA4 aggregates by default — keep it that way; don't expose raw event rows.
- **Credentials stay server-side.** The GA4 service-account key is a server env var, read only inside the API route. It must never reach the client bundle. This is the single most important safety item.
- **Consent, done well, is itself a demonstration.** GTM/GA4 set cookies. A clean, privacy-preserving consent approach (default to non-essential-off, honor Do Not Track, minimal banner) is both the correct thing and a visible signal of competence on exactly the kind of thing front-end engineers are expected to handle now. Don't dark-pattern it.
- Don't put anything in the dashboard you wouldn't be comfortable with a stranger, a recruiter, and a privacy-conscious engineer all seeing at once.

---

## Implementation notes (Next.js 14)

**GTM install — use the optimized path, not a raw snippet.**
- Prefer `@next/third-parties/google` (`GoogleTagManager`) — it's the official, performance-tuned integration for Next 14 and loads with the right strategy out of the box. Falls back to `next/script` with `strategy="afterInteractive"` if needed. Do **not** drop the classic synchronous GTM snippet in `<head>` — that's what reintroduces render-blocking.
- App Router: mount `GoogleTagManager` in `app/layout.tsx`. Pages Router: in `pages/_app.tsx` (or `_document` per the library's guidance).

**Dashboard data route.**
- App Router: `app/api/analytics/route.ts` (Route Handler). Pages Router: `pages/api/analytics.ts`.
- Use `@google-analytics/data` (GA4 Data API client) with a service account. Store the service-account JSON as an env var (base64 it if needed), read server-side only.
- **Cache the response** — revalidate every few minutes rather than hitting the GA4 API on every dashboard load. This keeps the dashboard fast, stays within API quotas, and ties back to the caching discipline from the perf work. (App Router: `revalidate` / `unstable_cache`; Pages Router: cache headers or a simple in-memory/edge cache.)
- Realtime panel hits the Realtime API method; trend panels hit the Core Data API method — two calls, different freshness, as above.

**Load order / perf.** Lazy-load the dashboard component (dynamic import, client-side, below the fold). It must not block or bloat the initial route. Re-run Lighthouse after wiring GTM and after adding the dashboard; treat any LCP/FCP regression as a bug.

---

## Sequencing

1. **Finish the three Lighthouse performance phases first.** Don't instrument a DOM you're still restructuring, and don't add GTM before render-blocking is fixed. Baseline Lighthouse captured.
2. **GTM + GA4 tracking layer.** Install GTM (optimized), configure the event plan and persistent UTM capture, verify events land in GA4 realtime. Re-run Lighthouse — confirm no regression.
3. **Dashboard.** Server API route → GA4 Data API → custom React dashboard, lazy-loaded, with one real interactive control. Re-run Lighthouse.
4. **Consent + privacy pass.** Banner, DNT honoring, aggregate-only verification.

---

## Definition of done

- GTM live; the full event plan firing and visible in GA4.
- Persistent UTM capture working — source survives navigation and attaches to key events.
- Public dashboard on the site: live panel + attribution + engagement + high-intent, at least one interactive control, lazy-loaded, styled to the site.
- Service-account credentials confirmed server-side only (not in client bundle).
- Consent/privacy handling in place, privacy-preserving defaults.
- Lighthouse Performance and Accessibility **at or above** the post-fix baseline — instrumentation didn't cost the perf work.

---

## Capture the case study

Screenshot the current Lighthouse run (67 Perf / 88 A11y) and the "before" state now. When the perf fixes + instrumentation + dashboard are done, the before/after delta and the live dashboard *are* a portfolio case study: "I diagnosed my own site, fixed the fundamentals, instrumented it, and built a live dashboard to prove it." That narrative — written up in my own voice — is the single most on-message portfolio piece I can have, because it demonstrates the whole positioning end to end on the one property I fully control. Write it up once the build lands.
