import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface EnvelopeIntroProps {
  onComplete: () => void;
}

export default function EnvelopeIntro({ onComplete }: EnvelopeIntroProps) {
  const [done, setDone] = useState(false);

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
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: '#F5ECD7',
          }}
        >
          <video
            autoPlay
            muted
            playsInline
            onEnded={handleEnded}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          >
            <source
              src="https://video.wixstatic.com/video/b5e630_429dcaff869a4b9ab6cf13b865baee51/1080p/mp4/file.mp4"
              type="video/mp4"
            />
          </video>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
