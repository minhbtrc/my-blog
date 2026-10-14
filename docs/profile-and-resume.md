# Profile and CV maintenance

## Shared source

The homepage, About page and CV use the profile data in `src/db/`:

- `profile.json`: identity, summary, public professional links, verified scale and CV metadata.
- `experiences.json`: employers and positions, with `sections` grouping project bullets.
- `projects.json`: project descriptions, detailed `points`, technologies and optional status/URL.
- `skills.json`, `education.json`, `certificates.json`: supporting profile content. Only certificates with `resume: true` appear in the PDF.

Keep the company title and employment dates confirmed by the owner. The team size is technical leadership scope, not a direct-report claim. Approximately 1,000 users is an approximate platform user count, not MAU. Internal project/service names are intentionally anonymized. PRISM remains marked Internal QA. Do not add cost, speed or quality percentages without a defensible measurement.

## Build the downloadable CV

The web app serves the reviewed static PDF from `public/resume/`; it does not recreate another PDF in the visitor's browser. This keeps the layout and content consistent across download and preview, and avoids loading jsPDF for visitors.

Install Python 3.10+ and Poppler (`pdftoppm`), then:

```sh
python3 -m venv .venv-resume
source .venv-resume/bin/activate
pip install -r scripts/requirements-resume.txt
npm run resume:build
npm run resume:check
```

The renderer uses Arial and Times New Roman when available in the macOS Supplemental fonts directory (or `RESUME_FONT_DIR`). Otherwise it uses PDF-standard Helvetica and Times. Fonts are not redistributed. Review layout if generating on a different platform.

`resume:build` reads the shared JSON and generates:

- `public/resume/MinhBTC_Senior_Applied_AI_Engineer.pdf`
- `public/resume/preview.png`
- `public/resume/manifest.json`

The build stages output and verifies every experience/project bullet before replacing artifacts. It fails if content exceeds the reviewed three-page layout. If content grows, adjust pagination in `scripts/build_resume.py`; do not reduce font size or silently discard bullets.

After each content change:

1. Update the JSON and `profile.resume.updated` (ISO date).
2. Run `resume:build` and inspect all three rendered PDF pages.
3. Run `resume:check` to verify the PDF's extracted content and source/artifact hashes.
4. Review `/about` and `/resume` in light/dark mode and at desktop/mobile widths.
5. Commit the data, PDF, preview and manifest together.

The npm site build uses the committed assets and does not require Python or Poppler. Run `resume:check` in a Python-enabled environment when validating content changes.

## UI conventions

Preserve the existing emerald light theme and blue/slate dark theme in `tailwind.config.ts`. Use DaisyUI tokens (`base-content`, `base-300`, `primary`) rather than undefined `muted`/`background` tokens. Theme state is owned by next-themes; `ThemeSync` updates DaisyUI's `data-theme` attribute. Avoid manual color overrides or body hide/show reflows.

Keep profile content available without waiting for typing or scroll animations. Navigation, CV actions and contact links must be visible immediately, keyboard accessible, and wrap at narrow widths. Mobile navigation replaces the desktop links below the `md` breakpoint. Command/Ctrl+K opens the page navigator.

## Local review — 13 October 2026

- Production build generated all 17 pages. The existing Next configuration skips lint/type validation during builds, so this is not a clean-repository lint/type result.
- ESLint passed for the changed TypeScript/TSX files. Repository-wide lint and TypeScript checks still report existing failures in blog, demo, database and particle-background code.
- PDF content/hash validation passed for all three pages. The file downloaded through the CV button matched the committed artifact byte-for-byte.
- Browser review covered homepage, About and CV at mobile/tablet/desktop widths (320, 390, 768 and 1280 pixels), including the repaired mobile header, menu navigation, section anchors, filtered page navigation, Cmd+K, theme persistence and PDF download.
- Existing music player emitted YouTube player error 150 during review; external music playback is not validated by these profile changes.
- These checks were local; no production deployment was performed.

## Public distribution

The public profile and downloadable CV contain professional information and GitHub/LinkedIn links only. Do not add personal email, telephone, street address, private client names, credentials or internal service URLs. Contact fields and mailto/tel PDF annotations are rejected by the PDF validator. Local full-contact CV copies belong outside public/ and must not be committed. The obsolete public/static CV is removed from the published tree. Removing a file does not erase previous Git history or cached/downloaded copies.
