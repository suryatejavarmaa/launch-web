import { useRef } from 'react';
import ElectricBorder from './ui/electric-border';
import VariableProximity from './ui/variable-proximity';
import { Rocket, Briefcase, CheckCircle2 } from 'lucide-react';

export function CareerOverview() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="overview"
      className="py-12 md:py-16 lp-bg relative overflow-hidden"
      style={{ backgroundColor: 'var(--lp-bg-solid)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={containerRef}>
        {/* Header */}
        <div className="text-center mb-16">
          <div className="px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 font-bold text-white">
              Your Path <span className="text-glow-blue">Forward</span>
            </h2>
            <p className="text-lg sm:text-xl px-2 text-slate-400">
              Two paths. One beginning. Choose your direction with Launchpad.
            </p>
          </div>
        </div>

        <div className="mb-16 text-center cursor-default min-h-[100px] flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
          {/* Red Portion */}
          <VariableProximity
            label="Fear Nothing."
            className="text-4xl md:text-6xl font-black tracking-tight"
            fromFontVariationSettings="'wght' 400, 'opsz' 9"
            toFontVariationSettings="'wght' 1000, 'opsz' 40"
            containerRef={containerRef as React.RefObject<HTMLElement>}
            radius={100}
            falloff="gaussian"
            style={{ color: 'var(--lp-red)' }}
          />
          {/* Blue Portion */}
          <VariableProximity
            label="Build Everything."
            className="text-4xl md:text-6xl font-black tracking-tight"
            fromFontVariationSettings="'wght' 400, 'opsz' 9"
            toFontVariationSettings="'wght' 1000, 'opsz' 40"
            containerRef={containerRef as React.RefObject<HTMLElement>}
            radius={100}
            falloff="gaussian"
            style={{ color: 'var(--lp-blue)' }}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-stretch max-w-5xl mx-auto">
          {/* Entrepreneur Path - RED */}
          <ElectricBorder
            color="#E11D48"
            speed={0.5}
            chaos={0.15}
            borderRadius={32}
            className="h-full"
          >
            <div
              className="h-full min-h-[420px] rounded-[32px] p-8 lg:p-10 relative overflow-hidden flex flex-col"
              style={{
                background: 'linear-gradient(145deg, rgba(40, 15, 20, 1) 0%, rgba(25, 10, 15, 1) 50%, rgba(15, 8, 12, 1) 100%)',
                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), inset 0 0 80px rgba(225, 29, 72, 0.12)'
              }}
            >
              {/* Background Glow Effects */}
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-bl from-rose-500/20 via-rose-600/10 to-transparent blur-[80px] rounded-full pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-rose-500/8 blur-[60px] rounded-full pointer-events-none" />

              {/* Subtle top highlight */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-rose-400/30 to-transparent" />

              <div className="relative z-10 flex-1 flex flex-col">
                {/* Header Section */}
                <div className="mb-auto">
                  {/* Icon + Badge Row */}
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, rgba(225, 29, 72, 0.3) 0%, rgba(225, 29, 72, 0.1) 100%)',
                        border: '1px solid rgba(225, 29, 72, 0.4)',
                        boxShadow: '0 0 20px rgba(225, 29, 72, 0.3)',
                        padding: '8px'
                      }}
                    >
                      <Rocket className="w-6 h-6 text-white" />
                    </div>
                    <div
                      className="px-3 py-1.5 rounded-full"
                      style={{
                        background: 'linear-gradient(135deg, rgba(225, 29, 72, 0.2) 0%, rgba(225, 29, 72, 0.05) 100%)',
                        border: '1px solid rgba(225, 29, 72, 0.3)'
                      }}
                    >
                      <span className="text-xs font-semibold text-white tracking-wider uppercase">
                        Entrepreneur Path
                      </span>
                    </div>
                  </div>

                  {/* Title - RED color */}
                  <h4
                    className="text-3xl lg:text-4xl font-black mb-4 tracking-tight"
                    style={{ color: '#F43F5E' }}
                  >
                    Create Your Empire
                  </h4>

                  {/* Description - slate-400 */}
                  <p className="text-slate-400 text-base lg:text-lg leading-relaxed max-w-sm">
                    Launch and scale your own startup with expert guidance and proven frameworks.
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-3 mt-8">
                  {[
                    "Startup toolkit & resources",
                    "Mentor network access",
                    "Funding & pitch guidance"
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="group flex items-center gap-4 py-3 px-4 rounded-2xl transition-all duration-300 hover:translate-x-1"
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.08)'
                      }}
                    >
                      <CheckCircle2 className="w-5 h-5 text-rose-400 flex-shrink-0" />
                      <span className="text-white font-medium tracking-wide">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ElectricBorder>

          {/* Career Path - BLUE */}
          <ElectricBorder
            color="#0EA5E9"
            speed={0.5}
            chaos={0.15}
            borderRadius={32}
            className="h-full"
          >
            <div
              className="h-full min-h-[420px] rounded-[32px] p-8 lg:p-10 relative overflow-hidden flex flex-col"
              style={{
                background: 'linear-gradient(145deg, rgba(15, 25, 40, 1) 0%, rgba(10, 18, 30, 1) 50%, rgba(5, 12, 22, 1) 100%)',
                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), inset 0 0 80px rgba(14, 165, 233, 0.12)'
              }}
            >
              {/* Background Glow Effects */}
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-bl from-sky-500/20 via-sky-600/10 to-transparent blur-[80px] rounded-full pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-sky-500/8 blur-[60px] rounded-full pointer-events-none" />

              {/* Subtle top highlight */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sky-400/30 to-transparent" />

              <div className="relative z-10 flex-1 flex flex-col">
                {/* Header Section */}
                <div className="mb-auto">
                  {/* Icon + Badge Row */}
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.3) 0%, rgba(14, 165, 233, 0.1) 100%)',
                        border: '1px solid rgba(14, 165, 233, 0.4)',
                        boxShadow: '0 0 20px rgba(14, 165, 233, 0.3)',
                        padding: '8px'
                      }}
                    >
                      <Briefcase className="w-6 h-6 text-white" />
                    </div>
                    <div
                      className="px-3 py-1.5 rounded-full"
                      style={{
                        background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.2) 0%, rgba(14, 165, 233, 0.05) 100%)',
                        border: '1px solid rgba(14, 165, 233, 0.3)'
                      }}
                    >
                      <span className="text-xs font-semibold text-white tracking-wider uppercase">
                        Career Path
                      </span>
                    </div>
                  </div>

                  {/* Title - BLUE color */}
                  <h4
                    className="text-3xl lg:text-4xl font-black mb-4 tracking-tight"
                    style={{ color: '#38BDF8' }}
                  >
                    Build Your Future
                  </h4>

                  {/* Description - slate-400 */}
                  <p className="text-slate-400 text-base lg:text-lg leading-relaxed max-w-sm">
                    Master skills and land your dream job in tech with industry-ready training.
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-3 mt-8">
                  {[
                    "Industry-grade projects",
                    "Technical interview prep",
                    "Job placement support"
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="group flex items-center gap-4 py-3 px-4 rounded-2xl transition-all duration-300 hover:translate-x-1"
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.08)'
                      }}
                    >
                      <CheckCircle2 className="w-5 h-5 text-sky-400 flex-shrink-0" />
                      <span className="text-white font-medium tracking-wide">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ElectricBorder>
        </div>
      </div>
    </section>
  );
}
