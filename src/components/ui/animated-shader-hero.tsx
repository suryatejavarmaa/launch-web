import React from 'react';

// Types for component props
interface HeroProps {
  trustBadge?: {
    text: string;
    icons?: string[];
  };
  headline: {
    line1: string;
    line2: string;
  };
  subtitle: string;
  buttons?: {
    primary?: {
      text: string;
      onClick?: () => void;
    };
    secondary?: {
      text: string;
      onClick?: () => void;
    };
  };
  className?: string;
}

// Simplified Hero Component without background effects
const Hero: React.FC<HeroProps> = ({
  trustBadge,
  headline,
  subtitle,
  buttons,
  className = ""
}) => {
  return (
    <div className={`relative w-full h-screen overflow-hidden ${className}`}>
      {/* Gradient overlay for better text readability */}
      <div
        className="absolute inset-0 z-5"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(15, 23, 42, 0.3) 50%, rgba(15, 23, 42, 0.6))'
        }}
      />

      {/* Hero Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
        {/* Trust Badge */}
        {trustBadge && (
          <div className="mb-8 animate-fade-in-down">
            <div
              className="flex items-center gap-2 px-6 py-3 rounded-full text-sm backdrop-blur-xl"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              {trustBadge.icons && (
                <div className="flex">
                  {trustBadge.icons.map((icon, index) => (
                    <span key={index} className="text-slate-300">
                      {icon}
                    </span>
                  ))}
                </div>
              )}
              <span className="text-slate-300">{trustBadge.text}</span>
            </div>
          </div>
        )}

        <div className="text-center space-y-6 max-w-5xl mx-auto px-4">
          {/* Main Heading with Gradient - ACCENT USE */}
          <div className="space-y-2">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold lp-text-gradient animate-fade-in-up animation-delay-200">
              {headline.line1}
            </h1>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold lp-text-gradient animate-fade-in-up animation-delay-400">
              {headline.line2}
            </h1>
          </div>

          {/* Tagline - Neutral Color */}
          <div className="animate-fade-in-up animation-delay-500">
            <p className="text-lg md:text-xl font-medium tracking-widest uppercase text-slate-400">
              One life. One story.
            </p>
          </div>

          {/* Subtitle - Neutral Color */}
          <div className="max-w-3xl mx-auto animate-fade-in-up animation-delay-600">
            <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-slate-300">
              {subtitle}
            </p>
          </div>

          {/* CTA Buttons - ACCENT USE for primary button only */}
          {buttons && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10 animate-fade-in-up animation-delay-800">
              {buttons.primary && (
                <button
                  onClick={buttons.primary.onClick}
                  className="px-8 py-4 lp-btn-primary rounded-full text-lg font-medium text-white transition-all duration-300 hover:scale-105"
                >
                  {buttons.primary.text}
                </button>
              )}
              {buttons.secondary && (
                <button
                  onClick={buttons.secondary.onClick}
                  className="px-8 py-4 rounded-full text-lg font-medium text-slate-300 hover:text-white transition-all duration-300 hover:scale-105 backdrop-blur-xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  {buttons.secondary.text}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
