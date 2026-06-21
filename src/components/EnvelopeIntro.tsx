import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface EnvelopeIntroProps {
  onComplete: () => void;
}

export default function EnvelopeIntro({ onComplete }: EnvelopeIntroProps) {
  const [done, setDone] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Detect mobile on mount
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const desktopVideo = 'https://video.wixstatic.com/video/b5e630_060e92b416ae4ef8bdcc302ad3e7661e/1080p/mp4/file.mp4';
  const mobileVideo = 'https://video.wixstatic.com/video/b5e630_0e92cca087694d7eb79d0074b7027b7c/720p/mp4/file.mp4';

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
          {/* Desktop video — hidden on mobile */}
<video
  ref={!isMobile ? videoRef : undefined}
  muted
  playsInline
  onEnded={handleEnded}
  style={{
    position: 'absolute',
    //inset: 0,
    width: 'auto',
    height: 'auto',
    objectFit: 'fill',
    display: isMobile ? 'none' : 'block',
  }}
>
  <source
    src={desktopVideo}
    type="video/mp4"
  />
</video>

{/* Mobile video — hidden on desktop */}
<video
  ref={isMobile ? videoRef : undefined}
  muted
  playsInline
  onEnded={handleEnded}
  style={{
    position: 'absolute',
    inset: 0,
    width: 'autofill',
    height: 'autofill',
    top:'-40%',
    objectFit: 'center',
    display: isMobile ? 'block' : 'none',
  }}
>
  <source
    src={mobileVideo}
    type="video/mp4"
  />
</video>

          {/* Tap hint */}
          {!playing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              style={{
                position: 'absolute',
                bottom: '60px',
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
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  border: '1px solid rgba(200,169,106,0.8)',
                }}
              />
              <p style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '0.72rem',
                fontWeight: 500,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#1C1C1C',
                whiteSpace: 'nowrap',
                margin: 0,
                backgroundColor: 'rgba(247,243,238,0.7)',
                padding: '6px 16px',
                borderRadius: '999px',
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
