# Launchpad Performance Optimization Guide

## 📊 Performance Budget & Metrics

### Target Performance
- **Frame Rate**: 60fps sustained (16.67ms per frame)
- **First Contentful Paint (FCP)**: < 1.5s
- **Time to Interactive (TTI)**: < 3.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Cumulative Layout Shift (CLS)**: < 0.1

### Animation Budget
- **Max Concurrent Complex Animations**: 2
- **Particle Count**: 8 (desktop), 4 (mobile)
- **Background Layers**: 3 max
- **Max Blur Radius**: 60px

---

## 🎨 Animation Tokens

### Duration Tokens (milliseconds)

```typescript
// Micro - Quick feedback (120-220ms)
MICRO_FASTEST: 120ms
MICRO_FAST: 150ms
MICRO_DEFAULT: 180ms
MICRO_SLOW: 220ms

// Medium - Standard transitions (450-900ms)
MEDIUM_FAST: 450ms
MEDIUM_DEFAULT: 600ms
MEDIUM_SLOW: 800ms
MEDIUM_SLOWEST: 900ms

// Long - Emphasis moments (up to 1200ms)
LONG_FAST: 1000ms
LONG_DEFAULT: 1200ms
```

### Easing Presets

```typescript
// Premium easing curves
SMOOTH_OUT: cubic-bezier(0.22, 1, 0.36, 1)      // Ultra-smooth deceleration
BOUNCE_OUT: cubic-bezier(0.34, 1.56, 0.64, 1)   // Gentle bounce
SPRING_OUT: cubic-bezier(0.175, 0.885, 0.32, 1.275)
ELASTIC_OUT: cubic-bezier(0.68, -0.55, 0.265, 1.55)

// Theme transitions
THEME_MORPH: cubic-bezier(0.4, 0, 0.2, 1)       // Smooth theme changes
COLOR_BLEND: cubic-bezier(0.25, 0.1, 0.25, 1)

// XP/Progress
PROGRESS_FILL: cubic-bezier(0.22, 1, 0.36, 1)
BADGE_POP: cubic-bezier(0.175, 0.885, 0.32, 1.275)
```

---

## 🚀 GPU Acceleration Guidelines

### Safe Properties to Animate
Only animate these properties for 60fps performance:
- `transform` (translate, scale, rotate)
- `opacity`
- `filter` (use sparingly, max 60px blur)

### Dangerous Properties (Avoid animating)
- `width`, `height` (triggers layout)
- `top`, `left`, `right`, `bottom` (use `transform` instead)
- `margin`, `padding` (triggers layout)
- `border-width` (triggers paint)

### GPU Acceleration Hints

```css
/* Force GPU acceleration */
.gpu-accelerated {
  will-change: transform, opacity;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
}

/* CSS containment for isolation */
.contained {
  contain: layout style paint;
}
```

```typescript
// In components
style={{
  willChange: 'transform, opacity',
  transform: 'translate3d(0, 0, 0)',
  contain: 'layout style paint',
}}
```

---

## 🎭 Theme Transition Implementation

### Fast Theme Switching (No Re-render)

```typescript
// theme-optimizer.ts
import { applyThemeVars } from '@/lib/theme-optimizer';

function switchTheme(newTheme: 'dual' | 'fire' | 'ice') {
  // Apply via CSS variables - NO component re-render
  applyThemeVars(newTheme);
  
  // Optional: Monitor performance
  monitorThemeTransition((fps) => {
    console.log(`Theme transition FPS: ${fps}`);
  });
}
```

### CSS Variables Setup

```css
:root {
  --color-primary: #FF3A4A;
  --color-secondary: #00A9FF;
  --gradient-start: #B1122C;
  --gradient-end: #00A9FF;
  --border-gradient: linear-gradient(135deg, #B1122C 0%, #00A9FF 100%);
  --glow-color: rgba(0, 169, 255, 0.5);
  
  --transition-duration: 600ms;
  --transition-easing: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Auto-transitioning elements */
.theme-aware {
  background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
  transition: background var(--transition-duration) var(--transition-easing);
}
```

### React Component Usage

