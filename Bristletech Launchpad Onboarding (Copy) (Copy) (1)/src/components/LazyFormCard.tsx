import { useState, useEffect, useRef, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { INTERSECTION_CONFIG, ANIMATION_DURATION, EASING, getCubicBezier } from '../lib/animation-tokens';

/**
 * LAZY-LOADED FORM CARD WITH SKELETON
 * 
 * Performance optimizations:
 * - IntersectionObserver triggers content load
 * - Skeleton placeholder prevents layout shift
 * - Smooth fade transition
 * - GPU-accelerated animations only
 */

interface LazyFormCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function LazyFormCard({ children, className = '', delay = 0 }: LazyFormCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;

    // Create IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasLoaded) {
            // Add delay if specified
            setTimeout(() => {
              setIsVisible(true);
              setHasLoaded(true);
            }, delay);
          }
        });
      },
      {
        rootMargin: INTERSECTION_CONFIG.ROOT_MARGIN,
        threshold: INTERSECTION_CONFIG.THRESHOLD,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [hasLoaded, delay]);

  return (
    <div ref={cardRef} className={className}>
      <AnimatePresence mode="wait">
        {!isVisible ? (
          // Skeleton Placeholder
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: ANIMATION_DURATION.MICRO_FAST / 1000,
            }}
            className="relative rounded-3xl overflow-hidden backdrop-blur-2xl border border-white/10"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)',
              contain: 'layout style paint',
            }}
          >
            <div className="p-8 md:p-12 space-y-6">
              {/* Skeleton Header */}
              <div className="space-y-3">
                <div className="h-6 w-32 bg-white/10 rounded-lg animate-pulse" />
                <div className="h-4 w-48 bg-white/5 rounded animate-pulse" />
              </div>

              {/* Skeleton Fields */}
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-24 bg-white/10 rounded animate-pulse" />
                  <div className="h-12 w-full bg-white/5 rounded-xl animate-pulse" />
                </div>
              ))}

              {/* Animated shimmer overlay */}
              <motion.div
                animate={{ x: ['-100%', '100%'] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                style={{ willChange: 'transform' }}
              />
            </div>
          </motion.div>
        ) : (
          // Actual Content
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: ANIMATION_DURATION.MEDIUM_FAST / 1000,
              ease: getCubicBezier(EASING.SMOOTH_OUT),
            }}
            style={{
              willChange: 'transform, opacity',
              transform: 'translate3d(0, 0, 0)',
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * SKELETON INPUT FIELD
 * Reusable skeleton for individual inputs
 */
export function SkeletonInput() {
  return (
    <div className="space-y-2 animate-pulse">
      <div className="h-4 w-24 bg-white/10 rounded" />
      <div className="h-12 w-full bg-white/5 rounded-xl border border-white/10" />
    </div>
  );
}

/**
 * SKELETON BUTTON
 * Reusable skeleton for buttons
 */
export function SkeletonButton() {
  return (
    <div className="h-14 w-full bg-white/5 rounded-2xl border border-white/10 animate-pulse" />
  );
}
