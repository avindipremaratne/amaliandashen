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
      // Already on home page, just scroll
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // On another page, navigate to home then scroll
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-2 py-2">
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
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => handleNavClick('home')}
              className="font-paragraph text-sm text-link hover:text-foreground transition-colors duration-200"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('schedule')}
              className="font-paragraph text-sm text-link hover:text-foreground transition-colors duration-200"
            >
              Schedule
            </button>
            <button
              onClick={() => handleNavClick('venue')}
              className="font-paragraph text-sm text-link hover:text-foreground transition-colors duration-200"
            >
              Venue
            </button>
            <button
              onClick={() => handleNavClick('rsvp')}
              className="font-paragraph text-sm text-link hover:text-foreground transition-colors duration-200"
            >
              RSVP
            </button>
            <button
              onClick={() => handleNavClick('gallery')}
              className="font-paragraph text-sm text-link hover:text-foreground transition-colors duration-200"
            >
              Gallery
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-foreground hover:text-link transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4 border-t border-border pt-4">
            <button
              onClick={() => handleNavClick('home')}
              className="font-paragraph text-sm text-link hover:text-foreground transition-colors duration-200 text-left"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('schedule')}
              className="font-paragraph text-sm text-link hover:text-foreground transition-colors duration-200 text-left"
            >
              Schedule
            </button>
            <button
              onClick={() => handleNavClick('venue')}
              className="font-paragraph text-sm text-link hover:text-foreground transition-colors duration-200 text-left"
            >
              Venue
            </button>
            <button
              onClick={() => handleNavClick('rsvp')}
              className="font-paragraph text-sm text-link hover:text-foreground transition-colors duration-200 text-left"
            >
              RSVP
            </button>
            <button
              onClick={() => handleNavClick('gallery')}
              className="font-paragraph text-sm text-link hover:text-foreground transition-colors duration-200 text-left"
            >
              Gallery
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
