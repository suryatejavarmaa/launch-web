import { motion } from 'motion/react';
import { AlertCircle, Check } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import ElectricBorder from './ElectricBorder';

// STRICT COLOR PALETTES
const RED_PALETTE = {
  primary: '#FF3A4A',
  secondary: '#B1122C',
  light: '#FF5E63',
  dark: '#3A0A12',
  glow: '#FF9AA6',
};

const BLUE_PALETTE = {
  primary: '#00A9FF',
  secondary: '#4AD4FF',
  light: '#B3E7FF',
  dark: '#001F4D',
  glow: '#4AD4FF',
};

interface ThemedPathSelectorProps {
  selectedPath: string;
  onSelectPath: (path: string) => void;
  error?: string;
}

export function ThemedPathSelector({ selectedPath, onSelectPath, error }: ThemedPathSelectorProps) {
  const { theme, setThemeMode } = useTheme();

  const paths = [
    {
      id: 'Entrepreneur Path',
      title: 'ENTREPRENEUR PATH',
      subtitle: 'Create Your Empire',
      description: 'Launch and scale your own startup',
      themeMode: 'fire' as const,
      features: ['Startup toolkit', 'Mentor network', 'Funding guidance'],
      electricColor: '#FF3A4A', // Electric red for Entrepreneur
    },
    {
      id: 'Career Path',
      title: 'CAREER PATH',
      subtitle: 'Build Your Future',
      description: 'Master skills and land your dream job',
      themeMode: 'ice' as const,
      features: ['Industry projects', 'Interview prep', 'Job placement'],
      electricColor: '#7df9ff', // Electric cyan for Career
    },
  ];

  const handleSelect = (path: typeof paths[0]) => {
    onSelectPath(path.id);
    setThemeMode(path.themeMode);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2 mb-8">
        <h3 className="text-white text-2xl tracking-wide">
          Choose Your Path
        </h3>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent max-w-md mx-auto origin-center"
        />
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {paths.map((path, index) => {
          const isSelected = selectedPath === path.id;
          const isFireTheme = path.themeMode === 'fire';
          
          // RRR Optimized Color Palettes
          const colors = isFireTheme ? RED_PALETTE : BLUE_PALETTE;
          
          return (
            <motion.button
              key={path.id}
              type="button"
              onClick={() => handleSelect(path)}
              className="relative group text-left"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.4 + index * 0.15,
                duration: 0.5,
              }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Optimized Outer Glow - GPU Accelerated */}
              {isSelected && (
                <motion.div
                  layoutId="selectedGlow"
                  className="absolute -inset-3 rounded-3xl"
                  style={{
                    background: `radial-gradient(circle, ${colors.glow}40 0%, transparent 70%)`,
                    filter: 'blur(24px)',
                    willChange: 'transform',
                  }}
                />
              )}

              {/* Hover Glow - Lightweight */}
              <div 
                className="absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle, ${colors.primary}30, transparent)`,
                  filter: 'blur(16px)',
                }}
              />
              
              {/* Electric Border Wrapper - Only shows on hover and selection */}
              <ElectricBorder
                color={path.electricColor}
                speed={0.8}
                chaos={0.08}
                thickness={1.5}
                borderRadius={24}
                visible={isSelected}
                style={{ 
                  borderRadius: 24
                }}
              >
                {/* Premium Card - Optimized Glassmorphism */}
                <div 
                  className="relative rounded-3xl border backdrop-blur-xl overflow-hidden transition-all duration-500"
                  style={{
                    minHeight: '300px',
                    background: isSelected
                      ? `linear-gradient(180deg, ${colors.dark}bb 0%, ${colors.dark}dd 100%)`
                      : 'linear-gradient(180deg, rgba(10, 10, 15, 0.7) 0%, rgba(5, 5, 10, 0.85) 100%)',
                    borderColor: selectedPath && !isSelected 
                      ? 'rgba(255, 255, 255, 0.1)' 
                      : isFireTheme ? '#B1122C' : '#00A9FF',
                    borderWidth: isSelected ? '2px' : '1.5px',
                    boxShadow: isSelected
                      ? `0 0 40px ${colors.glow}30`
                      : '0 20px 40px rgba(0, 0, 0, 0.4)',
                    willChange: 'border-color, background, box-shadow',
                  }}
                >
                  {/* Vertical Gradient Overlay */}
                  <div
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{
                      opacity: isSelected ? 1 : 0,
                      background: `linear-gradient(180deg, ${colors.primary}12 0%, ${colors.secondary}18 50%, ${colors.glow}08 100%)`,
                    }}
                  />

                  {/* Animated Orb - Only appears when selected */}
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.15, 0.3, 0.15],
                      }}
                      transition={{
                        scale: {
                          duration: 0.6,
                          ease: "easeOut",
                        },
                        opacity: {
                          duration: 8,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }
                      }}
                      className="absolute -top-24 -right-24 w-64 h-64 rounded-full pointer-events-none"
                      style={{
                        background: `radial-gradient(circle, ${colors.primary}60, rgba(0,0,0,0))`,
                        filter: 'blur(60px)',
                        willChange: 'transform, opacity',
                      }}
                    />
                  )}
                  
                  {/* Content Container */}
                  <div className="relative z-10 p-7 space-y-5 h-full flex flex-col">
                    {/* Title Section */}
                    <div className="space-y-2.5">
                      <h4 
                        className="text-2xl tracking-widest transition-all duration-500"
                        style={{
                          color: isSelected ? colors.glow : '#ffffff',
                          textShadow: isSelected
                            ? `0 0 20px ${colors.glow}60`
                            : '0 2px 8px rgba(0, 0, 0, 0.6)',
                        }}
                      >
                        {path.title}
                      </h4>
                      
                      <p className="text-lg text-slate-300">
                        {path.subtitle}
                      </p>
                      
                      <div
                        className="h-px transition-all duration-500 origin-left"
                        style={{
                          transform: isSelected ? 'scaleX(1)' : 'scaleX(0)',
                          background: `linear-gradient(to right, ${colors.primary}, ${colors.glow}, transparent)`,
                          boxShadow: `0 0 8px ${colors.glow}`,
                        }}
                      />
                    </div>

                    {/* Description */}
                    <p className="text-slate-400 leading-relaxed flex-grow">
                      {path.description}
                    </p>
                    
                    {/* Features - Lightweight Pills */}
                    <ul className="space-y-2">
                      {path.features.map((feature, idx) => (
                        <li
                          key={feature}
                          className="transition-all duration-400"
                          style={{
                            transform: isSelected ? 'translateX(8px)' : 'translateX(0)',
                            opacity: isSelected ? 1 : 0.6,
                            transitionDelay: `${idx * 50}ms`,
                          }}
                        >
                          <div 
                            className="relative px-4 py-2 rounded-xl border backdrop-blur-sm overflow-hidden transition-all duration-400"
                            style={{
                              background: isSelected
                                ? `linear-gradient(135deg, ${colors.primary}10, ${colors.secondary}08)`
                                : 'rgba(255, 255, 255, 0.02)',
                              borderColor: isSelected ? `${colors.primary}30` : 'rgba(255, 255, 255, 0.05)',
                            }}
                          >
                            {/* Glow Bullet */}
                            <div
                              className="absolute left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full transition-all duration-400"
                              style={{
                                background: `radial-gradient(circle, ${colors.glow}, ${colors.primary})`,
                                boxShadow: isSelected ? `0 0 8px ${colors.glow}` : 'none',
                                opacity: isSelected ? 1 : 0.4,
                              }}
                            />
                            
                            <span className="text-sm text-slate-300 ml-6">
                              {feature}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Selection Check - GPU Optimized */}
                  {isSelected && (
                    <motion.div
                      layoutId="pathCheck"
                      className="absolute top-5 right-5 w-11 h-11 rounded-full flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                        boxShadow: `0 0 24px ${colors.glow}80`,
                        willChange: 'transform',
                      }}
                    >
                      <Check className="w-6 h-6 text-white" strokeWidth={3} />
                    </motion.div>
                  )}
                  
                  {/* Glass Refraction Highlight */}
                  <div 
                    className="absolute inset-x-0 top-0 h-24 rounded-t-3xl pointer-events-none"
                    style={{
                      background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, transparent 100%)',
                    }}
                  />
                </div>
              </ElectricBorder>
            </motion.button>
          );
        })}
      </div>
      
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-400 text-center text-sm flex items-center justify-center gap-2 mt-4"
        >
          <AlertCircle className="w-4 h-4" />
          {error}
        </motion.p>
      )}
    </div>
  );
}