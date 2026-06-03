import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import * as RadixDialog from '@radix-ui/react-dialog'
import toast from 'react-hot-toast'
import { DialogContent } from '../ui/Dialog'
import { useRenameSection } from '../../hooks/useDashboard'
import type { Section } from '../../types/budget'

const schema = z.object({
  name: z.string().min(1, 'Nom requis').max(30, 'Max 30 caractères'),
})

type FormValues = z.infer<typeof schema>

interface RenameSectionModalProps {
  section: Section | null
  year: number
  month: number
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function RenameSectionModal({
  section,
  year,
  month,
  open,
  onOpenChange,
}: RenameSectionModalProps) {
  const rename = useRenameSection(year, month)

  const { register, handleSubmit, reset, setFocus, formState: { errors, isSubmitting } } =
    useForm<FormValues>({
      resolver: zodResolver(schema),
      defaultValues: { name: section?.name ?? '' },
    })

  // pré-remplit + focus à l'ouverture
  useEffect(() => {
    if (open && section) {
      reset({ name: section.name })
      setTimeout(() => setFocus('name'), 50)
    }
  }, [open, section, reset, setFocus])

  if (!section) return null

  async function onSubmit({ name }: FormValues) {
    const res = await rename.mutateAsync({ sectionId: section!.id, name })
    if ('error' in res) {
      toast.error(res.error)
      return
    }
    toast.success('Section renommée')
    onOpenChange(false)
  }

  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <DialogContent title="Renommer la section" maxWidth="400px">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-(--t-2)">Nouveau nom</label>
            <input
              {...register('name')}
              placeholder={section.name}
              className="w-full rounded-md border border-(--border-medium) bg-(--bg-1) px-3 py-2.5 text-sm text-(--t-1) placeholder:text-(--t-3) outline-none transition-colors focus:border-(--accent)"
            />
            {errors.name && <p className="text-xs text-(--error)">{errors.name.message}</p>}
          </div>

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="flex-1 py-2.5 rounded-full text-sm font-semibold text-(--t-2) bg-(--bg-3) transition-colors hover:bg-(--bg-4)"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2.5 rounded-full text-sm font-semibold text-white bg-(--accent) transition-colors hover:bg-(--accent-hover) disabled:opacity-60"
            >
              {isSubmitting ? 'Renommage…' : 'Renommer'}
            </button>
          </div>
        </form>
      </DialogContent>
    </RadixDialog.Root>
  )
}
