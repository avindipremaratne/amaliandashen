import { Image } from '@/components/ui/image';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logoUrl = 'https://static.wixstatic.com/media/b5e630_2011f68d0afe4bd28663c7aa8e1979d7~mv2.png?originWidth=128&originHeight=128';

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-6 md:px-12 py-2">
        <div className="flex items-center justify-between gap-2">

          {/* Logo/Image Box */}
             <div className="flex items-center h-full">
  <Image
    src={logoUrl}
    alt="Event logo"
    className="w-10 h-10 md:w-12 md:h-12 object-contain opacity-90"
    width={48}
    height={48}
    sizes="(max-width: 768px) 40px, 48px"
    enableReplace
  />
</div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="#home"
              className="font-paragraph text-sm text-link hover:text-foreground transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="#schedule"
              className="font-paragraph text-sm text-link hover:text-foreground transition-colors duration-200"
            >
              Schedule
            </Link>
            <Link
              to="#venue"
              className="font-paragraph text-sm text-link hover:text-foreground transition-colors duration-200"
            >
              Venue
            </Link>
            <Link
              to="#rsvp"
              className="font-paragraph text-sm text-link hover:text-foreground transition-colors duration-200"
            >
              RSVP
            </Link>
            <Link
              to="#gallery"
              className="font-paragraph text-sm text-link hover:text-foreground transition-colors duration-200"
            >
              Gallery
            </Link>
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
            <Link
              to="#home"
              onClick={() => setIsMenuOpen(false)}
              className="font-paragraph text-sm text-link hover:text-foreground transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="#schedule"
              onClick={() => setIsMenuOpen(false)}
              className="font-paragraph text-sm text-link hover:text-foreground transition-colors duration-200"
            >
              Schedule
            </Link>
            <Link
              to="#venue"
              className="font-paragraph text-sm text-link hover:text-foreground transition-colors duration-200"
            >
              Venue
            </Link>
            <Link
              to="#rsvp"
              onClick={() => setIsMenuOpen(false)}
              className="font-paragraph text-sm text-link hover:text-foreground transition-colors duration-200"
            >
              RSVP
            </Link>
            <Link
              to="#gallery"
              onClick={() => setIsMenuOpen(false)}
              className="font-paragraph text-sm text-link hover:text-foreground transition-colors duration-200"
            >
              Gallery
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