```tsx
import { useTheme } from '@/contexts/ThemeContext';

function ThemedComponent() {
  const { theme, setTheme } = useTheme();
  
  return (
    <div 
      className="theme-gradient-bg theme-transition"
      style={{
        // CSS variables automatically update
        background: 'var(--border-gradient)',
      }}
    >
      <button onClick={() => setTheme('fire')}>
        Switch to Fire
      </button>
    </div>
  );
}
```

---

## 📦 Lazy Loading Implementation

### IntersectionObserver Pattern

```typescript
import { useEffect, useRef, useState } from 'react';
import { INTERSECTION_CONFIG } from '@/lib/animation-tokens';

function useLazyLoad() {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect(); // Load once
          }
        });
      },
      {
        rootMargin: INTERSECTION_CONFIG.ROOT_MARGIN, // '100px'
        threshold: INTERSECTION_CONFIG.THRESHOLD,     // 0.1
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { isVisible, elementRef };
}
```

### Usage in Component

```tsx
import { LazyFormCard } from '@/components/LazyFormCard';

function OnboardingForm() {
  return (
    <div className="space-y-8">
      {/* Skeleton shows while outside viewport */}
      <LazyFormCard delay={0}>
        <PersonalInfoSection />
      </LazyFormCard>
      
      <LazyFormCard delay={100}>
        <EducationSection />
      </LazyFormCard>
      
      <LazyFormCard delay={200}>
        <PathSelection />
      </LazyFormCard>
    </div>
  );
}
```

---

## 🖼️ Asset Optimization

### Image Formats & Sizes

| Asset Type | Format | Max Size | Compression |
|------------|--------|----------|-------------|
| Hero Images | WebP/AVIF | 150KB | 85% quality |
| Icons | SVG | 5KB | Optimized paths |
| Particles | SVG/PNG Sprite | 50KB | 8-16 sprites |
| Lottie Animations | JSON | 80KB | Trimmed segments |
| Backgrounds | CSS Gradient | 0KB | Pure CSS |

### WebP/AVIF Conversion

```bash
# Convert PNG to WebP
cwebp -q 85 input.png -o output.webp

# Convert PNG to AVIF (smaller, better)
avifenc -s 6 -q 85 input.png output.avif
```

### SVG Optimization

```bash
# Using SVGO
npx svgo input.svg -o output.svg

# Inline in components (tree-shakeable)
import IconSvg from './icon.svg?inline';
```

### Lottie Optimization

```javascript
// Trim Lottie to specific segment
import lottieData from './animation.json';

const trimmedData = {
  ...lottieData,
  ip: 0,   // Start frame
  op: 60,  // End frame (reduce from 120)
};

// Compress with lottie-optimize
npx lottie-optimize animation.json output.json
```

---

## 🎬 Motion/React Best Practices

### Optimized Animation Pattern

```tsx
import { motion } from 'motion/react';
import { ANIMATION_DURATION, EASING, getCubicBezier } from '@/lib/animation-tokens';

// ✅ GOOD - GPU-accelerated, smooth
<motion.div
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
  Content
</motion.div>

// ❌ BAD - Layout thrashing, poor performance
<motion.div
  animate={{ width: 300, height: 200, top: 50, left: 100 }}
>
  Slow Content
</motion.div>
```

### Spring Animations

```tsx
import { SPRING } from '@/lib/animation-tokens';

<motion.div
  animate={{ scale: 1 }}
  transition={SPRING.BOUNCY}
>
  Bouncy Element
</motion.div>
```

### Stagger Children (Optimized)

```tsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // 50ms delay between items
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

<motion.div variants={container} initial="hidden" animate="show">
  {items.map((item, i) => (
    <motion.div key={i} variants={item}>
      {item}
    </motion.div>
  ))}
</motion.div>
```

---

## 🧪 GSAP Implementation (Alternative)

### Setup

```typescript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Configure for performance
gsap.config({
  force3D: true,
  nullTargetWarn: false,
});
```

### Theme Transition with GSAP

```typescript
function morphTheme(newTheme: 'fire' | 'ice') {
  const newColors = THEME_PALETTES[newTheme];
  
  gsap.to(':root', {
    '--color-primary': newColors['--color-primary'],
    '--color-secondary': newColors['--color-secondary'],
    duration: 0.6,
    ease: 'power2.inOut',
  });
}
```

