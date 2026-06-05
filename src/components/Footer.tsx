export default function Footer() {
  return (
    <footer className="py-12 border-t" style={{ borderColor: '#C8A96A33', backgroundColor: '#F7F3EE' }}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-4 text-center">

          {/* Gold divider top */}
          <div className="w-16 h-px mb-4" />

          {/* Names */}
          <span
            className="text-4xl md:text-5xl"
            style={{ fontFamily: "Ephesis, cursive", fontWeight: 400, color: '#1C1C1C' }}
          >
            Ashen & Amali
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

          {/* Copyright */}
          <p className="font-paragraph text-xs mt-2" style={{ color: '#3A3A3A99' }}>
            © 2026 Ashen & Amali. All rights reserved.
          </p>

        </div>
      </div>
    </footer>
  );
}
