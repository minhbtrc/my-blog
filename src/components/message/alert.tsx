'use client'
import { CSSProperties, useState, useEffect } from 'react'
import { useInterval } from 'react-use'
import clsx from 'clsx'
import { motion } from 'framer-motion'

import {
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  Info,
  X,
  XCircle,
} from 'lucide-react'

import { type MessageProps, type MessageType, useMessage } from './store'

export function AlertIcon({ type }: { type: MessageType }) {
  if (type === 'alert-error') return <XCircle />
  if (type === 'alert-warning') return <AlertTriangle />
  if (type === 'alert-info') return <Info />
  if (type === 'alert-success') return <CheckCircle />
  return <HelpCircle />
}

export default function Alert({
  id,
  type,
  message,
  ttl,
  onClick,
}: MessageProps) {
  const [hover, setHover] = useState(false)
  const [counter, setCounter] = useState(0)
  const [mounted, setMounted] = useState(false)
  const unregister = useMessage(({ unregister }) => unregister)

  useEffect(() => {
    setMounted(true)
  }, [])

  useInterval(
    () => {
      if (counter >= 100) unregister(id)
      else setCounter(counter + 1)
    },
    hover ? null : Math.round(ttl / 100),
  )

  return (
    <div
      className={clsx('cursor-pointer alert max-w-sm shadow-xl', type)}
      onClick={() => onClick()}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <AlertIcon type={type} />
      <p className="whitespace-normal">{message}</p>
      {mounted && (
        <motion.div
          key={id}
          className="radial-progress cursor-pointer"
          style={
            {
              '--value': counter,
              '--size': '2rem',
              '--thickness': ttl >= 0 ? '2px' : '0px',
            } as CSSProperties
          }
          onClick={(e) => {
            e.stopPropagation()
            return unregister(id)
          }}
        >
          <X className="w-5 h-5" />
        </motion.div>
      )}
    </div>
  )
}
