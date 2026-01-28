/**
 * PREVIEW PROFILE CARD - FULLY THEME-AWARE COMPONENT
 * 
 * A reusable Figma-style component with three variants:
 * 1. DEFAULT (dual theme) - Red-to-blue gradient before path selection
 * 2. THEME-BLUE (ice mode) - Career Path - Full blue theme
 * 3. THEME-RED (fire mode) - Entrepreneur Path - Full red theme
 * 
 * AUTOMATIC THEME SWITCHING:
 * - When user selects "Career Path" → automatically switches to theme-blue variant
 * - When user selects "Entrepreneur Path" → automatically switches to theme-red variant
 * - Smooth 450ms color morph animation with cubic-bezier easing
 * 
 * COLOR PALETTES:
 * 
 * Blue theme (Career Path):
 * - Primary: #00A9FF
 * - Highlight: #4AD4FF
 * - Deep BG: #001F4D
 * - Opacity tint: 8%
 * 
 * Red theme (Entrepreneur Path):
 * - Primary: #B1122C
 * - Highlight: #FF3A4A
 * - Deep BG: #3A0A12
 * - Opacity tint: 8%
 * 
 * VISUAL SPECIFICATIONS:
 * - Card background: Dark cinematic fill with 6-10% theme tint
 * - Border: 1.6px diagonal gradient (top-left → bottom-right)
 * - Inner glow: 12-16px blur at 6-12% opacity
 * - Border radius: 14px
 * - Typography: Theme primary for accents, light gray for content
 * - CTA: Theme gradient with 1.03x scale on hover, 0.98x on press
 * 
 * ACCESSIBILITY:
 * - Contrast ratio >= 4.5:1 for all text
 * - Respects prefers-reduced-motion (instant swap, no animations)
 * - 1.5px focus ring with theme color
 * - Semantic HTML and ARIA labels
 * 
 * CSS CUSTOM PROPERTIES (TOKENS):
 * --preview-primary: Theme primary color
 * --preview-highlight: Theme highlight color
 * --preview-deep-bg: Deep background color
 * --preview-bg: Card background with opacity
 * --preview-border-gradient: Diagonal border gradient
 * --preview-glow: Inner glow color
 * --preview-cta-gradient: CTA button gradient
 * --preview-check-bg: Check icon gradient
 */

import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import ElectricBorder from './ElectricBorder';

interface PreviewProfileCardProps {
  formData: {
    fullName: string;
    college: string;
    path: string;
    year: string;
    description: string;
  };
  onEdit: () => void;
}

// Theme color palettes with CSS custom properties
const THEME_TOKENS = {
  fire: {
    // Red theme (Entrepreneur Path)
    '--preview-primary': '#B1122C',
    '--preview-highlight': '#FF3A4A',
    '--preview-deep-bg': '#3A0A12',
    '--preview-bg': 'rgba(177, 18, 44, 0.08)',
    '--preview-border-gradient': 'linear-gradient(135deg, #B1122C 0%, #FF3A4A 100%)',
    '--preview-glow': 'rgba(177, 18, 44, 0.12)',
    '--preview-cta-gradient': 'linear-gradient(135deg, #B1122C 0%, #FF3A4A 100%)',
    '--preview-check-bg': 'linear-gradient(135deg, #B1122C 0%, #FF3A4A 100%)',
  },
  ice: {
    // Blue theme (Career Path)
    '--preview-primary': '#00A9FF',
    '--preview-highlight': '#4AD4FF',
    '--preview-deep-bg': '#001F4D',
    '--preview-bg': 'rgba(0, 169, 255, 0.08)',
    '--preview-border-gradient': 'linear-gradient(135deg, #00A9FF 0%, #4AD4FF 100%)',
    '--preview-glow': 'rgba(0, 169, 255, 0.12)',
    '--preview-cta-gradient': 'linear-gradient(135deg, #00A9FF 0%, #4AD4FF 100%)',
    '--preview-check-bg': 'linear-gradient(135deg, #00A9FF 0%, #4AD4FF 100%)',
  },
  dual: {
    // Default dual theme (before selection)
    '--preview-primary': '#B1122C',
    '--preview-highlight': '#00A9FF',
    '--preview-deep-bg': '#1A0A12',
    '--preview-bg': 'rgba(177, 18, 44, 0.06)',
    '--preview-border-gradient': 'linear-gradient(135deg, #B1122C 0%, #FF3A4A 50%, #00A9FF 100%)',
    '--preview-glow': 'rgba(0, 169, 255, 0.1)',
    '--preview-cta-gradient': 'linear-gradient(135deg, #B1122C 0%, #00A9FF 100%)',
    '--preview-check-bg': 'linear-gradient(135deg, #B1122C 0%, #00A9FF 100%)',
  },
  default: {
    // Fallback
    '--preview-primary': '#3b82f6',
    '--preview-highlight': '#60a5fa',
    '--preview-deep-bg': '#1e293b',
    '--preview-bg': 'rgba(59, 130, 246, 0.08)',
    '--preview-border-gradient': 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
    '--preview-glow': 'rgba(59, 130, 246, 0.12)',
    '--preview-cta-gradient': 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
    '--preview-check-bg': 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
  },
};

