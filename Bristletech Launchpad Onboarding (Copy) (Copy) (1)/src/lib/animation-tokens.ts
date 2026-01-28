/**
 * ANIMATION TOKENS & PERFORMANCE BUDGET
 * 
 * Design System: Launchpad Ultra-Premium
 * Performance Target: 60fps sustained, <16ms frame budget
 * Max Active Complex Animations: 2 concurrent
 */

// ============================================
// DURATION TOKENS (milliseconds)
// ============================================
export const ANIMATION_DURATION = {
  // Micro - Quick feedback (120-220ms)
  MICRO_FASTEST: 120,
  MICRO_FAST: 150,
  MICRO_DEFAULT: 180,
  MICRO_SLOW: 220,
  
  // Medium - Standard transitions (450-900ms)
  MEDIUM_FAST: 450,
  MEDIUM_DEFAULT: 600,
  MEDIUM_SLOW: 800,
  MEDIUM_SLOWEST: 900,
  
  // Long - Emphasis moments (up to 1200ms)
  LONG_FAST: 1000,
  LONG_DEFAULT: 1200,
  
  // Complex - Background/ambient (3000ms+)
  AMBIENT_FAST: 3000,
  AMBIENT_DEFAULT: 8000,
  AMBIENT_SLOW: 12000,
} as const;

// ============================================
// EASING PRESETS (cubic-bezier)
// ============================================
export const EASING = {
  // Standard easing
  LINEAR: [0, 0, 1, 1],
  EASE_IN: [0.42, 0, 1, 1],
  EASE_OUT: [0, 0, 0.58, 1],
  EASE_IN_OUT: [0.42, 0, 0.58, 1],
  
  // Premium easing curves
  SMOOTH_OUT: [0.22, 1, 0.36, 1],        // Ultra-smooth deceleration
  BOUNCE_OUT: [0.34, 1.56, 0.64, 1],     // Gentle bounce
  SPRING_OUT: [0.175, 0.885, 0.32, 1.275], // Spring effect
  ELASTIC_OUT: [0.68, -0.55, 0.265, 1.55], // Elastic bounce
  
  // Theme transitions
  THEME_MORPH: [0.4, 0, 0.2, 1],         // Smooth theme changes
  COLOR_BLEND: [0.25, 0.1, 0.25, 1],     // Color interpolation
  
  // XP/Progress
  PROGRESS_FILL: [0.22, 1, 0.36, 1],     // XP bar fills
  BADGE_POP: [0.175, 0.885, 0.32, 1.275], // Badge appearance
} as const;

// ============================================
// SPRING CONFIGURATIONS (motion/react)
// ============================================
export const SPRING = {
  GENTLE: { type: 'spring', stiffness: 100, damping: 15 },
  DEFAULT: { type: 'spring', stiffness: 260, damping: 20 },
  SNAPPY: { type: 'spring', stiffness: 400, damping: 25 },
  BOUNCY: { type: 'spring', stiffness: 300, damping: 10 },
} as const;

// ============================================
// PERFORMANCE BUDGET TABLE
// ============================================
export const ANIMATION_BUDGET = {
  // Maximum active complex animations on screen
  MAX_CONCURRENT_COMPLEX: 2,
  
  // Particle limits
  MAX_PARTICLES_DESKTOP: 8,
  MAX_PARTICLES_MOBILE: 4,
  
  // Background layers
  MAX_BACKGROUND_LAYERS: 3,
  
  // Blur intensity limits (performance-friendly)
  MAX_BLUR_RADIUS: 60, // px
  
  // Frame budget
  TARGET_FPS: 60,
  MAX_FRAME_TIME: 16.67, // ms (1000/60)
  
  // Asset size limits
  MAX_LOTTIE_SIZE: 80, // KB
  MAX_IMAGE_SIZE: 150, // KB (WebP/AVIF)
  MAX_SPRITE_SIZE: 50, // KB
} as const;

