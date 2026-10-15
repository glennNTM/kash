import { useEffect } from 'react'
import SiteHeader from '../components/layout/Header'
import SiteFooter from '../components/layout/Footer'
import { APP_NAME } from '../lib/constants'

/**
 * Pages légales — squelette commun aux trois documents.
 *
 * ⚠️ PLACEHOLDER : les contenus doivent être rédigés (ou relus) par quelqu'un
 * de compétent avant la mise en ligne. Le gabarit existe pour que les liens du
 * footer ne pointent plus dans le vide, pas pour tenir lieu de document légal.
 */

export type LegalDoc = 'cgu' | 'confidentialite' | 'mentions-legales'

const DOCS: Record<LegalDoc, { title: string; intro: string }> = {
  cgu: {
    title: 'Conditions générales d’utilisation',
    intro: `Les présentes conditions encadrent l’utilisation de l’application ${APP_NAME} et du présent site.`,
  },
  confidentialite: {
    title: 'Politique de confidentialité',
    intro: `${APP_NAME} ne se connecte à aucun compte bancaire : les revenus et dépenses sont saisis par l’utilisateur. Cette page détaille les données collectées et leur durée de conservation.`,
  },
  'mentions-legales': {
    title: 'Mentions légales',
    intro: `Éditeur, hébergeur et contact du site ${APP_NAME}.`,
  },
}

export default function Legal({ doc }: { doc: LegalDoc }) {
  const { title, intro } = DOCS[doc]

  // Une page légale atteinte depuis le footer doit s'ouvrir en haut, pas à la
  // position de défilement héritée de la landing.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [doc])

  return (
    <div className="min-h-dvh flex flex-col bg-(--bg-1)">
      <SiteHeader />
      <main id="contenu" tabIndex={-1} className="flex-1 outline-none">
        <div className="max-w-3xl mx-auto px-6 md:px-10 py-16 md:py-24 flex flex-col gap-6">
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>{title}</h1>
          <p className="text-(--t-2)" style={{ fontSize: 'var(--text-body-l)' }}>
            {intro}
          </p>
          <p
            className="text-(--t-3) border-t border-(--border-medium) pt-6"
            style={{ fontSize: 'var(--text-body-s)' }}
          >
            Document en cours de rédaction.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
