'use client'
import { type ComponentProps, useState } from 'react'
import { cn } from '@/lib/utils'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

export type ImageProps = ComponentProps<'img'>

export default function Image({
  className,
  alt,
  src,
  width,
  height,
  ...props
}: ImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <Zoom>
      <div className={cn('not-prose my-6', className)}>
        <div className="overflow-hidden rounded-lg">
          <img
            className={cn(
              'h-auto w-full transition-opacity',
              isLoaded ? 'opacity-100' : 'opacity-0'
            )}
            alt={alt}
            src={src}
            width={width}
            height={height}
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            {...props}
          />
        </div>
      </div>
    </Zoom>
  )
}
