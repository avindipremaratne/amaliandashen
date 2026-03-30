import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState('https://static.wixstatic.com/media/b5e630_9fb6b8cc9dfb458eb5ba5dedc72f62e4~mv2.png?originWidth=128&originHeight=128');
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploadingLogo(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogoUrl(event.target?.result as string);
        setIsUploadingLogo(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-6 md:px-12 py-2">
        <div className="flex items-center justify-between gap-2">

          {/* Logo/Image Box */}
          <div className="flex items-center h-full group relative">
            <div className="relative">
              <Image src={logoUrl} alt="Event logo" className="w-10 h-10 md:w-12 md:h-12 object-contain opacity-90 cursor-pointer hover:opacity-100 transition-opacity" onClick={() => setIsEditMode(!isEditMode)} />
              {isEditMode && (
                <div className="absolute top-full left-0 mt-2 bg-card border border-border rounded-lg p-3 shadow-lg z-50">
                  <label className="flex items-center gap-2 cursor-pointer text-foreground hover:text-link transition-colors">
                    <span className="text-xs font-paragraph">Change Logo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      disabled={isUploadingLogo}
                      className="hidden"
                    />
                  </label>
                  {isUploadingLogo && (
                    <p className="text-xs text-muted-foreground mt-2">Uploading...</p>
                  )}
                </div>
              )}
            </div>

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
