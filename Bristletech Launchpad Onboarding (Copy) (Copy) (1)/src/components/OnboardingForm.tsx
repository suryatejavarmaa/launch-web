import { motion } from 'motion/react';
import QRCode from 'react-qr-code';
import { ExternalLink, Smartphone, Sparkles, ArrowRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface OnboardingFormProps {
  onFieldComplete?: (xp: number, reason: string) => void;
  onBadgeEarned?: (badge: string) => void;
  onSubmit?: (data: any) => void;
  submitButtonRef?: any;
  isSubmitting?: boolean;
}

export function OnboardingForm({
  onFieldComplete,
  onBadgeEarned,
  onSubmit,
  submitButtonRef,
  isSubmitting
}: OnboardingFormProps) {
  const { theme } = useTheme();

  // Premium Gradients
  const DUAL_GRADIENT = 'linear-gradient(135deg, #B1122C 0%, #B1122C 30%, #FF3A4A 55%, #00A9FF 80%, #00A9FF 100%)';
  const FIRE_GRADIENT = 'linear-gradient(135deg, #B1122C 0%, #FF3A4A 100%)';
  const ICE_GRADIENT = 'linear-gradient(135deg, #00A9FF 0%, #4AD4FF 100%)';

  const getGradient = () => {
    if (theme.mode === 'dual') return DUAL_GRADIENT;
    if (theme.mode === 'fire') return FIRE_GRADIENT;
    if (theme.mode === 'ice') return ICE_GRADIENT;
    return 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)';
  };

  const gradient = getGradient();
  // Using a dummy link as placeholder
  const registrationLink = "https://forms.gle/placeholder";

  return (
    <div className="w-full max-w-4xl mx-auto space-y-12 py-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-5xl md:text-6xl tracking-tight font-bold text-white">
          <span className="bg-clip-text text-transparent" style={{ backgroundImage: gradient }}>
            Join the Cohort
          </span>
        </h1>
        <p className="text-xl text-slate-400">Choose how you want to apply</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 items-stretch">
        {/* Option 1: QR Code */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="group relative rounded-3xl p-[1px] overflow-hidden"
          style={{ background: 'linear-gradient(to bottom right, rgba(255,255,255,0.2), rgba(255,255,255,0.05))' }}
        >
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl rounded-3xl" />
          <div className="relative h-full flex flex-col items-center justify-center p-8 space-y-6 text-center">
            <div className="p-4 bg-white rounded-2xl shadow-2xl shadow-blue-500/10 group-hover:scale-105 transition-transform duration-500">
              <QRCode
                value={registrationLink}
                size={200}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                viewBox={`0 0 256 256`}
              />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
                <Smartphone className="w-6 h-6" /> Scan to Apply
              </h3>
              <p className="text-slate-400">Open your camera and scan the QR code to access the form instantly.</p>
            </div>
          </div>
        </motion.div>

        {/* Option 2: Direct Link */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="group relative rounded-3xl p-[1px] overflow-hidden"
          style={{ background: 'linear-gradient(to bottom left, rgba(255,255,255,0.2), rgba(255,255,255,0.05))' }}
        >
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl rounded-3xl" />
          <div className="relative h-full flex flex-col items-center justify-center p-8 space-y-8 text-center">
            <div className="w-24 h-24 rounded-full bg-slate-900/50 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-colors">
              <ExternalLink className="w-10 h-10 text-white group-hover:text-blue-400 transition-colors" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">Desktop Application</h3>
              <p className="text-slate-400">Prefer filling it out on your computer? Open the form directly in your browser.</p>
            </div>

            <a
              href={registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group/btn inline-flex items-center gap-3 px-8 py-4 rounded-xl text-white font-bold text-lg overflow-hidden"
              style={{ background: gradient }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Open Registration Form <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
            </a>
          </div>
        </motion.div>
      </div>

      <div className="text-center pt-8">
        <p className="text-slate-500 text-sm flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-yellow-500" />
          <span>Applications for Spring 2025 cohort are now open</span>
        </p>
      </div>
    </div>
  );
}