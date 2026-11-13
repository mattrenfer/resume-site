# Process: design first, then build

The rule: **decide, write down why, then build.** Every change should be traceable from a requirement, to a decision, to a PR.

## Why this order

- **Fewer reversals.** The 2026 redesign changed the hero color three times (burgundy, then paper, then white), and each change rippled through the page. Deciding the foundations first keeps later changes small.
- **Orthogonal changes.** When colors, type and spacing live in tokens, a decision changes one layer and every page follows. Nothing is fixed page by page.
- **You can explain every choice.** Written tradeoffs are what you say in an interview, or to yourself six months from now. Nothing ships that can't be explained.

## The steps

1. **Brief.** One page: who it's for, what it must do, constraints (static site, accessible, fast, honest authorship), and how you'll know it worked.
2. **Foundations.** Colors (tokens), type scale, spacing, and the shared components (buttons, cards, links). Decide these before page layouts, because every page uses them.
3. **Page and section design.** For each open question: 2 or 3 options, mock-ups on the real page, a choice, and a decision note.
4. **Plan.** Split the work into PR-sized tasks, each tied to a decision. Small PRs are easy to review, explain and roll back.
5. **Build.** Each PR description says what changed and why, and links the decision note.
6. **Verify.** Run the checklist below on every PR.
7. **Record.** When a decision changes (paper became white, for example), update its note and say what replaced it and why. Don't delete the old reasoning.

## Verify checklist (every PR)

- The PR's base branch is `main` (`gh pr view <n> --json baseRefName`). Stacked PRs don't retarget themselves.
- Text contrast is at least 4.5:1. Measure it; don't eyeball it.
- Desktop, tablet (768 and 1024) and phone (390) screenshots, with no sideways scroll.
- No console errors, and the page still works with reduced motion and without JavaScript where it should.
- `npm run build` passes (watch for unescaped `'` in JSX).
- Nothing in `public/` that shouldn't deploy. Everything in `public/` ships.

## Prompt template for starting work

```
Before any code: help me design this.
1. Restate the requirement and ask me what's unclear.
2. Write a short brief (audience, goals, constraints, success criteria).
3. List the decisions this needs, foundations first. For each: 2–3 options,
   tradeoffs, your recommendation and why. Mock up visual options on the real page.
4. After I choose, record each decision in docs/decisions/ (options, choice, why,
   what we gave up).
5. Then plan PR-sized tasks tied to those decisions, and only then build.
Every PR description links the decision it implements.
```

## Decision note template

```
### <Decision title>
- **Decided:** <date>, PR #<n>
- **Context:** what problem or requirement prompted it.
- **Options:** the 2–3 alternatives considered.
- **Choice:** what we did.
- **Why:** the reasoning.
- **Gave up:** the tradeoff we accepted.
- **Status:** current / replaced by <link> on <date>.
```
