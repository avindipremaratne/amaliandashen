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
      setTimeout(onComplete, 1000);
    }, 2500);
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
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: `url('https://static.wixstatic.com/media/b5e630_962afd5611af40a0b1d4e6917aaabb81~mv2.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Warm ivory overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(247, 243, 238, 0.55)',
          }} />

          {/* Gold sparkle corners */}
          <div style={{ position: 'absolute', top: '40px', left: '40px', color: '#C8A96A', fontSize: '1.2rem', letterSpacing: '6px' }}>✦ ✦</div>
          <div style={{ position: 'absolute', top: '40px', right: '40px', color: '#C8A96A', fontSize: '1.2rem', letterSpacing: '6px' }}>✦ ✦</div>

          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            {/* Tap to open hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: stage === 'idle' ? 1 : 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '0.65rem',
                fontWeight: 300,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#C8A96A',
                marginBottom: '28px',
              }}
            >
              Tap the seal to open
            </motion.p>

            {/* Envelope */}
            <div
              onClick={handleSealClick}
              style={{
                width: '300px',
                position: 'relative',
                cursor: 'pointer',
                filter: 'drop-shadow(0 12px 40px rgba(0,0,0,0.12))',
              }}
            >

              {/* ── ENVELOPE BODY ── */}
              <div style={{
                width: '300px',
                height: '200px',
                backgroundColor: '#FAF6F0',
                border: '1px solid rgba(200,169,106,0.3)',
                borderRadius: '2px',
                position: 'relative',
                overflow: 'hidden',
              }}>

                {/* Side fold lines */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0,
                  width: 0, height: 0, borderStyle: 'solid',
                  borderWidth: '100px 0 0 150px',
                  borderColor: 'transparent transparent transparent rgba(200,169,106,0.12)',
                }} />
                <div style={{
                  position: 'absolute', bottom: 0, right: 0,
                  width: 0, height: 0, borderStyle: 'solid',
                  borderWidth: '100px 150px 0 0',
                  borderColor: 'transparent rgba(200,169,106,0.12) transparent transparent',
                }} />
                {/* Bottom V fold */}
                <div style={{
                  position: 'absolute', bottom: 0, left: '50%',
                  transform: 'translateX(-50%)',
                  width: 0, height: 0, borderStyle: 'solid',
                  borderWidth: '0 150px 100px 150px',
                  borderColor: 'transparent transparent rgba(200,169,106,0.08) transparent',
                }} />

                {/* Card peeking out */}
                <motion.div
                  initial={{ y: 80, opacity: 0 }}
                  animate={stage === 'opening' ? { y: -30, opacity: 1 } : { y: 80, opacity: 0 }}
                  transition={{ delay: 0.9, duration: 1, ease: 'easeOut' }}
                  style={{
                    position: 'absolute',
                    bottom: '8px',
                    left: '16px',
                    right: '16px',
                    height: '130px',
                    backgroundColor: '#FFFDF9',
                    border: '1px solid rgba(200,169,106,0.25)',
                    borderRadius: '1px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
                  }}
                >
                  <div style={{ width: '40px', height: '1px', backgroundColor: '#C8A96A' }} />
                  <p style={{
                    fontFamily: 'Ephesis, cursive',
                    fontSize: '1.8rem',
                    color: '#1C1C1C',
                    margin: 0,
                    lineHeight: 1,
                  }}>
                    Amali & Ashen
                  </p>
                  <p style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '0.6rem',
                    letterSpacing: '0.2em',
                    color: '#C8A96A',
                    margin: 0,
                    textTransform: 'uppercase',
                  }}>
                    27 • 08 • 2026
                  </p>
                  <div style={{ width: '40px', height: '1px', backgroundColor: '#C8A96A' }} />
                </motion.div>
              </div>

              {/* ── ENVELOPE FLAP — 3D fold upward ── */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '300px',
                perspective: '800px',
                zIndex: 10,
              }}>
                <motion.div
                  initial={{ rotateX: 0 }}
                  animate={stage === 'opening' ? { rotateX: -180 } : { rotateX: 0 }}
                  transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                  style={{
                    width: '300px',
                    transformOrigin: 'top center',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Flap triangle — champagne/ivory */}
                  <div style={{
                    width: 0,
                    height: 0,
                    borderStyle: 'solid',
                    borderWidth: '0 150px 120px 150px',
                    borderColor: 'transparent transparent #F5ECD7 transparent',
                    filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.06))',
                  }} />
                  {/* Gold border on flap edge */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 0,
                    height: 0,
                    borderStyle: 'solid',
                    borderWidth: '0 152px 122px 152px',
                    borderColor: 'transparent transparent rgba(200,169,106,0.3) transparent',
                    zIndex: -1,
                  }} />
                </motion.div>
              </div>

              {/* ── WAX SEAL ── */}
              <motion.div
                animate={stage === 'opening' ? { opacity: 0, scale: 0.7 } : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                style={{
                  position: 'absolute',
                  top: '98px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 20,
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  backgroundColor: '#C8A96A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 3px 16px rgba(200,169,106,0.6), inset 0 1px 3px rgba(255,255,255,0.3)',
                  cursor: 'pointer',
                }}
              >
                {/* Outer ring */}
                <div style={{
                  position: 'absolute',
                  inset: '4px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.4)',
                }} />
                <Image
                  src="https://static.wixstatic.com/media/b5e630_3c43452be4184c6c8a4adc35c634aa03~mv2.png"
                  alt="A&A Monogram"
                  width={46}
                  height={46}
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </motion.div>

            </div>

            {/* Names below envelope */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              style={{ textAlign: 'center', marginTop: '36px' }}
            >
              <p style={{
                fontFamily: 'Ephesis, cursive',
                fontSize: '2.8rem',
                color: '#1C1C1C',
                fontWeight: 400,
                margin: 0,
                lineHeight: 1,
              }}>
                Amali & Ashen
              </p>
              <p style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '0.7rem',
                letterSpacing: '0.25em',
                color: '#C8A96A',
                fontWeight: 300,
                marginTop: '10px',
                textTransform: 'uppercase',
              }}>
                27 • August • 2026
              </p>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
