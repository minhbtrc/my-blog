import dynamic from 'next/dynamic'

const CodeBubbles = dynamic(() => import('@/components/code-bubbles'), {
  ssr: false
})

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <CodeBubbles />
      {children}
    </>
  )
} 