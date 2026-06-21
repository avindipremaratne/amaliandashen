import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';

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
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Video — centered */}
          <video
            ref={videoRef}
            muted
            playsInline
            onEnded={handleEnded}
            style={{
              position: 'fixed',
              top: '30%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              //minWidth: '100%',
              //minHeight: '100%',
              width: 'auto',
              height: 'auto',
              objectFit: 'fill',
            }}
          >
            <source
              src="https://video.wixstatic.com/video/b5e630_429dcaff869a4b9ab6cf13b865baee51/1080p/mp4/file.mp4"
              type="video/mp4"
            />
          </video>

          {/* Tap hint — centered at bottom, white color for visibility */}
          {!playing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              style={{
                position: 'absolute',
                bottom: '48px',
                left: '0',
                right: '0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                zIndex: 10,
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.8, 0.3, 0.8] }}
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
                fontSize: '0.72rem',
                fontWeight: 400,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#C8A96A',
                whiteSpace: 'nowrap',
                margin: 0,
                textShadow: '0 1px 4px rgba(255,255,255,0.8)',
              }}>
                Tap to Open
              </p>
            </motion.div>
          )}

        </motion.div>
      )}
    </AnimatePresence>
  );
}
