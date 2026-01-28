/**
 * THEME OPTIMIZATION UTILITIES
 * 
 * Optimizes theme transitions by using CSS variables instead of re-rendering.
 * This prevents expensive DOM updates and enables smooth color morphing.
 */

import { THEME_TRANSITION, getCubicBezier, EASING } from './animation-tokens';

// ============================================
// CSS VARIABLE DEFINITIONS
// ============================================
export const CSS_VARS = {
  // Primary colors
  PRIMARY_COLOR: '--color-primary',
  SECONDARY_COLOR: '--color-secondary',
  ACCENT_COLOR: '--color-accent',
  
  // Gradients
  GRADIENT_START: '--gradient-start',
  GRADIENT_END: '--gradient-end',
  BORDER_GRADIENT: '--border-gradient',
  
  // Glow effects
  GLOW_COLOR: '--glow-color',
  GLOW_INTENSITY: '--glow-intensity',
  
  // Background
  BG_BASE: '--bg-base',
  BG_OVERLAY: '--bg-overlay',
  
  // Transition
  TRANSITION_DURATION: '--transition-duration',
  TRANSITION_EASING: '--transition-easing',
} as const;

// ============================================
// THEME COLOR PALETTES (CSS Variable Compatible)
// ============================================
export const THEME_PALETTES = {
  dual: {
    [CSS_VARS.PRIMARY_COLOR]: '#FF3A4A',
    [CSS_VARS.SECONDARY_COLOR]: '#00A9FF',
    [CSS_VARS.ACCENT_COLOR]: '#00A9FF',
    [CSS_VARS.GRADIENT_START]: '#B1122C',
    [CSS_VARS.GRADIENT_END]: '#00A9FF',
    [CSS_VARS.BORDER_GRADIENT]: 'linear-gradient(135deg, #B1122C 0%, #00A9FF 100%)',
    [CSS_VARS.GLOW_COLOR]: 'rgba(0, 169, 255, 0.5)',
    [CSS_VARS.BG_BASE]: '#0a0a0a',
  },
  fire: {
    [CSS_VARS.PRIMARY_COLOR]: '#FF3A4A',
    [CSS_VARS.SECONDARY_COLOR]: '#B1122C',
    [CSS_VARS.ACCENT_COLOR]: '#FF5E63',
    [CSS_VARS.GRADIENT_START]: '#B1122C',
    [CSS_VARS.GRADIENT_END]: '#FF3A4A',
    [CSS_VARS.BORDER_GRADIENT]: 'linear-gradient(135deg, #B1122C 0%, #FF3A4A 100%)',
    [CSS_VARS.GLOW_COLOR]: 'rgba(255, 58, 74, 0.7)',
    [CSS_VARS.BG_BASE]: '#0a0a0a',
  },
  ice: {
    [CSS_VARS.PRIMARY_COLOR]: '#00A9FF',
    [CSS_VARS.SECONDARY_COLOR]: '#4AD4FF',
    [CSS_VARS.ACCENT_COLOR]: '#4AD4FF',
    [CSS_VARS.GRADIENT_START]: '#00A9FF',
    [CSS_VARS.GRADIENT_END]: '#4AD4FF',
    [CSS_VARS.BORDER_GRADIENT]: 'linear-gradient(135deg, #00A9FF 0%, #4AD4FF 100%)',
    [CSS_VARS.GLOW_COLOR]: 'rgba(0, 169, 255, 0.7)',
    [CSS_VARS.BG_BASE]: '#0a0a0a',
  },
} as const;

// ============================================
// THEME TRANSITION MANAGER
// ============================================

/**
 * Apply theme via CSS variables (ultra-fast, no re-render)
 */
export function applyThemeVars(theme: 'dual' | 'fire' | 'ice') {
  if (typeof document === 'undefined') return;
  
  const root = document.documentElement;
  const palette = THEME_PALETTES[theme];
  
  // Set transition properties
  root.style.setProperty(
    CSS_VARS.TRANSITION_DURATION,
    `${THEME_TRANSITION.DURATION}ms`
  );
  root.style.setProperty(
    CSS_VARS.TRANSITION_EASING,
    getCubicBezier(EASING.THEME_MORPH)
  );
  
  // Apply all color variables
  Object.entries(palette).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}

/**
 * Initialize theme system with CSS variables
 */
