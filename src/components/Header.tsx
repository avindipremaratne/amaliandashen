import { Image } from '@/components/ui/image';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">

          {/* Logo/Image Box */}
          <div className="hidden md:block">
            <Image
              src="https://static.wixstatic.com/media/b5e630_3c43452be4184c6c8a4adc35c634aa03~mv2.png"
              width={60}
              height={60}
              className="rounded-lg"
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
