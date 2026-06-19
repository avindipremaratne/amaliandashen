export default function Footer() {
  return (
    <footer className="py-12 border-t relative overflow-hidden" style={{ borderColor: '#C8A96A33' }}>
      {/* Bottom floral decoration */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'url(https://static.wixstatic.com/media/b5e630_bf488c1f65c446f1aa985e7b5c076cf5~mv2.jpg)',
        backgroundAttachment: 'scroll',
        backgroundPosition: 'bottom',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }} />

      <div className="relative z-10 container mx-auto px-4">
        <div className="flex flex-col items-center gap-4 text-center">

          {/* Gold divider top */}
          <div className="w-16 h-px mb-4" style={{ backgroundColor: '#C8A96A' }} />

          {/* Names */}
          <span
            className="text-4xl md:text-5xl"
            style={{ fontFamily: "Ephesis, cursive", fontWeight: 400, color: '#1C1C1C' }}
          >
            Amali & Ashen
          </span>

          {/* Tagline */}
          <p className="font-paragraph text-sm uppercase tracking-widest" style={{ color: '#3A3A3A' }}>
            The Beginning  of Always
          </p>

          {/* Date */}
          <p className="font-paragraph text-base font-medium tracking-widest" style={{ color: '#C8A96A' }}>
            27 • 08 • 2026
          </p>

          {/* Gold divider bottom */}
          <div className="w-16 h-px mt-4" style={{ backgroundColor: '#C8A96A' }} />
          {/* Website credit — subtle */}
<p
  style={{
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 300,
    fontSize: '0.65rem',
    letterSpacing: '0.08em',
    color: '#3A3A3A',
    opacity: 0.5,
    lineHeight: 1.8,
  }}
>
  Website by <span style={{ fontWeight: 400 }}>Avindi Premaratne</span> · <a href="mailto:avindibuthmini@gmail.com" style={{ color: '#3A3A3A', textDecoration: 'none' }}>your@email.com</a> · <a href="tel:+1234567890" style={{ color: '#3A3A3A', textDecoration: 'none' }}>+1 234 567 890</a>
</p>
        </div>
      </div>
    </footer>
  );
}
