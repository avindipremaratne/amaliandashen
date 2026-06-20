import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';

interface EnvelopeIntroProps {
  onComplete: () => void;
}

export default function EnvelopeIntro({ onComplete }: EnvelopeIntroProps) {
  const [done, setDone] = useState(false);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleTap = () => {
    if (playing) return;
    setPlaying(true);
    videoRef.current?.play();
  };

  const handleEnded = () => {
    setDone(true);
    setTimeout(onComplete, 800);
  };

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          onClick={handleTap}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: '#F5ECD7',
            cursor: playing ? 'default' : 'pointer',
          }}
        >
          {/* Envelope still image shown before tap */}
          {!playing && (
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url('https://static.wixstatic.com/media/b5e630_b29827d240634a15a20542039e5e7992~mv2.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }} />
          )}

          {/* Video */}
          <video
            ref={videoRef}
            muted
            playsInline
            onEnded={handleEnded}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: playing ? 1 : 0,
            }}
          >
            <source
              src="https://video.wixstatic.com/video/b5e630_429dcaff869a4b9ab6cf13b865baee51/1080p/mp4/file.mp4"
              type="video/mp4"
            />
          </video>

          {/* Tap hint — only shows before playing */}
          {!playing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              style={{
                position: 'absolute',
                bottom: '40px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                zIndex: 10,
              }}
            >
              {/* Pulsing circle */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.2, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  border: '1.5px solid #C8A96A',
                }}
              />
              <p style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '0.65rem',
                fontWeight: 300,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#C8A96A',
                whiteSpace: 'nowrap',
                margin: 0,
              }}>
                Tap to open
              </p>
            </motion.div>
          )}

          {/* Gold sparkle corners */}
          <div style={{ position: 'absolute', top: '32px', left: '32px', color: '#C8A96A', fontSize: '1rem', letterSpacing: '8px', zIndex: 10 }}>✦ ✦</div>
          <div style={{ position: 'absolute', top: '32px', right: '32px', color: '#C8A96A', fontSize: '1rem', letterSpacing: '8px', zIndex: 10 }}>✦ ✦</div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
