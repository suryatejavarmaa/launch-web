import { motion } from 'motion/react';
import { Rocket, Sparkles } from 'lucide-react';

export function AnimatedLogo() {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ 
        duration: 1.2, 
        ease: [0.22, 1, 0.36, 1],
        delay: 0.2
      }}
      className="mb-12 relative"
    >
      {/* Outer Glow Ring */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-3xl opacity-50"
        style={{ width: 200, height: 200, left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
      />

      {/* 3D Floating Container */}
      <motion.div
        animate={{ 
          y: [0, -15, 0],
          rotateY: [0, 5, 0],
          rotateX: [0, 5, 0],
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Glass Card Background */}
        <div className="relative w-32 h-32 md:w-40 md:h-40">
          {/* Multiple Layers for Depth */}
          <div className="absolute inset-0 glass-dark rounded-[2.5rem] shadow-2xl border border-white/20" 
               style={{ transform: 'translateZ(10px)' }} />
          <div className="absolute inset-2 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-[2rem]" 
               style={{ transform: 'translateZ(15px)' }} />
          
          {/* Rocket Icon */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ transform: 'translateZ(20px)' }}>
            <motion.div
              animate={{ 
                y: [0, -5, 0],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              <Rocket className="w-16 h-16 md:w-20 md:h-20 text-white drop-shadow-2xl" strokeWidth={1.5} />
            </motion.div>
          </div>

          {/* Engine Glow */}
          <motion.div
            animate={{ 
              scale: [1, 1.4, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-t from-orange-400 via-yellow-300 to-transparent rounded-full blur-xl"
            style={{ transform: 'translateZ(5px) translateX(-50%)' }}
          />
        </div>

        {/* Orbiting Sparkles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              rotate: 360,
            }}
            transition={{ 
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-0"
            style={{ transform: 'translateZ(25px)' }}
          >
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.7
              }}
              className="absolute"
              style={{
                left: `${50 + 50 * Math.cos((i * 120 * Math.PI) / 180)}%`,
                top: `${50 + 50 * Math.sin((i * 120 * Math.PI) / 180)}%`,
              }}
            >
              <Sparkles className="w-5 h-5 text-yellow-300 drop-shadow-lg" />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Light Rays */}
      <motion.div
        animate={{ 
          rotate: 360,
        }}
        transition={{ 
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute inset-0 opacity-20"
      >
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 w-1 h-24 bg-gradient-to-t from-transparent via-white to-transparent"
            style={{
              transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
              transformOrigin: '50% 50%'
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
