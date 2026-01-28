# Asset Specifications & Export Guide

## 📦 Asset Inventory & Sizes

### Background Assets

| Asset | Type | Dimensions | Format | Size | Compression |
|-------|------|------------|--------|------|-------------|
| Dual Gradient Base | CSS | N/A | Pure CSS | 0KB | N/A |
| Fire Gradient Overlay | CSS | N/A | Pure CSS | 0KB | N/A |
| Ice Gradient Overlay | CSS | Pure CSS | 0KB | N/A |
| Vignette Mask | CSS Gradient | N/A | Pure CSS | 0KB | Radial gradient |
| Particle Red Sprite | PNG/WebP | 64×64 (8 frames) | WebP | 12KB | 85% quality |
| Particle Blue Sprite | PNG/WebP | 64×64 (8 frames) | WebP | 12KB | 85% quality |

### Icons & Vectors

| Asset | Type | Format | Size | Notes |
|-------|------|--------|------|-------|
| Sparkles Icon | SVG | SVG | 1.2KB | Lucide React |
| User Icon | SVG | SVG | 0.8KB | Lucide React |
| Mail Icon | SVG | SVG | 0.9KB | Lucide React |
| Phone Icon | SVG | SVG | 1.0KB | Lucide React |
| GraduationCap Icon | SVG | SVG | 1.1KB | Lucide React |
| Calendar Icon | SVG | SVG | 0.9KB | Lucide React |
| Trophy Icon | SVG | SVG | 1.3KB | Lucide React |
| Rocket Icon | SVG | SVG | 1.5KB | Lucide React |

### Micro-Animations (Lottie)

| Asset | Frames | Duration | Format | Size | Notes |
|-------|--------|----------|--------|------|-------|
| XP Badge Sparkle | 60 | 1s | JSON | 45KB | Trimmed segment |
| Badge Unlock Pop | 30 | 0.5s | JSON | 28KB | Spring animation |
| Level Up Burst | 45 | 0.75s | JSON | 52KB | Particle burst |
| Rocket Launch Trail | 90 | 1.5s | JSON | 68KB | Smoke trail only |

**Note**: All Lottie files optimized with `lottie-optimize` to stay under 80KB limit.

---

## 🎨 Particle Sprite Sheets

### Red Fire Particles (fire-particles.webp)

**Specifications:**
- Dimensions: 512×64px (8 frames × 64px each)
- Format: WebP
- Compression: 85% quality
- Transparency: Yes (alpha channel)
- File Size: ~12KB

**Frame Layout:**
```
[Frame 1][Frame 2][Frame 3][Frame 4][Frame 5][Frame 6][Frame 7][Frame 8]
  64px    64px    64px    64px    64px    64px    64px    64px
```

**CSS Animation:**
```css
@keyframes fire-particle-sprite {
  0% { background-position-x: 0px; }
  12.5% { background-position-x: -64px; }
  25% { background-position-x: -128px; }
  37.5% { background-position-x: -192px; }
  50% { background-position-x: -256px; }
  62.5% { background-position-x: -320px; }
  75% { background-position-x: -384px; }
  87.5% { background-position-x: -448px; }
  100% { background-position-x: 0px; }
}

.fire-particle {
  width: 64px;
  height: 64px;
  background-image: url('/assets/fire-particles.webp');
  animation: fire-particle-sprite 1.2s steps(8) infinite;
}
```

### Blue Ice Particles (ice-particles.webp)

**Specifications:**
- Same as fire particles but with blue color scheme
- Dimensions: 512×64px
- Format: WebP
- File Size: ~12KB

---

## 🖼️ Image Optimization Commands

### Convert to WebP

```bash
# Single file
cwebp -q 85 input.png -o output.webp

# Batch convert
for file in *.png; do
  cwebp -q 85 "$file" -o "${file%.png}.webp"
done
```

### Convert to AVIF (Next-gen format)

```bash
# Install avif encoder
npm install -g @squoosh/cli

# Convert
squoosh-cli --avif '{"cqLevel":30}' input.png

# Or use avifenc
avifenc -s 6 -q 85 input.png output.avif
```

### Optimize SVG

