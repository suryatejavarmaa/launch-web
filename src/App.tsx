import { lazy, Suspense } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { NavigationBar } from './components/NavigationBar';
import { ChatAssistant } from './components/ChatAssistant';
import { PlatformShowcase } from './components/PlatformShowcase';
import { PartnerLogos } from './components/PartnerLogos';
import { ParticleTextSection } from './components/ParticleTextSection';
import { CareerOverview } from './components/CareerOverview';
import { ZoomParallaxSection } from './components/ZoomParallaxSection';
import { EventsSection } from './components/EventsSection';
import { SuccessStories } from './components/SuccessStories';
import { TeamSection } from './components/TeamSection';
import { ApplicationForm } from './components/ApplicationForm';
import { Footer } from './components/Footer';

// Lazy load heavy components to prevent timeout issues
const HeroSection = lazy(() => import('./components/HeroSection'));
const OrbitalCareerTimeline = lazy(() => import('./components/OrbitalCareerTimeline').then(module => ({ default: module.OrbitalCareerTimeline })));

export default function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen lp-bg" style={{ backgroundColor: 'var(--lp-bg-solid)' }}>
        <NavigationBar />
        <Suspense fallback={
          <div className="w-full h-screen lp-bg lp-dual-energy flex items-center justify-center" style={{ backgroundColor: 'var(--lp-bg-solid)' }}>
            <div className="lp-text-gradient text-xl font-medium">Loading Launchpad...</div>
          </div>
        }>
          <HeroSection />
        </Suspense>
        <PlatformShowcase />
        <ZoomParallaxSection />
        <ChatAssistant />
        <PartnerLogos />
        <ParticleTextSection />
        <CareerOverview />
        <Suspense fallback={
          <div className="w-full h-screen lp-bg flex items-center justify-center" style={{ backgroundColor: 'var(--lp-bg-solid)' }}>
            <div className="lp-text-gradient text-xl font-medium">Loading Interactive Timeline...</div>
          </div>
        }>
          <OrbitalCareerTimeline />
        </Suspense>
        <EventsSection />
        <SuccessStories />
        <TeamSection />
        <ApplicationForm />
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
