# Quick Reference: Copy-Paste Snippets

## 🎨 Theme Switching (Instant, No Re-render)

```typescript
// Switch theme without re-rendering components
import { applyThemeVars } from '@/lib/theme-optimizer';

// In your component
function switchTheme(theme: 'dual' | 'fire' | 'ice') {
  applyThemeVars(theme); // Instant transition via CSS variables
}
```

## 🚀 GPU-Accelerated Animation

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
  style={{
    willChange: 'transform, opacity',
    transform: 'translate3d(0, 0, 0)',
    contain: 'layout style paint',
  }}
>
  Your Content
</motion.div>
```

## 📦 Lazy Loading with Skeleton

```tsx
import { LazyFormCard } from '@/components/LazyFormCard';

<LazyFormCard delay={100}>
  <YourComponent />
</LazyFormCard>
```

## 🎯 Animation Tokens

```typescript
import { 
  ANIMATION_DURATION, 
  EASING, 
  getCubicBezier 
} from '@/lib/animation-tokens';

// Use in transitions
transition={{
  duration: ANIMATION_DURATION.MEDIUM_FAST / 1000, // 450ms
  ease: getCubicBezier(EASING.SMOOTH_OUT),
}}
```

## 🎨 CSS Variables (Auto-Updating Theme)

```css
/* Use in CSS */
.themed-element {
  background: var(--border-gradient);
  color: var(--color-primary);
  transition: all var(--transition-duration) var(--transition-easing);
}
```

```tsx
// Use in JSX
<div 
  className="theme-gradient-bg theme-transition"
  style={{
    padding: '12px 24px',
    borderRadius: '12px',
  }}
>
  Themed Content
</div>
```

## ⚡ IntersectionObserver Hook

```typescript
import { useEffect, useRef, useState } from 'react';

function useLazyLoad() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { rootMargin: '100px', threshold: 0.1 }
    );
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

// Usage
const { ref, isVisible } = useLazyLoad();
<div ref={ref}>{isVisible && <HeavyComponent />}</div>
```

## 🎬 XP Bar Animation

```tsx
import { motion } from 'motion/react';

<motion.div
  className="h-2 theme-gradient-bg rounded-full"
  initial={{ width: 0 }}
  animate={{ width: `${progress}%` }}
  transition={{ duration: 0.45, ease: "easeOut" }}
  style={{ willChange: 'width' }}
/>
```

## 🌟 Micro-Badge (Inline XP Feedback)

```tsx
import { MicroXPBadge } from '@/components/MicroXPBadge';

{showBadge && (
  <MicroXPBadge 
    xpAmount={10} 
    onHide={() => setShowBadge(false)} 
  />
)}
```

## 🔧 Performance Monitoring

```typescript
// FPS Counter
let frames = 0, lastTime = performance.now();

function measureFPS() {
  frames++;
  const now = performance.now();
  if (now >= lastTime + 1000) {
    const fps = Math.round((frames * 1000) / (now - lastTime));
    console.log(`FPS: ${fps}`);
    frames = 0;
    lastTime = now;
  }
  requestAnimationFrame(measureFPS);
}

measureFPS();
```

## 🖼️ Image Optimization Commands

```bash
# Convert to WebP
cwebp -q 85 input.png -o output.webp

# Convert to AVIF (smaller)
avifenc -s 6 -q 85 input.png output.avif

# Optimize SVG
svgo input.svg -o output.svg

# Compress Lottie
lottie-optimize input.json output.json
```

## 📱 Responsive Particles

```tsx
import { useState, useEffect } from 'react';

function ResponsiveParticles() {
  const [count, setCount] = useState(8);
  
  useEffect(() => {
    const updateCount = () => {
      setCount(window.innerWidth < 768 ? 4 : 8);
    };
    updateCount();
    window.addEventListener('resize', updateCount);
    return () => window.removeEventListener('resize', updateCount);
  }, []);
  
  return <ParticleSystem count={count} />;
}
```

## 🎭 GSAP Theme Transition

```typescript
import gsap from 'gsap';

