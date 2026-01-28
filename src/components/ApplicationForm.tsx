import { motion } from 'motion/react';
import ElectricBorder from './ui/electric-border';
import { CheckCircle, Zap, Users, DollarSign, Award, Smartphone, ExternalLink, ArrowRight, Sparkles } from 'lucide-react';
import QRCode from 'react-qr-code';

export function ApplicationForm() {
  const benefits = [
    { icon: CheckCircle, text: '12-week intensive program' },
    { icon: Users, text: '1-on-1 mentorship with industry experts' },
    { icon: DollarSign, text: 'Access to $100K+ in cloud credits' },
    { icon: CheckCircle, text: 'Direct investor introductions' },
    { icon: Award, text: 'Lifetime alumni network access' }
  ];

  const stats = [
    { label: 'SOC 2 Certified', value: '✓' },
    { label: 'YC Backed', value: '✓' },
    { label: 'Alumni', value: '500+' },
    { label: 'Raised', value: '$50M+' }
  ];

  // Placeholder Link - Replace with actual form URL
  const registrationLink = "https://forms.gle/placeholder";

  const DUAL_GRADIENT = 'linear-gradient(135deg, #B1122C 0%, #B1122C 30%, #FF3A4A 55%, #00A9FF 80%, #00A9FF 100%)';


  return (
    <section
      id="application"
      className="py-12 md:py-16 lp-bg relative overflow-hidden lp-dual-energy"
      style={{ backgroundColor: 'var(--lp-bg-solid)' }}
    >
      {/* Static background orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none lp-radial-red" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none lp-radial-blue" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          {/* Gradient heading - ACCENT USE */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 px-4 text-white">
            Join the <span className="text-glow-red">Launchpad</span>
          </h2>
          {/* Neutral description */}
          <h3 className="text-lg sm:text-xl px-4 text-slate-400">
            Take the first step on your journey from Zero to One. Applications for Spring 2025 cohort are now open.
          </h3>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-white">What You Get</h3>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="group flex items-center gap-4 p-4 rounded-xl border-l-[3px] border-l-sky-500 border-y border-r border-y-white/5 border-r-white/5 bg-gradient-to-r from-white/5 to-transparent hover:from-sky-500/10 hover:to-transparent transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                  >
                    <div className="p-2 rounded-full bg-sky-500/10 group-hover:bg-sky-500/20 transition-colors shadow-[0_0_10px_rgba(14,165,233,0.2)]">
                      <benefit.icon className="w-5 h-5 text-sky-400 group-hover:text-sky-300 transition-colors" />
                    </div>
                    <p className="text-white font-semibold tracking-wide text-lg drop-shadow-sm">{benefit.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Limited Spots card - ACCENT gradient */}
            <ElectricBorder
              color="#7df9ff"
              speed={0.5}
              chaos={0.12}
              borderRadius={16}
              className="relative"
            >
              <motion.div
                className="rounded-2xl p-8 relative overflow-hidden h-full flex flex-col justify-center"
                style={{
                  background: 'linear-gradient(180deg, rgba(10, 20, 30, 0.9) 0%, rgba(5, 10, 15, 0.95) 100%)',
                  boxShadow: 'inset 0 0 60px rgba(125, 249, 255, 0.1)'
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {/* Glows */}
                <div className="absolute top-[-50%] right-[-50%] w-[200px] h-[200px] bg-cyan-500/20 blur-[60px] rounded-full pointer-events-none" />

                <div className="flex items-center gap-3 mb-4 relative z-10">
                  <div className="p-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                    <Zap className="w-5 h-5 text-cyan-400 fill-cyan-400/20" />
                  </div>
                  <h4 className="text-lg font-bold text-white tracking-wide uppercase">Limited Spots</h4>
                </div>
                <p className="text-base relative z-10 text-slate-300 leading-relaxed font-medium">
                  Only <span className="text-cyan-200 font-bold">25 founders</span> accepted per cohort. Apply early to secure your spot.
                </p>
              </motion.div>
            </ElectricBorder>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="rounded-lg p-4 text-center transition-all duration-300"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + (index * 0.1) }}
                >
                  {/* Accent color for value */}
                  <div className="text-2xl font-bold mb-1" style={{ color: 'var(--lp-blue)' }}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* New QR Code & Link Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid sm:grid-cols-2 gap-2 h-full"
          >
            {/* Option 1: QR Code Card */}
            <div className="relative rounded-2xl p-[1px] overflow-hidden group h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl" />
              <div className="relative rounded-2xl bg-slate-950/80 backdrop-blur-xl p-4 flex flex-col items-center text-center h-full justify-between">
                <div className="flex-1 flex items-center justify-center w-full">
                  <div className="p-3 bg-white rounded-xl shadow-2xl group-hover:scale-105 transition-transform duration-500">
                    <QRCode
                      value={registrationLink}
                      size={180}
                      style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                      viewBox={`0 0 256 256`}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-bold text-white flex items-center justify-center gap-2 mb-1">
                    <Smartphone className="w-4 h-4 text-blue-400" /> Scan to Apply
                  </h3>
                  <p className="text-slate-400 text-xs text-balance">Scan to access the form instantly.</p>
                </div>
              </div>
            </div>

            {/* Option 2: Direct Link Card */}
            <div className="relative rounded-2xl p-[1px] overflow-hidden group h-full">
              <div className="absolute inset-0 bg-gradient-to-bl from-white/20 to-white/5 rounded-2xl" />
              <div className="relative rounded-2xl bg-slate-950/80 backdrop-blur-xl p-4 flex flex-col items-center text-center h-full justify-between">
                <div className="flex-1 flex flex-col items-center justify-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-slate-900/50 flex items-center justify-center border border-white/10 group-hover:border-blue-500/50 transition-colors">
                    <ExternalLink className="w-7 h-7 text-white group-hover:text-blue-400 transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Desktop App</h3>
                    <p className="text-slate-400 text-xs px-2 text-balance">Open the form in your browser.</p>
                  </div>
                </div>

                <a
                  href={registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20 mt-4"
                  style={{ background: DUAL_GRADIENT }}
                >
                  Open Form <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="text-center sm:col-span-2 pt-2">
              <p className="text-slate-500 text-xs flex items-center justify-center gap-2">
                <Sparkles className="w-3 h-3 text-yellow-500" />
                <span>Secure your spot for Spring 2025</span>
              </p>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
