import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface EnvelopeIntroProps {
  onComplete: () => void;
}

export default function EnvelopeIntro({ onComplete }: EnvelopeIntroProps) {
  const [stage, setStage] = useState<'idle' | 'opening' | 'done'>('idle');

  const handleClick = () => {
    if (stage !== 'idle') return;
    setStage('opening');
    setTimeout(() => {
      setStage('done');
      setTimeout(onComplete, 1200);
    }, 3000);
  };

  return (
    <AnimatePresence>
      {stage !== 'done' && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          onClick={handleClick}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            cursor: stage === 'idle' ? 'pointer' : 'default',
            overflow: 'hidden',
            backgroundColor: '#F5ECD7',
          }}
        >
          {/* Full screen envelope image */}
          <motion.div
            animate={stage === 'opening' ? { scale: 1.05 } : { scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url('https://static.wixstatic.com/media/b5e630_b29827d240634a15a20542039e5e7992~mv2.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />

          {/* Flap overlay — animates opening upward */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            perspective: '1200px',
            zIndex: 10,
            pointerEvents: 'none',
          }}>
            <motion.div
              initial={{ rotateX: 0 }}
              animate={stage === 'opening' ? { rotateX: -180 } : { rotateX: 0 }}
              transition={{ duration: 1.4, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              style={{
                transformOrigin: 'top center',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Flap shape matching the envelope */}
              <div style={{
                width: 0,
                height: 0,
                borderStyle: 'solid',
                borderWidth: `0 50vw 45vh 50vw`,
                borderColor: `transparent transparent #EDE8DC transparent`,
              }} />
            </motion.div>
          </div>

          {/* Card sliding up after flap opens */}
          <motion.div
            initial={{ y: '100vh', opacity: 0 }}
            animate={stage === 'opening' ? { y: '-5vh', opacity: 1 } : { y: '100vh', opacity: 0 }}
            transition={{ delay: 1.2, duration: 1.2, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 20,
              width: 'min(400px, 85vw)',
              backgroundColor: '#FFFDF9',
              border: '1px solid rgba(200,169,106,0.3)',
              boxShadow: '0 12px 60px rgba(0,0,0,0.15)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '48px 40px',
              gap: '16px',
            }}
          >
            {/* Top gold line */}
            <div style={{ width: '60px', height: '1px', backgroundColor: '#C8A96A' }} />

            {/* You are invited */}
            <p style={{
              fontFamily: 'Ephesis, cursive',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              color: '#1C1C1C',
              margin: 0,
              lineHeight: 1.2,
              textAlign: 'center',
            }}>
              You are invited
            </p>

            {/* Diamond separator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '30px', height: '1px', backgroundColor: '#C8A96A' }} />
              <svg width="6" height="6" viewBox="0 0 10 10" fill="none">
                <rect x="5" y="0.5" width="6.36" height="6.36" rx="0.5" transform="rotate(45 5 0.5)" fill="#C8A96A"/>
              </svg>
              <div style={{ width: '30px', height: '1px', backgroundColor: '#C8A96A' }} />
            </div>

            {/* Names */}
            <p style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.72rem',
              fontWeight: 400,
              letterSpacing: '0.2em',
              color: '#C8A96A',
              textTransform: 'uppercase',
              margin: 0,
            }}>
              Amali & Ashen
            </p>

            {/* Bottom gold line */}
            <div style={{ width: '60px', height: '1px', backgroundColor: '#C8A96A' }} />
          </motion.div>

          {/* Wax seal fades out when opening */}
          <motion.div
            animate={stage === 'opening' ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 15,
              pointerEvents: 'none',
            }}
          >
            {/* Pulse ring animation on seal */}
            {stage === 'idle' && (
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  border: '2px solid #C8A96A',
                }}
              />
            )}
          </motion.div>

          {/* Gold sparkle corners */}
          <div style={{
            position: 'absolute', top: '32px', left: '32px',
            color: '#C8A96A', fontSize: '1rem', letterSpacing: '8px', zIndex: 30
          }}>✦ ✦</div>
          <div style={{
            position: 'absolute', top: '32px', right: '32px',
            color: '#C8A96A', fontSize: '1rem', letterSpacing: '8px', zIndex: 30
          }}>✦ ✦</div>

          {/* Tap hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: stage === 'idle' ? 1 : 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            style={{
              position: 'absolute',
              bottom: '40px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.65rem',
              fontWeight: 300,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#C8A96A',
              whiteSpace: 'nowrap',
              zIndex: 30,
            }}
          >
            Tap to open
          </motion.p>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