### Scroll-Triggered Animations

```typescript
gsap.from('.lazy-card', {
  scrollTrigger: {
    trigger: '.lazy-card',
    start: 'top 80%',
    toggleActions: 'play none none reverse',
  },
  y: 50,
  opacity: 0,
  duration: 0.6,
  ease: 'power2.out',
  stagger: 0.1,
});
```

---

## 📱 Reduced Motion Support

### Media Query Detection

```typescript
import { prefersReducedMotion } from '@/lib/animation-tokens';

function MyComponent() {
  const reducedMotion = prefersReducedMotion();
  
  const duration = reducedMotion ? 0 : ANIMATION_DURATION.MEDIUM_DEFAULT;
  
  return (
    <motion.div
      animate={{ opacity: 1 }}
      transition={{ duration: duration / 1000 }}
    >
      Accessible Content
    </motion.div>
  );
}
```

### CSS Approach

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 🔍 Performance Monitoring

### React DevTools Profiler

```tsx
import { Profiler } from 'react';

<Profiler
  id="OnboardingForm"
  onRender={(id, phase, actualDuration) => {
    if (actualDuration > 16) {
      console.warn(`Slow render: ${id} took ${actualDuration}ms`);
    }
  }}
>
  <OnboardingForm />
</Profiler>
```

### FPS Counter (Dev Mode)

```typescript
class FPSMonitor {
  private frames = 0;
  private lastTime = performance.now();
  
  start(callback: (fps: number) => void) {
    const measure = () => {
      this.frames++;
      const currentTime = performance.now();
      const elapsed = currentTime - this.lastTime;
      
      if (elapsed >= 1000) {
        const fps = Math.round((this.frames * 1000) / elapsed);
        callback(fps);
        this.frames = 0;
        this.lastTime = currentTime;
      }
      
      requestAnimationFrame(measure);
    };
    
    requestAnimationFrame(measure);
  }
}

// Usage
const monitor = new FPSMonitor();
monitor.start((fps) => console.log(`FPS: ${fps}`));
```

### Bundle Size Analysis

```bash
# Analyze bundle
npm run build -- --analyze

# Check component sizes
npx source-map-explorer 'dist/**/*.js'
```

---

## 📋 Optimization Checklist

### Before Launch

- [ ] All images converted to WebP/AVIF
- [ ] SVGs optimized with SVGO
- [ ] Lottie files < 80KB each
- [ ] Particle count ≤ 8
- [ ] No layout-triggering animations
- [ ] CSS containment applied
- [ ] will-change hints added
- [ ] IntersectionObserver for lazy loading
- [ ] Reduced motion support
- [ ] Theme transitions via CSS variables
- [ ] FPS ≥ 60 during animations
- [ ] LCP < 2.5s
- [ ] CLS < 0.1

### Code Review Points

- [ ] Only transform/opacity animations
- [ ] No inline style calculations in render
- [ ] Memoized expensive computations
- [ ] Debounced scroll handlers
- [ ] Virtual scrolling for long lists
- [ ] Code splitting implemented
- [ ] Tree-shaking enabled
- [ ] Production build tested

---

## 🎯 Quick Reference

### Import Animation Tokens

```typescript
import {
  ANIMATION_DURATION,
  EASING,
  SPRING,
  getCubicBezier,
  prefersReducedMotion,
} from '@/lib/animation-tokens';
```

### Apply GPU Acceleration

```typescript
style={{
  willChange: 'transform, opacity',
  transform: 'translate3d(0, 0, 0)',
  contain: 'layout style paint',
}}
```

### Fast Theme Switch

```typescript
import { applyThemeVars } from '@/lib/theme-optimizer';

applyThemeVars('fire'); // Instant theme change
```

### Lazy Load Component

```typescript
import { LazyFormCard } from '@/components/LazyFormCard';

<LazyFormCard delay={100}>
  <YourContent />
</LazyFormCard>
```

---

## 📚 Additional Resources

- [Web Vitals](https://web.dev/vitals/)
- [Motion/React Docs](https://motion.dev)
- [CSS Containment](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Containment)
- [IntersectionObserver API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [GSAP Performance](https://greensock.com/docs/v3/GSAP/gsap.config())
