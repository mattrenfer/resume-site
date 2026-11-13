# Docs

How this site is designed and built, and why.

- [process.md](process.md): the design-first workflow to follow for new work, with a prompt template and a decision-note template.
- [decisions/](decisions/): every design and implementation decision, with the reasoning and what was traded away.
  - [home-page.md](decisions/home-page.md): the home page (layout, colors, copy, components).
  - [handful-showcase.md](decisions/handful-showcase.md): the Handful case study page at /portfolio/handful/.
  - [resume.md](decisions/resume.md): the PDF résumé.
  - [engineering.md](decisions/engineering.md): code structure, tooling, deploys, and the git/PR workflow.

## A note on history

The November 2026 redesign (PRs #5 to #16) was done "react, then build": mock-ups, a reaction, a build, repeat. The decision logs were written afterward from the PRs, commits and working notes. Where the reasoning at the time wasn't recorded, the entry says so instead of inventing one. New work should follow [process.md](process.md), so decisions are written down before the code.
