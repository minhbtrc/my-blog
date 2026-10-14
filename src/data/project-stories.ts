import 'server-only'
import executive from '@/content/project-stories/multi-agent-executive-assistant.json'
import prism from '@/content/project-stories/prism.json'
import langchain from '@/content/project-stories/langchain-chatbot.json'
import blog from '@/content/project-stories/building-blog-with-ai.json'
import covid from '@/content/project-stories/covid-chatbot.json'
import template from '@/content/project-stories/chatbot-template.json'

export interface ProjectStory {
  slug: string
  project: string
  title: string
  summary: string
  /** One-paragraph introduction shown under the title. */
  lead: string
  status: string
  stack: string[]
  flow: string[]
  /** Mermaid source plus the caption shown beneath it. */
  diagram?: { chart: string; caption: string }
  sections: {
    title: string
    paragraphs: string[]
    points?: string[]
    figures?: { src: string; alt: string; caption: string; width?: number; height?: number }[]
  }[]
  /** Author-only questions. Shown on the local review page, never in published copy. */
  reviewNotes: string[]
  sources: { label: string; url: string; note?: string }[]
}

export const projectStories: ProjectStory[] = [executive, prism, langchain, blog, covid, template]
export const isProjectReviewEnabled = () => process.env.NODE_ENV === 'development'
export const readingMinutes = (story: ProjectStory) => Math.max(1, Math.ceil(story.sections.flatMap(section => section.paragraphs).join(' ').split(/\s+/).length / 200))
