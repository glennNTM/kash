import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../ui/Accordion'
import { FAQ_ITEMS } from '../../lib/constants'

export default function LandingFAQ() {
  return (
    <section id="faq" className="scroll-mt-20 py-20 md:py-28 bg-(--bg-1)">
      <div className="max-w-3xl mx-auto px-6 md:px-10">
        <div className="text-center mb-10">
          <h2
            className="font-display font-bold text-(--t-1)"
            style={{ fontSize: 'clamp(34px, 5vw, 56px)', lineHeight: '1.1' }}
          >
            Tout ce que tu te demandes
          </h2>
        </div>

        <Accordion type="single" collapsible className="border-t border-(--border-subtle)">
          {FAQ_ITEMS.map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
