---
title: How I Built My Blog with ChatGPT & Cursor — As an AI Engineer, Not a Frontend Dev
description: My journey building a modern, developer-centric blog using AI tools like Cursor and GPT-4o, despite having limited frontend experience.
date: 2023-08-10
tags:
  - ai
  - cursor
  - gpt4
  - nextjs
---

# How I Built My Blog with ChatGPT & Cursor — As an AI Engineer, Not a Frontend Dev

Welcome to my blog — a space to share AI projects, technical deep dives, and experiments in LLM-based systems.

What's unique about this blog isn't just what's inside it… but how it was built.

I'm an AI engineer. I spend most of my time building document chunkers, chatbot pipelines, and evaluation frameworks — not designing UIs or styling buttons. I'm not a frontend dev, and I've never been great at CSS.

## What I Wanted

But I wanted a blog that:
- Looked clean and modern
- Reflected my technical personality (developer vibes, terminal-like aesthetics)
- Supported dark/light mode
- Could scale into a portfolio for my future AI projects

Instead of hiring a designer or struggling through UI decisions myself, I turned to two tools that changed everything:
- **Cursor AI** — An AI-native code editor that understands context and writes code alongside you
- **ChatGPT (GPT-4o)** — A model that can interpret screenshots and give layout, UX, and design feedback

Using just these two tools, I designed, built, and refined the entire blog — all while learning more about UI and frontend in the process.

## The Tools I Used

| Tool | Purpose |
| --- | --- |
| Cursor AI | Write + refactor React/Tailwind code, fix bugs, add components |
| GPT-4o | Visual feedback from screenshots, UI/UX improvements |
| Next.js | Full-stack React framework with routing and SSR support |
| TailwindCSS | Fast utility-based styling |
| Shadcn/UI | Prebuilt accessible components to avoid reinventing the wheel |
| Vercel | Smooth deployment and hosting |

## The AI Design Loop (How I Built This Blog)

Rather than designing in Figma or copying templates, I followed a high-speed feedback loop using GPT-4o and Cursor.

Here's how it worked:

![My Iterative AI Dev Loop](/images/blog/ai-dev-loop.png)

### Loop Breakdown

1. **Write components and layout in Cursor AI**
   I'd scaffold basic sections (Hero, BlogList, Footer, etc.) and prompt Cursor to make them clean and modern with TailwindCSS.

2. **Render the UI → Screenshot it**
   Once I had a working section, I'd screenshot it — no need to describe every detail in words.

3. **Drop the screenshot into GPT-4o**
   GPT-4o would review spacing, layout, alignment, visual hierarchy, and overall design.

4. **Ask for improvements**
   I'd prompt with things like:
   - "What feels off in this layout?"
   - "How can I improve this hero section for a dev audience?"
   - "Make this feel more hacker/dev styled"

5. **Apply GPT-4o's feedback in Cursor**
   Back in Cursor, I'd refine the structure or styling as per GPT's suggestions — often in just a few lines or class changes.

6. **Repeat the loop**
   Each iteration brought the design closer to something clean, polished, and uniquely mine.

### Real Examples of Feedback

GPT-4o gave me:
- Font suggestions (e.g., use monospaced type for titles)
- Spacing fixes (better balance across viewports)
- Button enhancements (hover, focus, animations)
- Color tweaks (for better dark/light contrast)
- Design ideas (e.g., terminal-inspired hero with blinking cursor)

With no visual design training, this guidance helped me make smart design choices quickly.

## Why It Worked for Me as a Backend Dev

As someone who lives in the backend world, here's why this approach was so effective:

- **Cursor helped me express ideas in code**
  I could build rough UI layouts quickly and let the AI clean them up.

- **GPT-4o gave a second pair of (expert) eyes**
  The feedback I got was often better than what I'd expect from a junior frontend dev or random Dribbble post.

- **I stayed productive**
  Instead of context-switching between Figma, Google, StackOverflow, and MDN, I stayed in one flow — build, screenshot, improve.

This made frontend work… dare I say, enjoyable?

## What Was Still Hard

- Balancing Tailwind verbosity with reusability
- Mobile breakpoints sometimes needed extra manual tuning
- GPT-4o occasionally over-designed (I had to prompt for simplicity)
- Light/dark mode contrast issues took a few rounds

Still — I was never blocked for long. Cursor or GPT could always unstick me.

## Next Idea: AI Agent to Automate the Loop

Right now, this loop still involves manual steps:

1. Taking screenshots
2. Uploading them
3. Copy-pasting suggestions

But what if this could be fully automated?

I'm planning to prototype a local agent for MacOS that:
- Detects UI renders after file changes
- Captures the screen or selected app window
- Sends the screenshot and local context to GPT-4o
- Receives feedback and opens inline suggestions in Cursor or Git diff

Think of it like an AI design reviewer that runs in the background and continuously suggests UI tweaks as you code.

If you're working on something like this, I'd love to connect.

## Stack Recap

| Layer | Tool |
| --- | --- |
| Framework | Next.js (App Router) |
| Styling | TailwindCSS + Shadcn |
| AI Co-Pilots | Cursor AI, GPT-4o |
| Hosting | Vercel |
| Dev Workflow | AI feedback loop + iteration |

## Final Reflections

This blog wasn't just about launching a portfolio.
It was about testing what it means to build with AI-native workflows — and how far I could go using AI as a true collaborator.

I didn't just build faster.
I built better, with more clarity, focus, and confidence — even in areas where I had no formal training.

If you're an AI builder, indie hacker, or backend dev who avoids UI work — give this workflow a shot.

You might be surprised by how far AI can take you.

## What's Next?

- A Projects page to showcase LLM + agent work
- A series of posts explaining my chunking + evaluation framework
- Possibly open-sourcing this blog template (if there's interest)
- A personal AI agent that automates GPT review loops in real time

Thanks for reading. If you're building cool stuff with GPT or Cursor — drop me a message. Would love to chat or collaborate.

Stay curious,
MinhBTC 