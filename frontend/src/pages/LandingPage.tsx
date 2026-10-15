import SiteHeader from '../components/layout/Header'
import SiteFooter from '../components/layout/Footer'
import Analytics from '../components/ui/Analytics'
import LandingHero from '../components/landing/LandingHero'
import LandingReassurance from '../components/landing/LandingReassurance'
import LandingShowcase from '../components/landing/LandingShowcase'
import LandingProblem from '../components/landing/LandingProblem'
import LandingAudience from '../components/landing/LandingAudience'
import LandingSteps from '../components/landing/LandingSteps'
import LandingPillars from '../components/landing/LandingPillars'
import LandingVideo from '../components/landing/LandingVideo'
import LandingStory from '../components/landing/LandingStory'
import LandingEbook from '../components/landing/LandingEbook'
import LandingFAQ from '../components/landing/LandingFAQ'
import LandingCTAFinal from '../components/landing/LandingCTAFinal'

/**
 * Rythme de la page : les sections claires alternent `--bg-1` / `--bg-2`
 * (la réassurance prolonge le hero, d'où le même fond), puis trois blocs
 * sombres groupés en fin de parcours (Steps est l'exception, il coupe le
 * milieu). La descente vers le sombre accompagne la montée vers le CTA.
 */
export default function LandingPage() {
  return (
    <div className="min-h-dvh flex flex-col bg-(--bg-1)">
      <SiteHeader />
      <main id="contenu" tabIndex={-1} className="flex-1 outline-none">
        <LandingHero />
        <LandingReassurance />
        <LandingShowcase />
        <LandingProblem />
        <LandingAudience />
        <LandingSteps />
        <LandingPillars />
        <LandingVideo />
        <LandingStory />
        <LandingEbook />
        <LandingFAQ />
        <LandingCTAFinal />
      </main>
      <SiteFooter />
      <Analytics />
    </div>
  )
}
