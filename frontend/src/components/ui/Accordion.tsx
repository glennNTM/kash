import * as AccordionPrimitive from '@radix-ui/react-accordion'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { ChevronDown } from '../../lib/icons'

/**
 * Accordéon accessible (clavier + ARIA) au-dessus de Radix.
 * Utilisé pour la FAQ : comportement complexe → primitive Radix justifiée.
 */
export function Accordion(
  props: ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>
) {
  return <AccordionPrimitive.Root {...props} />
}

export function AccordionItem({
  value,
  children,
}: {
  value: string
  children: ReactNode
}) {
  return (
    <AccordionPrimitive.Item
      value={value}
      className="border-b border-(--border-subtle)"
    >
      {children}
    </AccordionPrimitive.Item>
  )
}

export function AccordionTrigger({
  children,
  ...props
}: ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header>
      <AccordionPrimitive.Trigger
        className="group flex w-full items-center justify-between gap-4 py-5 text-left text-(--t-1) font-semibold transition-colors hover:text-(--accent)"
        style={{ fontSize: 'var(--text-heading-m)' }}
        {...props}
      >
        {children}
        <ChevronDown
          size={18}
          strokeWidth={2.25}
          className="shrink-0 text-(--t-3) transition-transform duration-(--duration-fast) group-data-[state=open]:rotate-180"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

export function AccordionContent({
  children,
}: {
  children: ReactNode
}) {
  return (
    <AccordionPrimitive.Content className="overflow-hidden">
      <div
        className="pb-5 pr-8 text-(--t-2)"
        style={{ fontSize: 'var(--text-body-l)', lineHeight: '1.7' }}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
}
