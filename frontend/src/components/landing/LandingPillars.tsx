import { Eye, Bell, Repeat } from '../../lib/icons'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../ui/Accordion'

// TODO(contenu à valider)
// Chaque détail doit décrire une fonctionnalité réellement prévue dans l'app.
const PILLARS = [
  {
    icon: Eye,
    title: 'Tu sais ce qu’il te reste',
    benefit: 'Un solde réel, mis à jour à chaque dépense cochée.',
    detail:
      'Kash soustrait chaque dépense de son enveloppe et affiche ton reste à vivre en permanence. Pas besoin de refaire tes comptes le 25 du mois.',
  },
  {
    icon: Bell,
    title: 'Tu es prévenu avant le dépassement',
    benefit: 'Une alerte quand une enveloppe approche de son plafond.',
    detail:
      'Dès qu’une enveloppe dépasse 80 % de son budget, Kash te le signale. Tu ajustes pendant qu’il est encore temps, pas après.',
  },
  {
    icon: Repeat,
    title: 'Ton mois se prépare tout seul',
    benefit: 'Tes dépenses récurrentes reviennent automatiquement.',
    detail:
      'Loyer, factures, abonnements : tu les saisis une fois, Kash les pré-remplit chaque mois. Il ne te reste qu’à les cocher.',
  },
] as const

/**
 * Trois bénéfices, chacun avec un détail repliable. Le titre porte le résultat
 * pour l'utilisateur ; la mécanique n'arrive que si on la demande.
 */
export default function LandingPillars() {
  return (
    <section
      id="benefices"
      className="scroll-mt-20 bg-(--bg-2) border-t border-(--border-subtle) py-20 md:py-28"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16">
        <div className="flex flex-col gap-4 mb-14 max-w-2xl">
          <span
            className="uppercase text-(--t-3)"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-eyebrow)',
              fontWeight: 700,
              letterSpacing: '0.14em',
            }}
          >
            Au quotidien
          </span>
          <h2 style={{ fontSize: 'clamp(30px, 4.4vw, 48px)' }}>
            Pas un tableur de plus, un budget qui te parle
          </h2>
        </div>

        <ul className="grid md:grid-cols-3 border-t border-(--border-medium)">
          {PILLARS.map(({ icon: Icon, title, benefit, detail }) => (
            <li
              key={title}
              className="flex flex-col gap-3 pt-8 pb-2 md:px-8 md:first:pl-0 md:last:pr-0 border-b md:border-b-0 md:border-l md:first:border-l-0 border-(--border-subtle)"
            >
              <Icon size={20} strokeWidth={1.9} className="text-(--accent)" aria-hidden />
              <h3
                className="font-body font-bold text-(--t-1)"
                style={{ fontSize: 'var(--text-heading-m)', letterSpacing: '-0.01em' }}
              >
                {title}
              </h3>
              <p className="text-(--t-2)" style={{ fontSize: 'var(--text-body)' }}>
                {benefit}
              </p>

              {/* `mt-auto` : les « Voir le détail » restent alignés même si un titre passe sur deux lignes. */}
              <Accordion type="single" collapsible className="mt-auto">
                <AccordionItem value={title}>
                  <AccordionTrigger
                    heading={false}
                    aria-label={`Voir le détail : ${title}`}
                    style={{ fontSize: 'var(--text-body-s)' }}
                  >
                    Voir le détail
                  </AccordionTrigger>
                  <AccordionContent>{detail}</AccordionContent>
                </AccordionItem>
              </Accordion>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