```bash
# Install SVGO
npm install -g svgo

# Optimize single file
svgo input.svg -o output.svg

# Optimize folder
svgo -f ./icons -o ./optimized-icons

# With custom config
svgo --config svgo.config.js input.svg
```

**svgo.config.js:**
```javascript
module.exports = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,
          cleanupIDs: false,
        },
      },
    },
    'removeDimensions',
    'removeTitle',
  ],
};
```

---

## 🎬 Lottie Optimization

### Trim Frames

```javascript
// trim-lottie.js
const fs = require('fs');
const lottie = JSON.parse(fs.readFileSync('input.json'));

// Trim from frame 0 to 60 (reduce file size)
lottie.ip = 0;  // Start frame
lottie.op = 60; // End frame (original might be 120)

// Remove unused assets
lottie.assets = lottie.assets.filter(asset => {
  // Keep only referenced assets
  return true; // Add logic to check references
});

fs.writeFileSync('output.json', JSON.stringify(lottie));
```

### Compress with lottie-optimize

```bash
# Install
npm install -g lottie-optimize

# Optimize
lottie-optimize input.json output.json

# With options
lottie-optimize --precision 2 --compress input.json output.json
```

### Online Tools
- [LottieFiles Optimizer](https://lottiefiles.com/lottie-to-gif)
- [SVGOMG](https://jakearchibald.github.io/svgomg/)

---

## 📐 Design System Tokens

### Spacing Scale
```typescript
export const SPACING = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
};
```

### Border Radius
```typescript
export const RADIUS = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  full: '9999px',
};
```

### Shadow Tokens
```typescript
export const SHADOWS = {
  sm: '0 2px 8px rgba(0, 0, 0, 0.12)',
  md: '0 4px 16px rgba(0, 0, 0, 0.16)',
  lg: '0 8px 32px rgba(0, 0, 0, 0.20)',
  xl: '0 20px 60px rgba(0, 0, 0, 0.30)',
  glow: {
    red: '0 0 30px rgba(255, 58, 74, 0.7)',
    blue: '0 0 30px rgba(0, 169, 255, 0.7)',
  },
};
```

---

## 🎨 Gradient Definitions

### CSS Variables (Copy-Paste Ready)

```css
:root {
  /* Red Palette */
  --red-primary: #FF3A4A;
  --red-secondary: #B1122C;
  --red-light: #FF5E63;
  --red-dark: #3A0A12;
  --red-glow: #FF9AA6;
  
  /* Blue Palette */
  --blue-primary: #00A9FF;
  --blue-secondary: #4AD4FF;
  --blue-light: #B3E7FF;
  --blue-dark: #001F4D;
  --blue-darker: #030B16;
  
  /* Dual Gradient (Default) */
  --gradient-dual: linear-gradient(135deg, #B1122C 0%, #00A9FF 100%);
  
  /* Fire Gradient */
  --gradient-fire: linear-gradient(135deg, #B1122C 0%, #FF3A4A 100%);
  
  /* Ice Gradient */
  --gradient-ice: linear-gradient(135deg, #00A9FF 0%, #4AD4FF 100%);
  
  /* Background Gradients */
  --bg-fire-radial: radial-gradient(ellipse at 50% 50%, #3A0A12 0%, #000000 100%);
  --bg-ice-radial: radial-gradient(ellipse at 50% 50%, #030B16 0%, #000000 100%);
  
  /* Glow Effects */
  --glow-red: rgba(255, 58, 74, 0.7);
  --glow-blue: rgba(0, 169, 255, 0.7);
  --glow-dual: rgba(177, 18, 44, 0.5), rgba(0, 169, 255, 0.5);
}
```

---

## 🖌️ Figma Export Settings

### Component Export

**Personal Info Card:**
- Format: SVG (for icons), WebP (for images)
- Scale: 2x for retina
- Include: Backgrounds NO, Use Absolute Bounds

**XP Bar:**
- Format: SVG
- Scale: 1x (vector scales infinitely)

**Buttons:**
- Format: Component code (React)
- Export styles as CSS variables

### Layer Organization

```
Launchpad/
├── Components/
│   ├── Inputs/
│   │   ├── ThemedInput
│   │   └── ThemedDropdown
│   ├── Buttons/
│   │   ├── PrimaryButton
│   │   └── PathSelector
│   ├── Cards/
│   │   ├── FormCard
│   │   └── PreviewCard
│   └── Progress/
│       ├── XPBar
│       └── MicroBadge
├── Backgrounds/
│   ├── DualGradient (CSS)
│   ├── FireTheme (CSS)
│   └── IceTheme (CSS)
└── Icons/
    └── (Use Lucide React)
```

---

## 📱 Responsive Breakpoints

```typescript
export const BREAKPOINTS = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1440px',
};

// Tailwind config
module.exports = {
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
};
```

---

## 🔧 Asset Generation Scripts

### Generate Sprite Sheet

```javascript
// generate-sprite.js
const sharp = require('sharp');

async function generateSpriteSheet(frames, outputPath) {
  const frameWidth = 64;
  const frameHeight = 64;
  
  const composites = frames.map((framePath, index) => ({
    input: framePath,
    left: index * frameWidth,
    top: 0,
  }));
  
  await sharp({
    create: {
      width: frameWidth * frames.length,
      height: frameHeight,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite(composites)
    .webp({ quality: 85 })
    .toFile(outputPath);
}

// Usage
generateSpriteSheet([
  'frame-1.png',
  'frame-2.png',
  // ... 8 frames
], 'fire-particles.webp');
```

### Batch Image Optimization

```bash
#!/bin/bash
# optimize-images.sh

# Create output directory
mkdir -p optimized

# Optimize all PNGs to WebP
for img in *.png; do
  cwebp -q 85 "$img" -o "optimized/${img%.png}.webp"
  echo "Optimized: $img"
done

# Optimize all SVGs
for svg in *.svg; do
  svgo "$svg" -o "optimized/$svg"
  echo "Optimized: $svg"
done

echo "All assets optimized!"
```

---

## 📊 File Size Budget

### Per Page/Route

| Asset Type | Budget | Actual | Notes |
|------------|--------|--------|-------|
| HTML | 15KB | - | Gzipped |
| CSS | 50KB | - | Gzipped, critical inline |
| JavaScript | 150KB | - | Gzipped, code-split |
| Images | 200KB | - | Total, lazy-loaded |
| Fonts | 50KB | - | WOFF2, subset |
| **Total** | **465KB** | - | First load |

### Individual Assets

| Asset | Max Size | Format |
|-------|----------|--------|
| Background Image | 150KB | WebP/AVIF |
| Sprite Sheet | 50KB | WebP |
| Lottie Animation | 80KB | JSON (compressed) |
| Icon | 5KB | SVG |
| Font File | 25KB | WOFF2 |

---

## ✅ Export Checklist

### Before Export from Figma

- [ ] Convert all text to outlines (if exporting as SVG)
- [ ] Flatten unnecessary groups
- [ ] Remove hidden layers
- [ ] Name layers descriptively
- [ ] Set correct export settings
- [ ] Check bounds (use absolute)

### After Export

- [ ] Optimize SVGs with SVGO
- [ ] Convert PNGs to WebP/AVIF
- [ ] Compress Lotties
- [ ] Generate sprite sheets
- [ ] Test all formats in browsers
- [ ] Verify file sizes
- [ ] Add alt text metadata

### Code Integration

- [ ] Import assets correctly
- [ ] Add lazy loading
- [ ] Implement fallbacks
- [ ] Test on slow 3G
- [ ] Monitor performance
- [ ] Check accessibility

---

## 🎯 Quick Reference Commands

```bash
# Optimize image
cwebp -q 85 input.png -o output.webp

# Optimize SVG
svgo input.svg -o output.svg

# Compress Lottie
lottie-optimize input.json output.json

# Generate sprite
node generate-sprite.js

# Batch optimize
./optimize-images.sh

# Analyze bundle
npm run build -- --analyze
```

---

## 📚 Tools & Libraries

- **Image Optimization**: `sharp`, `imagemin`, `squoosh-cli`
- **SVG Optimization**: `svgo`, `svgomg.net`
- **Lottie**: `lottie-optimize`, `bodymovin`
- **Sprite Generation**: `spritesmith`, `sharp`
- **Format Conversion**: `cwebp`, `avifenc`
- **Bundle Analysis**: `webpack-bundle-analyzer`, `source-map-explorer`
