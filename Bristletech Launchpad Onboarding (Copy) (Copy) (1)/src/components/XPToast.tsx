import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

// STRICT COLOR PALETTES - NO PINK/PURPLE
const RED_GRADIENT = 'linear-gradient(135deg, #FF3A4A 0%, #FF5E63 100%)';
const BLUE_GRADIENT = 'linear-gradient(135deg, #00A9FF 0%, #4AD4FF 100%)';

interface XPToastProps {
  xp: number;
  reason: string;
}

export function XPToast({ xp, reason }: XPToastProps) {
  const { theme } = useTheme();

  const getGradient = () => {
    if (theme.mode === 'dual') return 'linear-gradient(135deg, #FF3A4A 0%, #00A9FF 100%)';
    if (theme.mode === 'fire') return RED_GRADIENT;
    if (theme.mode === 'ice') return BLUE_GRADIENT;
    return 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)';
  };

  const gradient = getGradient();

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.8 }}
      className="relative group"
    >
      {/* Glow Effect with Theme */}
      <div 
        className="absolute -inset-px rounded-xl blur-md opacity-75"
        style={{
          background: gradient,
        }}
      />
      
      {/* Toast Content */}
      <div className="relative glass-dark backdrop-blur-2xl px-5 py-3.5 rounded-xl border border-white/20 flex items-center gap-3 min-w-[220px] shadow-2xl">
        {/* Icon Container with Gradient */}
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{
            background: gradient,
          }}
        >
          <Sparkles className="w-5 h-5 text-white" strokeWidth={2.5} />
        </div>
        
        {/* Text */}
        <div className="flex-1">
          <p className="text-sm text-slate-300 leading-tight">{reason}</p>
          <p 
            className="font-semibold bg-clip-text text-transparent"
            style={{
              backgroundImage: gradient,
            }}
          >
            +{xp} XP
          </p>
        </div>
      </div>
    </motion.div>
  );
}