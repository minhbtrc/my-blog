import clsx from 'clsx'
import type { ComponentProps } from 'react'

export type LinkProps = ComponentProps<'a'>

export default function Link({ className, ...props }: LinkProps) {
  return (
    <a
      className={clsx(
        'transition-all text-info-content decoration-2 underline-offset-2 hover:underline-offset-4 decoration-info-content/20 hover:decoration-info-content/60',
        className,
      )}
      {...props}
    />
  )
}
