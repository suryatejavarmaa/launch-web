import { motion } from 'motion/react';

interface SplashScreenProps {
  onComplete: () => void;
}

// STRICT TWO-COLOR PALETTE - RRR INSPIRED
const RED = '#B1122C';
const BLUE = '#00A9FF';

export function SplashScreen({ onComplete }: SplashScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        background: '#000000',
      }}
    >
      {/* Semi-Circular Energy Forms Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Left Red Semi-Circle - ) shape */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, x: -100 }}
          animate={{ scale: 1, opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -left-1/4 top-1/2 -translate-y-1/2"
          style={{
            width: '70vw',
            height: '140vh',
            borderRadius: '0 100% 100% 0',
            background: `radial-gradient(ellipse at left, ${RED} 0%, ${RED}00 70%)`,
            filter: 'blur(60px)',
            opacity: 0.6,
          }}
        />

        {/* Right Blue Semi-Circle - ( shape */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, x: 100 }}
          animate={{ scale: 1, opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -right-1/4 top-1/2 -translate-y-1/2"
          style={{
            width: '65vw',
            height: '130vh',
            borderRadius: '100% 0 0 100%',
            background: `radial-gradient(ellipse at right, ${BLUE} 0%, ${BLUE}00 70%)`,
            filter: 'blur(60px)',
            opacity: 0.6,
          }}
        />

        {/* Center Blend Zone - Breathing Effect */}
        <motion.div
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '40vw',
            height: '100vh',
            background: `linear-gradient(90deg, ${RED}40 0%, ${BLUE}40 100%)`,
            filter: 'blur(80px)',
          }}
        />

        {/* Subtle Particles - Red */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`red-particle-${i}`}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut',
            }}
            className="absolute"
            style={{
              left: `${10 + i * 8}%`,
              top: `${20 + Math.random() * 60}%`,
              width: '3px',
              height: '3px',
              borderRadius: '50%',
              background: RED,
              opacity: 0.3,
            }}
          />
        ))}

        {/* Subtle Particles - Blue */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`blue-particle-${i}`}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut',
            }}
            className="absolute"
            style={{
              right: `${10 + i * 8}%`,
              top: `${20 + Math.random() * 60}%`,
              width: '3px',
              height: '3px',
              borderRadius: '50%',
              background: BLUE,
              opacity: 0.3,
            }}
          />
        ))}
      </div>

      {/* Main Content - At Convergence Point */}
      <div className="relative z-10 text-center space-y-12 px-4">
        {/* Brand Name */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <h1 className="text-7xl md:text-9xl tracking-tight">
            <motion.span
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.8, type: 'spring', stiffness: 100 }}
              className="font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #B1122C 0%, #B1122C 30%, #FF3A4A 55%, #00A9FF 80%, #00A9FF 100%)',
                fontFamily: "'Poppins', sans-serif",
                fontWeight: '700',
                letterSpacing: '-0.02em',
              }}
            >
              Launchpad
            </motion.span>
          </h1>

          {/* Tagline - Subtle blend of red & blue */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="text-xl md:text-2xl mt-6 relative"
          >
            {/* Subtle backdrop glow for readability */}
            <span
              className="absolute inset-0 blur-xl"
              style={{
                background: `linear-gradient(90deg, ${RED}15 0%, ${BLUE}15 100%)`,
                transform: 'scaleY(1.5)',
              }}
            />
            
            {/* Tagline text */}
            <span className="relative">
              <span
                style={{
                  color: `${RED}B3`,
                  fontWeight: '400',
                }}
              >
                One life.{' '}
              </span>
              <span
                className="font-medium"
                style={{
                  background: `linear-gradient(90deg, ${RED} 0%, ${BLUE} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontWeight: '500',
                }}
              >
                One story.
              </span>
            </span>
          </motion.p>
        </motion.div>

        {/* Loading Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="space-y-6"
        >
          {/* Dual-colored progress bar */}
          <div
            className="relative w-72 h-1.5 mx-auto rounded-full overflow-hidden"
            style={{
              background: `linear-gradient(90deg, ${RED}10 0%, ${BLUE}10 100%)`,
            }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              transition={{
                duration: 2.5,
                delay: 2,
                ease: [0.22, 1, 0.36, 1],
                onComplete: () => setTimeout(onComplete, 500),
              }}
              style={{
                background: `linear-gradient(90deg, ${RED} 0%, ${RED} 65%, ${BLUE} 100%)`,
              }}
            />
          </div>

          {/* Loading text - Subtle blend */}
          <motion.p
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="text-xs md:text-sm tracking-widest"
            style={{
              color: `${BLUE}60`,
              letterSpacing: '0.2em',
            }}
          >
            INITIALIZING YOUR JOURNEY
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}