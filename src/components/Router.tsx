// import GalleryPage from '@/components/pages/GalleryPage';
// import HomePage from '@/components/pages/HomePage';
// import RSVPPage from '@/components/pages/RSVPPage';
// import SchedulePage from '@/components/pages/SchedulePage';
// import { MemberProvider } from '@/integrations';
// import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
// import { ScrollToTop } from '@/lib/scroll-to-top';
// import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom';

// // Layout component that includes ScrollToTop
// function Layout() {
//   return (
//     <>
//       <ScrollToTop />
//       <Outlet />
//     </>
//   );
// }

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         index: true,
//         element: <HomePage />,
//         routeMetadata: {
//           pageIdentifier: 'home',
//         },
//       },
//       {
//         path: "schedule",
//         element: <SchedulePage />,
//         routeMetadata: {
//           pageIdentifier: 'schedule',
//         },
//       },
//       {
//         path: "rsvp",
//         element: <RSVPPage />,
//         routeMetadata: {
//           pageIdentifier: 'rsvp',
//         },
//       },
//       {
//         path: "gallery",
//         element: <GalleryPage />,
//         routeMetadata: {
//           pageIdentifier: 'gallery',
//         },
//       },
//       {
//         path: "*",
//         element: <Navigate to="/" replace />,
//       },
//     ],
//   },
// ], {
//   basename: import.meta.env.BASE_NAME,
// });

// export default function AppRouter() {
//   return (
//     <MemberProvider>
//       <RouterProvider router={router} />
//     </MemberProvider>
//   );
// }


import EnvelopeIntro from '@/components/EnvelopeIntro';
import GalleryPage from '@/components/pages/GalleryPage';
import HomePage from '@/components/pages/HomePage';
import RSVPPage from '@/components/pages/RSVPPage';
import SchedulePage from '@/components/pages/SchedulePage';
import { MemberProvider } from '@/integrations';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import { ScrollToTop } from '@/lib/scroll-to-top';
import { useState } from 'react';
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

  return (
    <MemberProvider>
      {showIntro && (
        <EnvelopeIntro onComplete={() => setShowIntro(false)} />
      )}
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
