import executive from '@/content/project-stories/multi-agent-executive-assistant.json'
import prism from '@/content/project-stories/prism.json'
import langchain from '@/content/project-stories/langchain-chatbot.json'
import blog from '@/content/project-stories/building-blog-with-ai.json'
import covid from '@/content/project-stories/covid-chatbot.json'
import template from '@/content/project-stories/chatbot-template.json'

/** Lightweight summaries for the blog index. Full content stays in project-stories.ts (server only). */
export const projectStorySummaries = [executive, prism, langchain, blog, covid, template].map(story => ({
  slug: story.slug,
  title: story.title,
  summary: story.summary,
  stack: story.stack,
}))
