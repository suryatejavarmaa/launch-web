import { motion } from 'motion/react';
import { Code, Target, Briefcase, Zap } from 'lucide-react';

export function PremiumBenefits() {
  const benefits = [
    {
      icon: Code,
      title: 'Skill Mastery',
      description: 'Master in-demand tech skills with AI-powered learning',
      gradient: 'from-blue-500 to-cyan-500',
      delay: 0,
    },
    {
      icon: Target,
      title: 'Portfolio Builder',
      description: 'Build real-world projects that showcase your expertise',
      gradient: 'from-purple-500 to-pink-500',
      delay: 0.1,
    },
    {
      icon: Briefcase,
      title: 'Founder Path',
      description: 'Launch your own startup with expert mentorship',
      gradient: 'from-orange-500 to-red-500',
      delay: 0.2,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6, duration: 0.8 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full"
    >
      {benefits.map((benefit, index) => {
        const Icon = benefit.icon;
        return (
          <motion.div
            key={benefit.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 + benefit.delay, duration: 0.6 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative"
          >
            {/* Glass Card */}
            <div className="relative glass-dark rounded-3xl p-8 border border-white/10 overflow-hidden backdrop-blur-2xl h-full">
              {/* Gradient Orb Background */}
              <motion.div
                className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${benefit.gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
              />
              
              {/* Icon Container with 3D Effect */}
              <motion.div
                whileHover={{ 
                  rotateY: 15,
                  rotateX: 10,
                  scale: 1.1
                }}
                style={{ transformStyle: 'preserve-3d' }}
                className={`relative w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${benefit.gradient} p-0.5`}
              >
                <div className="w-full h-full bg-slate-900 rounded-2xl flex items-center justify-center">
                  <Icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                </div>
                {/* Icon Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} rounded-2xl blur-xl opacity-50 -z-10`} />
              </motion.div>

              {/* Content */}
              <h4 className="text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all">
                {benefit.title}
              </h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                {benefit.description}
              </p>

              {/* Shine Effect on Hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
              />

              {/* Bottom Accent Line */}
              <motion.div
                className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${benefit.gradient} opacity-0 group-hover:opacity-100 transition-opacity`}
              />
            </div>

            {/* Floating Particles around Card */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -20, 0],
                  x: [0, Math.random() * 10 - 5, 0],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
                className={`absolute w-1 h-1 bg-gradient-to-br ${benefit.gradient} rounded-full blur-sm`}
                style={{
                  left: `${20 + i * 30}%`,
                  top: `${10 + i * 20}%`,
                }}
              />
            ))}
          </motion.div>
        );
      })}
    </motion.div>
  );
}