export function initThemeSystem() {
  if (typeof document === 'undefined') return;
  
  const root = document.documentElement;
  
  // Add global transition class
  const style = document.createElement('style');
  style.textContent = `
    :root {
      ${CSS_VARS.TRANSITION_DURATION}: ${THEME_TRANSITION.DURATION}ms;
      ${CSS_VARS.TRANSITION_EASING}: ${getCubicBezier(EASING.THEME_MORPH)};
    }
    
    /* Theme-aware elements transition smoothly */
    .theme-transition {
      transition: 
        color var(${CSS_VARS.TRANSITION_DURATION}) var(${CSS_VARS.TRANSITION_EASING}),
        background var(${CSS_VARS.TRANSITION_DURATION}) var(${CSS_VARS.TRANSITION_EASING}),
        border-color var(${CSS_VARS.TRANSITION_DURATION}) var(${CSS_VARS.TRANSITION_EASING}),
        box-shadow var(${CSS_VARS.TRANSITION_DURATION}) var(${CSS_VARS.TRANSITION_EASING});
    }
    
    /* Background gradient transition */
    .theme-gradient-bg {
      background: linear-gradient(
        135deg,
        var(${CSS_VARS.GRADIENT_START}) 0%,
        var(${CSS_VARS.GRADIENT_END}) 100%
      );
    }
    
    /* Border gradient (using pseudo-element for compatibility) */
    .theme-gradient-border {
      position: relative;
    }
    
    .theme-gradient-border::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      padding: 1.5px;
      background: var(${CSS_VARS.BORDER_GRADIENT});
      -webkit-mask: 
        linear-gradient(#fff 0 0) content-box, 
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      transition: background var(${CSS_VARS.TRANSITION_DURATION}) var(${CSS_VARS.TRANSITION_EASING});
    }
    
    /* Glow effect */
    .theme-glow {
      box-shadow: 0 0 30px var(${CSS_VARS.GLOW_COLOR});
      transition: box-shadow var(${CSS_VARS.TRANSITION_DURATION}) var(${CSS_VARS.TRANSITION_EASING});
    }
    
    /* Text gradient */
    .theme-gradient-text {
      background: linear-gradient(
        135deg,
        var(${CSS_VARS.GRADIENT_START}) 0%,
        var(${CSS_VARS.GRADIENT_END}) 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  `;
  
  document.head.appendChild(style);
}

// ============================================
// PERFORMANCE MONITORING
// ============================================

/**
 * Monitor frame rate during theme transition
 */
export function monitorThemeTransition(callback?: (fps: number) => void) {
  if (typeof window === 'undefined') return;
  
  let frameCount = 0;
  let lastTime = performance.now();
  let animationId: number;
  
  const measureFrame = () => {
    frameCount++;
    const currentTime = performance.now();
    const elapsed = currentTime - lastTime;
    
    if (elapsed >= 1000) {
      const fps = Math.round((frameCount * 1000) / elapsed);
      if (callback) callback(fps);
      
      frameCount = 0;
      lastTime = currentTime;
    }
    
    animationId = requestAnimationFrame(measureFrame);
  };
  
  animationId = requestAnimationFrame(measureFrame);
  
  // Stop monitoring after theme transition completes
  setTimeout(() => {
    cancelAnimationFrame(animationId);
  }, THEME_TRANSITION.DURATION + 500);
}

// ============================================
// LAZY LOAD UTILITIES
// ============================================

/**
 * Create IntersectionObserver for lazy loading
 */
export function createLazyLoader(
  onIntersect: (entry: IntersectionObserverEntry) => void,
  options?: IntersectionObserverInit
) {
  if (typeof window === 'undefined') return null;
  
  const defaultOptions: IntersectionObserverInit = {
    rootMargin: '100px',
    threshold: 0.1,
    ...options,
  };
  
  return new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        onIntersect(entry);
      }
    });
  }, defaultOptions);
}

/**
 * Skeleton placeholder with fade-out
 */
export function createSkeletonTransition() {
  return {
    initial: { opacity: 1 },
    animate: { opacity: 0 },
    transition: {
      duration: 0.2,
      delay: 0.3, // Minimum skeleton display time
    },
  };
}

// ============================================
// FAST DOM BATCH UPDATES
// ============================================

/**
 * Batch multiple DOM updates into single frame
 */
export class DOMBatcher {
  private updates: Array<() => void> = [];
  private scheduled = false;
  
  schedule(update: () => void) {
    this.updates.push(update);
    
    if (!this.scheduled) {
      this.scheduled = true;
      requestAnimationFrame(() => this.flush());
    }
  }
  
  flush() {
    this.updates.forEach(update => update());
    this.updates = [];
    this.scheduled = false;
  }
}

export const domBatcher = new DOMBatcher();
