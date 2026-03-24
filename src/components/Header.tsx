import { Image } from '@/components/ui/image';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logoUrl = 'https://static.wixstatic.com/media/b5e630_8e5ae5ef2b3e4d56a215fa9c6c3ea0f8~mv2.png?originWidth=128&originHeight=128';

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-2 py-2">
        <div className="flex items-center justify-between gap-2">

          {/* Logo/Image Box */}
              <Image
                src={logoUrl}
                alt="Event logo"
                className="w-12 h-12 md:w-16 md:h-16 mb-6 object-contain opacity-90 border-0 border-solid border-gray-200"
                width={128}
              />

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
