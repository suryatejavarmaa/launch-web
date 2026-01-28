import { ContainerScroll } from './ui/container-scroll-animation';
import { AIToolsVideo } from './AIToolsVideo';

export function PlatformShowcase() {
  return (
    <section id="platform" className="lp-bg overflow-hidden" style={{ backgroundColor: 'var(--lp-bg-solid)' }}>
      <ContainerScroll
        titleComponent={
          <div className="space-y-3 pb-6 relative">
            <h2 className="text-3xl md:text-5xl tracking-tight relative z-10">
              {/* Gradient for main heading - ACCENT USE */}
              <span className="block mt-2 font-bold text-white">
                <span className="text-glow-red">AI-Powered</span> Learning
              </span>
            </h2>
            {/* Neutral color for description */}
            <p className="text-base md:text-lg max-w-3xl mx-auto text-slate-400 relative z-10">
              Our revolutionary platform combines cutting-edge AI technology with personalized mentorship
              to accelerate your startup journey
            </p>
          </div>
        }
      >
        <AIToolsVideo />
      </ContainerScroll>
    </section>
  );
}
