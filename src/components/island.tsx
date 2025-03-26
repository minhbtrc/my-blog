'use client'
import dynamic from 'next/dynamic'
import { Fragment, ReactNode, useMemo } from 'react'

export type IslandProps = {
  children: ReactNode
  Loading?: React.FC
}

export default function Island({ children, Loading = Fragment }: IslandProps) {
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

  return <Lazy>{children}</Lazy>
}
