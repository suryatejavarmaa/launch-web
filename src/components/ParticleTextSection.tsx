import { motion } from 'motion/react';
import { ParticleTextEffect } from './ui/particle-text-effect';

export function ParticleTextSection() {
  return (
    <section
      className="py-16 md:py-20 lp-bg relative overflow-hidden lp-dual-energy"
      style={{ backgroundColor: 'var(--lp-bg-solid)' }}
    >
      {/* Interactive Particle Text Hero - Full Width Edge to Edge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full"
      >
        <ParticleTextEffect
          words={["LAUNCHPAD", "ZERO TO ONE", "Your career is your launchpad"]}
        />
      </motion.div>

      {/* Decorative accent line - gradient red to blue */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(to right, transparent, var(--lp-red) 30%, var(--lp-blue) 70%, transparent)'
        }}
      />
    </section>
  );
}
