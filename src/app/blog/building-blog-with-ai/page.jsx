import dynamic from 'next/dynamic'
import { Article, Callout, Definitions, Lead, PostBody, PostFooter, PostHeader, Pullquote, Steps } from '@/components/post'

const Mermaid = dynamic(() => import('@/components/Mermaid'))

export const metadata = {
  title: 'Building a Dev-Centric Blog with ChatGPT & Cursor',
  description: 'How a backend-focused AI engineer built a personal blog with Cursor and GPT-4o, using screenshots as the feedback signal.'
}

const loop = `
graph TD
    A["Write a component in Cursor"] --> B["Review it in the browser"]
    B --> C["Capture a screenshot"]
    C --> D["Ask GPT-4o for design feedback"]
    D --> E["Apply the suggestions"]
    E --> F{"Good enough?"}
    F -- "No" --> A
    F -- "Yes" --> G["Ship"]
`

export default function BuildingBlogWithAIPage() {
  return (
    <Article>
      <PostHeader
        title="Building a Dev-Centric Blog with ChatGPT & Cursor"
        subtitle="How a backend-focused AI engineer built a presentable frontend by using screenshots as the feedback signal."
        author="Minh Bui"
        date="2025-03-30"
        readingTime="6 min read"
        tags={['ai', 'development', 'cursor', 'gpt4', 'nextjs']}
      />
      <PostBody>
        <Lead>
          <p>
            I work mostly on backend and AI systems and have little patience for CSS. This post describes the workflow I used to build this blog anyway: write a component with Cursor, look at the result, send a screenshot to GPT-4o, and apply its feedback until the page looks intentional.
          </p>
        </Lead>

        <h2>Background</h2>
        <p>
          My day-to-day work is FastAPI services, embeddings and vector databases, LangChain and LlamaIndex, and token optimization. Layout and styling are the parts I would rather delegate. I wanted a personal site that looked deliberate without spending weeks learning design, so I treated the interface as a feedback problem and let AI tools do most of the iteration.
        </p>

        <h2>The stack</h2>
        <Definitions
          items={[
            { term: 'Framework', text: 'Next.js 14 with the App Router and TypeScript, for routing, server components and type safety.' },
            { term: 'Styling', text: 'Tailwind CSS with pre-built accessible components. Utility classes are easy for AI tools to generate and easy to review.' },
            { term: 'Editor', text: 'Cursor, an editor with integrated AI coding assistance.' },
            { term: 'Design feedback', text: 'GPT-4o, which can read a screenshot and comment on layout, typography and hierarchy.' },
            { term: 'Deployment', text: 'Vercel, with git-based deployments, analytics and performance monitoring.' },
          ]}
        />
        <p>
          There were no Figma files and no reference boards. The only design inputs were screenshots of my own work and the model&apos;s feedback.
        </p>

        <h2>The workflow</h2>
        <p>Each component went through the same loop:</p>
        <Mermaid chart={loop} caption="The feedback loop used for every component." />
        <Steps
          items={[
            { title: 'Write the component', text: 'Start with something basic, such as a hero, card or navigation bar. Highlight the weak parts and ask Cursor to restyle them with Tailwind.' },
            { title: 'Review in the browser', text: 'Refresh and compare the result with what was intended.' },
            { title: 'Capture a screenshot', text: 'A full-page or section screenshot carries more information than a written description.' },
            { title: 'Ask for design feedback', text: 'Send the screenshot to GPT-4o with a goal, for example a more technical, terminal-inspired look.' },
            { title: 'Apply the suggestions', text: 'Examples: use monospaced fonts, add a blinking cursor beside the name, add hover states.' },
            { title: 'Repeat', text: 'Stop when the change between iterations becomes small.' },
          ]}
        />

        <h3>Why the loop works</h3>
        <ul>
          <li><strong>Short feedback cycles.</strong> The code, the rendered page and the critique are all in front of me, with no context switching.</li>
          <li><strong>Specific advice.</strong> A screenshot lets the model point at an actual element instead of guessing from a description.</li>
          <li><strong>Gradual learning.</strong> After enough iterations I started noticing alignment and spacing problems before the model mentioned them.</li>
          <li><strong>Availability.</strong> Feedback is there whenever I am working, including late at night.</li>
        </ul>

        <h2>Example: the hero section</h2>
        <p>
          The first version of the hero had a plain heading, default paragraph styling, a button without hover states, and no visual hierarchy. After I showed GPT-4o a screenshot, it suggested:
        </p>
        <ul>
          <li>More spacing and padding around the content</li>
          <li>Font-weight variation to establish hierarchy</li>
          <li>A subtle background treatment</li>
          <li>Hover effects on the button</li>
          <li>A small visual element or pattern</li>
        </ul>
        <p>
          After three iterations the section had purposeful spacing, varied typography and light animation. Two changes I would not have thought of myself were the subtle gradient background and a secondary button to create hierarchy.
        </p>

        <h2>Results</h2>
        <p>
          Over about two weeks I went from asking how to center a div to building most of the interface components with this loop. The result is the site you are reading: a blog and portfolio with animations, responsive layouts and a dark mode.
        </p>
        <p>
          I would not call myself a frontend developer after this. The process did make the work approachable, and I think any engineer can build a presentable interface this way.
        </p>
        <Pullquote>
          Good developer tools do not replace your skills; they speed up the feedback cycle that helps you improve them.
        </Pullquote>

        <h2>Next idea: automating the loop</h2>
        <p>
          The manual steps are repetitive, so the natural next step is a local agent that closes the loop:
        </p>
        <Steps
          title="Proposed automated loop"
          items={[
            { title: 'Code editor', text: 'Saving a change triggers a render in the development server.' },
            { title: 'UI renderer', text: 'Captures screenshots at set intervals or on significant changes.' },
            { title: 'Local agent', text: 'Orchestrates the flow between components.' },
            { title: 'GPT-4o analysis', text: 'Evaluates the UI, suggests improvements and drafts code changes.' },
          ]}
        />
        <p>
          The advantage is visual context. The model sees what was actually built and can give specific fixes instead of generic advice, and each iteration moves the design closer to a good result.
        </p>

        <h2>Takeaways</h2>
        <ul>
          <li>You do not need design skills to begin, but you do need patience for iteration.</li>
          <li>Screenshots communicate UI problems better than text prompts.</li>
          <li>The boundary between backend and frontend work is easier to cross with AI assistance.</li>
        </ul>
        <Callout label="Note">
          <p>
            The site has been redesigned since this post was first written. The workflow described here is how the original version was built.
          </p>
        </Callout>
      </PostBody>
      <PostFooter />
    </Article>
  )
}
