import Hero from './ui/animated-shader-hero';
import { GenerativeArtScene } from './ui/anomalous-matter-hero';
import { ArrowDown } from 'lucide-react';

export default function HeroSection() {
  const scrollToContent = () => {
    const element = document.getElementById('overview');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplyNow = () => {
    const element = document.getElementById('application');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLearnMore = () => {
    const element = document.getElementById('overview');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen lp-dual-energy" style={{ backgroundColor: 'var(--lp-bg-solid)' }}>
      {/* 3D Morphing Wireframe Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <GenerativeArtScene />
      </div>

      {/* Hero Content Layer */}
      <Hero
        headline={{
          line1: "Two Paths.",
          line2: "One Beginning."
        }}
        subtitle="Your journey from Zero to One starts here. Choose your path: Entrepreneur or Career."

      />

      {/* Scroll Down Indicator */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 transition-all animate-bounce hover:scale-110"
        style={{ color: 'var(--lp-blue)' }}
      >
        <ArrowDown size={32} />
      </button>
    </div>
  );
}
