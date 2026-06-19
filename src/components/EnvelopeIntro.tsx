import { Image } from '@/components/ui/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface EnvelopeIntroProps {
  onComplete: () => void;
}

export default function EnvelopeIntro({ onComplete }: EnvelopeIntroProps) {
  const [stage, setStage] = useState<'idle' | 'opening' | 'done'>('idle');

  const handleSealClick = () => {
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
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            overflow: 'hidden',
            cursor: stage === 'idle' ? 'pointer' : 'default',
          }}
          onClick={handleSealClick}
        >
          {/* ── FULL SCREEN ENVELOPE BACKGROUND ── */}
          {/* Envelope body — fills entire screen */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#EDE0C8',
          }} />

          {/* Envelope diagonal fold lines from corners to center */}
          {/* Bottom left diagonal */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: 0,
            height: 0,
            borderStyle: 'solid',
            borderWidth: '50vh 0 0 50vw',
            borderColor: `transparent transparent transparent rgba(200,169,106,0.15)`,
          }} />
          {/* Bottom right diagonal */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 0,
            height: 0,
            borderStyle: 'solid',
            borderWidth: '50vh 50vw 0 0',
            borderColor: `transparent rgba(200,169,106,0.15) transparent transparent`,
          }} />
          {/* Bottom center V */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderStyle: 'solid',
            borderWidth: `0 50vw 50vh 50vw`,
            borderColor: `transparent transparent rgba(200,169,106,0.08) transparent`,
          }} />

          {/* ── ENVELOPE FLAP — top triangle, full screen width ── */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            perspective: '1200px',
            transformStyle: 'preserve-3d',
            zIndex: 10,
          }}>
            <motion.div
              initial={{ rotateX: 0 }}
              animate={stage === 'opening' ? { rotateX: -180 } : { rotateX: 0 }}
              transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
              style={{
                width: '100%',
                transformOrigin: 'top center',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Flap triangle — slightly lighter champagne */}
              <div style={{
                width: 0,
                height: 0,
                borderStyle: 'solid',
                borderWidth: `0 50vw 50vh 50vw`,
                borderColor: `transparent transparent #F5ECD7 transparent`,
                filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.08))',
              }} />
            </motion.div>
          </div>

          {/* ── CARD sliding up ── */}
          <motion.div
            initial={{ y: '60vh', opacity: 0 }}
            animate={stage === 'opening' ? { y: '-10vh', opacity: 1 } : { y: '60vh', opacity: 0 }}
            transition={{ delay: 1.0, duration: 1.2, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 20,
              width: '320px',
              backgroundColor: '#FFFDF9',
              border: '1px solid rgba(200,169,106,0.3)',
              boxShadow: '0 8px 48px rgba(0,0,0,0.12)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px 32px',
              gap: '12px',
            }}
          >
            <div style={{ width: '40px', height: '1px', backgroundColor: '#C8A96A' }} />
            <p style={{
              fontFamily: 'Ephesis, cursive',
              fontSize: '2.2rem',
              color: '#1C1C1C',
              margin: 0,
              lineHeight: 1.2,
              textAlign: 'center',
            }}>
              You are invited
            </p>
            <div style={{ width: '40px', height: '1px', backgroundColor: '#C8A96A' }} />
          </motion.div>

          {/* ── WAX SEAL — centered on flap join ── */}
          <motion.div
            animate={stage === 'opening' ? { opacity: 0, scale: 0.7 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 30,
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              backgroundColor: '#C8A96A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 24px rgba(200,169,106,0.6), inset 0 1px 4px rgba(255,255,255,0.3)',
              cursor: 'pointer',
            }}
          >
            {/* Outer ring detail */}
            <div style={{
              position: 'absolute',
              inset: '6px',
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.4)',
            }} />
            <Image
              src="https://static.wixstatic.com/media/b5e630_3c43452be4184c6c8a4adc35c634aa03~mv2.png"
              alt="A&A Monogram"
              width={64}
              height={64}
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </motion.div>

          {/* ── TAP HINT ── */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: stage === 'idle' ? 1 : 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            style={{
              position: 'absolute',
              bottom: '48px',
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

          {/* Gold sparkle corners */}
          <div style={{ position: 'absolute', top: '32px', left: '32px', color: '#C8A96A', fontSize: '1rem', letterSpacing: '8px', zIndex: 30 }}>✦ ✦</div>
          <div style={{ position: 'absolute', top: '32px', right: '32px', color: '#C8A96A', fontSize: '1rem', letterSpacing: '8px', zIndex: 30 }}>✦ ✦</div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
