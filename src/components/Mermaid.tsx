'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'

interface MermaidProps {
  chart: string
  caption?: string
}

// Greyscale palette so diagrams match the article system in both themes.
const palettes = {
  light: { background: '#ffffff', node: '#f1f5f9', border: '#94a3b8', text: '#0f172a', line: '#64748b' },
  dark: { background: '#1d232a', node: '#1e293b', border: '#475569', text: '#e2e8f0', line: '#94a3b8' },
}

export default function Mermaid({ chart, caption }: MermaidProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false
    const palette = resolvedTheme === 'dark' ? palettes.dark : palettes.light
    ;(async () => {
      try {
        const mermaid = (await import('mermaid')).default
        mermaid.initialize({
          startOnLoad: false,
          theme: 'base',
          securityLevel: 'strict',
          fontFamily: 'inherit',
          flowchart: { useMaxWidth: false, htmlLabels: true, padding: 12 },
          sequence: { useMaxWidth: false },
          themeVariables: {
            background: palette.background,
            primaryColor: palette.node,
            primaryBorderColor: palette.border,
            primaryTextColor: palette.text,
            secondaryColor: palette.node,
            tertiaryColor: palette.background,
            lineColor: palette.line,
            textColor: palette.text,
            clusterBkg: palette.background,
            clusterBorder: palette.border,
          },
        })
        const id = `mermaid-${Math.random().toString(36).slice(2, 11)}`
        const { svg } = await mermaid.render(id, chart)
        if (!cancelled && ref.current) {
          ref.current.innerHTML = svg
          setFailed(false)
        }
      } catch (error) {
        console.error('Mermaid render error:', error)
        if (!cancelled) setFailed(true)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [chart, resolvedTheme])

  return (
    <figure className="post-figure">
      <div className="w-full overflow-x-auto rounded-md border border-base-300 p-5 [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-none md:[&_svg]:max-w-full">
        {failed ? <p className="text-sm text-base-content/60">The diagram could not be rendered.</p> : <div ref={ref} role="img" aria-label={caption} />}
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}
