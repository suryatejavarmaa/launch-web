import { motion } from 'motion/react';
import { Briefcase, Rocket, AlertCircle, Check } from 'lucide-react';

interface PathSelectorProps {
  selectedPath: string;
  onSelectPath: (path: string) => void;
  error?: string;
}

export function PathSelector({ selectedPath, onSelectPath, error }: PathSelectorProps) {
  const paths = [
    {
      id: 'Career Path',
      title: 'Career Path',
      icon: Briefcase,
      description: 'Build skills for your dream job',
      gradient: 'from-blue-500 to-cyan-500',
      features: ['Industry projects', 'Interview prep', 'Job placement'],
    },
    {
      id: 'Entrepreneur Path',
      title: 'Entrepreneur Path',
      icon: Rocket,
      description: 'Launch your own startup',
      gradient: 'from-orange-500 to-pink-500',
      features: ['Startup toolkit', 'Mentor network', 'Funding guidance'],
    },
  ];

  return (
    <div className="space-y-4">
      <label className="text-slate-300 text-lg">
        Choose Your Path
      </label>
      <div className="grid md:grid-cols-2 gap-6">
        {paths.map((path) => {
          const Icon = path.icon;
          const isSelected = selectedPath === path.id;
          
          return (
            <motion.button
              key={path.id}
              type="button"
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectPath(path.id)}
              className="relative group text-left"
            >
              {/* Selection Glow */}
              {isSelected && (
                <div className={`absolute -inset-px bg-gradient-to-br ${path.gradient} rounded-2xl blur-lg opacity-70`} />
              )}
              
              {/* Card */}
              <div className={`relative p-6 rounded-2xl border backdrop-blur-xl transition-all h-full ${
                isSelected
                  ? 'bg-white/10 border-white/30'
                  : 'bg-white/5 border-white/10 hover:border-white/20'
              }`}>
                {/* Gradient Background Orb */}
                <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${path.gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                
                <div className="relative z-10 space-y-4">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ 
                      rotateY: 15,
                      rotateX: 10,
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${path.gradient} p-0.5`}
                  >
                    <div className="w-full h-full bg-slate-900/50 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <Icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div>
                    <h4 className="text-white mb-2">
                      {path.title}
                    </h4>
                    <p className="text-slate-400 text-sm mb-4">
                      {path.description}
                    </p>
                    
                    {/* Features */}
                    <ul className="space-y-1.5">
                      {path.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-xs text-slate-500">
                          <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${path.gradient}`} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Selection Indicator */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="absolute top-4 right-4 w-7 h-7 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg"
                  >
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  </motion.div>
                )}
                
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl" />
              </div>
            </motion.button>
          );
        })}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-sm flex items-center gap-1"
        >
          <AlertCircle className="w-4 h-4" />
          {error}
        </motion.p>
      )}
    </div>
  );
}