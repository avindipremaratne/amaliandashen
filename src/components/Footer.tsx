export default function Footer() {
  return (
    <footer className="py-12 border-t relative overflow-hidden" style={{ borderColor: '#C8A96A33' }}>
      {/* Bottom floral decoration */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'url(https://static.wixstatic.com/media/b5e630_bf488c1f65c446f1aa985e7b5c076cf5~mv2.jpg)',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'bottom',
        backgroundSize: 'auto',
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
            Our story, becoming forever.
          </p>

          {/* Date */}
          <p className="font-paragraph text-base font-medium tracking-widest" style={{ color: '#C8A96A' }}>
            08 • 27 • 2026
          </p>

          {/* Gold divider bottom */}
          <div className="w-16 h-px mt-4" style={{ backgroundColor: '#C8A96A' }} />
        </div>
      </div>
    </footer>
  );
}
