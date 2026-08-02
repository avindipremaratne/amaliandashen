// import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

// declare global {
//   interface Window {
//     YT: any;
//     onYouTubeIframeAPIReady: () => void;
//   }
// }

// export interface MusicPlayerHandle {
//   /** Start playback muted — safe to call from a user-gesture handler even before the API/player is ready. */
//   startMuted: () => void;
//   /** Unmute and set an audible volume — call once the site has "loaded" (e.g. envelope closed). */
//   unmute: () => void;
// }

// // The couple's requested track — looped as a single song rather than YouTube's
// // auto-continuing "radio mix" of related tracks.
// const VIDEO_ID = '7maJOI3QMu0';

// const MusicPlayer = forwardRef<MusicPlayerHandle>((_props, ref) => {
//   const playerRef = useRef<any>(null);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const isReadyRef = useRef(false);
//   const pendingStartRef = useRef(false);
//   const [isMuted, setIsMuted] = useState(true);

//   useEffect(() => {
//     function createPlayer() {
//       playerRef.current = new window.YT.Player(containerRef.current, {
//         videoId: VIDEO_ID,
//         playerVars: {
//           autoplay: 0,
//           controls: 0,
//           disablekb: 1,
//           loop: 1,
//           playlist: VIDEO_ID, // required by YouTube for loop=1 to work on a single video
//           modestbranding: 1,
//           rel: 0,
//           fs: 0,
//         },
//         events: {
//           onReady: () => {
//             isReadyRef.current = true;
//             if (pendingStartRef.current) {
//               playerRef.current.mute();
//               playerRef.current.playVideo();
//               playerRef.current.pauseVideo();
//             }
//           },
//         },
//       });
//     }

//     if (window.YT && window.YT.Player) {
//       createPlayer();
//     } else {
//       const tag = document.createElement('script');
//       tag.src = 'https://www.youtube.com/iframe_api';
//       document.body.appendChild(tag);
//       window.onYouTubeIframeAPIReady = createPlayer;
//     }
//   }, []);

//   useImperativeHandle(ref, () => ({
//     // Called on the envelope tap. This doesn't start the song playing for
//     // the guest to hear — it just briefly plays-then-pauses muted, which is
//     // enough for the browser to register this as an authorized user
//     // gesture for this player. That authorization carries over to the
//     // later, real playVideo() call in unmute() below, even though that one
//     // isn't triggered by a fresh click.
//     startMuted: () => {
//       if (isReadyRef.current && playerRef.current) {
//         playerRef.current.mute();
//         playerRef.current.playVideo();
//         playerRef.current.pauseVideo();
//       } else {
//         pendingStartRef.current = true;
//       }
//     },
//     // Called once the envelope intro actually closes — this is when the
//     // song should really start, audibly, from the beginning.
//     unmute: () => {
//       if (playerRef.current) {
//         playerRef.current.seekTo(0, true);
//         playerRef.current.unMute();
//         playerRef.current.setVolume(50);
//         playerRef.current.playVideo();
//         setIsMuted(false);
//       }
//     },
//   }));

//   const toggleMute = () => {
//     if (!playerRef.current) return;
//     if (isMuted) {
//       playerRef.current.unMute();
//       playerRef.current.setVolume(50);
//       setIsMuted(false);
//     } else {
//       playerRef.current.mute();
//       setIsMuted(true);
//     }
//   };

//   return (
//     <>
//       {/* Hidden YouTube embed — kept in the DOM (not display:none) so browsers
//           reliably initialize and run it. */}
//       <div
//         aria-hidden="true"
//         style={{
//           position: 'fixed',
//           bottom: 0,
//           right: 0,
//           width: '1px',
//           height: '1px',
//           overflow: 'hidden',
//           opacity: 0,
//           pointerEvents: 'none',
//         }}
//       >
//         <div ref={containerRef} />
//       </div>

//       {/* Visible control so guests can mute/unmute the background music */}
//       <button
//         onClick={toggleMute}
//         aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
//         style={{
//           position: 'fixed',
//           bottom: '20px',
//           right: '20px',
//           zIndex: 9998,
//           width: '44px',
//           height: '44px',
//           borderRadius: '50%',
//           backgroundColor: 'rgba(31, 42, 68, 0.85)',
//           border: '1px solid rgba(200, 169, 106, 0.6)',
//           color: '#C8A96A',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           cursor: 'pointer',
//           fontSize: '18px',
//           lineHeight: 1,
//         }}
//       >
//         {isMuted ? '🔇' : '🔊'}
//       </button>
//     </>
//   );
// });

