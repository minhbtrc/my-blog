import { notFound } from 'next/navigation'
import { isProjectReviewEnabled, projectStories } from '@/data/project-stories'
import { StoryArticle } from '@/components/post/story'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Project story | Author review', robots: { index: false, follow: false } }

export default function ProjectStoryReviewPage({ params }: { params: { slug: string } }) {
  if (!isProjectReviewEnabled()) notFound()
  const story = projectStories.find(item => item.slug === params.slug)
  if (!story) notFound()
  return <StoryArticle story={story} review />
}
