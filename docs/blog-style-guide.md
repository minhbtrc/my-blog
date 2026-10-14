# Blog style guide

Every article, whether a hand-written post or a project story, uses the shared article system in `src/components/post/`. The rules below keep posts consistent and professional in light and dark mode. The `blog-post` skill (`.claude/skills/blog-post/SKILL.md`) applies them automatically when an assistant writes or edits a post.

## Voice

- Write in first person, plainly, as an engineer explaining a decision to a peer.
- Lead with what the post covers and why it matters. The `Lead` block is one short paragraph.
- Prefer specific nouns and verbs over adjectives. Cut hype ("game-changer", "magic"), jokes that carry no information, and rhetorical questions.
- State what you did and what you verified. Do not claim outcomes (speed, cost, accuracy, scale) without a measurement you can point to. If you have none, say what you would measure.
- Do not put editorial notes in the published text ("this draft does not claim..."). Open questions belong in `reviewNotes` (project stories) or in `docs/blog-review-notes.md`.
- Do not write year-relative statements ("in 2025") that will age badly, and make sure the post date is consistent with the tools and versions it describes.
- No emoji.

## Structure

1. `PostHeader`: title, one-sentence subtitle, author, ISO date, reading time, 3–5 lowercase tags.
2. `Lead`: what this is and what the reader will get.
3. Body sections with `h2` headings that read as statements or noun phrases ("Scope memory to the conversation"). Use `h3` sparingly.
4. A closing section: outcome, limits, and what you would do or measure next.
5. `References`: every link cited in the body, with a short note on why it is relevant.
6. `PostFooter`.

Aim for 600–1,200 words. Longer material belongs in a series.

## Components

Import from `@/components/post`. Do not import from `BlogPostStyle` in new posts; it only exists so older posts keep working.

| Need | Component |
| --- | --- |
| Title block | `PostHeader` |
| Summary under the title | `Lead` |
| Aside, caution or evidence boundary | `Callout label="Note"` (one neutral style; the label carries the meaning) |
| Code | `CodeBlock title="path/to/file.py" language="python"` |
| Image or screenshot | `Figure`, or `FigurePair` for before and after |
| Linear process | `Steps` |
| Term and explanation pairs | `Definitions` (replaces card grids) |
| Quote | `Pullquote` |
| Diagram | `Mermaid` (client component, theme-aware, greyscale) |
| Sources | `References` |

## Visual rules

- One accent colour: `primary` (emerald in light mode, blue in dark mode). Use it for links and the lead rule only.
- Surfaces are neutral: `base-100`, `base-200`, `base-300`. Use DaisyUI tokens (`text-base-content`, `border-base-300`). Never use `muted`, `foreground`, `card` or `border` tokens; they are not defined in this project and render as nothing.
- No coloured callouts, gradient text, icon badges, drop shadows or decorative card grids.
- Headings are sans-serif. Monospace is for code, metadata and the site chrome only.
- Body text uses `base-content` at 85% opacity or higher. Secondary text must stay at 60% or above so it meets contrast requirements in dark mode.

## Images and screenshots

- Every image has meaningful `alt` text (what it shows, not "screenshot") and a caption that says what to notice.
- Provide real `width` and `height` so the page does not shift while loading.
- Store files in `public/images/<post-slug>/`. Keep each under about 300 KB; export screenshots as PNG or WebP at the displayed size, not retina-sized originals.
- Never commit placeholder files. A 1×1 or empty image is a broken image. Remove the reference instead.
- Use synthetic data in screenshots. No real phone numbers, emails, tokens or client names.
- Re-capture screenshots of this site when the design changes; do not reuse old ones.
- A cover image is optional. If used, it must follow the same neutral look (no neon or stock AI art).

## Diagrams

- Use Mermaid with quoted labels (`A["Label (with parentheses)"]`), because unquoted parentheses are a syntax error.
- Show real components and flows only. Do not invent services, ports or steps.
- Keep a diagram to about 8 nodes. Always give it a caption.
- Do not set Mermaid `style` or `fill` colours. The component applies the palette for the current theme.

## Code

- Keep snippets short and runnable in principle. Mark simplified code as a sketch in the sentence before it.
- Use raw strings (`r'...'`) for Python regular expressions. In a JSX template literal, write backslashes doubled (`\\b`).
- Do not publish keys or real hostnames. Use obvious placeholders.

## References

- Prefer primary sources: official documentation, the repository, the paper.
- Use the canonical URL for the language in use (for example Python LangChain docs for a Python project).
- Link the first mention in the body and again in `References`.
- Check links before publishing.

## Metadata

- Add the post to `src/db/blogs.json` (slug, title, description, ISO date, reading time, tags, `published`). The description should match the page `metadata.description`.
- Page `metadata.title` equals the visible title.
- Reading time is words divided by 200, rounded up.

## Checklist before publishing

1. Build and open the post in light and dark mode at 390 px and 1280 px wide.
2. All images load, have alt text and captions, and are not placeholders.
3. Diagrams render in both themes and are readable at 390 px.
4. Every claim has either a source, a measurement, or is stated as a plan.
5. No colour other than the accent and neutrals.
6. Metadata and `blogs.json` are updated, and the date is consistent with the content.