// ============================================
// GPU ACCELERATION HINTS
// ============================================
export const GPU_HINTS = {
  // Properties safe to animate (GPU-accelerated)
  SAFE_PROPERTIES: ['transform', 'opacity', 'filter'] as const,
  
  // will-change values
  WILL_CHANGE_TRANSFORM: 'transform',
  WILL_CHANGE_OPACITY: 'opacity',
  WILL_CHANGE_SCROLL: 'scroll-position',
  
  // CSS containment
  CONTAINMENT_LAYOUT: 'layout',
  CONTAINMENT_PAINT: 'paint',
  CONTAINMENT_STRICT: 'strict',
  CONTAINMENT_CONTENT: 'content',
} as const;

// ============================================
// LAZY LOAD THRESHOLDS
// ============================================
export const INTERSECTION_CONFIG = {
  // IntersectionObserver options
  ROOT_MARGIN: '100px', // Load 100px before entering viewport
  THRESHOLD: 0.1,       // 10% visible triggers load
  
  // Skeleton durations
  SKELETON_MIN_DISPLAY: 300, // ms - minimum skeleton show time
  SKELETON_FADE_OUT: 200,    // ms - skeleton fade out duration
} as const;

// ============================================
// THEME TRANSITION TOKENS
// ============================================
export const THEME_TRANSITION = {
  // Duration for theme morph
  DURATION: ANIMATION_DURATION.MEDIUM_DEFAULT,
  
  // Easing for color interpolation
  EASING: EASING.THEME_MORPH,
  
  // Stagger delay between elements
  STAGGER: 50, // ms
  
  // CSS variable transition
  CSS_VAR_TRANSITION: 'all 600ms cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

// ============================================
// XP & PROGRESS ANIMATIONS
// ============================================
export const XP_ANIMATION = {
  // Micro-badge appearance
  BADGE_APPEAR_DURATION: ANIMATION_DURATION.MICRO_DEFAULT,
  BADGE_APPEAR_EASING: EASING.SMOOTH_OUT,
  BADGE_HOLD_DURATION: 1200, // ms - how long badge stays visible
  BADGE_FADE_OUT_DURATION: ANIMATION_DURATION.MICRO_FAST,
  
  // XP bar fill
  BAR_FILL_DURATION: ANIMATION_DURATION.MEDIUM_FAST,
  BAR_FILL_EASING: EASING.PROGRESS_FILL,
  
  // Glow flash on increment
  GLOW_FLASH_DURATION: 200, // ms
  GLOW_FLASH_INTENSITY: 0.4, // opacity
  
  // Badge unlock pop
  BADGE_UNLOCK_SPRING: SPRING.BOUNCY,
  BADGE_UNLOCK_DELAY_STAGGER: 100, // ms between badges
} as const;

// ============================================
// SCROLL PERFORMANCE
// ============================================
export const SCROLL_CONFIG = {
  // Passive event listeners
  PASSIVE: true,
  
  // Throttle/debounce intervals
  SCROLL_THROTTLE: 16, // ms - 60fps
  RESIZE_DEBOUNCE: 150, // ms
  
  // Virtual scroll viewport buffer
  VIEWPORT_BUFFER: 2, // Number of viewport heights to render
} as const;

// ============================================
// REDUCED MOTION SUPPORT
// ============================================
export const REDUCED_MOTION = {
  // Check for user preference
  MEDIA_QUERY: '(prefers-reduced-motion: reduce)',
  
  // Fallback durations (instant or minimal)
  INSTANT: 0,
  MINIMAL: 100,
} as const;

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get cubic-bezier string from easing array
 */
export function getCubicBezier(easing: readonly number[]): string {
  return `cubic-bezier(${easing.join(', ')})`;
}

/**
 * Check if reduced motion is preferred
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(REDUCED_MOTION.MEDIA_QUERY).matches;
}

/**
 * Get adjusted duration based on reduced motion preference
 */
export function getAdjustedDuration(duration: number): number {
  return prefersReducedMotion() ? REDUCED_MOTION.MINIMAL : duration;
}

/**
 * Create will-change style object
 */
export function willChange(...properties: string[]) {
  return { willChange: properties.join(', ') };
}

/**
 * Create GPU-accelerated transform
 */
export function gpuTransform(x: number = 0, y: number = 0, z: number = 0) {
  return { transform: `translate3d(${x}px, ${y}px, ${z}px)` };
}

/**
 * CSS containment helper
 */
export function contain(type: 'layout' | 'paint' | 'strict' | 'content') {
  return { contain: type };
}
