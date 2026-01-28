import { motion } from 'motion/react';
import { useTheme } from '../contexts/ThemeContext';
import { ReactNode, forwardRef } from 'react';

// STRICT COLOR PALETTES - NO PINK/PURPLE
const RED_GRADIENT = 'linear-gradient(135deg, #FF3A4A 0%, #FF5E63 100%)';
const BLUE_GRADIENT = 'linear-gradient(135deg, #00A9FF 0%, #4AD4FF 100%)';

interface ThemedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  className?: string;
}

export const ThemedButton = forwardRef<HTMLButtonElement, ThemedButtonProps>(
  ({ children, onClick, type = 'button', variant = 'primary', disabled = false, className = '' }, ref) => {
    const { theme } = useTheme();

    const getGradient = () => {
      if (theme.mode === 'dual') return 'linear-gradient(135deg, #FF3A4A 0%, #00A9FF 100%)';
      if (theme.mode === 'fire') return RED_GRADIENT;
      if (theme.mode === 'ice') return BLUE_GRADIENT;
      return 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)'; // neutral fallback
    };

    const getGlowColor = () => {
      if (theme.mode === 'dual') return '#00A9FF';
      if (theme.mode === 'fire') return '#FF5E63';
      if (theme.mode === 'ice') return '#4AD4FF';
      return '#60a5fa';
    };

    const gradient = getGradient();
    const glowColor = getGlowColor();

    if (variant === 'secondary') {
      return (
        <motion.button
          ref={ref}
          type={type}
          onClick={onClick}
          disabled={disabled}
          className={`relative px-8 py-4 rounded-2xl font-medium overflow-hidden backdrop-blur-xl ${className}`}
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '2px solid transparent',
          }}
          whileHover={{ 
            scale: 1.02,
            boxShadow: `0 0 40px ${glowColor}50`,
          }}
          whileTap={{ scale: 0.98 }}
        >
          <span 
            className="relative z-10 bg-clip-text text-transparent font-semibold"
            style={{
              backgroundImage: gradient,
            }}
          >
            {children}
          </span>
        </motion.button>
      );
    }

    return (
      <motion.button
        ref={ref}
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`relative px-8 py-4 rounded-2xl font-medium text-white overflow-hidden ${className}`}
        style={{
          backgroundImage: gradient,
          boxShadow: `0 0 40px ${glowColor}50`,
          willChange: 'transform',
        }}
        whileHover={{ 
          scale: 1.03,
          boxShadow: `0 0 60px ${glowColor}70`,
          transition: { duration: 0.3 }
        }}
        whileTap={{ scale: 0.97 }}
        animate={{
          boxShadow: [
            `0 0 40px ${glowColor}50`,
            `0 0 55px ${glowColor}60`,
            `0 0 40px ${glowColor}50`,
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Shimmer Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{
            x: ['-200%', '200%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 1,
          }}
          style={{
            willChange: 'transform',
          }}
        />
        
        <span className="relative z-10">{children}</span>
      </motion.button>
    );
  }
);

ThemedButton.displayName = 'ThemedButton';