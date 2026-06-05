<header className="fixed top-0 left-0 w-full z-50">
  <div className="container mx-auto px-6 py-4">
    <div className="flex items-center justify-between">

      {/* Logo/Image Box */}
      <div className="hidden md:block">
        <Image
          src="https://static.wixstatic.com/media/b5e630_3c43452be4184c6c8a4adc35c634aa03~mv2.png"
          width={70}
          height={70}
          className="rounded-lg"
        />
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-10">
        {[
          { label: 'Home', id: 'home' },
          { label: 'Schedule', id: 'schedule' },
          { label: 'Venue', id: 'venue' },
          { label: 'RSVP', id: 'rsvp' },
          { label: 'Gallery', id: 'gallery' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className="font-paragraph text-xs uppercase tracking-widest transition-all duration-200 pb-1 border-b-2 border-transparent hover:border-current"
            style={{
              color: '#1C1C1C',
              borderBottomColor: location.hash === `#${item.id}` ||
                (location.pathname === '/rsvp' && item.id === 'rsvp') ? '#C8A96A' : 'transparent'
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

    {/* Mobile Navigation */}
    {isMenuOpen && (
      <nav className="md:hidden mt-4 pb-4 flex flex-col gap-6 border-t pt-4" style={{ borderColor: '#C8A96A33', backgroundColor: '#F7F3EEF0' }}>
        {[
          { label: 'Home', id: 'home' },
          { label: 'Schedule', id: 'schedule' },
          { label: 'Venue', id: 'venue' },
          { label: 'RSVP', id: 'rsvp' },
          { label: 'Gallery', id: 'gallery' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className="font-paragraph text-xs uppercase tracking-widest text-left transition-all duration-200"
            style={{ color: '#1C1C1C' }}
          >
            {item.label}
          </button>
        ))}
      </nav>
    )}
  </div>
</header>
