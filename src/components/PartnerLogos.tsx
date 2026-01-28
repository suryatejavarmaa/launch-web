import DatabaseWithRestApi from './ui/database-with-rest-api';

export function PartnerLogos() {
  return (
    <section
      className="relative py-8 sm:py-12 md:py-14 lp-bg overflow-hidden"
      style={{ backgroundColor: 'var(--lp-bg-solid)' }}
    >
      {/* AI Tools Integration Diagram */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 mb-8 sm:mb-10 md:mb-12 relative z-10">
        <div className="flex flex-col items-center">
          <div className="mb-6 sm:mb-8 text-center px-2">
            {/* Gradient heading - ACCENT USE */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-white">
              Powered by Leading <span className="text-glow-red">AI Technologies</span>
            </h2>
            {/* Neutral description */}
            <p className="text-base sm:text-lg px-4 text-slate-400">
              Seamlessly integrated tools for your innovation journey
            </p>
          </div>

          <div className="w-full max-w-4xl mx-auto">
            <div
              className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl"
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: 'var(--lp-glow-blend)'
              }}
            >
              <DatabaseWithRestApi
                className="w-full scale-100 sm:scale-125 md:scale-150 origin-center mx-auto my-8 sm:my-10 md:my-12"
                circleText="AI"
                badgeTexts={{
                  first: "OpenAI",
                  second: "Google DeepMind",
                  third: "IBM",
                  fourth: "LLM Arena",
                  fifth: "Microsoft Azure",
                  sixth: "Hugging Face"
                }}
                buttonTexts={{
                  first: "Entrepreneur Path",
                  second: "Career Path"
                }}
                title="AI tools integration via unified platform"
                lightColor="#00A9FF"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Static background - dual energy */}
      <div className="absolute inset-0 pointer-events-none opacity-30 lp-dual-energy" />

      {/* Edge fades */}
      <div
        className="absolute inset-y-0 left-0 w-32 sm:w-48 md:w-64 pointer-events-none z-20"
        style={{
          background: 'linear-gradient(to right, var(--lp-bg-solid), transparent)'
        }}
      />
      <div
        className="absolute inset-y-0 right-0 w-32 sm:w-48 md:w-64 pointer-events-none z-20"
        style={{
          background: 'linear-gradient(to left, var(--lp-bg-solid), transparent)'
        }}
      />
    </section>
  );
}
