import { motion, AnimatePresence } from 'motion/react';
import { LucideIcon, Check, AlertCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { MicroXPBadge } from './MicroXPBadge';
import { useState } from 'react';

// STRICT COLOR PALETTES - NO PINK/PURPLE
const RED_GRADIENT = 'linear-gradient(135deg, #FF3A4A 0%, #FF5E63 100%)';
const BLUE_GRADIENT = 'linear-gradient(135deg, #00A9FF 0%, #4AD4FF 100%)';

interface ThemedInputProps {
  icon?: LucideIcon;
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  error?: string;
  completed?: boolean;
  required?: boolean;
  accept?: string;
  xpAmount?: number;
}

export function ThemedInput({
  icon: Icon,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  required = false,
  onBlur,
  accept,
  completed,
  xpAmount,
}: ThemedInputProps) {
  const { theme } = useTheme();

  const getThemeColors = () => {
    if (theme.mode === 'dual') {
      return {
        borderGradient: 'linear-gradient(135deg, #B1122C 0%, #00A9FF 100%)',
        glow: 'rgba(0, 169, 255, 0.3)',
        iconColor: '#00A9FF',
        gradient: 'linear-gradient(135deg, #B1122C 0%, #00A9FF 100%)',
      };
    } else if (theme.mode === 'fire') {
      return {
        borderGradient: 'linear-gradient(135deg, #B1122C 0%, #FF3A4A 100%)',
        glow: 'rgba(255, 58, 74, 0.3)',
        iconColor: '#FF5E63',
        gradient: RED_GRADIENT,
      };
    } else if (theme.mode === 'ice') {
      return {
        borderGradient: 'linear-gradient(135deg, #00A9FF 0%, #4AD4FF 100%)',
        glow: 'rgba(0, 169, 255, 0.3)',
        iconColor: '#4AD4FF',
        gradient: BLUE_GRADIENT,
      };
    }
    // Neutral fallback
    return {
      borderGradient: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
      glow: 'rgba(59, 130, 246, 0.3)',
      iconColor: '#60a5fa',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
    };
  };

  const colors = getThemeColors();

  return (
    <div className="space-y-2">
      <label className="block text-sm text-slate-300 ml-1">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      
      <div className="relative group">
        {/* Gradient Border Wrapper */}
        <div 
          className="absolute inset-0 rounded-2xl transition-all duration-300"
          style={{
            background: error ? '#ef4444' : colors.borderGradient,
            padding: '1.5px',
            opacity: 1,
          }}
        >
          <div className="absolute inset-[1.5px] rounded-2xl bg-slate-950/95 backdrop-blur-xl" />
        </div>

        {/* Focus Glow Effect */}
        <div 
          className="absolute inset-0 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            boxShadow: `0 0 30px ${colors.glow}, 0 0 60px ${colors.glow}`,
          }}
        />
        
        {/* Icon with Theme Color */}
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
            <Icon 
              className="w-5 h-5 transition-all duration-300"
              style={{
                color: colors.iconColor,
              }}
            />
          </div>
        )}
        
        {/* Input Field */}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          accept={accept}
          placeholder={placeholder}
          className={`relative w-full px-5 py-4 rounded-2xl bg-transparent text-white placeholder-slate-500 outline-none transition-all duration-300 ${
            Icon ? 'pl-12' : ''
          } ${completed ? 'pr-12' : ''}`}
          style={{
            zIndex: 1,
          }}
        />
        
        {/* Completion Checkmark with Gradient */}
        {completed && !error && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center"
            style={{
              backgroundImage: colors.gradient,
              boxShadow: `0 0 16px ${colors.glow}`,
              zIndex: 2,
            }}
          >
            <Check className="w-4 h-4 text-white" strokeWidth={3} />
          </motion.div>
        )}
        
        {/* Error Icon */}
        {error && (
          <div 
            className="absolute right-4 top-1/2 -translate-y-1/2"
            style={{
              filter: 'drop-shadow(0 0 8px rgba(239, 68, 68, 0.5))',
              zIndex: 2,
            }}
          >
            <AlertCircle className="w-5 h-5 text-red-400" />
          </div>
        )}
      </div>
      
      {/* Error Message */}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-xs ml-1"
        >
          {error}
        </motion.p>
      )}
      
      {/* XP Badge */}
      {xpAmount && (
        <AnimatePresence>
          <MicroXPBadge xpAmount={xpAmount} />
        </AnimatePresence>
      )}
    </div>
  );
}