import { motion } from 'motion/react';
import { Trophy, Target, Book, User, Sparkles, CheckCircle2, Circle, Rocket, Zap, Award, TrendingUp } from 'lucide-react';
import { FloatingParticles } from './FloatingParticles';
import { useTheme } from '../contexts/ThemeContext';

interface DashboardProps {
  userData: any;
}

export function Dashboard({ userData }: DashboardProps) {
  const { theme } = useTheme();

  // Theme-aware color palettes
  const isFireTheme = theme.mode === 'fire';
  const isIceTheme = theme.mode === 'ice';
  const isDualTheme = theme.mode === 'dual';

  // Color configuration based on selected path
  const themeColors = {
    primary: isFireTheme ? '#B1122C' : isIceTheme ? '#00A9FF' : '#B1122C',
    secondary: isFireTheme ? '#FF3A4A' : isIceTheme ? '#4AD4FF' : '#00A9FF',
    accent: isFireTheme ? '#FF5E63' : isIceTheme ? '#B3E7FF' : '#FF3A4A',
    glow: isFireTheme ? '#FF9AA6' : isIceTheme ? '#4AD4FF' : '#FF9AA6',
    deepBg: isFireTheme ? '#3A0A12' : isIceTheme ? '#001F4D' : '#1A0A12',
    gradient: isFireTheme 
      ? 'linear-gradient(135deg, #B1122C 0%, #FF3A4A 100%)' 
      : isIceTheme 
      ? 'linear-gradient(135deg, #00A9FF 0%, #4AD4FF 100%)'
      : 'linear-gradient(90deg, #B1122C 0%, #00A9FF 100%)',
  };

  const tasks = [
    { id: 1, title: 'Complete your profile', completed: true, xp: 50 },
    { id: 2, title: 'Take your first skill assessment', completed: false, xp: 100 },
    { id: 3, title: 'Join a project team', completed: false, xp: 150 },
    { id: 4, title: 'Attend orientation session', completed: false, xp: 75 },
  ];

  const stats = [
    { label: 'XP Earned', value: '100+', icon: Zap },
    { label: 'Level', value: '1', icon: TrendingUp },
    { label: 'Badges', value: '3', icon: Award },
  ];

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Theme-aware Premium Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 gradient-mesh opacity-20" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
          }}
          className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-3xl"
          style={{
            background: themeColors.gradient,
            opacity: 0.15,
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 -z-10">
        <FloatingParticles />
      </div>

      {/* Premium Header with Glass Effect - Theme Aware */}
      <div className="sticky top-0 z-40 glass-dark backdrop-blur-2xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo with Launchpad Gradient */}
            <div className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="relative"
              >
                {/* Reduced glow opacity */}
                <div 
                  className="absolute inset-0 rounded-xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity"
                  style={{
                    background: themeColors.gradient,
                  }}
                />
                <div 
                  className="relative w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{
                    background: themeColors.gradient,
                  }}
                >
                  <Rocket className="w-6 h-6 text-white" strokeWidth={2} />
                </div>
              </motion.div>
              
              {/* Launchpad with Red-to-Blue Gradient (always) */}
              <h2 
                className="tracking-tight bg-clip-text text-transparent"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: '700',
                  letterSpacing: '0.05em',
                  fontSize: '1.25rem',
                  backgroundImage: 'linear-gradient(90deg, #FF3A4A 0%, #00A9FF 100%)',
                }}
              >
                Launchpad
              </h2>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {['Projects', 'Learn', 'Founder', 'Profile'].map((item, idx) => (
                <motion.a
                  key={item}
                  href="#"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 text-slate-300 hover:text-white rounded-xl hover:bg-white/10 transition-all"
                >
                  {item}
                </motion.a>
              ))}
            </nav>

            {/* User Avatar - Theme colored */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
              style={{
                background: themeColors.gradient,
              }}
            >
              <User className="w-5 h-5 text-white" />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative z-10">
        {/* Premium Welcome Banner - Theme Aware */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-8"
        >
          {/* Removed excessive glow */}
          
          {/* Glass Card */}
          <div className="relative glass-dark backdrop-blur-2xl rounded-3xl p-8 md:p-12 border border-white/10 overflow-hidden">
            {/* Subtle background gradient - reduced opacity */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 50, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
              }}
              className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl"
              style={{
                background: themeColors.gradient,
                opacity: 0.08,
              }}
            />

            <div className="relative z-10">
              {/* Welcome Badge */}
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center gap-2 glass-dark px-4 py-2 rounded-full border border-white/20 mb-6 backdrop-blur-xl"
              >
                <Sparkles className="w-4 h-4" style={{ color: themeColors.secondary }} />
                <span className="text-slate-200 text-sm font-medium">Welcome aboard!</span>
              </motion.div>
              
              <h1 
                className="text-white mb-4 bg-clip-text"
                style={{
                  background: `linear-gradient(90deg, #ffffff 0%, ${themeColors.secondary} 100%)`,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                }}
              >
                Hey {userData?.fullName?.split(' ')[0] || 'there'}! 🚀
              </h1>
              
              <p className="text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed">
                Your Launchpad is ready. You've earned your first badge and started your journey. Let's build something amazing together!
              </p>
              
              {/* Stats Grid - Theme Aware */}
              <div className="grid grid-cols-3 gap-4 max-w-2xl">
                {stats.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + idx * 0.1 }}
                      whileHover={{ scale: 1.05, y: -4 }}
                      className="relative group/stat"
                    >
                      {/* Glow - Theme colored */}
                      <div 
                        className="absolute -inset-px rounded-xl blur-md opacity-0 group-hover/stat:opacity-50 transition-opacity"
                        style={{
                          background: themeColors.gradient,
                        }}
                      />
                      
                      {/* Card */}
                      <div className="relative glass-dark backdrop-blur-xl px-4 py-3 rounded-xl border border-white/10">
                        <div className="flex items-center gap-2 mb-1">
                          <div 
                            className="w-6 h-6 rounded-lg flex items-center justify-center"
                            style={{
                              background: themeColors.gradient,
                            }}
                          >
                            <Icon className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                          </div>
                          <p className="text-xs text-slate-400">{stat.label}</p>
                        </div>
                        <p className="text-2xl text-white font-semibold">{stat.value}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Badge Celebration - Theme Aware */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="relative mb-8"
        >
          {/* Removed glow */}
          
          <div 
            className="relative glass-dark backdrop-blur-2xl p-6 rounded-2xl border"
            style={{
              borderColor: `${themeColors.primary}30`,
            }}
          >
            <div className="flex items-center gap-4">
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="relative"
              >
                {/* Removed excessive glow on trophy icon */}
                <div 
                  className="relative w-16 h-16 rounded-full flex items-center justify-center border-2 border-white/30 shadow-xl"
                  style={{
                    background: themeColors.gradient,
                  }}
                >
                  <Trophy className="w-8 h-8 text-white" strokeWidth={2} />
                </div>
              </motion.div>
              
              <div className="flex-1">
                <h3 className="text-white mb-1">Badge Unlocked! 🎉</h3>
                <p className="text-slate-300">
                  <strong style={{ color: themeColors.secondary }}>Launchpad Starter</strong> — You've completed your onboarding!
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Tasks Section - Theme Aware */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="lg:col-span-2 relative"
          >
            {/* Removed hover glow */}
            
            <div className="relative glass-dark backdrop-blur-2xl rounded-2xl p-6 md:p-8 border border-white/10">
              <h3 className="text-white mb-6 flex items-center gap-2">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{
                    background: themeColors.gradient,
                  }}
                >
                  <Target className="w-5 h-5 text-white" strokeWidth={2} />
                </div>
                Phase 1: Getting Started
              </h3>
              
              <div className="space-y-3">
                {tasks.map((task, idx) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + idx * 0.1 }}
                    whileHover={{ x: 4 }}
                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                      task.completed
                        ? 'border-green-500/30 bg-green-500/10'
                        : 'border-white/10 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    {/* Checkbox */}
                    <div className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center flex-shrink-0 ${
                      task.completed
                        ? 'border-green-500 bg-green-500'
                        : 'border-white/20 bg-white/5'
                    }`}>
                      {task.completed && <CheckCircle2 className="w-5 h-5 text-white" strokeWidth={2.5} />}
                    </div>
                    
                    {/* Task Info */}
                    <div className="flex-1">
                      <p className={`${task.completed ? 'text-slate-400 line-through' : 'text-slate-200'}`}>
                        {task.title}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">+{task.xp} XP</p>
                    </div>
                    
                    {/* Action Button - Theme colored */}
                    {!task.completed && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-shadow"
                        style={{
                          background: themeColors.gradient,
                          boxShadow: `0 4px 14px 0 ${themeColors.glow}40`,
                        }}
                      >
                        Start
                      </motion.button>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Progress Bar - Theme Aware */}
              <div 
                className="mt-6 p-4 glass-dark rounded-xl border"
                style={{
                  borderColor: `${themeColors.primary}20`,
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-slate-300">
                    <strong style={{ color: themeColors.secondary }}>Progress:</strong> 1 of 4 tasks completed
                  </p>
                  <span 
                    className="text-sm font-semibold"
                    style={{ color: themeColors.secondary }}
                  >
                    25%
                  </span>
                </div>
                <div className="relative h-2.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '25%' }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="h-full relative"
                    style={{
                      background: themeColors.gradient,
                    }}
                  >
                    <motion.div
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="space-y-6"
          >
            {/* Quick Links - Theme Aware */}
            <div className="relative">
              {/* Removed hover glow */}
              
              <div className="relative glass-dark backdrop-blur-2xl rounded-2xl p-6 border border-white/10">
                <h3 className="text-white mb-4">Quick Links</h3>
                <div className="space-y-2">
                  {[
                    { icon: Book, label: 'Browse Courses' },
                    { icon: Target, label: 'Find Projects' },
                    { icon: User, label: 'Your Profile' },
                  ].map((link, idx) => {
                    const Icon = link.icon;
                    return (
                      <motion.a
                        key={link.label}
                        href="#"
                        whileHover={{ x: 4, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all group/link"
                      >
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{
                            background: themeColors.gradient,
                          }}
                        >
                          <Icon className="w-5 h-5 text-white" strokeWidth={2} />
                        </div>
                        <span className="text-slate-300 group-hover/link:text-white transition-colors">{link.label}</span>
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Mentor CTA - Theme colored */}
            <div className="relative">
              {/* Reduced glow opacity */}
              <div 
                className="absolute -inset-px rounded-2xl blur-lg opacity-30"
                style={{
                  background: themeColors.gradient,
                }}
              />
              
              <div 
                className="relative rounded-2xl p-6 text-white"
                style={{
                  background: themeColors.gradient,
                }}
              >
                <Sparkles className="w-10 h-10 mb-4 opacity-90" />
                <h3 className="text-white mb-2">Need Help?</h3>
                <p className="text-sm text-white/80 mb-4 leading-relaxed">
                  Connect with a mentor to guide your journey and unlock your full potential
                </p>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
                  style={{
                    color: themeColors.primary,
                  }}
                >
                  Find a Mentor
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}