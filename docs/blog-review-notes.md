# Blog review notes, 14 October 2026

Open questions and known issues found while restyling the posts. None of these block the style work; each needs an author decision or a fact only you have.

## Published posts

### Building a Privacy-First AI Chatbot with LangChain
- The page now says the interface is Next.js with a FastAPI backend (as the original did). The screenshots show a **Gradio** UI ("LLM Assistant") and your resume says Gradio. Which should the post say?
- Setup steps say `python app.py` and `http://localhost:5000`, but the original diagram listed ports 3000 (frontend) and 8080 (backend). The diagram ports were removed; please confirm the run commands.
- The traces show the model receiving a **realistic substitute number**, not a bracketed placeholder. The text was corrected to match. The code sketch still uses bracketed placeholders and regular expressions, and is labelled as a sketch.
- The sketch generates an encrypted copy of each value (`encrypted`) and never uses it. It was left as is; decide whether to delete the Fernet lines.
- The system prompt in the trace credits "Cong Minh and Tran Hieu" as developers. Confirm co-developer credit and what you built.
- The screenshot phone number `0345678999` uses a real Vietnamese mobile prefix. Replace it with an obviously fake number.
- The original text said "In 2025" in a post dated July 2023, and repeated one paragraph twice. Both were removed.
- The cover image `langchain-cover.png` never existed. The post now has no cover.
- Fixed: Python regular expressions were written as non-raw strings, so `\b` became a backspace character. They are now raw strings.

### Building a Dev-Centric Blog with ChatGPT & Cursor
- The post is dated **2023-08-10** but discusses GPT-4o, which was released in May 2024. Please confirm the real date.
- It lists Shadcn/UI; the current site uses DaisyUI. Left as written because it describes the original build.
- "Each loop brings you 10-20% closer" and the "Coming soon" list were removed (no source; the portfolio showcase now exists).
- Seven of the post's image files in `public/images/blog/` are 1×1 placeholders and `ai-dev-loop.png` is empty. The post no longer references them. Delete them or replace them with real screenshots.
- `blog-homepage.png` shows the old purple homepage and is no longer used. Capture a current screenshot if you want a cover.

### Introducing Chatbot Template
- The title still says "A Production-Ready AI Framework" in `blogs.json` and the page metadata. The page heading says "Introducing Chatbot Template". The project story avoids "production-ready" until there is deployment evidence. Decide which wording to keep.
- The cover (`chatbot-template-cover.png`, 736 KB, neon circuit-board art) is off-palette and is no longer shown on the page. It is still referenced from `blogs.json`.
- "Streamlit UI" is mentioned in Docker setup. Confirm it is still part of the compose file.

## Site-wide
- **Contact form is not wired up.** The button reads `exec("Not working yet")`. Either connect `/api/contact` or replace the form with plain links.
- Contact links pointed at `github.com/minhbtc` and `linkedin.com/in/minhbtc`. They now use the values in `profile.json` (`minhbtrc` and `minhbtcm00`). Confirm those are right.
- Other pages (`blogRef`, `components`, `/blog/[...slug]`) look like earlier experiments and are still routable. Consider removing them.
- `page.md` files next to two posts feed the search index (`db.up.ts`) and still hold the old text. Update or remove them.
- `body { overflow-x: hidden }` makes the body a scroll container, which can break sticky positioning. Prefer `overflow-x: clip` on `html`.
- Lint and type errors remain in older files (`blogRef/template.tsx`, `blog/page.jsx`, `contact/page.tsx`). The new and rewritten files lint clean.
- `npm ci` fails on a peer dependency conflict (`@eslint/compat` wants ESLint 9, the project has 8). Vercel uses `yarn.lock`, so it is unaffected, but `package-lock.json` is out of step.

## Project stories (drafts)
Each story's `reviewNotes` lists its own questions. In general, none of the six has real screenshots except LangChain Chatbot. Candidates: a redacted trace view for the executive assistant, the About page for the blog story.
