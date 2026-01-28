'use client'
import React from "react";
import { LucideIcon } from "lucide-react";

interface GradientCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  features?: string[];
  index?: number;
  pathType?: 'entrepreneur' | 'career';
}

export const GradientCard = ({
  title,
  description,
  icon: Icon,
  gradient,
  features = [],
  pathType = 'career',
}: GradientCardProps) => {
  const isEntrepreneur = pathType === 'entrepreneur';
  const glowColor = isEntrepreneur ? 'var(--lp-red)' : 'var(--lp-blue)';
  const glowRgb = isEntrepreneur ? '177, 18, 44' : '0, 169, 255';

  return (
    <div
      className="relative rounded-3xl overflow-hidden h-full group"
      style={{
        backgroundColor: "var(--lp-bg-solid)",
      }}
    >
      {/* Static glass reflection overlay */}
      <div
        className="absolute inset-0 z-30 pointer-events-none opacity-50 group-hover:opacity-80 transition-opacity duration-300"
        style={{
          background: `linear-gradient(135deg, rgba(${glowRgb},0.1) 0%, rgba(${glowRgb},0) 40%, rgba(${glowRgb},0) 80%, rgba(${glowRgb},0.05) 100%)`,
        }}
      />

      {/* Dark background with gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(180deg, rgba(10,5,16,1) 0%, rgba(5,2,8,1) 70%)",
        }}
      />

      {/* Simplified glow effect */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/2 z-20 opacity-60 group-hover:opacity-80 transition-opacity duration-300"
        style={{
          background: `linear-gradient(to top, rgba(${glowRgb}, 0.4) 0%, rgba(${glowRgb}, 0.2) 40%, transparent 100%)`,
        }}
      />

      {/* Bottom border glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] z-25"
        style={{
          background: `linear-gradient(90deg, rgba(${glowRgb}, 0.1) 0%, ${glowColor} 50%, rgba(${glowRgb}, 0.1) 100%)`,
          boxShadow: `0 0 12px 2px rgba(${glowRgb}, 0.5)`,
        }}
      />

      {/* Card content */}
      <div className="relative flex flex-col h-full p-8 z-40 transform group-hover:-translate-y-1 transition-transform duration-300">
        {/* Icon circle with gradient */}
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br ${gradient} group-hover:scale-105 transition-transform duration-300`}
          style={{
            boxShadow: `0 6px 16px -2px rgba(${glowRgb}, 0.4)`,
          }}
        >
          <Icon style={{ color: `rgba(${glowRgb}, 0.95)` }} size={32} />
        </div>

        {/* Content */}
        <div className="mb-auto">
          <h3
            className="text-2xl font-semibold mb-4"
            style={{
              color: `rgba(${glowRgb}, 0.95)`,
              letterSpacing: "-0.01em",
              lineHeight: 1.3,
            }}
          >
            {title}
          </h3>

          <p
            className="text-sm mb-6"
            style={{
              color: `rgba(${glowRgb}, 0.7)`,
              lineHeight: 1.6,
            }}
          >
            {description}
          </p>

          {/* Features list */}
          {features.length > 0 && (
            <div className="space-y-2">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <div className="mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      style={{ color: glowColor }}
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M12 2c-.218 0 -.432 .002 -.642 .005l-.616 .017l-.299 .013l-.579 .034l-.553 .046c-4.785 .464 -6.732 2.411 -7.196 7.196l-.046 .553l-.034 .579c-.005 .098 -.01 .198 -.013 .299l-.017 .616l-.004 .318l-.001 .324c0 .218 .002 .432 .005 .642l.017 .616l.013 .299l.034 .579l.046 .553c.464 4.785 2.411 6.732 7.196 7.196l.553 .046l.579 .034c.098 .005 .198 .01 .299 .013l.616 .017l.642 .005l.642 -.005l.616 -.017l.299 -.013l.579 -.034l.553 -.046c4.785 -.464 6.732 -2.411 7.196 -7.196l.046 -.553l.034 -.579c.005 -.098 .01 -.198 .013 -.299l.017 -.616l.005 -.642l-.005 -.642l-.017 -.616l-.013 -.299l-.034 -.579l-.046 -.553c-.464 -4.785 -2.411 -6.732 -7.196 -7.196l-.553 -.046l-.579 -.034a28.058 28.058 0 0 0 -.299 -.013l-.616 -.017l-.318 -.004l-.324 -.001zm2.293 7.293a1 1 0 0 1 1.497 1.32l-.083 .094l-4 4a1 1 0 0 1 -1.32 .083l-.094 -.083l-2 -2a1 1 0 0 1 1.32 -1.497l.094 .083l1.293 1.292l3.293 -3.292z" fill="currentColor" strokeWidth="0" />
                    </svg>
                  </div>
                  <p style={{ color: `rgba(${glowRgb}, 0.7)` }} className="text-sm">{feature}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
