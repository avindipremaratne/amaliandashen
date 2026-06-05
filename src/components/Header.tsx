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

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 border-b"
      style={{ backgroundColor: '#F7F3EEE0', backdropFilter: 'blur(8px)', borderColor: '#C8A96A33' }}
    >
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">

          {/* Logo/Image Box */}
          <div className="hidden md:block">
            <Image
              src="https://static.wixstatic.com/media/b5e630_3c43452be4184c6c8a4adc35c634aa03~mv2.png"
              width={70}
              height={70}
              sizes="(max-width: 768px) 64px, 80px"
              className="rounded-lg"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            <button
              onClick={() => handleNavClick('home')}
              className="font-paragraph text-xs uppercase tracking-widest transition-colors duration-200 hover:opacity-60"
              style={{ color: '#1C1C1C' }}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('schedule')}
              className="font-paragraph text-xs uppercase tracking-widest transition-colors duration-200 hover:opacity-60"
              style={{ color: '#1C1C1C' }}
            >
              Schedule
            </button>
            <button
              onClick={() => handleNavClick('venue')}
              className="font-paragraph text-xs uppercase tracking-widest transition-colors duration-200 hover:opacity-60"
              style={{ color: '#1C1C1C' }}
            >
              Venue
            </button>
            <button
              onClick={() => handleNavClick('rsvp')}
              className="font-paragraph text-xs uppercase tracking-widest transition-colors duration-200 hover:opacity-60"
              style={{ color: '#1C1C1C' }}
            >
              RSVP
            </button>
            <button
              onClick={() => handleNavClick('gallery')}
              className="font-paragraph text-xs uppercase tracking-widest transition-colors duration-200 hover:opacity-60"
              style={{ color: '#1C1C1C' }}
            >
              Gallery
            </button>
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

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-6 border-t pt-4" style={{ borderColor: '#C8A96A33' }}>
            <button
              onClick={() => handleNavClick('home')}
              className="font-paragraph text-xs uppercase tracking-widest text-left hover:opacity-60 transition-colors duration-200"
              style={{ color: '#1C1C1C' }}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('schedule')}
              className="font-paragraph text-xs uppercase tracking-widest text-left hover:opacity-60 transition-colors duration-200"
              style={{ color: '#1C1C1C' }}
            >
              Schedule
            </button>
            <button
              onClick={() => handleNavClick('venue')}
              className="font-paragraph text-xs uppercase tracking-widest text-left hover:opacity-60 transition-colors duration-200"
              style={{ color: '#1C1C1C' }}
            >
              Venue
            </button>
            <button
              onClick={() => handleNavClick('rsvp')}
              className="font-paragraph text-xs uppercase tracking-widest text-left hover:opacity-60 transition-colors duration-200"
              style={{ color: '#1C1C1C' }}
            >
              RSVP
            </button>
            <button
              onClick={() => handleNavClick('gallery')}
              className="font-paragraph text-xs uppercase tracking-widest text-left hover:opacity-60 transition-colors duration-200"
              style={{ color: '#1C1C1C' }}
            >
              Gallery
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
