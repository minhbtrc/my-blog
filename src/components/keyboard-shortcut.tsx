'use client'

import { cn } from '@/lib/utils'

interface KeyboardShortcutProps {
  keys: string[]
  className?: string
  size?: 'sm' | 'md'
}

export default function KeyboardShortcut({
  keys,
  className,
  size = 'sm'
}: KeyboardShortcutProps) {
  // Format key string (e.g., "cmd" -> "⌘", "shift" -> "⇧")
  const formatKey = (key: string) => {
    const mappings: Record<string, string> = {
      'cmd': '⌘',
      'command': '⌘',
      'ctrl': 'Ctrl',
      'control': 'Ctrl',
      'alt': 'Alt',
      'option': '⌥',
      'shift': '⇧',
      'return': '↵',
      'enter': '↵',
      'esc': 'Esc',
      'escape': 'Esc',
      'tab': 'Tab',
      'space': 'Space',
      'backspace': '⌫',
      'delete': '⌦',
      'up': '↑',
      'down': '↓',
      'left': '←',
      'right': '→',
    }
    
    return mappings[key.toLowerCase()] || key
  }
  
  return (
    <span className={cn(
      "inline-flex items-center gap-0.5",
      className
    )}>
      {keys.map((key, index) => (
        <kbd
          key={index}
          className={cn(
            "font-mono rounded bg-base-200 border-b-2 border-base-300 text-base-content/80",
            size === 'sm' ? "text-[10px] px-1 py-0.5" : "text-xs px-1.5 py-0.5"
          )}
        >
          {formatKey(key)}
        </kbd>
      ))}
    </span>
  )
} 