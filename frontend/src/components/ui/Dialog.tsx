import * as RadixDialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

interface DialogContentProps {
  title: string
  children: React.ReactNode
  /** Largeur max du panneau, défaut 480px */
  maxWidth?: string
}

export function DialogContent({ title, children, maxWidth = '480px' }: DialogContentProps) {
  return (
    <RadixDialog.Portal>
      {/* Overlay */}
      <RadixDialog.Overlay
        className="fixed inset-0 z-200 bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
      />

      {/* Panneau */}
      <RadixDialog.Content
        className="fixed z-200 bg-(--bg-2) shadow-(--shadow-lg) focus:outline-none
          data-[state=open]:animate-in data-[state=closed]:animate-out
          data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
          data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
          /* mobile : bottom sheet */
          bottom-0 left-0 right-0 rounded-t-2xl max-h-[90dvh] overflow-y-auto
          data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom
          /* desktop : dialog centré */
          md:bottom-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2
          md:w-full md:rounded-2xl
          md:data-[state=closed]:slide-out-to-bottom-0 md:data-[state=open]:slide-in-from-bottom-0"
        style={{ maxWidth }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 sticky top-0 bg-(--bg-2) border-b border-(--border-subtle) z-10">
          <RadixDialog.Title
            className="font-bold text-(--t-1)"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-heading-l)' }}
          >
            {title}
          </RadixDialog.Title>
          <RadixDialog.Close
            className="grid place-items-center size-8 rounded-full text-(--t-3) transition-colors duration-(--duration-fast) hover:bg-(--bg-3) hover:text-(--t-1)"
            aria-label="Fermer"
          >
            <X size={18} strokeWidth={2} />
          </RadixDialog.Close>
        </div>

        {/* Contenu */}
        <div className="p-5">{children}</div>
      </RadixDialog.Content>
    </RadixDialog.Portal>
  )
}
