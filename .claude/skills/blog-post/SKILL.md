---
name: blog-post
description: Write, edit or restyle a blog post or project story for this site using the shared article components and the house style (neutral, professional, light and dark). Use for any change under src/app/blog or src/content/project-stories.
---

# Writing a post for this blog

Read `docs/blog-style-guide.md` first. It is the source of truth for voice, structure, components, images, diagrams and the pre-publish checklist. The summary below is what to do on every post.

## Workflow

1. **Choose the form.** A hand-written post is a `page.jsx` under `src/app/blog/<slug>/`, started from `docs/templates/post.template.jsx`. A project story is a JSON file in `src/content/project-stories/` rendered by `src/app/blog/review/[slug]/page.tsx`.
2. **Gather facts before writing.** Read the repository or the notes the author supplied. Do not state ports, versions, dates, team size, ownership or results that you did not see. When something is unclear, put the question in `reviewNotes` (stories) or `docs/blog-review-notes.md` and write the sentence so it stays true either way.
3. **Write with the shared components only.** Import from `@/components/post`. No Tailwind colour utilities (`text-blue-500`, `bg-amber-50`, gradients) in post content. No emoji.
4. **Add images only if they exist and are useful.** Check the file is a real image (not 1×1, not empty), with alt text, caption and real dimensions. Use synthetic data in screenshots.
5. **Diagrams:** Mermaid, quoted labels, no style colours, caption required, only real components.
6. **Update metadata:** `src/db/blogs.json`, page `metadata`, ISO date, reading time.
7. **Verify visually.** Run the site, open the post in light and dark mode at 390 px and 1280 px, and scroll the whole page so lazy images load. Fix anything that is blank, clipped, low contrast or off-palette.
8. **Report** what changed and list any open questions for the author.

## Hard rules

- Never claim measured outcomes without a measurement. Say what would be measured instead.
- Never leave review commentary inside published text.
- Never use undefined theme tokens (`muted`, `foreground`, `card`, `border`). Use DaisyUI tokens (`base-content`, `base-300`, `primary`).
- Never commit placeholder images, real personal data, or secrets.
- Keep the post date consistent with the tools and versions it discusses.
