import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Award, Star, Zap, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

// STRICT COLOR PALETTES - NO PINK/PURPLE
const RED_GRADIENT = 'linear-gradient(135deg, #FF3A4A 0%, #FF5E63 100%)';
const BLUE_GRADIENT = 'linear-gradient(135deg, #00A9FF 0%, #4AD4FF 100%)';

interface XPBarProps {
  xp: number;
  level: number;
  badges: string[];
}

export function XPBar({ xp, level, badges }: XPBarProps) {
  const { theme } = useTheme();
  const [currentLevelXP, setCurrentLevelXP] = useState(0);
  const [showGlow, setShowGlow] = useState(false);
  const xpPerLevel = 100;
  const progress = (currentLevelXP / xpPerLevel) * 100;

  useEffect(() => {
    const newXP = xp % xpPerLevel;
    if (newXP !== currentLevelXP) {
      setCurrentLevelXP(newXP);
      // Flash glow on XP increment
      setShowGlow(true);
      setTimeout(() => setShowGlow(false), 200);
    }
  }, [xp, currentLevelXP]);

  const badgeIcons: Record<string, any> = {
    'First Steps': Sparkles,
    'Quick Learner': Zap,
    'Profile Master': Trophy,
    'Document Pro': Award,
    'Path Chosen': Star,
    'Profile Starter': Trophy,
    'Document Verified': Award,
  };

  // Theme-aware colors - STRICT RED/BLUE ONLY
  const getGradient = () => {
    if (theme.mode === 'dual') return 'linear-gradient(135deg, #FF3A4A 0%, #00A9FF 100%)';
    if (theme.mode === 'fire') return RED_GRADIENT;
    if (theme.mode === 'ice') return BLUE_GRADIENT;
    return 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)';
  };

  const getAccentColor = () => {
    if (theme.mode === 'dual') return '#00A9FF'; // Use blue for icons in dual mode
    if (theme.mode === 'fire') return '#FF5E63';
    if (theme.mode === 'ice') return '#4AD4FF';
    return '#60a5fa';
  };

  const getGlowOverlay = () => {
    if (theme.mode === 'dual') return 'rgba(0, 169, 255, 0.4)';
    if (theme.mode === 'fire') return 'rgba(255, 94, 99, 0.4)';
    if (theme.mode === 'ice') return 'rgba(74, 212, 255, 0.4)';
    return 'rgba(74, 212, 255, 0.4)';
  };

  const gradient = getGradient();
  const accentColor = getAccentColor();
  const glowOverlay = getGlowOverlay();

  return (
    <div className="w-full px-6 py-4 md:py-5" style={{ maxWidth: '1280px', margin: '0 auto' }}>
      <div className="flex items-center gap-4 md:gap-6">
        {/* LEFT: Level Badge + XP Text */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div 
            className="px-3 py-1.5 rounded-xl backdrop-blur-sm border transition-all"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderColor: 'rgba(255, 255, 255, 0.1)',
            }}
          >
            <div className="flex items-center gap-1.5">
              <Sparkles 
                className="w-3.5 h-3.5"
                style={{ color: accentColor }}
                strokeWidth={2.5}
              />
              <span 
                className="text-sm font-semibold whitespace-nowrap"
                style={{ color: accentColor }}
              >
                Level {level}
              </span>
            </div>
          </div>
          
          {/* XP Text - Hidden on mobile */}
          <div className="text-sm font-medium hidden md:block">
            <span className="text-slate-300">{currentLevelXP}</span>
            <span className="text-slate-600 mx-1.5">/</span>
            <span className="text-slate-400">{xpPerLevel}</span>
          </div>
        </div>

        {/* CENTER: XP Progress Bar - Takes remaining space */}
        <div className="relative flex-1">
          {/* Background Track */}
          <div 
            className="h-1.5 md:h-2 rounded-full overflow-hidden border"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderColor: 'rgba(255, 255, 255, 0.08)',
            }}
          >
            {/* Progress Fill with Glow */}
            <motion.div
              className="h-full relative"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              style={{
                background: gradient,
              }}
            >
              {/* Glow Flash on Increment */}
              {showGlow && (
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0"
                  style={{
                    background: glowOverlay,
                    mixBlendMode: 'overlay',
                  }}
                />
              )}
              
              {/* Subtle Top Highlight */}
              <div 
                className="absolute inset-0 bg-gradient-to-b from-white/15 to-transparent"
                style={{ height: '40%' }}
              />
            </motion.div>
          </div>
        </div>

        {/* RIGHT: Badges */}
        <div className="flex items-center gap-1.5 md:gap-2 flex-shrink-0">
          {badges.slice(0, 3).map((badge, idx) => {
            const Icon = badgeIcons[badge] || Star;
            return (
              <motion.div
                key={badge}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: idx * 0.1
                }}
                className="relative"
                title={badge}
              >
                <div 
                  className="w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center border transition-all"
                  style={{
                    background: gradient,
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                  }}
                >
                  <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" strokeWidth={2.5} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}