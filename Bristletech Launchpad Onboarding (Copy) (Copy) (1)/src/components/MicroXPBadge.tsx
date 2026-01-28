import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface MicroXPBadgeProps {
  xpAmount: number;
  onHide?: () => void;
}

export function MicroXPBadge({ xpAmount, onHide }: MicroXPBadgeProps) {
  const { theme } = useTheme();

  // Get theme-specific colors for badge
  const getBadgeGradient = () => {
    if (theme.mode === 'dual') return 'linear-gradient(135deg, #B1122C 0%, #00A9FF 100%)';
    if (theme.mode === 'fire') return 'linear-gradient(135deg, #B1122C 0%, #FF3A4A 100%)';
    if (theme.mode === 'ice') return 'linear-gradient(135deg, #00A9FF 0%, #4AD4FF 100%)';
    return 'linear-gradient(135deg, #B1122C 0%, #00A9FF 100%)';
  };

  const getBorderColor = () => {
    if (theme.mode === 'dual') return 'rgba(177, 18, 44, 0.6)';
    if (theme.mode === 'fire') return 'rgba(177, 18, 44, 0.8)';
    if (theme.mode === 'ice') return 'rgba(0, 169, 255, 0.8)';
    return 'rgba(177, 18, 44, 0.6)';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{
        duration: 0.22,
        ease: [0.22, 1, 0.36, 1], // cubic-bezier(0.22,1,0.36,1)
      }}
      onAnimationComplete={() => {
        // Auto-hide after 1200ms
        setTimeout(() => {
          if (onHide) onHide();
        }, 1200);
      }}
      className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-xl text-white"
      style={{
        background: getBadgeGradient(),
        border: `1px solid ${getBorderColor()}`,
        fontSize: '12px',
        lineHeight: '16px',
        fontWeight: 500,
        height: '20px',
        minWidth: '28px',
      }}
      role="status"
      aria-live="polite"
      aria-label={`Earned ${xpAmount} experience points`}
    >
      <Sparkles className="w-3 h-3" strokeWidth={2.5} />
      <span>+{xpAmount}</span>
    </motion.div>
  );
}