'use client'
import { useCallback, useState } from 'react'
import copy from 'copy-to-clipboard'
import clsx from 'clsx'

import { Check, Copy } from 'lucide-react'

import { delay } from '@/lib/utils'

export type ClipboardProps = {
  content: string
  className?: string
  iconClassName?: string
}

export default function Clipboard({
  content,
  className = 'btn btn-sm btn-ghost btn-square',
  iconClassName = 'w-4 h-4',
}: ClipboardProps) {
  const [copied, setCopied] = useState(false)

  const onCopy = useCallback(async () => {
    copy(content)
    setCopied(true)
    await delay(1500)
    return setCopied(false)
  }, [content])

  return (
    <button className={className} onClick={onCopy}>
      <Copy className={clsx(iconClassName, { hidden: copied })} />
      <Check className={clsx(iconClassName, { hidden: !copied })} />
    </button>
  )
}
