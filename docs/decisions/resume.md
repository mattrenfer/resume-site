# Résumé decisions

## AI-assisted development
- **Decided:** 2026-11-12, PR #10
- **Choice:** A summary sentence, a skills line second after Front-End ("Claude Code, agentic coding workflows, prompt and context design, reviewing and testing AI-generated code, taking projects from idea to production"), and the same entry in the site's Specialties.
- **Why:** Employers screen for this now. "Reviewing and testing AI-generated code" is the part hiring managers care most about. Only tools actually used are listed.

## Projects section with Handful
- **Decided:** 2026-11-12, PR #10
- **Choice:** Dated 2025 – 2026, linked to the case study, with bullets on the request lifecycle, database-level data isolation, and the deploy.
- **Why:** An undated project can look old or unfinished. The bullets match the showcase page, so the résumé and the site say the same thing.

## Source file and versioning
- **Decided:** 2026-11-12
- **Context:** The original PDF came from a ReportLab script that no longer exists.
- **Choice:** Rebuilt as `C:\Users\frisk\Downloads\resume\resume.html`, printed to PDF in Chrome, kept to two pages.
- **Implementation:** Copy the PDF to `public/Matthew Renfer - Resume.pdf` and bump `siteConfig.personal.resume.version` (`?v=10` now). The version query makes browsers fetch the new file instead of a cached one.
- **Note:** The source lives outside the repo. Consider moving it into the repo so it's versioned with the site.
