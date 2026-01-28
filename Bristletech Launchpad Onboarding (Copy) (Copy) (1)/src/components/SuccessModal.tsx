import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

interface SuccessModalProps {
  show: boolean;
  onClose: () => void;
  formData: any;
  onJoinWhatsApp: () => void;
  onContinueToDashboard: () => void;
}

interface ConfettiPiece {
  id: number;
  left: number;
  color: string;
  delay: number;
  duration: number;
  rotation: number;
}

export function SuccessModal({ 
  show, 
  onClose, 
  formData, 
  onJoinWhatsApp, 
  onContinueToDashboard 
}: SuccessModalProps) {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  // Extract first name from full name
  const firstName = formData?.fullName ? formData.fullName.split(' ')[0] : 'Student';

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [show]);

  // Generate confetti on mount
  useEffect(() => {
    if (show) {
      const confettiColors = ['#FF3A4A', '#00A9FF', '#4AD4FF', '#B1122C', '#FFD700', '#FFFFFF'];
      const pieces: ConfettiPiece[] = [];
      
      for (let i = 0; i < 50; i++) {
        pieces.push({
          id: i,
          left: Math.random() * 100,
          color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
          delay: Math.random() * 0.5,
          duration: 3 + Math.random() * 2,
          rotation: Math.random() * 720,
        });
      }
      
      setConfetti(pieces);
    } else {
      setConfetti([]);
    }
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* BACKDROP OVERLAY */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 1000,
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
            onClick={onClose}
          />

          {/* CONFETTI CONTAINER */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 1001,
              overflow: 'hidden',
            }}
          >
            {confetti.map((piece) => (
              <motion.div
                key={piece.id}
                initial={{
                  y: -20,
                  x: `${piece.left}vw`,
                  rotate: 0,
                  opacity: 1,
                }}
                animate={{
                  y: '110vh',
                  rotate: piece.rotation,
                  opacity: 0,
                }}
                transition={{
                  duration: piece.duration,
                  delay: piece.delay,
                  ease: 'linear',
                }}
                style={{
                  position: 'absolute',
                  width: '10px',
                  height: '20px',
                  backgroundColor: piece.color,
                  top: 0,
                }}
              />
            ))}
          </div>

          {/* MODAL CONTAINER */}
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: isMobile ? '20px' : '40px',
              pointerEvents: 'none',
            }}
          >
            {/* TICKET CARD */}
            <motion.div
              initial={{ 
                scale: 0.8, 
                opacity: 0,
              }}
              animate={{ 
                scale: 1, 
                opacity: 1,
              }}
              exit={{ 
                scale: 0.8, 
                opacity: 0,
              }}
              transition={{ 
                duration: 0.6, 
                ease: [0.34, 1.56, 0.64, 1] // Bouncy cubic-bezier
              }}
              style={{
                position: 'relative',
                background: 'linear-gradient(145deg, rgba(20, 25, 40, 0.98) 0%, rgba(15, 20, 35, 0.99) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '20px',
                maxWidth: '400px',
                width: '90%',
                padding: isMobile ? '2.5rem 2rem' : '3rem',
                textAlign: 'center',
                boxShadow: '0 0 50px rgba(0, 169, 255, 0.2)',
                pointerEvents: 'auto',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* TICKET CUTOUT - LEFT */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, duration: 0.3, ease: 'backOut' }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '-16px',
                  transform: 'translateY(-50%)',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(0, 0, 0, 0.95)',
                  zIndex: 10,
                }}
              />

              {/* TICKET CUTOUT - RIGHT */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, duration: 0.3, ease: 'backOut' }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '-16px',
                  transform: 'translateY(-50%)',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(0, 0, 0, 0.95)',
                  zIndex: 10,
                }}
              />

              {/* SUCCESS ICON */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  delay: 0.3, 
                  duration: 0.5,
                  type: 'spring',
                  stiffness: 200,
                  damping: 15,
                }}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: '2rem',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: isMobile ? '70px' : '80px',
                    height: isMobile ? '70px' : '80px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(16, 185, 129, 0.15) 100%)',
                    border: '2px solid rgba(34, 197, 94, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={isMobile ? "36" : "40"}
                    height={isMobile ? "36" : "40"}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      color: '#22c55e',
                      filter: 'drop-shadow(0 0 12px rgba(34, 197, 94, 0.6))',
                    }}
                    animate={{
                      filter: [
                        'drop-shadow(0 0 12px rgba(34, 197, 94, 0.6))',
                        'drop-shadow(0 0 20px rgba(34, 197, 94, 0.8))',
                        'drop-shadow(0 0 12px rgba(34, 197, 94, 0.6))',
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <motion.path
                      d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    />
                    <motion.polyline
                      points="22 4 12 14.01 9 11.01"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.3, delay: 0.8 }}
                    />
                  </motion.svg>
                </div>
              </motion.div>

              {/* TITLE */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.3 }}
                style={{
                  marginBottom: '1.25rem',
                }}
              >
                <h2
                  style={{
                    fontSize: isMobile ? '1.5rem' : '1.75rem',
                    fontWeight: 700,
                    margin: 0,
                    lineHeight: 1.2,
                    color: '#a78bfa',
                    fontFamily: 'Poppins, sans-serif',
                  }}
                >
                  Registration
                </h2>
                <h2
                  style={{
                    fontSize: isMobile ? '1.5rem' : '1.75rem',
                    fontWeight: 700,
                    margin: 0,
                    lineHeight: 1.2,
                    background: 'linear-gradient(135deg, #a78bfa 0%, #818cf8 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontFamily: 'Poppins, sans-serif',
                  }}
                >
                  Successful!
                </h2>
              </motion.div>

              {/* PERSONALIZED GREETING */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.3 }}
                style={{
                  marginBottom: '0.75rem',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: isMobile ? '0.95rem' : '1rem',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: 500,
                }}
              >
                Welcome,{' '}
                <span 
                  style={{
                    color: '#818cf8',
                    fontWeight: 700,
                  }}
                >
                  {firstName}
                </span>
                ! 👋
              </motion.div>

              {/* MESSAGE */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.3 }}
                style={{
                  marginBottom: '2rem',
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: isMobile ? '1rem' : '1.1rem',
                    lineHeight: 1.5,
                    fontWeight: 700,
                  }}
                >
                  Welcome to{' '}
                  <span
                    style={{
                      backgroundImage: 'linear-gradient(135deg, #B1122C 0%, #B1122C 30%, #FF3A4A 55%, #00A9FF 80%, #00A9FF 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    LAUNCHPAD
                  </span>
                  !
                </p>
                <p
                  style={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    margin: '0.25rem 0 0',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: isMobile ? '0.85rem' : '0.9rem',
                    lineHeight: 1.5,
                    fontWeight: 400,
                  }}
                >
                  Your journey to greatness begins now.
                </p>
              </motion.div>

              {/* WHATSAPP BUTTON */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.3 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 8px 30px rgba(37, 211, 102, 0.35)',
                }}
                whileTap={{ scale: 0.98 }}
                onClick={onJoinWhatsApp}
                style={{
                  position: 'relative',
                  width: '100%',
                  padding: isMobile ? '1rem 1.5rem' : '1.1rem 1.75rem',
                  borderRadius: '14px',
                  border: '1.5px solid rgba(37, 211, 102, 0.3)',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: isMobile ? '0.95rem' : '1rem',
                  cursor: 'pointer',
                  background: 'rgba(37, 211, 102, 0.12)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  fontFamily: 'Poppins, sans-serif',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  overflow: 'hidden',
                }}
              >
                {/* Background Gradient Overlay */}
                <motion.div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, rgba(37, 211, 102, 0.15) 0%, rgba(18, 140, 126, 0.15) 100%)',
                    opacity: 0,
                  }}
                  whileHover={{
                    opacity: 1,
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* WhatsApp Icon with glow */}
                <motion.div
                  style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                    boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)',
                  }}
                  whileHover={{
                    scale: 1.1,
                    boxShadow: '0 6px 20px rgba(37, 211, 102, 0.5)',
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="#FFFFFF"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </motion.div>

                {/* Button Text */}
                <span 
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    color: '#25D366',
                    fontWeight: 600,
                    letterSpacing: '0.01em',
                  }}
                >
                  Join WhatsApp Community
                </span>
              </motion.button>

              {/* SECONDARY BUTTON */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.3 }}
                whileHover={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                }}
                whileTap={{ scale: 0.98 }}
                onClick={onContinueToDashboard}
                style={{
                  width: '100%',
                  padding: isMobile ? '0.8rem' : '0.9rem',
                  borderRadius: '50px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontWeight: 500,
                  fontSize: isMobile ? '0.95rem' : '1rem',
                  cursor: 'pointer',
                  background: 'transparent',
                  transition: 'all 0.2s ease',
                  fontFamily: 'Poppins, sans-serif',
                  marginTop: '12px',
                }}
              >
                Continue to Dashboard
              </motion.button>

              {/* FOOTER TEXT */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                style={{
                  marginTop: '1.5rem',
                  fontSize: '0.75rem',
                  color: 'rgba(255, 255, 255, 0.4)',
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                One life. One story. 🚀
              </motion.p>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}