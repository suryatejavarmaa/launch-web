import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { XPBar } from './XPBar';
import { OnboardingForm } from './OnboardingForm';
import { OptimizedBackground } from './OptimizedBackground';
import { SuccessModal } from './SuccessModal';

interface OnboardingFlowProps {
  onComplete: (data: any) => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [badges, setBadges] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const addXP = (amount: number, reason: string) => {
    const newXP = xp + amount;
    setXp(newXP);
    
    const newLevel = Math.floor(newXP / 100) + 1;
    if (newLevel > level) {
      setLevel(newLevel);
    }
  };

  const addBadge = (badge: string) => {
    if (!badges.includes(badge)) {
      setBadges([...badges, badge]);
    }
  };

  const handleSubmit = async (data: any) => {
    setFormData(data);
    setIsSubmitting(true);
    
    // Show success modal first
    setTimeout(() => {
      setShowSuccessModal(true);
    }, 300);
  };

  const handleJoinWhatsApp = () => {
    // Open WhatsApp community link in new tab
    window.open('https://chat.whatsapp.com/your-community-link', '_blank');
    // Then continue to dashboard after a brief moment
    setTimeout(() => {
      handleContinueToDashboard();
    }, 1000);
  };

  const handleContinueToDashboard = () => {
    setShowSuccessModal(false);
    setIsSubmitting(false);
    onComplete(formData);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Optimized Background with Theme Support */}
      <OptimizedBackground />

      {/* Sticky XP Bar Header - Fixed at top */}
      <div 
        className="sticky top-0 z-[1000] transition-all"
        style={{
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          background: 'rgba(0, 0, 0, 0.5)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          height: '64px',
        }}
      >
        <XPBar xp={xp} level={level} badges={badges} />
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-12 md:py-16 relative z-10">
        <OnboardingForm
          onFieldComplete={addXP}
          onBadgeEarned={addBadge}
          onSubmit={handleSubmit}
          submitButtonRef={submitButtonRef}
          isSubmitting={isSubmitting}
        />
      </div>

      {/* Success Modal */}
      <SuccessModal
        show={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        formData={formData}
        onJoinWhatsApp={handleJoinWhatsApp}
        onContinueToDashboard={handleContinueToDashboard}
      />
    </div>
  );
}