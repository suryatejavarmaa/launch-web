import { motion } from 'motion/react';
import { useTheme } from '../contexts/ThemeContext';
import { useMemo } from 'react';

// STRICT COLOR PALETTES
const RED_PALETTE = {
  primary: '#FF3A4A',
  secondary: '#B1122C',
  light: '#FF5E63',
  dark: '#3A0A12',
  glow: '#FF9AA6',
};

const BLUE_PALETTE = {
  primary: '#00A9FF',
  secondary: '#4AD4FF',
  light: '#B3E7FF',
  dark: '#001F4D',
  darker: '#030B16',
};

export function CinematicBackground() {
  const { theme } = useTheme();
  
  // Optimized: Only 30 stars for performance
  const stars = useMemo(() => 
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      size: Math.random() * 1.5 + 0.5,
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: Math.random() * 0.6 + 0.2,
      duration: Math.random() * 4 + 3,
    })), []
  );

  // Optimized: Only 20 particles for smooth performance (split for dual mode)
  const particles = useMemo(() => 
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 1.5,
      x: Math.random() * 100,
      y: Math.random() * 100 + 20,
      duration: Math.random() * 20 + 12,
      delay: Math.random() * 5,
    })), []
  );

  // Render dual-gradient background for dual mode
  if (theme.mode === 'dual') {
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Deep Space Base */}
        <div className="absolute inset-0 bg-black" />

        {/* LEFT SIDE - FIRE RED THEME */}
        <div className="absolute inset-y-0 left-0 w-1/2">
          {/* Red Base Gradient */}
          <div 
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at 30% 50%, ${RED_PALETTE.dark} 0%, #000000 70%)`,
            }}
          />

          {/* Red Primary Glow - Fire-like */}
          <motion.div
            animate={{ 
              scale: [1, 1.15, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
            style={{
              background: `radial-gradient(circle, ${RED_PALETTE.primary}40 0%, ${RED_PALETTE.secondary}20 40%, transparent 70%)`,
              filter: 'blur(80px)',
              willChange: 'transform, opacity',
            }}
          />

          {/* Red Secondary Glow - Top */}
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full"
            style={{
              background: `radial-gradient(circle, ${RED_PALETTE.light}30 0%, transparent 60%)`,
              filter: 'blur(60px)',
            }}
          />

          {/* Red Particles - Rising like embers */}
          {particles.slice(0, 10).map((particle) => (
            <motion.div
              key={`red-${particle.id}`}
              className="absolute rounded-full"
              style={{
                width: particle.size,
                height: particle.size,
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                background: `radial-gradient(circle, ${RED_PALETTE.glow}, ${RED_PALETTE.primary})`,
                boxShadow: `0 0 ${particle.size * 4}px ${RED_PALETTE.glow}`,
                willChange: 'transform, opacity',
              }}
              animate={{
                y: [-30, -150],
                x: [(Math.random() - 0.5) * 40],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        {/* RIGHT SIDE - ICE BLUE THEME */}
        <div className="absolute inset-y-0 right-0 w-1/2">
          {/* Blue Base Gradient */}
          <div 
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at 70% 50%, ${BLUE_PALETTE.dark} 0%, #000000 70%)`,
            }}
          />

          {/* Blue Primary Glow - Icy */}
          <motion.div
            animate={{ 
              scale: [1, 1.12, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{ 
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="absolute top-1/2 right-1/3 translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
            style={{
              background: `radial-gradient(circle, ${BLUE_PALETTE.primary}40 0%, ${BLUE_PALETTE.secondary}25 40%, transparent 70%)`,
              filter: 'blur(80px)',
              willChange: 'transform, opacity',
            }}
          />

          {/* Blue Secondary Glow - Top */}
          <motion.div
            animate={{ 
              scale: [1, 1.15, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ 
              duration: 11,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            }}
            className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full"
            style={{
              background: `radial-gradient(circle, ${BLUE_PALETTE.light}25 0%, transparent 60%)`,
              filter: 'blur(60px)',
            }}
          />

          {/* Blue Particles - Floating like ice crystals */}
          {particles.slice(10, 20).map((particle) => (
            <motion.div
              key={`blue-${particle.id}`}
              className="absolute rounded-full"
              style={{
                width: particle.size,
                height: particle.size,
                right: `${particle.x}%`,
                top: `${particle.y}%`,
                background: `radial-gradient(circle, ${BLUE_PALETTE.light}, ${BLUE_PALETTE.primary})`,
                boxShadow: `0 0 ${particle.size * 4}px ${BLUE_PALETTE.secondary}`,
                willChange: 'transform, opacity',
              }}
              animate={{
                y: [-30, -150],
                x: [(Math.random() - 0.5) * 40],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        {/* CENTER BLEND - Smoke/Nebula Merge Effect */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Vertical blend gradient */}
          <div 
            className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[400px]"
            style={{
              background: `linear-gradient(to right, ${RED_PALETTE.primary}15 0%, transparent 50%, ${BLUE_PALETTE.primary}15 100%)`,
              filter: 'blur(60px)',
            }}
          />

          {/* Nebula haze blend */}
          <motion.div
            animate={{
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[1000px]"
            style={{
              background: `radial-gradient(ellipse, ${RED_PALETTE.primary}08 0%, transparent 30%, ${BLUE_PALETTE.primary}08 100%)`,
              filter: 'blur(80px)',
            }}
          />

          {/* Smoke layers */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -100, 0],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 2,
              }}
              className="absolute left-1/2 -translate-x-1/2"
              style={{
                width: '300px',
                height: '800px',
                top: `${30 + i * 10}%`,
                background: `linear-gradient(to bottom, ${RED_PALETTE.primary}05, transparent, ${BLUE_PALETTE.primary}05)`,
                filter: 'blur(40px)',
              }}
            />
          ))}
        </div>

        {/* Dramatic Light Rays - Split Effect */}
        <div className="absolute inset-0">
          {/* Red rays from left */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`red-ray-${i}`}
              className="absolute left-0 top-1/2 w-px origin-left"
              style={{
                height: '120vh',
                transform: `rotate(${-30 + i * 20}deg)`,
                background: `linear-gradient(to bottom, transparent 0%, ${RED_PALETTE.primary}12 50%, transparent 100%)`,
              }}
              animate={{
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Blue rays from right */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`blue-ray-${i}`}
              className="absolute right-0 top-1/2 w-px origin-right"
              style={{
                height: '120vh',
                transform: `rotate(${150 + i * 20}deg)`,
                background: `linear-gradient(to bottom, transparent 0%, ${BLUE_PALETTE.primary}12 50%, transparent 100%)`,
              }}
              animate={{
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 4.5 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Subtle Vignette */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(0, 0, 0, 0.6) 100%)',
          }}
        />

        {/* Minimal Star Field overlay */}
        <div className="absolute inset-0">
          {stars.map((star) => (
            <motion.div
              key={star.id}
              className="absolute rounded-full bg-white"
              style={{
                width: star.size,
                height: star.size,
                left: `${star.x}%`,
                top: `${star.y}%`,
                willChange: 'opacity',
              }}
              animate={{
                opacity: [star.opacity, star.opacity * 0.4, star.opacity],
              }}
              transition={{
                duration: star.duration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  // Original single-theme background for fire/ice modes
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Deep Space Base - Single Layer */}
      <motion.div
        key={`space-${theme.mode}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0"
        style={{
          background: theme.mode === 'fire'
            ? `radial-gradient(ellipse at 50% 50%, ${RED_PALETTE.dark} 0%, #000000 100%)`
            : theme.mode === 'ice'
            ? `radial-gradient(ellipse at 50% 50%, ${BLUE_PALETTE.darker} 0%, #000000 100%)`
            : `radial-gradient(ellipse at 50% 50%, #0f172a 0%, #000000 100%)`,
          willChange: 'opacity',
        }}
      />

      {/* Minimal Star Field - GPU Optimized */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              width: star.size,
              height: star.size,
              left: `${star.x}%`,
              top: `${star.y}%`,
              willChange: 'opacity, transform',
            }}
            animate={{
              opacity: [star.opacity, star.opacity * 0.4, star.opacity],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Primary Cosmic Glow - Theme Color Only */}
      <motion.div
        key={`orb-${theme.mode}`}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          opacity: { duration: 0.6 },
          scale: { duration: 10, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full"
        style={{
          background: theme.mode === 'fire'
            ? `radial-gradient(circle, ${RED_PALETTE.primary}30 0%, ${RED_PALETTE.secondary}18 40%, transparent 70%)`
            : theme.mode === 'ice'
            ? `radial-gradient(circle, ${BLUE_PALETTE.primary}30 0%, ${BLUE_PALETTE.secondary}18 40%, transparent 70%)`
            : `radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.1) 40%, transparent 70%)`,
          filter: 'blur(80px)',
          willChange: 'transform, opacity',
        }}
      />

      {/* Secondary Ambient Glow - Theme Color Only */}
      <motion.div
        key={`ambient-${theme.mode}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full"
        style={{
          background: theme.mode === 'fire'
            ? `radial-gradient(circle, ${RED_PALETTE.glow}25 0%, transparent 60%)`
            : theme.mode === 'ice'
            ? `radial-gradient(circle, ${BLUE_PALETTE.light}25 0%, transparent 60%)`
            : `radial-gradient(circle, rgba(96, 165, 250, 0.2) 0%, transparent 60%)`,
          filter: 'blur(60px)',
          willChange: 'opacity',
        }}
      />

      {/* Optimized Particle Field - Theme Color Only */}
      <motion.div
        key={`particles-${theme.mode}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0"
      >
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              background: theme.mode === 'fire'
                ? `radial-gradient(circle, ${RED_PALETTE.glow}, ${RED_PALETTE.primary})`
                : theme.mode === 'ice'
                ? `radial-gradient(circle, ${BLUE_PALETTE.light}, ${BLUE_PALETTE.primary})`
                : `radial-gradient(circle, #60a5fa, #3b82f6)`,
              boxShadow: theme.mode === 'fire'
                ? `0 0 ${particle.size * 3}px ${RED_PALETTE.glow}`
                : theme.mode === 'ice'
                ? `0 0 ${particle.size * 3}px ${BLUE_PALETTE.light}`
                : `0 0 ${particle.size * 3}px #60a5fa`,
              willChange: 'transform, opacity',
            }}
            animate={{
              y: [-20, -120],
              x: [(Math.random() - 0.5) * 30],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))}
      </motion.div>

      {/* Lightweight Lens Bloom - Theme Color Only */}
      <motion.div
        key={`bloom-${theme.mode}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0"
      >
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 w-px origin-center"
            style={{
              height: '120vh',
              transform: `rotate(${i * 45}deg)`,
              background: theme.mode === 'fire'
                ? `linear-gradient(to bottom, transparent 0%, ${RED_PALETTE.primary}10 50%, transparent 100%)`
                : theme.mode === 'ice'
                ? `linear-gradient(to bottom, transparent 0%, ${BLUE_PALETTE.primary}10 50%, transparent 100%)`
                : `linear-gradient(to bottom, transparent 0%, rgba(59, 130, 246, 0.08) 50%, transparent 100%)`,
              willChange: 'opacity',
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* Subtle Vignette - Static */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(0, 0, 0, 0.5) 100%)',
        }}
      />
    </div>
  );
}