import EnvelopeIntro from '@/components/EnvelopeIntro';
import MusicPlayer, { MusicPlayerHandle } from '@/components/MusicPlayer';
import GalleryPage from '@/components/pages/GalleryPage';
import HomePage from '@/components/pages/HomePage';
import RSVPPage from '@/components/pages/RSVPPage';
import SchedulePage from '@/components/pages/SchedulePage';
import { MemberProvider } from '@/integrations';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import { ScrollToTop } from '@/lib/scroll-to-top';
import { useEffect, useRef, useState } from 'react';
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom';

function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        routeMetadata: { pageIdentifier: 'home' },
      },
      {
        path: "schedule",
        element: <SchedulePage />,
        routeMetadata: { pageIdentifier: 'schedule' },
      },
      {
        path: "rsvp",
        element: <RSVPPage />,
        routeMetadata: { pageIdentifier: 'rsvp' },
      },
      {
        path: "gallery",
        element: <GalleryPage />,
        routeMetadata: { pageIdentifier: 'gallery' },
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  const [showIntro, setShowIntro] = useState(true);
  const musicRef = useRef<MusicPlayerHandle>(null);

  const handleIntroComplete = () => {
    setShowIntro(false);
    document.body.classList.add('intro-done');
    musicRef.current?.unmute();
  };

  // Browsers require a genuine user gesture before audio can play. Rather
  // than modifying EnvelopeIntro.tsx, we listen for the very first tap
  // anywhere on the page (which is the envelope tap itself) and use that
  // moment to start the track muted. It stays silent until the envelope
  // video actually finishes, at which point handleIntroComplete unmutes it.
  useEffect(() => {
    const startOnFirstInteraction = () => {
      musicRef.current?.startMuted();
      document.removeEventListener('click', startOnFirstInteraction);
      document.removeEventListener('touchstart', startOnFirstInteraction);
    };
    document.addEventListener('click', startOnFirstInteraction, { once: true });
    document.addEventListener('touchstart', startOnFirstInteraction, { once: true });
    return () => {
      document.removeEventListener('click', startOnFirstInteraction);
      document.removeEventListener('touchstart', startOnFirstInteraction);
    };
  }, []);

  return (
    <MemberProvider>
      {showIntro && (
        <EnvelopeIntro onComplete={handleIntroComplete} />
      )}
      <MusicPlayer ref={musicRef} />
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
