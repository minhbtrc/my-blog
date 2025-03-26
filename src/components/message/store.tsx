'use client'
import { useCallback } from 'react'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export function uuid() {
  return Math.round(Math.random() * 10 ** 9).toString()
}

export type MessageType =
  | 'alert-info'
  | 'alert-success'
  | 'alert-warning'
  | 'alert-error'

export type MessageProps = {
  id: string
  type: MessageType
  message: string
  ttl: number
  onClick: () => void
}

export type MessageStore = {
  messages: MessageProps[]
  register: (message: MessageProps) => void
  unregister: (id: string) => void
}

export const useMessage = create(
  immer<MessageStore>((set) => ({
    messages: [],
    register: (msg: MessageProps) =>
      set(({ messages }) => {
        messages.push(msg)
      }),
    unregister: (id: string) =>
      set(({ messages }) => {
        const index = messages.findIndex((msg) => msg.id === id)
        messages.splice(index, 1)
      }),
  })),
)

export function usePushMessage() {
  const register = useMessage(({ register }) => register)
  const push = useCallback(
    (
      type: MessageType,
      message: string,
      {
        ttl = 5000,
        onClick = () => {},
      }: {
        ttl?: number
        onClick?: () => void
      } = {},
    ) => {
      return register({
        id: uuid(),
        type,
        message,
        ttl,
        onClick,
      })
    },
    [register],
  )
  return push
}
