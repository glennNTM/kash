import * as RadixDialog from '@radix-ui/react-dialog'
import { DialogContent } from './Dialog'

interface ConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  loading?: boolean
  /** Action destructive → bouton de confirmation rouge. */
  danger?: boolean
}

/**
 * Modale de confirmation pour les actions à fort impact (suppression définitive…).
 * Applique la gradation : un impact majeur mérite une modale, pas un simple toast.
 */
export default function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = 'Confirmer',
  cancelLabel = 'Annuler',
  onConfirm,
  loading = false,
  danger = false,
}: ConfirmDialogProps) {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <DialogContent title={title} maxWidth="400px">
        <p className="text-sm text-(--t-2) mb-6" style={{ lineHeight: '1.6' }}>
          {description}
        </p>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={loading}
            className="flex-1 py-2.5 rounded-full text-sm font-semibold text-(--t-2) bg-(--bg-3) transition-colors hover:bg-(--bg-4) disabled:opacity-60"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-2.5 rounded-full text-sm font-semibold text-white transition-colors active:scale-97 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ background: danger ? 'var(--error)' : 'var(--accent)' }}
          >
            {loading ? 'Suppression…' : confirmLabel}
          </button>
        </div>
      </DialogContent>
    </RadixDialog.Root>
  )
}
