# CLAUDE.md — matthewrenfer.com Writing Platform

This file gives you the full brief for the `/thoughts` writing platform build.
Read it before touching any code.

---

## Who I Am

Matthew Renfer — writer, coder, UX/product background. Site: matthewrenfer.com.
Reconnecting with both writing and coding at a deeper level. This project serves both.

---

## What We're Building

A personal writing/blog platform at **matthewrenfer.com/thoughts**.

Page tagline: **"Yeah, I've got some..."**

This is not a dev blog. It's a platform for long-form personal writing — essays,
observations, and eventually a manifesto about cultural and political division in
America. The writing is intentional, voice-driven, and meant to reach people across
ideological divides. The platform should feel like it belongs to a writer, not a developer.

---

## Decided Architecture

**Obsidian → Markdown files → Next.js → AWS Lightsail**
Git is the connective tissue between local writing and the live site.

The workflow:
1. Write and draft locally in Obsidian (vault at `Writing/` with `posts/`, `drafts/`, `templates/` subfolders)
2. When a post is ready to publish, move the `.md` file into the repo's `posts/` directory
3. Git push → site rebuilds → post is live at `/thoughts/[slug]`

No external CMS. No database. Markdown files are the source of truth.

---

## Current Site

- **Framework**: Plain React (CRA or Vite — confirm by checking `package.json`). **Not Next.js yet.**
- **Hosting**: AWS Lightsail (Node server)
- **Deployment**: Manual. Matthew SSHs into the Lightsail instance, deletes the current directory, copies the repo, runs `npm install` and `npm run build`. No automation yet.
- **Repo**: Check project root for structure

> **First task**: Read `package.json` and the full project structure before writing any code.
>
> **Migration required**: The site needs to migrate from plain React to Next.js as part of this build.
> This is expected and planned — don't treat it as a blocker, treat it as step one.
> Migrate carefully: preserve all existing pages/routes, then add the `/thoughts` platform on top.
>
> **Also worth doing**: Once Next.js is running, propose a simple deploy script or GitHub Action
> to replace the current manual SSH process. Matthew is open to automation.

---

## Post Frontmatter Format

Posts written in Obsidian will have this frontmatter (auto-populated via Obsidian Templates plugin):

```yaml
---
title: 
date: YYYY-MM-DD
time: HH:mm
tags: []
status: draft
---
```

The build pipeline should:
- Read `title` and `date` for display
- Use `status` to filter — only publish posts where `status: published`
- Generate slugs from the filename (not the title)

---

## `/thoughts` Page Requirements

**Index page (`/thoughts`)**
- List of published posts, reverse chronological
- Show: title, date, brief excerpt (first ~150 chars of body, or a manual `excerpt` frontmatter field if present)
- Tagline "Yeah, I've got some..." displayed prominently
- Clean, readable — this is a writing platform, not a portfolio piece

**Individual post pages (`/thoughts/[slug]`)**
- Render Markdown to HTML
- Typography is the main event — readable line length, comfortable size, good leading
- Show title and date at top
- No comments, no social widgets — keep it clean
- Back link to `/thoughts`

---

## Design Direction

The site already exists — match its existing visual language first.
Check the current site's color palette, typography, and layout conventions before designing anything.

If the existing site uses a design system or CSS variables, extend those.
Don't introduce a new visual identity — this should feel native to matthewrenfer.com.

That said, the `/thoughts` reading experience should prioritize:
- Long-form readability above all
- Generous whitespace
- Body text that doesn't fight you

---

## Key Libraries to Evaluate

For Markdown rendering, consider:
- `gray-matter` — frontmatter parsing
- `remark` / `remark-html` or `unified` pipeline — Markdown to HTML
- `next-mdx-remote` — if MDX support is wanted later

Don't over-engineer. Start with `gray-matter` + `remark-html`. Add complexity only if needed.

---

## What "Done" Looks Like (Phase 1)

- [ ] `/thoughts` index page renders, lists published posts, shows tagline
- [ ] `/thoughts/[slug]` renders individual Markdown post
- [ ] Frontmatter parsing works (title, date, status filter)
- [ ] Dropping a `.md` file in `posts/` with `status: published` makes it appear on the site
- [ ] Matches existing site's visual style
- [ ] Builds and deploys to Lightsail without breaking anything else

Phase 2 (later): RSS feed, tag filtering, reading time estimate, Obsidian→Git automation.

---

## Tone Notes (for any copy you write)

Matthew's voice is direct, specific, occasionally dry. He names things without hedging.
If you're writing placeholder copy, match that register — don't default to generic marketing language.

The tagline "Yeah, I've got some..." is intentionally casual and a little wry. That's the voice.

---

## Questions to Ask Matthew Before Starting

1. Is it CRA (`react-scripts`) or Vite? (Check `package.json` — look for `"react-scripts"` vs `"vite"`)
2. Is there an existing `posts/` or `content/` directory in the repo?
3. Any visual/design constraints from the existing site to be aware of?
