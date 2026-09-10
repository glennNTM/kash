import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../ui/Accordion'
import { FAQ_ITEMS } from '../../lib/constants'

export default function LandingFAQ() {
  return (
    <section
      id="faq"
      className="scroll-mt-20 bg-(--bg-2) border-t border-(--border-subtle) py-20 md:py-28"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid md:grid-cols-[minmax(0,320px)_1fr] gap-10 lg:gap-16 items-start">
          <div className="flex flex-col gap-4 md:sticky md:top-24">
            <span
              className="uppercase text-(--t-3)"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-eyebrow)',
                fontWeight: 700,
                letterSpacing: '0.14em',
              }}
            >
              Questions
            </span>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
              Tout ce que tu te demandes
            </h2>
          </div>

          <Accordion type="single" collapsible className="border-t border-(--border-medium)">
            {FAQ_ITEMS.map((item, i) => (
              <AccordionItem key={item.q} value={`faq-${i}`}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
