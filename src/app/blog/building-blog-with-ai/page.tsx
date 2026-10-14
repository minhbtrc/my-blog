import { notFound } from 'next/navigation'
import { projectStories } from '@/data/project-stories'
import { StoryArticle } from '@/components/post/story'

const story = projectStories.find(item => item.slug === 'building-blog-with-ai')

export const metadata = story && { title: story.title, description: story.summary }

export default function Page() {
  if (!story) notFound()
  return <StoryArticle story={story} />
}
