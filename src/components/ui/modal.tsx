import { type ReactNode } from 'react'
import clsx from 'clsx'

import { X } from 'lucide-react'
import { Dialog, DialogPanel } from '@headlessui/react'

export type ModalProps = {
  open?: boolean
  onCancel?: () => void
  children: ReactNode
  closable?: boolean
  width?: string // https://daisyui.com/components/modal/#dialog-modal-with-custom-width
  height?: string
}

export default function Modal({
  open = false,
  onCancel = () => {},
  children,
  closable = true,
  width = '',
  height = '',
}: ModalProps) {
  return (
    <Dialog
      className={clsx('fixed inset-0 z-50 flex items-center justify-center', { 
        'bg-black/50 backdrop-blur-sm': open 
      })}
      open={open}
      onClose={onCancel}
    >
      <DialogPanel
        className={clsx('relative bg-slate-800 border border-slate-700 shadow-lg rounded-lg p-5 max-w-lg w-full mx-4', {
          [width]: !!width,
          [height]: !!height,
        })}
      >
        <button
          className={clsx(
            'absolute top-3 right-3 p-1 rounded-full bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-slate-200 transition-colors',
            { 'hidden': !closable },
          )}
          onClick={onCancel}
        >
          <X className="w-4 h-4" />
        </button>
        <div className="text-slate-200">
          {children}
        </div>
      </DialogPanel>
    </Dialog>
  )
}
