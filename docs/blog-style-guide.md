# Blog style guide

Every article, whether a hand-written post or a project story, uses the shared article system in `src/components/post/`. The rules below keep posts consistent and professional in light and dark mode. The `blog-post` skill (`.claude/skills/blog-post/SKILL.md`) applies them automatically when an assistant writes or edits a post.

## Voice

Write like a person telling a friend who is also an engineer what happened, not like documentation, a report or an audit. The test: read a paragraph aloud. If you would never say it across a table, rewrite it.

What good personal engineering blogs do (Julia Evans, Simon Willison, Dan Luu, and most of the posts people actually share):

- **Open with the real situation.** Why I started, what annoyed me, what I wanted to try. Not "This post covers...". One or two sentences, then get going.
- **Tell it as things that happened, in order, with reasons.** "I started with X. It broke when Y, so I switched to Z." Decisions come with the thing that forced them.
- **Use first person singular and plain words.** "I", "my", contractions are fine ("didn't", "it's"). Use "we" only for work a team did, and say so once. Never "the author", "this write-up", "the repository shows".
- **Pick a few concrete details and drop the rest.** One odd bug, one number, one file name that matters. Do not recite the README, the port list, the env vars, the folder layout or every dependency. If a reader could get it from the repo in ten seconds, link the repo instead.
- **Have opinions and small asides.** "This turned out to be the hard part." "I'd skip this next time." A dry joke is fine if it is real; a forced one is not.
- **Be honest about what you don't know, once, specifically.** "I never measured whether the spell fixer helps." Not a disclaimer every other paragraph, and never a block that lists everything you did not verify. Cut "I do not claim...", "I have not verified...", "as it stands", "to my knowledge".
- **Vary sentence length.** Short ones land points. A longer one can carry a reason. Avoid three sentences in a row that start the same way.
- **End when you are done.** A last thought, what I would change, or what is next. No summary of the post, no "In conclusion".

Words and shapes to avoid: "the manual path follows my README", "I describe the code as it stands", "this section covers", "it is worth noting", "robust", "leverage", "seamless", "comprehensive", lists of three adjectives, headings that read like a spec ("Design constraints"), paragraphs that only restate a table, and sentences that exist to defend the author ("I do not claim production readiness").

Facts still come first. Do not invent history, motives, results, ownership or numbers. When the sources do not say why I did something, write only what is visible ("I used X") and put the question in `reviewNotes`. A natural voice is not permission to make things up.

Other rules:

- Prefer specific nouns and verbs over adjectives. No hype, no rhetorical questions as filler.
- Do not put editorial notes in the published text. Open questions belong in `reviewNotes` (stories) or `docs/blog-review-notes.md`.
- Do not write year-relative statements ("in 2025") and keep the post date consistent with the tools it describes.
- No emoji.

### Before and after

Stiff: "The manual path follows my README. After the services are up, the frontend is on port 3000, the backend on 8080 and the API documentation on /docs."

Natural: "Getting it running is `docker compose up`. If you want to poke at the API, it has the usual FastAPI docs page."

Stiff: "I describe the code as it stands. I do not claim production readiness, and I have not measured accuracy."

Natural: "It's a side project, not something I'd put in front of customers. I never measured how accurate the answers are, so I can't tell you."

## Structure

1. `PostHeader`: title, one-sentence subtitle, author, ISO date, reading time, 3–5 lowercase tags.
2. `Lead`: what this is and what the reader will get.
3. Body sections with `h2` headings that read as statements or noun phrases ("Scope memory to the conversation"). Use `h3` sparingly.
4. A short closing: where it ended up, what I would change, what is next. Skip it if the last section already ends well.
5. `References`: every link cited in the body, with a short note on why it is relevant.
6. `PostFooter`.

Aim for 500–1,000 words; shorter is fine. Longer material belongs in a series.

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

## Sourcing images

Posts need pictures, not only prose. Aim for at least one real image per post and one per major section where something visual exists. Use this order:

1. **Capture it yourself.** Run the project (the author's public repositories, or this site) and screenshot the real UI, terminal or trace. Redact personal data and use synthetic input.
2. **Public images licensed for reuse.** Official documentation, press kits, Wikimedia Commons, Unsplash. Record the licence, put the credit and source URL in the caption, and keep the file under 300 KB.
3. **A diagram** (Mermaid) when the project is private or nothing can be captured.

Never use an unlicensed image. Never fake a screenshot of a private product (for example PRISM or the executive assistant); use a diagram and say it is one. If a capture fails (missing dependency, no network), do not substitute a mock-up: leave the section without an image and note it in `reviewNotes`.

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
