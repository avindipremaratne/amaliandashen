import { Image } from '@/components/ui/image';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Venue', id: 'venue' },
    { label: 'Attire', id: 'attire' },
    { label: 'RSVP', id: 'rsvp' },
    { label: 'Gallery', id: 'gallery' },
  ];

  // Intersection Observer — detects which section is in view while scrolling
  useEffect(() => {
    // On RSVP page, always highlight RSVP
    if (location.pathname === '/rsvp') {
      setActiveSection('rsvp');
      return;
    }

    const sectionIds = navItems.map((item) => item.id);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          // Trigger when section reaches top third of viewport
          rootMargin: '-20% 0px -60% 0px',
          threshold: 0,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [location.pathname]);

  const handleNavClick = (sectionId: string) => {
    setIsMenuOpen(false);
    setActiveSection(sectionId);
    if (location.pathname === '/') {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  const isActive = (id: string) => activeSection === id;

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
        <div className="container mx-auto px-6 py-2 md:py-4">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <div>
              <Image
  src="https://static.wixstatic.com/media/b5e630_3c43452be4184c6c8a4adc35c634aa03~mv2.png"
  alt="Logo"
  style={{
    width: window.innerWidth < 768 ? '36px' : '70px',
    height: window.innerWidth < 768 ? '36px' : '70px',
    borderRadius: '8px',
  }}
/>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-10">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="font-paragraph text-xs uppercase tracking-widest transition-all duration-200 pb-1"
                  style={{
                    color: isActive(item.id) ? '#C8A96A' : '#1C1C1C',
                    borderBottom: isActive(item.id)
                      ? '1px solid #C8A96A'
                      : '1px solid transparent',
                  }}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            {/* Mobile Menu Button */}
<button
  onClick={() => setIsMenuOpen(!isMenuOpen)}
  className="md:hidden transition-colors duration-200 p-2"
  aria-label="Toggle menu"
>
  {isMenuOpen ? (
    <X size={22} style={{ color: '#1C1C1C' }} />
  ) : (
    <div className="flex flex-col" style={{ gap: '6px' }}>
      <div style={{ width: '24px', height: '1.5px', backgroundColor: '#C8A96A' }} />
      <div style={{ width: '24px', height: '1.5px', backgroundColor: '#C8A96A' }} />
      <div style={{ width: '24px', height: '1.5px', backgroundColor: '#C8A96A' }} />
    </div>
  )}
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
          <div className="flex justify-end px-6 pt-6">
            <button onClick={() => setIsMenuOpen(false)} style={{ color: '#1C1C1C' }}>
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center gap-10">

            <div style={{ width: '40px', height: '1px', backgroundColor: '#C8A96A' }} />

            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="font-paragraph text-sm uppercase tracking-widest transition-all duration-200"
                style={{
                  color: isActive(item.id) ? '#C8A96A' : '#1C1C1C',
                  fontWeight: isActive(item.id) ? 600 : 400,
                  borderBottom: isActive(item.id)
                    ? '1px solid #C8A96A'
                    : '1px solid transparent',
                  paddingBottom: '2px',
                }}
              >
                {item.label}
              </button>
            ))}

            <div style={{ width: '40px', height: '1px', backgroundColor: '#C8A96A' }} />

          </div>
        </div>
      )}
    </>
  );
}
