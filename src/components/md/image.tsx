'use client'
import { type ComponentProps, useMemo } from 'react'
import clsx from 'clsx'

import Zoom from 'react-medium-image-zoom'

import 'react-medium-image-zoom/dist/styles.css'

export type ImageProps = ComponentProps<'img'>

export default function Image({
  alt = '',
  src: meta = '',
  className,
  ...props
}: ImageProps) {
  const { src } = useMemo(() => {
    if (typeof meta === 'string') return { src: meta }
    return meta
  }, [meta])
  return (
    <>
      <Zoom wrapElement="span">
        <img
          className={clsx('mb-2 rounded-box', className)}
          src={src}
          alt={alt}
          {...props}
        />
      </Zoom>
      <span className="text-xs opa">{alt}</span>
    </>
  )
}
