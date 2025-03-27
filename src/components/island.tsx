'use client'
import dynamic from 'next/dynamic'
import { Fragment, ReactNode, useMemo } from 'react'

export type IslandProps = {
  children: ReactNode
  Loading?: React.FC
  className?: string
}

export default function Island({ children, Loading = Fragment, className = '' }: IslandProps) {
  const Lazy = useMemo(
    () =>
      dynamic(
        () =>
          Promise.resolve(({ children }: { children: ReactNode }) => {
            return <Fragment>{children}</Fragment>
          }),
        {
          ssr: false,
          loading: () => <Loading />,
        },
      ),
    [Loading],
  )

  return <div className={className}><Lazy>{children}</Lazy></div>
}