export function PreviewProfileCard({ formData, onEdit }: PreviewProfileCardProps) {
  const { theme } = useTheme();

  // Get current theme tokens
  const tokens = THEME_TOKENS[theme.mode] || THEME_TOKENS.default;

  // Check for reduced motion preference
  const prefersReducedMotion = 
    typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Animation duration
  const transitionDuration = prefersReducedMotion ? 0 : 0.45;
  const transitionEasing = [0.22, 1, 0.36, 1];

  // Electric border color based on theme
  const electricColor = theme.mode === 'fire' ? '#FF3A4A' : theme.mode === 'ice' ? '#7df9ff' : '#00A9FF';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: prefersReducedMotion ? 0 : 0.22,
        ease: transitionEasing,
      }}
      className="relative group"
      style={tokens as React.CSSProperties}
    >
      {/* Outer Glow */}
      <motion.div
        className="absolute -inset-1 rounded-[16px] blur-lg"
        animate={{
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: prefersReducedMotion ? 0 : 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: `var(--preview-border-gradient)`,
          transition: prefersReducedMotion 
            ? 'none' 
            : `background ${transitionDuration}s cubic-bezier(${transitionEasing.join(',')})`,
        }}
      />

      {/* Electric Border Wrapper */}
      <ElectricBorder
        color={electricColor}
        speed={0.8}
        chaos={0.08}
        thickness={1.5}
        borderRadius={14}
        visible={true}
        style={{ 
          borderRadius: 14
        }}
      >
        {/* Card Container */}
        <motion.div
          className="relative rounded-[14px] overflow-hidden"
          style={{
            background: 'var(--preview-bg)',
            border: '1.6px solid transparent',
            backgroundClip: 'padding-box',
            transition: prefersReducedMotion 
              ? 'none' 
              : `background ${transitionDuration}s cubic-bezier(${transitionEasing.join(',')})`,
          }}
        >
          {/* Animated Border Gradient (diagonal) */}
          <motion.div
            className="absolute inset-0 rounded-[14px] pointer-events-none"
            style={{
              padding: '1.6px',
              background: 'var(--preview-border-gradient)',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              transition: prefersReducedMotion 
                ? 'none' 
                : `background ${transitionDuration}s cubic-bezier(${transitionEasing.join(',')})`,
            }}
          />

          {/* Inner Glow (subtle lift effect) */}
          <motion.div
            className="absolute inset-0 rounded-[14px] pointer-events-none"
            style={{
              boxShadow: `inset 0 0 16px 0 var(--preview-glow)`,
              transition: prefersReducedMotion 
                ? 'none' 
                : `box-shadow ${transitionDuration}s cubic-bezier(${transitionEasing.join(',')})`,
            }}
          />

          {/* Content */}
          <div className="relative p-8 backdrop-blur-xl bg-slate-950/60">
            {/* Header */}
            <motion.h3 
              className="text-white mb-6 flex items-center gap-2.5"
              style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                letterSpacing: '-0.01em',
              }}
            >
              {/* Check Icon with Theme Gradient */}
              <motion.div
                className="w-8 h-8 rounded-xl flex items-center justify-center relative overflow-hidden"
                style={{
                  background: 'var(--preview-check-bg)',
                  transition: prefersReducedMotion 
                    ? 'none' 
                    : `background ${transitionDuration}s cubic-bezier(${transitionEasing.join(',')})`,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Check className="w-5 h-5 text-white relative z-10" strokeWidth={3} />
                
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 2.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.div>
              
              <span>Preview Your Profile</span>
            </motion.h3>

            {/* Field Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { label: 'Name', value: formData.fullName },
                { label: 'College', value: formData.college },
                { label: 'Path', value: formData.path },
                { label: 'Year', value: formData.year },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  className="space-y-1.5"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: prefersReducedMotion ? 0 : 0.05 + index * 0.05,
                    duration: 0.3,
                  }}
                >
                  <span 
                    className="text-slate-500 text-sm font-medium"
                    style={{
                      fontSize: '0.8125rem',
                      letterSpacing: '0.01em',
                    }}
                  >
                    {item.label}
                  </span>
                  <p 
                    className="text-slate-100"
                    style={{
                      fontSize: '0.9375rem',
                      fontWeight: '500',
                      color: '#f1f5f9',
                    }}
                  >
                    {item.value}
                  </p>
                </motion.div>
              ))}

              {/* Description - Full Width */}
              <motion.div
                className="md:col-span-2 space-y-1.5"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: prefersReducedMotion ? 0 : 0.25,
                  duration: 0.3,
                }}
              >
                <span 
                  className="text-slate-500 text-sm font-medium"
                  style={{
                    fontSize: '0.8125rem',
                    letterSpacing: '0.01em',
                  }}
                >
                  Description
                </span>
                <p 
                  className="text-slate-100 leading-relaxed"
                  style={{
                    fontSize: '0.9375rem',
                    fontWeight: '400',
                    color: '#f1f5f9',
                    lineHeight: '1.6',
                  }}
                >
                  {formData.description || 'Not provided'}
                </p>
              </motion.div>
            </div>

            {/* Edit CTA Button */}
            <motion.button
              onClick={onEdit}
              className="mt-8 px-5 py-2.5 rounded-lg font-medium text-sm relative overflow-hidden group/btn focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              style={{
                background: 'var(--preview-cta-gradient)',
                color: '#ffffff',
                transition: prefersReducedMotion 
                  ? 'none' 
                  : `all 0.2s cubic-bezier(0.4, 0, 0.2, 1), background ${transitionDuration}s cubic-bezier(${transitionEasing.join(',')})`,
                boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.3)',
              }}
              whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              aria-label="Edit profile details"
            >
              {/* Button Text */}
              <span className="relative z-10 flex items-center gap-2">
                ← Edit Details
              </span>

              {/* Hover Glow */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.15) 0%, transparent 70%)',
                  transition: 'opacity 0.3s ease',
                }}
              />

              {/* Focus Ring Indicator */}
              <motion.div
                className="absolute -inset-[1.5px] rounded-lg opacity-0 pointer-events-none"
                style={{
                  border: '1.5px solid var(--preview-primary)',
                  transition: prefersReducedMotion 
                    ? 'none' 
                    : `border-color ${transitionDuration}s cubic-bezier(${transitionEasing.join(',')})`,
                }}
              />
            </motion.button>

            {/* Accessibility: Focus visible state */}
            <style>{`
              .group/btn:focus-visible > div:last-child {
                opacity: 1;
              }
            `}</style>
          </div>
        </motion.div>
      </ElectricBorder>
    </motion.div>
  );
}