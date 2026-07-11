// import { AnimatePresence, motion } from 'framer-motion';
// import { useEffect, useRef, useState } from 'react';

// interface EnvelopeIntroProps {
//   onComplete: () => void;
// }

// export default function EnvelopeIntro({ onComplete }: EnvelopeIntroProps) {
//   const [done, setDone] = useState(false);
//   const [playing, setPlaying] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isTablet, setIsTablet] = useState(false);
//   const videoRef = useRef<HTMLVideoElement>(null);

//   // Detect mobile on mount
//   useEffect(() => {
//     const width = window.innerWidth;
//     setIsMobile(width < 768);
//     setIsTablet(width >= 768 && width < 1024);
//   }, []);

//   const desktopVideo = 'https://video.wixstatic.com/video/b5e630_060e92b416ae4ef8bdcc302ad3e7661e/1080p/mp4/file.mp4';
//   const mobileVideo = 'https://video.wixstatic.com/video/b5e630_0e92cca087694d7eb79d0074b7027b7c/720p/mp4/file.mp4';
//   const tabletVideo = 'https://video.wixstatic.com/video/b5e630_060e92b416ae4ef8bdcc302ad3e7661e/1080p/mp4/file.mp4';

//   const handleTap = () => {
//     if (playing) return;
//     setPlaying(true);
//     videoRef.current?.play();
//   };

//   const handleEnded = () => {
//     setDone(true);
//     setTimeout(onComplete, 800);
//   };

//   return (
//     <AnimatePresence>
//       {!done && (
//         <motion.div
//           initial={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.8, ease: 'easeInOut' }}
//           onClick={handleTap}
//           style={{
//             position: 'fixed',
//             inset: 0,
//             zIndex: 9999,
//             backgroundColor: '#F5ECD7',
//             cursor: playing ? 'default' : 'pointer',
//           }}
//         >
//           {/* Desktop video — hidden on mobile */}
// <video
//   ref={!isMobile && !isTablet ? videoRef : undefined}
//   playsInline
//   onEnded={handleEnded}
//   style={{
//     position: 'absolute',
//     inset: 0,
//     width: 'autofill',
//     height: 'autofill',
//     objectFit: 'contain',
//     objectPosition:'center',
//     display: !isMobile && !isTablet ? 'block' : 'none',
//   }}
// >
//   <source
//     src={desktopVideo}
//     type="video/mp4"
//   />
// </video>

// {/* Mobile video — hidden on desktop */}
// <video
//   ref={isMobile ? videoRef : undefined}
//   playsInline
//   onEnded={handleEnded}
//   style={{
//     position: 'absolute',
//     inset: 0,
//     width: 'autofill',
//     height: 'autofill',
//     //top:'-40%',
//     objectFit: 'contain',
//     objectPosition: 'center',
//     display: isMobile ? 'block' : 'none',
//   }}
// >
//   <source
//     src={mobileVideo}
//     type="video/mp4"
//   />
// </video>
//   {/* Tablet video — hidden on mobile and desktop */}
// <style>{`
//   .envelope-video-tab {
//     height: -webkit-fill-available !important;
//     width: -webkit-fill-available !important;
//     max-width: unset !important;
//   }
// `}</style>
//           <video
//             ref={isTablet ? videoRef : undefined}
//             playsInline
//             onEnded={handleEnded}
//             className='envelope-video-tab'
//             style={{
//               position: 'absolute',
//               inset: 0,
//               width: '100%',
//               height: '100%',
//               objectFit: 'cover',
//               objectPosition: 'center',
//               display: isTablet ? 'block' : 'none',
//             }}
//           >
//             <source src={tabletVideo} type="video/mp4" />
//           </video>

//           {/* Tap hint */}
//           {!playing && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 1, duration: 0.8 }}
//               style={{
//                 position: 'absolute',
//                 bottom: '60px',
//                 left: '0',
//                 right: '0',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 gap: '10px',
//                 zIndex: 10,
//               }}
//             >
//               <motion.div
//                 animate={{ scale: [1, 1.2, 1], opacity: [0.8, 0.3, 0.8] }}
//                 transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
//                 style={{
//                   width: '44px',
//                   height: '44px',
//                   borderRadius: '50%',
//                   border: '1px solid rgba(200,169,106,0.8)',
//                 }}
//               />
//               <p style={{
//                 fontFamily: 'Montserrat, sans-serif',
//                 fontSize: '0.72rem',
//                 fontWeight: 500,
//                 letterSpacing: '0.3em',
//                 textTransform: 'uppercase',
//                 color: '#1C1C1C',
//                 whiteSpace: 'nowrap',
//                 margin: 0,
//                 backgroundColor: 'rgba(247,243,238,0.7)',
//                 padding: '6px 16px',
//                 borderRadius: '999px',
//               }}>
//                 Tap to Open
//               </p>
//             </motion.div>
//           )}
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }
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

  const desktopVideo = 'https://video.wixstatic.com/video/b5e630_060e92b416ae4ef8bdcc302ad3e7661e/1080p/mp4/file.mp4';
  const mobileVideo = 'https://video.wixstatic.com/video/b5e630_0e92cca087694d7eb79d0074b7027b7c/720p/mp4/file.mp4';
  const tabletVideo = 'https://video.wixstatic.com/video/b5e630_060e92b416ae4ef8bdcc302ad3e7661e/1080p/mp4/file.mp4';

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
  }
`}</style>

          {/* Desktop video */}
          <video
            ref={!isMobile && !isTablet ? videoRef : undefined}
            playsInline
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
            onEnded={handleEnded}
            className="envelope-video envelope-video-mobile mobile-video"
  style={{ objectPosition: 'center 60%' }}
          >
            <source src={mobileVideo} type="video/mp4" />
          </video>

          {/* Tap hint */}
          {!playing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              style={{
                position: 'absolute',
                bottom: '100px',
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