// MusicPlayer.displayName = 'MusicPlayer';
// export default MusicPlayer;
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export interface MusicPlayerHandle {
  /** Start playback muted — safe to call from a user-gesture handler even before the API/player is ready. */
  startMuted: () => void;
  /** Unmute and set an audible volume — call once the site has "loaded" (e.g. envelope closed). */
  unmute: () => void;
}

// The couple's requested track — looped as a single song rather than YouTube's
// auto-continuing "radio mix" of related tracks.
const VIDEO_ID = '7maJOI3QMu0';

const MusicPlayer = forwardRef<MusicPlayerHandle>((_props, ref) => {
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isReadyRef = useRef(false);
  const pendingStartRef = useRef(false);
  const pendingUnmuteRef = useRef(false);
  const [isMuted, setIsMuted] = useState(true);
  const shouldBePlayingRef = useRef(false);

  const runUnmute = () => {
    if (!playerRef.current) return;
    playerRef.current.seekTo(0, true);
    playerRef.current.unMute();
    playerRef.current.setVolume(50);
    playerRef.current.playVideo();
    setIsMuted(false);
    shouldBePlayingRef.current = true;
  };

  // Mobile browsers commonly pause embedded iframe media (like this
  // YouTube player) when the tab loses focus — e.g. tapping "View Ceremony
  // Location" opens Maps in a new tab/context. Unlike a native <audio>
  // element, it doesn't resume on its own; nudge it explicitly once the
  // tab is visible again, but only if the music was actually supposed to
  // be playing (not if the guest had manually muted it).
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && shouldBePlayingRef.current && playerRef.current) {
        playerRef.current.playVideo();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  useEffect(() => {
    function createPlayer() {
      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          loop: 1,
          playlist: VIDEO_ID, // required by YouTube for loop=1 to work on a single video
          modestbranding: 1,
          rel: 0,
          fs: 0,
        },
        events: {
          onReady: () => {
            isReadyRef.current = true;
            // If the tap or the 8-second cue already fired before the player
            // finished loading (slow connection), replay whichever of those
            // was missed now that the player actually exists.
            if (pendingUnmuteRef.current) {
              pendingUnmuteRef.current = false;
              runUnmute();
            } else if (pendingStartRef.current) {
              pendingStartRef.current = false;
              playerRef.current.mute();
              playerRef.current.playVideo();
              playerRef.current.pauseVideo();
            }
          },
        },
      });
    }

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      window.onYouTubeIframeAPIReady = createPlayer;
    }
  }, []);

  useImperativeHandle(ref, () => ({
    // Called on the envelope tap. This doesn't start the song playing for
    // the guest to hear — it just briefly plays-then-pauses muted, which is
    // enough for the browser to register this as an authorized user
    // gesture for this player. That authorization carries over to the
    // later, real playVideo() call in unmute() below, even though that one
    // isn't triggered by a fresh click.
    startMuted: () => {
      if (isReadyRef.current && playerRef.current) {
        playerRef.current.mute();
        playerRef.current.playVideo();
        playerRef.current.pauseVideo();
      } else {
        pendingStartRef.current = true;
      }
    },
    // Called once the envelope intro actually closes — this is when the
    // song should really start, audibly, from the beginning. If the player
    // isn't ready yet, queue it instead of silently dropping the cue —
    // onReady above will replay it the moment the player exists.
    unmute: () => {
      if (playerRef.current) {
        runUnmute();
      } else {
        pendingUnmuteRef.current = true;
      }
    },
  }));

  const toggleMute = () => {
    if (!playerRef.current) return;
    if (isMuted) {
      playerRef.current.unMute();
      playerRef.current.setVolume(50);
      setIsMuted(false);
      shouldBePlayingRef.current = true;
    } else {
      playerRef.current.mute();
      setIsMuted(true);
      shouldBePlayingRef.current = false;
    }
  };

  return (
    <>
      {/* Hidden YouTube embed — kept in the DOM (not display:none) so browsers
          reliably initialize and run it. */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          width: '1px',
          height: '1px',
          overflow: 'hidden',
          opacity: 0,
          pointerEvents: 'none',
        }}
      >
        <div ref={containerRef} />
      </div>

      {/* Visible control so guests can mute/unmute the background music */}
      <button
        onClick={toggleMute}
        aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 9998,
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          backgroundColor: 'rgba(31, 42, 68, 0.85)',
          border: '1px solid rgba(200, 169, 106, 0.6)',
          color: '#C8A96A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '18px',
          lineHeight: 1,
        }}
      >
        {isMuted ? '🔇' : '🔊'}
      </button>
    </>
  );
});

MusicPlayer.displayName = 'MusicPlayer';
export default MusicPlayer;
