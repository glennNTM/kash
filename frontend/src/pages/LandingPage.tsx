import SiteHeader from '../components/layout/Header'
import LandingHero from '../components/landing/LandingHero'
import LandingShowcase from '../components/landing/LandingShowcase'
import LandingProblem from '../components/landing/LandingProblem'
import LandingSteps from '../components/landing/LandingSteps'
import LandingVideo from '../components/landing/LandingVideo'
import LandingStory from '../components/landing/LandingStory'
import LandingEbook from '../components/landing/LandingEbook'
import LandingFAQ from '../components/landing/LandingFAQ'
import LandingCTAFinal from '../components/landing/LandingCTAFinal'
import LandingFooter from '../components/landing/LandingFooter'

export default function LandingPage() {
  return (
    <div className="min-h-dvh flex flex-col bg-(--bg-1)">
      <SiteHeader />
      <main className="flex-1">
        <LandingHero />
        <LandingShowcase />
        <LandingProblem />
        <LandingSteps />
        <LandingVideo />
        <LandingStory />
        <LandingEbook />
        <LandingFAQ />
        <LandingCTAFinal />
      </main>
      <LandingFooter />
    </div>
  )
}
