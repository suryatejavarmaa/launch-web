import { motion } from 'motion/react';
import { Check, AlertCircle, LucideIcon } from 'lucide-react';

interface PremiumInputProps {
  icon: LucideIcon;
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder: string;
  error?: string;
  completed?: boolean;
}

export function PremiumInput({
  icon: Icon,
  label,
  type,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  completed,
}: PremiumInputProps) {
  return (
    <div className="space-y-3">
      <label className="flex items-center gap-2 text-slate-300">
        <Icon className="w-4 h-4" />
        {label}
      </label>
      
      <div className="relative group">
        {/* Focus Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity blur-xl" />
        
        {/* Input */}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`relative w-full px-4 py-4 bg-white/5 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all backdrop-blur-xl ${
            error
              ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50'
              : completed
              ? 'border-green-500/50 focus:ring-blue-500/50 focus:border-blue-500/50'
              : 'border-white/10 focus:ring-blue-500/50 focus:border-blue-500/50'
          }`}
        />
        
        {/* Success Indicator */}
        {completed && !error && (
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
              <Check className="w-4 h-4 text-white" strokeWidth={3} />
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Error Message */}
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
      
      {/* Success Message */}
      {completed && !error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-green-400 text-sm flex items-center gap-1"
        >
          <Check className="w-4 h-4" />
          Great! +10 XP
        </motion.p>
      )}
    </div>
  );
}
