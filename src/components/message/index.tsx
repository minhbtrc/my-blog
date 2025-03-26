'use client'

import Alert from './alert'

import { useMessage } from './store'

export default function Message() {
  const messages = useMessage(({ messages }) => messages)

  return (
    <div className="toast toast-bottom toast-end p-0 -translate-x-2 -translate-y-2 z-10">
      {messages.map((msg) => (
        <Alert key={msg.id} {...msg} />
      ))}
    </div>
  )
}
