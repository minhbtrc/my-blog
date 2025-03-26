'use client'
import {
  DetailedHTMLProps,
  Fragment,
  HTMLAttributes,
  useEffect,
  type ReactNode,
} from 'react'
import clsx from 'clsx'
import mermaid from 'mermaid'

import Clipboard from '@/components/clipboard'
import Island from '@/components/island'

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    'data-content'?: string
    'data-group'?: string
    'data-label'?: string
  }
}

export type PreProps = DetailedHTMLProps<
  HTMLAttributes<HTMLPreElement>,
  HTMLPreElement
>

function PreClient({ className, ...props }: PreProps) {
  useEffect(() => {
    mermaid.initialize({ startOnLoad: true })
    mermaid.contentLoaded()
  }, [])

  return (
    <pre
      className={clsx(className, 'p-0 rounded-box', {
        'flex flex-row justify-center bg-secondary': className === 'mermaid',
      })}
      {...props}
    />
  )
}

export default function Pre({ ['data-content']: content, ...props }: PreProps) {
  return (
    <div className="relative my-6 group">
      <Clipboard
        className="invisible group-hover:visible absolute top-2 right-2 btn btn-xs btn-square btn-ghost"
        iconClassName="w-3 h-3 text-base-300 opacity-60"
        content={content?.toString() || ''}
      />
      <Island>
        <PreClient {...props} />
      </Island>
    </div>
  )
}

export type TabsProps = { children: ReactNode }

export function Tabs({ children }: TabsProps) {
  return (
    <div role="tablist" className="tabs tabs-bordered">
      {children}
    </div>
  )
}

export type TabProps = {
  label: string
  group: string
  children: ReactNode
  defaultChecked?: boolean
}

export function Tab({
  label,
  group,
  children,
  defaultChecked = false,
}: TabProps) {
  return (
    <Fragment>
      <input
        type="radio"
        role="tab"
        className="tab first:ml-4 last:mr-4 relative top-4 text-xs opacity-60 checked:opacity-100"
        aria-label={label}
        name={group}
        defaultChecked={defaultChecked}
      />
      <div role="tabpanel" className="tab-content">
        <div className="grid grid-cols-1">
          <div className="col-span-full">{children}</div>
        </div>
      </div>
    </Fragment>
  )
}