gsap.to(':root', {
  '--color-primary': '#FF3A4A',
  '--color-secondary': '#B1122C',
  duration: 0.6,
  ease: 'power2.inOut',
});
```

## 🧪 Lighthouse Audit

```bash
# Run Lighthouse
npx lighthouse http://localhost:3000 --view

# CI/CD integration
npx lighthouse http://localhost:3000 \
  --only-categories=performance \
  --output=json \
  --output-path=./lighthouse.json
```

## 📊 Bundle Analysis

```bash
# Webpack Bundle Analyzer
npm run build -- --analyze

# Source Map Explorer
npx source-map-explorer 'dist/**/*.js'

# Check individual file sizes
du -sh dist/assets/*
```

## 🎨 Gradient Definitions (Copy-Paste)

```css
/* Dual Gradient (Before Path Selection) */
background: linear-gradient(135deg, #B1122C 0%, #00A9FF 100%);

/* Fire Gradient (Entrepreneur Path) */
background: linear-gradient(135deg, #B1122C 0%, #FF3A4A 100%);

/* Ice Gradient (Career Path) */
background: linear-gradient(135deg, #00A9FF 0%, #4AD4FF 100%);
```

## ✨ Animation Presets

```typescript
// Smooth deceleration (most common)
ease: [0.22, 1, 0.36, 1]

// Bounce effect
ease: [0.34, 1.56, 0.64, 1]

// Spring
ease: [0.175, 0.885, 0.32, 1.275]

// Theme morph
ease: [0.4, 0, 0.2, 1]
```

## 🚦 Web Vitals Tracking

```typescript
import { getCLS, getFID, getLCP } from 'web-vitals';

getCLS(console.log);  // Cumulative Layout Shift
getFID(console.log);  // First Input Delay
getLCP(console.log);  // Largest Contentful Paint
```

## 🎯 Performance Targets

| Metric | Target | Command |
|--------|--------|---------|
| FPS | 60fps | See FPS Counter above |
| LCP | < 2.5s | `npx lighthouse ...` |
| Bundle | < 150KB | `npm run build -- --analyze` |
| Images | WebP/AVIF | `cwebp -q 85 ...` |

## 🔗 Quick Links

- **Animation Tokens**: `/lib/animation-tokens.ts`
- **Theme Optimizer**: `/lib/theme-optimizer.ts`
- **Optimized Background**: `/components/OptimizedBackground.tsx`
- **Lazy Form Card**: `/components/LazyFormCard.tsx`
- **Micro XP Badge**: `/components/MicroXPBadge.tsx`

## 📚 Documentation Index

1. [Performance Optimization Guide](/docs/PERFORMANCE_OPTIMIZATION.md)
2. [Asset Specifications](/docs/ASSET_SPECIFICATIONS.md)
3. [Implementation Guide](/docs/IMPLEMENTATION_GUIDE.md)
4. **Quick Reference** (This document)

---

## 💡 Pro Tips

1. **Always use CSS variables for theme colors** - No re-render needed
2. **Limit particles to 8 on desktop, 4 on mobile** - Maintains 60fps
3. **Only animate transform and opacity** - GPU-accelerated
4. **Use IntersectionObserver for lazy loading** - Better than scroll events
5. **Keep Lottie files under 80KB** - Use lottie-optimize
6. **Prefer WebP/AVIF over PNG** - 40-50% smaller file size
7. **Add will-change hints sparingly** - Only on actively animating elements
8. **Use CSS containment** - Isolates layout calculations
9. **Debounce resize handlers** - Prevents performance issues
10. **Test on 3G throttling** - Ensures good mobile experience

---

**Last Updated**: December 2024  
**Performance Budget**: 60fps sustained, <16ms frame time  
**Max Concurrent Animations**: 2  
**Particle Count**: 8 (desktop), 4 (mobile)
