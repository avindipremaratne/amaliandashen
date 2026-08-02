import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface EnvelopeIntroProps {
  onComplete: () => void;
}

export default function EnvelopeIntro({ onComplete }: EnvelopeIntroProps) {
  const [done, setDone] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const width = window.innerWidth;
    setIsMobile(width < 768);
    setIsTablet(width >= 768 && width < 1024);
  }, []);

  // Force the active video to actually fetch and decode its first frame.
  // A passive `preload="auto"` attribute is only a hint — Safari can and
  // does ignore it under Low Data Mode / cellular data-saving settings,
  // leaving nothing rendered until the user taps. Calling .play() (even
  // muted, even if we immediately .pause() it) is a much stronger signal
  // that reliably forces the fetch/decode in those cases. Falls back
  // silently to the onLoadedMetadata seek trick if the browser still
  // blocks it.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.load();
    video.play()
      .then(() => {
        video.pause();
        video.currentTime = 0.01;
      })
      .catch(() => {
        // Autoplay blocked outright — onLoadedMetadata's seek is the fallback.
      });
  }, [isMobile, isTablet]);

  // Lock page scroll while the envelope is showing. HomePage is mounted
  // underneath us and is scrollable — even a tiny drag while tapping the
  // seal counts as a scroll gesture, which makes Safari collapse its
  // address bar / bottom toolbar. That grows the visual viewport height,
  // and since this overlay is position:fixed + 100% height, it stretches
  // into the new space, making the poster/video appear to shift and zoom.
  // Locking scroll here prevents that gesture from ever firing.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousTouchAction = document.body.style.touchAction;
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.touchAction = previousTouchAction;
    };
  }, []);

  const desktopVideo = 'https://video.wixstatic.com/video/b5e630_060e92b416ae4ef8bdcc302ad3e7661e/1080p/mp4/file.mp4';
  const mobileVideo = 'https://video.wixstatic.com/video/b5e630_180ed74c68224f17a504be8691c2ed82/1080p/mp4/file.mp4';
  const tabletVideo = 'https://video.wixstatic.com/video/b5e630_060e92b416ae4ef8bdcc302ad3e7661e/1080p/mp4/file.mp4';

  const handleTap = () => {
    if (playing) return;
    setPlaying(true);
    videoRef.current?.play();
  };

  const handleEnded = () => {
    setDone(true);
    setTimeout(onComplete, 400);
  };

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          onClick={handleTap}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: '#F5ECD7',
            cursor: playing ? 'default' : 'pointer',
          }}
        >
          {/* Global style override for all envelope videos */}
          {/* <style>{`
            .envelope-video {
              position: absolute !important;
              top: 0 !important;
              left: 0 !important;
              right: 0 !important;
              bottom: 0 !important;
              width: 100% !important;
              height: 100% !important;
              max-width: unset !important;
            }
            .envelope-video-cover {
              object-fit: cover !important;
            }
            .envelope-video-contain {
              object-fit: contain !important;
            }
            .envelope-video-mobile {
   object-fit: cover !important;
  object-position: center 60% !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  max-height: 100vh !important;
  }
          `}</style> */}

          <style>{`
  .envelope-video {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    width: 100% !important;
    height: 100% !important;
    max-width: unset !important;
  }
  .envelope-video-cover {
    object-fit: cover !important;
    object-position: center center !important;
  }
  .envelope-video-mobile {
    object-fit: cover !important;
    object-position: center 60% !important;
  }

  /* Desktop — show desktop, hide others */
  .desktop-video { display: block !important; }
  .tablet-video  { display: none !important; }
  .mobile-video  { display: none !important; }

  /* Tablet */
  @media (min-width: 768px) and (max-width: 1023px) {
    .desktop-video { display: none !important; }
    .tablet-video  { display: block !important; }
    .mobile-video  { display: none !important; }
  }

  /* Mobile */
  @media (max-width: 767px) {
    .desktop-video { display: none !important; }
    .tablet-video  { display: none !important; }
    .mobile-video  { display: block !important; }

    /* Center "Tap to Open" on the wax seal instead of near the bottom edge */
    .tap-hint {
      top: 70% !important;
      bottom: auto !important;
      left: 51% !important;
      right: auto !important;
      transform: translate(-50%, -50%) !important;
    }
  }
`}</style>

          {/* Desktop video */}
          <video
            ref={!isMobile && !isTablet ? videoRef : undefined}
            playsInline
            preload="auto"
            onLoadedMetadata={(e) => { e.currentTarget.currentTime = 0.01; }}
            onEnded={handleEnded}
            className="envelope-video envelope-video-cover desktop-video"
            style={{ objectPosition: 'center center' }}
          >
            <source src={desktopVideo} type="video/mp4" />
          </video>

          {/* Tablet video */}
          <video
            ref={isTablet ? videoRef : undefined}
            playsInline
            preload="auto"
            onLoadedMetadata={(e) => { e.currentTarget.currentTime = 0.01; }}
            onEnded={handleEnded}
            className="envelope-video envelope-video-cover tablet-video"
  style={{ objectPosition: 'center center' }}
          >
            <source src={tabletVideo} type="video/mp4" />
          </video>

          {/* Mobile video */}
          <video
            ref={isMobile ? videoRef : undefined}
            playsInline
            preload="auto"
            onLoadedMetadata={(e) => { e.currentTarget.currentTime = 0.01; }}
            onEnded={handleEnded}
            className="envelope-video envelope-video-mobile mobile-video"
  style={{ objectPosition: 'center 60%' }}
          >
            <source src={mobileVideo} type="video/mp4" />
          </video>

          {/* Tap hint */}
          {!playing && (
            <motion.div
              className="tap-hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              style={{
                position: 'absolute',
                bottom: '100px',
                left: '0',
                right: '20px',
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
