// import { Image } from '@/components/ui/image';
// import { Menu, X } from 'lucide-react';
// import { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// export default function Header() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const handleNavClick = (sectionId: string) => {
//     setIsMenuOpen(false);
//     if (location.pathname === '/') {
//       document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
//     } else {
//       navigate('/');
//       setTimeout(() => {
//         document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
//       }, 300);
//     }
//   };

//   return (
//     <header className="fixed top-0 left-0 w-full z-50 border-b"
//   style={{
//     backgroundColor: '#F7F3EEE0',
//     backdropFilter: 'blur(8px)',
//     borderColor: '#C8A96A33'
//   }}>
//   <div className="container mx-auto px-6 py-4">
//     <div className="flex items-center justify-between">

//       {/* Logo/Image Box */}
//       <div className="hidden md:block">
//         <Image
//           src="https://static.wixstatic.com/media/b5e630_3c43452be4184c6c8a4adc35c634aa03~mv2.png"
//           width={70}
//           height={70}
//           sizes="(max-width: 768px) 64px, 80px"
//           className="rounded-lg"
//         />
//       </div>

//       {/* Desktop Navigation */}
//       <nav className="hidden md:flex items-center gap-10">
//         {[
//           { label: 'Home', id: 'home' },
//           { label: 'Schedule', id: 'schedule' },
//           { label: 'Venue', id: 'venue' },
//           { label: 'RSVP', id: 'rsvp' },
//           { label: 'Gallery', id: 'gallery' },
//         ].map((item) => (
//           <button
//             key={item.id}
//             onClick={() => handleNavClick(item.id)}
//             className="font-paragraph text-xs uppercase tracking-widest transition-all duration-200 pb-1 border-b-2 border-transparent hover:border-current"
//             style={{
//   color: '#1C1C1C',
//   borderBottomColor: location.hash === `#${item.id}` ||
//     (location.pathname === '/rsvp' && item.id === 'rsvp') ? '#C8A96A' : 'transparent'
// }}
//           >
//             {item.label}
//           </button>
//         ))}
//       </nav>

//       {/* Mobile Menu Button */}
//       <button
//         onClick={() => setIsMenuOpen(!isMenuOpen)}
//         className="md:hidden transition-colors duration-200"
//         style={{ color: '#1C1C1C' }}
//         aria-label="Toggle menu"
//       >
//         {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//       </button>
//     </div>

//     {/* Mobile Navigation */}
//     {isMenuOpen && (
//       <nav className="md:hidden mt-4 pb-4 flex flex-col gap-6 border-t pt-4" style={{ borderColor: '#C8A96A33', backgroundColor: '#F7F3EEF0' }}>
//         {[
//           { label: 'Home', id: 'home' },
//           { label: 'Schedule', id: 'schedule' },
//           { label: 'Venue', id: 'venue' },
//           { label: 'RSVP', id: 'rsvp' },
//           { label: 'Gallery', id: 'gallery' },
//         ].map((item) => (
//           <button
//             key={item.id}
//             onClick={() => handleNavClick(item.id)}
//             className="font-paragraph text-xs uppercase tracking-widest text-left transition-all duration-200"
//             style={{ color: '#1C1C1C' }}
//           >
//             {item.label}
//           </button>
//         ))}
//       </nav>
//     )}
//   </div>
// </header>
//   );
// }


import { Image } from '@/components/ui/image';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (sectionId: string) => {
    setIsMenuOpen(false);
    if (location.pathname === '/') {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Schedule', id: 'schedule' },
    { label: 'Venue', id: 'venue' },
    { label: 'RSVP', id: 'rsvp' },
    { label: 'Gallery', id: 'gallery' },
  ];

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full z-50 border-b"
        style={{
          backgroundColor: '#F7F3EEE0',
          backdropFilter: 'blur(8px)',
          borderColor: '#C8A96A33',
        }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <div className="hidden md:block">
              <Image
                src="https://static.wixstatic.com/media/b5e630_3c43452be4184c6c8a4adc35c634aa03~mv2.png"
                width={70}
                height={70}
                sizes="(max-width: 768px) 64px, 80px"
                className="rounded-lg"
              />
            </div>

            {/* Mobile logo — show on mobile only */}
            <div className="md:hidden">
              <span
                style={{
                  fontFamily: 'Ephesis, cursive',
                  fontSize: '1.6rem',
                  color: '#1C1C1C',
                  fontWeight: 400,
                }}
              >
                Amali & Ashen
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-10">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="font-paragraph text-xs uppercase tracking-widest transition-all duration-200 pb-1 border-b-2 border-transparent hover:border-current"
                  style={{
                    color: '#1C1C1C',
                    borderBottomColor:
                      location.hash === `#${item.id}` ||
                      (location.pathname === '/rsvp' && item.id === 'rsvp')
                        ? '#C8A96A'
                        : 'transparent',
                  }}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden transition-colors duration-200"
              style={{ color: '#1C1C1C' }}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-screen Overlay Menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden flex flex-col"
          style={{
            backgroundColor: 'rgba(247, 243, 238, 0.98)',
            backdropFilter: 'blur(12px)',
          }}
        >
          {/* Close button top right */}
          <div className="flex justify-end px-6 pt-6">
            <button
              onClick={() => setIsMenuOpen(false)}
              style={{ color: '#1C1C1C' }}
            >
              <X size={24} />
            </button>
          </div>

          {/* Centered nav items */}
          <div className="flex-1 flex flex-col items-center justify-center gap-10">

            {/* Decorative top line */}
            <div style={{ width: '40px', height: '1px', backgroundColor: '#C8A96A' }} />

            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="font-paragraph text-sm uppercase tracking-widest transition-all duration-200"
                style={{
                  color:
                    location.hash === `#${item.id}` ||
                    (location.pathname === '/rsvp' && item.id === 'rsvp')
                      ? '#C8A96A'
                      : '#1C1C1C',
                  fontWeight:
                    location.hash === `#${item.id}` ||
                    (location.pathname === '/rsvp' && item.id === 'rsvp')
                      ? 600
                      : 400,
                }}
              >
                {item.label}
              </button>
            ))}

            {/* Decorative bottom line */}
            <div style={{ width: '40px', height: '1px', backgroundColor: '#C8A96A' }} />

            {/* Couple name at bottom of menu */}
            <p
              style={{
                fontFamily: 'Ephesis, cursive',
                fontSize: '2rem',
                color: '#1C1C1C',
                fontWeight: 400,
                marginTop: '16px',
              }}
            >
              Amali & Ashen
            </p>
          </div>

          {/* Date at very bottom */}
          <div className="pb-12 text-center">
            <p
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
                color: '#C8A96A',
                textTransform: 'uppercase',
              }}
            >
              27 • August • 2026
            </p>
          </div>
        </div>
      )}
    </>
  );
}
