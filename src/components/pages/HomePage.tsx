// WI-HPI
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Image } from '@/components/ui/image';
import { GuestPhotos, RSVPs } from '@/entities';
import { useFonts } from '@/hooks/useFonts';
import { BaseCrudService } from '@/integrations';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FadeIn = ({
  children,
  delay = 0,
  className = "",
  direction = "up",
  duration = 0.7
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
}) => {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function HomePage() {
  const navigate = useNavigate();
  useFonts();

  // ✅ All state and constants inside the component
  const [heroVisible, setHeroVisible] = useState(false);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [photos, setPhotos] = useState<GuestPhotos[]>([]);
  const [isLoadingPhotos, setIsLoadingPhotos] = useState(true);

  // Trigger hero fade on load
  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    const weddingDate = new Date('2026-08-27T15:30:00').getTime();
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = weddingDate - now;
      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const result = await BaseCrudService.getAll<GuestPhotos>('guestphotos', {}, { limit: 4 });
        setPhotos(result.items);
      } catch (error) {
        console.error('Error fetching photos:', error);
      } finally {
        setIsLoadingPhotos(false);
      }
    };
    fetchPhotos();
  }, []);
const [rsvpData, setRsvpData] = useState({
  guestName: '',
  emailAddress: '',
  isAttending: true,
  message: '',
});
const [isSubmittingRsvp, setIsSubmittingRsvp] = useState(false);
const [rsvpError, setRsvpError] = useState('');
const [showToast, setShowToast] = useState(false);
const [toastAttending, setToastAttending] = useState(true);

const handleRsvpSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmittingRsvp(true);
  setRsvpError('');
  try {
    await BaseCrudService.create<RSVPs>('rsvps', {
      _id: crypto.randomUUID(),
      guestName: rsvpData.guestName,
      emailAddress: rsvpData.emailAddress,
      isAttending: rsvpData.isAttending,
      attendingStatus: rsvpData.isAttending ? 'Yes' : 'No',
      message: rsvpData.message,
    });
    setToastAttending(rsvpData.isAttending);
    setShowToast(true);
    setRsvpData({ guestName: '', emailAddress: '', isAttending: true, message: '' });
    // Auto dismiss after 5 seconds
    setTimeout(() => setShowToast(false), 5000);
  } catch (error) {
    console.error('Error submitting RSVP:', error);
    setRsvpError('Something went wrong. Please try again.');
  } finally {
    setIsSubmittingRsvp(false);
  }
};
  return (
    <div className="min-h-screen font-paragraph text-stone-800 selection:bg-primary/20 selection:text-primary overflow-x-hidden">

      {/* Background image — iOS Safari fix */}
      <div
        className="fixed inset-0 pointer-events-none z-0 bg-rsvp"
        style={{
          backgroundImage: `url('https://static.wixstatic.com/media/b5e630_962afd5611af40a0b1d4e6917aaabb81~mv2.png')`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'scroll',
        }}
      />

      <div className="relative z-10">
        <Header />

        {/* 1. HERO SECTION */}
        <section id="home" className="scroll-mt-24 relative h-screen max-h-screen min-h-[700px] w-full flex flex-col items-center justify-start pt-24 md:pt-32 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://static.wixstatic.com/media/b5e630_4c158fe70f094a0698a34b7c67105676~mv2.jpg"
              alt="Amali and Ashen"
              className="w-full h-full object-cover"
  style={{ objectPosition: '50% 30%' }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-transparent" />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center px-4 w-full max-w-4xl pt-16 md:pt-0">

            {/* "Where We Become Us" & "We're getting married" */}


<p className="text-white/80 font-paragraph uppercase tracking-widest text-sm md:text-base mb-6 wipe-text-1">
  Where We Become Us
</p>


            <p className="text-white/90 font-paragraph text-lg md:text-2xl mb-2 tracking-wide wipe-text-2" style={{ fontWeight: 600 }}>
  We&apos;re getting married
</p>

            {/* "Amali & Ashen" */}
            <h1
  className="text-6xl md:text-7xl lg:text-[100px] text-white mb-4 leading-tight font-normal"
  style={{
    fontFamily: "Ephesis, cursive",
    fontWeight: 400,
    opacity: 0,
    animation: 'fadeUp 1s ease forwards',
    animationDelay: '2.8s',
  }}
>
              Amali &amp; Ashen
            </h1>
          </div>
        </section>

        {/* 2. BIBLE VERSE & INVITATION SECTION */}
        <section className="py-24 relative">
          <div className="container mx-auto px-4 max-w-3xl flex flex-col items-center text-center">
            <FadeIn className="w-full">
              <div
                className="w-full mx-auto px-8 py-12 md:px-16 md:py-16 rounded-2xl"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.55)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(200, 169, 106, 0.2)',
                  boxShadow: '0 8px 48px rgba(0, 0, 0, 0.06)',
                }}
              >
                {/* Gold diamond separator top */}
                <div className="flex items-center justify-center gap-3 mb-12">
                  <div style={{ width: '60px', height: '1px', backgroundColor: '#C8A96A' }} />
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <rect x="5" y="0.5" width="6.36" height="6.36" rx="0.5" transform="rotate(45 5 0.5)" fill="#C8A96A"/>
                  </svg>
                  <div style={{ width: '60px', height: '1px', backgroundColor: '#C8A96A' }} />
                </div>

                {/* Bible verse — Ephesis */}
                <p
                  className="mb-2 leading-relaxed"
                  style={{
                    fontFamily: 'Ephesis, cursive',
                    fontWeight: 400,
                    fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
                    color: '#1C1C1C',
                    lineHeight: 1.6,
                  }}
                >
                  "Love is patient, love is kind… it always protects, always trusts, always hopes, always perseveres."
                </p>
                <p
                  className="mb-12"
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 500,
                    fontSize: '0.78rem',
                    letterSpacing: '0.2em',
                    color: '#C8A96A',
                    textTransform: 'uppercase',
                  }}
                >
                  1 Corinthians 13:4–7
                </p>

                {/* Gold divider */}
                <div className="w-16 h-px mx-auto mb-12" style={{ backgroundColor: '#C8A96A' }} />

                {/* Invitation wording */}
                <p
                  className="mb-3"
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 300,
                    fontSize: '0.95rem',
                    letterSpacing: '0.08em',
                    color: '#3A3A3A',
                    lineHeight: 2,
                  }}
                >
                  With hearts full of love and joy,
                </p>
                <p
                  className="mb-3"
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 400,
                    fontSize: '0.95rem',
                    letterSpacing: '0.1em',
                    color: '#1C1C1C',
                    lineHeight: 2,
                  }}
                >
                  Mr. &amp; Mrs. Fernando <br/>
                  &amp; <br/>
                  Mr. &amp; Mrs. Perera
                </p>
                <p
                  className="mb-8"
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 300,
                    fontSize: '0.85rem',
                    letterSpacing: '0.04em',
                    color: '#3A3A3A',
                    lineHeight: 2,
                  }}
                >
                  invite you to celebrate the union of
                </p>

                {/* Couple names — Ephesis */}
                <p style={{ fontFamily: 'Ephesis, cursive', fontWeight: 400, fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: '#1C1C1C', lineHeight: 1.3 }}>
                  Amali
                </p>
                <p style={{ fontFamily: 'Ephesis, cursive', fontWeight: 400, fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: '#C8A96A', margin: '4px 0' }}>
                  &amp;
                </p>
                <p style={{ fontFamily: 'Ephesis, cursive', fontWeight: 400, fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: '#1C1C1C', lineHeight: 1.3 }}>
                  Ashen
                </p>

                {/* Gold diamond separator bottom */}
                <div className="flex items-center justify-center gap-3 mt-12">
                  <div style={{ width: '60px', height: '1px', backgroundColor: '#C8A96A' }} />
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <rect x="5" y="0.5" width="6.36" height="6.36" rx="0.5" transform="rotate(45 5 0.5)" fill="#C8A96A"/>
                  </svg>
                  <div style={{ width: '60px', height: '1px', backgroundColor: '#C8A96A' }} />
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* 3. COUNTDOWN SECTION */}
        <section className="py-12 md:py-24 relative border-t" style={{ borderColor: '#C8A96A33' }}>
          <div className="container mx-auto px-4 flex flex-col items-center">
            <FadeIn className="text-center mb-12">
              <h2 className="text-6xl md:text-8xl mb-8" style={{ fontFamily: "Ephesis, cursive", fontWeight: 400, color: '#1C1C1C' }}>
                Counting Down to Forever!
              </h2>
              <div className="flex justify-center items-center gap-2 md:gap-12">
                {[
                  { value: countdown.days, label: 'Days' },
                  { value: countdown.hours, label: 'Hours' },
                  { value: countdown.minutes, label: 'Minutes' },
                  { value: countdown.seconds, label: 'Seconds' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center w-[72px] md:w-28"
                    whileHover={{ scale: 1.05, y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    <motion.span
                      key={`${index}-${item.value}`}
                      className="text-5xl md:text-7xl tracking-tighter font-countdown"
  style={{ color: '#1F2A44' }}
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
                    >
                      {String(item.value).padStart(2, '0')}
                    </motion.span>
                    <div style={{ width: '20px', height: '1px', backgroundColor: '#C8A96A', margin: '6px auto' }} />
                    <span
                      style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontSize: '0.58rem',
                        fontWeight: 700,
                        letterSpacing: '0.3em',
                        textTransform: 'uppercase',
                        color: '#C8A96A',
                        display: 'block',
                      }}
                    >
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </FadeIn>
            <div className="w-24 h-px mx-auto mb-12" style={{ backgroundColor: '#C8A96A' }} />
          </div>
        </section>

        {/* 4. VENUE SECTION */}
        <section
          id="venue"
          className="scroll-mt-24 relative overflow-hidden border-t"
          style={{
            borderColor: '#C8A96A33',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            paddingTop: '6rem',
            paddingBottom: '6rem',
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url('https://static.wixstatic.com/media/b5e630_93f75fc0cd3443e88029e35fbc854b5f~mv2.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: 'rgba(15, 15, 25, 0.55)' }} />

          <div className="container mx-auto px-4 relative z-10 w-full">
            <FadeIn className="text-center mb-8">
              <p style={{ fontFamily: 'Ephesis, cursive', fontWeight: 400, fontSize: '2.5rem', color: '#C8A96A', lineHeight: 1.2 }}>
                Join Us
              </p>
              <h2
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontWeight: 600,
                  fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: '#FFFFFF',
                  lineHeight: 1,
                }}
              >
                The Venue
              </h2>
              <div className="flex items-center justify-center gap-3 my-4">
                <div style={{ width: '40px', height: '1px', backgroundColor: '#C8A96A' }} />
                <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                  <rect x="5" y="0.5" width="6.36" height="6.36" rx="0.5" transform="rotate(45 5 0.5)" fill="#C8A96A"/>
                </svg>
                <div style={{ width: '40px', height: '1px', backgroundColor: '#C8A96A' }} />
              </div>
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '0.75rem', letterSpacing: '0.25em', color: '#FFFFFF', textTransform: 'uppercase' }}>
                Where We Become Us
              </p>
            </FadeIn>

            <FadeIn delay={0.2} className="w-full max-w-sm md:max-w-xl mx-auto px-2 md:px-0">
              <div
                className="rounded-2xl p-6 md:p-10 text-center w-full"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid rgba(200, 169, 106, 0.25)',
                  boxShadow: '0 8px 48px rgba(0,0,0,0.15)',
                }}
              >
                <div className="flex justify-center mb-6">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(200, 169, 106, 0.12)' }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C8A96A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2v4M10 4h4"/>
                      <path d="M5 10h14"/>
                      <path d="M5 10v10h14V10"/>
                      <path d="M9 20v-5h6v5"/>
                      <path d="M5 10l7-4 7 4"/>
                    </svg>
                  </div>
                </div>
                <p className="mb-3" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600, fontSize: '0.65rem', letterSpacing: '0.2em', color: '#C8A96A', textTransform: 'uppercase' }}>
                  Wedding Ceremony
                </p>
                <p className="mb-1" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.15em', color: '#1C1C1C', textTransform: 'uppercase' }}>
                  St. Thomas Aquinas Church
                </p>
                <p className="mb-1" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '0.78rem', letterSpacing: '0.12em', color: '#3A3A3A', textTransform: 'uppercase' }}>
                  Halifax, Nova Scotia
                </p>
                <div className="flex items-center justify-center gap-3 my-5">
                  <div style={{ width: '30px', height: '1px', backgroundColor: '#C8A96A' }} />
                  <svg width="6" height="6" viewBox="0 0 10 10" fill="none">
                    <rect x="5" y="0.5" width="6.36" height="6.36" rx="0.5" transform="rotate(45 5 0.5)" fill="#C8A96A"/>
                  </svg>
                  <div style={{ width: '30px', height: '1px', backgroundColor: '#C8A96A' }} />
                </div>
                <p className="mb-8" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300, fontSize: '0.88rem', color: '#3A3A3A', lineHeight: 1.8 }}>
                  A place of faith, love and blessings.<br />
                  We are delighted to celebrate this special moment<br />
                  surrounded by our family and friends.
                </p>
                <div className="grid grid-cols-3 gap-2 md:gap-4 mb-8 pt-6" style={{ borderTop: '1px solid rgba(200, 169, 106, 0.25)' }}>
                  <div className="flex flex-col items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C8A96A" strokeWidth="1.5" strokeLinecap="round">
                      <rect x="3" y="4" width="18" height="18" rx="2"/>
                      <path d="M16 2v4M8 2v4M3 10h18"/>
                    </svg>
                    <p className="font-paragraph uppercase text-[0.58rem] md:text-[0.62rem] tracking-[0.15em] font-semibold" style={{ color: '#1C1C1C' }}>Date</p>
                    <p className="font-paragraph text-[0.68rem] md:text-[0.75rem]" style={{ color: '#3A3A3A', lineHeight: 1.5 }}>August 27,<br/>2026</p>
                  </div>
                  <div className="flex flex-col items-center gap-2" style={{ borderLeft: '1px solid rgba(200,169,106,0.25)', borderRight: '1px solid rgba(200,169,106,0.25)' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C8A96A" strokeWidth="1.5" strokeLinecap="round">
                      <circle cx="12" cy="12" r="9"/>
                      <path d="M12 7v5l3 3"/>
                    </svg>
                    <p className="font-paragraph uppercase text-[0.58rem] md:text-[0.62rem] tracking-[0.15em] font-semibold" style={{ color: '#1C1C1C' }}>Time</p>
                    <p className="font-paragraph text-[0.68rem] md:text-[0.75rem]" style={{ color: '#3A3A3A' }}>2:00 PM</p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C8A96A" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                      <circle cx="12" cy="9" r="2.5"/>
                    </svg>
                    <p className="font-paragraph uppercase text-[0.58rem] md:text-[0.62rem] tracking-[0.15em] font-semibold" style={{ color: '#1C1C1C' }}>Address</p>
                    <p className="font-paragraph text-[0.68rem] md:text-[0.75rem]" style={{ color: '#3A3A3A', lineHeight: 1.5 }}>1725 Oxford St,<br/>Halifax, NS B3H 3Z7</p>
                  </div>
                </div>
                <button
                  onClick={() => window.open('https://maps.app.goo.gl/Ao3U7iQWuD7CCyQQ8', '_blank')}
                  style={{
                    width: '100%',
                    backgroundColor: '#1F2A44',
                    color: '#FFFFFF',
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 500,
                    fontSize: '0.72rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    padding: '14px 24px',
                    borderRadius: '999px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#C8A96A')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#1F2A44')}
                >
                  View Ceremony Location
                </button>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* 5. ATTIRE SECTION */}
        <section id="attire" className="scroll-mt-24 py-24 relative border-t" style={{ borderColor: '#C8A96A33' }}>
          <div className="container mx-auto px-4 max-w-3xl">
            <FadeIn className="text-center mb-10">
              <p
                className="mb-1"
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontWeight: 600,
                  fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: '#C8A96A',
                  lineHeight: 1,
                }}
              >
                Attire
              </p>
              <div className="flex items-center justify-center gap-3 my-3">
                <div style={{ width: '40px', height: '1px', backgroundColor: '#C8A96A' }} />
                <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                  <rect x="5" y="0.5" width="6.36" height="6.36" rx="0.5" transform="rotate(45 5 0.5)" fill="#C8A96A"/>
                </svg>
                <div style={{ width: '40px', height: '1px', backgroundColor: '#C8A96A' }} />
              </div>
              <p className="mb-6" style={{ fontFamily: 'Ephesis, cursive', fontWeight: 400, fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#1C1C1C', lineHeight: 1.3 }}>
                Modern Heirloom
              </p>
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300, fontSize: '0.88rem', letterSpacing: '0.04em', color: '#3A3A3A', lineHeight: 1.9, maxWidth: '520px', margin: '0 auto' }}>
                We kindly invite our guests to dress in elegant, timeless attire as we celebrate this special day together.
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div
                className="grid grid-cols-2 gap-0 mb-10"
                style={{
                  border: '1px solid rgba(200, 169, 106, 0.2)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  backgroundColor: 'rgba(255,255,255,0.45)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {/* Ladies */}
                <div className="flex flex-col items-center text-center p-6 md:p-8" style={{ borderRight: '1px solid rgba(200,169,106,0.2)' }}>
                  <Image
                    src="https://static.wixstatic.com/media/b5e630_5f87fbae0e4344b3873a6f7494e10bb1~mv2.png"
                    alt="Ladies attire"
                    width={40}
                    height={40}
                    className="mb-4"
                  />
                  <p className="mb-3" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, fontSize: '1.1rem', letterSpacing: '0.2em', color: '#1C1C1C', textTransform: 'uppercase' }}>
                    Ladies
                  </p>
                  <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300, fontSize: '0.88rem', color: '#3A3A3A', lineHeight: 1.8 }}>
                    Ladies are encouraged to choose elegant formal dresses or coordinated ensembles in keeping with the theme.
                  </p>
                </div>

                {/* Gentlemen */}
                <div className="flex flex-col items-center text-center p-6 md:p-8">
                  <Image
                    src="https://static.wixstatic.com/media/b5e630_8fb083ad32d944d5b67d7d2135f0b248~mv2.png"
                    alt="Gentlemen attire"
                    width={40}
                    height={40}
                    className="mb-4"
                  />
                  <p className="mb-3" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, fontSize: '1.1rem', letterSpacing: '0.2em', color: '#1C1C1C', textTransform: 'uppercase' }}>
                    Gentlemen
                  </p>
                  <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300, fontSize: '0.88rem', color: '#3A3A3A', lineHeight: 1.8 }}>
                    Gentlemen are kindly asked to wear a dark suit; tie is optional.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div
                className="rounded-xl p-6 md:p-8 text-center"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.45)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(200, 169, 106, 0.2)',
                }}
              >
                <div className="flex items-center justify-center gap-3 mb-5">
                  <div style={{ width: '30px', height: '1px', backgroundColor: '#C8A96A' }} />
                  <svg width="6" height="6" viewBox="0 0 10 10" fill="none">
                    <rect x="5" y="0.5" width="6.36" height="6.36" rx="0.5" transform="rotate(45 5 0.5)" fill="#C8A96A"/>
                  </svg>
                  <div style={{ width: '30px', height: '1px', backgroundColor: '#C8A96A' }} />
                </div>
                <p className="mb-6" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, fontSize: '0.95rem', letterSpacing: '0.25em', color: '#3A3A3A', textTransform: 'uppercase' }}>
                  Suggested Color Palette
                </p>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-3 md:gap-4 mb-6">
                  {[
                    { color: '#F7E6CA', name: 'Champagne' },
                    { color: '#b9a281', name: 'Taupe' },
                    { color: '#DCCFC0', name: 'Beige' },
                    { color: '#D8B7B2', name: 'Dusty Rose' },
                    { color: '#B9C3AE', name: 'Sage' },
                    { color: '#6D3B07', name: 'Mocha' },
                    { color: '#B7B2AC', name: 'Stone Grey' },
                    { color: '#987b71', name: 'Soft Cocoa' },
                  ].map((swatch) => (
                    <div key={swatch.name} className="flex flex-col items-center gap-2">
                      <div
                        className="rounded-full"
                        style={{
                          width: '40px',
                          height: '40px',
                          backgroundColor: swatch.color,
                          border: '1px solid rgba(0,0,0,0.08)',
                          flexShrink: 0,
                        }}
                      />
                      <p style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 500, fontSize: '0.7rem', letterSpacing: '0.08em', color: '#3A3A3A', textTransform: 'uppercase', lineHeight: 1.3, textAlign: 'center' }}>
                        {swatch.name}
                      </p>
                    </div>
                  ))}
                </div>
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300, fontStyle: 'italic', fontSize: '0.88rem', color: '#3A3A3A', lineHeight: 1.8, letterSpacing: '0.03em' }}>
                  We kindly ask that guests refrain from wearing white, ivory, cream, or shades closely resembling the bridal gown.
                </p>
                <div className="flex items-center justify-center gap-3 mt-5">
                  <div style={{ width: '30px', height: '1px', backgroundColor: '#C8A96A' }} />
                  <svg width="6" height="6" viewBox="0 0 10 10" fill="none">
                    <rect x="5" y="0.5" width="6.36" height="6.36" rx="0.5" transform="rotate(45 5 0.5)" fill="#C8A96A"/>
                  </svg>
                  <div style={{ width: '30px', height: '1px', backgroundColor: '#C8A96A' }} />
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
        {/* 6. GALLERY SECTION */}
        <section id="gallery" className="scroll-mt-24 py-24 border-t" style={{ borderColor: '#C8A96A33' }}>
          <div className="container mx-auto px-4">
            <FadeIn className="text-center mb-16">
              <h2 className="text-6xl md:text-8xl mb-4" style={{ fontFamily: "Ephesis, cursive", fontWeight: 400, color: '#1C1C1C' }}>
                Our Journey Together
              </h2>
              <div className="w-16 h-px mx-auto mt-2 mb-6" style={{ backgroundColor: '#C8A96A' }} />
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300, fontSize: '0.88rem', letterSpacing: '0.08em', color: '#3A3A3A', lineHeight: 1.8 }}>
                Before forever, there was this — our story in moments.
              </p>
            </FadeIn>

            <div className="min-h-[400px] relative max-w-5xl mx-auto">
              {isLoadingPhotos ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 animate-spin" style={{ color: '#C8A96A' }} />
                </div>
              ) : photos.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 auto-rows-[150px] md:auto-rows-[250px]">
                  {photos.map((photo, index) => {
                    let spanClasses = "col-span-1 row-span-1";
                    if (index === 0) spanClasses = "col-span-2 row-span-2";
                    if (index === 1) spanClasses = "col-span-1 row-span-1";
                    if (index === 2) spanClasses = "col-span-1 row-span-1";
                    if (index === 3) spanClasses = "col-span-2 row-span-1";
                    return (
                      <FadeIn
                        key={photo._id || index}
                        delay={index * 0.1}
                        className={`relative overflow-hidden group ${spanClasses}`}
                      >
                        <Image
                          src={photo.photo || 'https://static.wixstatic.com/media/b5e630_50292974e6234a2a9755f1575991a807~mv2.png?originWidth=192&originHeight=192'}
                          alt={photo.caption || 'Journey moment'}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      </FadeIn>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12" style={{ color: '#3A3A3A' }}>Gallery coming soon.</div>
              )}
            </div>
          </div>
        </section>
         {/* 6. RSVP SECTION */}
<section id="rsvp" className="scroll-mt-24 py-24 relative border-t" style={{ borderColor: '#C8A96A33' }}>
  <div className="container mx-auto px-4 max-w-2xl">

    <FadeIn className="text-center mb-10">
      <p style={{ fontFamily: 'Ephesis, cursive', fontWeight: 400, fontSize: '2.5rem', color: '#C8A96A', lineHeight: 1.2 }}>
        Kindly
      </p>
      <h2
        className="rsvp-title"
        style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontWeight: 600,
          fontSize: 'clamp(2.5rem, 8vw, 5rem)',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: '#1C1C1C',
          lineHeight: 1,
        }}
      >
        RSVP
      </h2>
      <div className="flex items-center justify-center gap-3 my-4">
        <div style={{ width: '40px', height: '1px', backgroundColor: '#C8A96A' }} />
        <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
          <rect x="5" y="0.5" width="6.36" height="6.36" rx="0.5" transform="rotate(45 5 0.5)" fill="#C8A96A"/>
        </svg>
        <div style={{ width: '40px', height: '1px', backgroundColor: '#C8A96A' }} />
      </div>
      <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '5.25rem', letterSpacing: '0.04em', color: '#3A3A3A', lineHeight: 1.8 }}>
        Will you join us as we become us?
      </p>
    </FadeIn>

    <FadeIn delay={0.2}>
      <div
        className="rounded-2xl p-6 md:p-12"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.65)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(200, 169, 106, 0.25)',
          boxShadow: '0 8px 48px rgba(0,0,0,0.08)',
        }}
      >
        <div className="text-center mb-8">
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '0.75rem', letterSpacing: '0.22em', color: '#3A3A3A', textTransform: 'uppercase', marginBottom: '4px' }}>
            Kindly Reply By
          </p>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300, fontSize: '1.5rem', letterSpacing: '0.25em', color: '#C8A96A' }}>
            27 . 07 . 2026
          </p>
        </div>

        <form onSubmit={handleRsvpSubmit} className="space-y-6">

          {/* Full Name */}
          <div>
            <label
              htmlFor="guestName"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600, fontSize: '0.72rem', letterSpacing: '0.18em', color: '#1C1C1C', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}
            >
              Full Name *
            </label>
            <input
              id="guestName"
              type="text"
              required
              value={rsvpData.guestName}
              onChange={(e) => setRsvpData({ ...rsvpData, guestName: e.target.value })}
              placeholder="e.g. John Doe"
              style={{
                width: '100%', backgroundColor: 'transparent', border: 'none', borderBottom: '1px solid #C8A96A',
                outline: 'none', fontFamily: 'Montserrat, sans-serif', fontWeight: 300, fontSize: '0.95rem', color: '#3A3A3A', padding: '8px 0',
              }}
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="emailAddress"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600, fontSize: '0.72rem', letterSpacing: '0.18em', color: '#1C1C1C', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}
            >
              Email Address *
            </label>
            <input
              id="emailAddress"
              type="email"
              required
              value={rsvpData.emailAddress}
              onChange={(e) => setRsvpData({ ...rsvpData, emailAddress: e.target.value })}
              placeholder="e.g. johndoe@email.com"
              style={{
                width: '100%', backgroundColor: 'transparent', border: 'none', borderBottom: '1px solid #C8A96A',
                outline: 'none', fontFamily: 'Montserrat, sans-serif', fontWeight: 300, fontSize: '0.95rem', color: '#3A3A3A', padding: '8px 0',
              }}
            />
          </div>

          {/* Attending */}
          <div>
            <label
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600, fontSize: '0.72rem', letterSpacing: '0.18em', color: '#1C1C1C', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}
            >
              Will you be attending? *
            </label>
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => setRsvpData({ ...rsvpData, isAttending: true })}
                style={{
                  width: '100%', padding: '14px 24px', fontFamily: 'Montserrat, sans-serif', fontWeight: 500, fontSize: '0.78rem',
                  letterSpacing: '0.2em', textTransform: 'uppercase', borderRadius: '999px', cursor: 'pointer', transition: 'all 0.3s ease',
                  backgroundColor: rsvpData.isAttending ? '#1F2A44' : 'transparent',
                  color: rsvpData.isAttending ? '#FFFFFF' : '#1C1C1C',
                  border: `1px solid ${rsvpData.isAttending ? '#1F2A44' : '#3A3A3A'}`,
                }}
              >
                Joyfully Accepts
              </button>
              <button
                type="button"
                onClick={() => setRsvpData({ ...rsvpData, isAttending: false })}
                style={{
                  width: '100%', padding: '14px 24px', fontFamily: 'Montserrat, sans-serif', fontWeight: 500, fontSize: '0.78rem',
                  letterSpacing: '0.2em', textTransform: 'uppercase', borderRadius: '999px', cursor: 'pointer', transition: 'all 0.3s ease',
                  backgroundColor: !rsvpData.isAttending ? '#1F2A44' : 'transparent',
                  color: !rsvpData.isAttending ? '#FFFFFF' : '#1C1C1C',
                  border: `1px solid ${!rsvpData.isAttending ? '#1F2A44' : '#3A3A3A'}`,
                }}
              >
                Regretfully Declines
              </button>
            </div>
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600, fontSize: '0.72rem', letterSpacing: '0.18em', color: '#1C1C1C', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}
            >
              Message for the Couple (optional)
            </label>
            <textarea
              id="message"
              value={rsvpData.message}
              onChange={(e) => setRsvpData({ ...rsvpData, message: e.target.value })}
              placeholder="Write us a few words..."
              style={{
                width: '100%', backgroundColor: 'transparent', border: 'none', borderBottom: '1px solid #C8A96A',
                outline: 'none', fontFamily: 'Montserrat, sans-serif', fontWeight: 300, fontSize: '0.95rem', color: '#3A3A3A',
                padding: '8px 0', minHeight: '80px', resize: 'none',
              }}
            />
          </div>

          {rsvpError && (
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.85rem', color: '#c0392b' }}>{rsvpError}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmittingRsvp}
            style={{
              width: '100%', backgroundColor: '#1F2A44', color: '#FFFFFF', fontFamily: 'Montserrat, sans-serif', fontWeight: 500,
              fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '16px 24px', borderRadius: '999px',
              border: 'none', cursor: isSubmittingRsvp ? 'not-allowed' : 'pointer', opacity: isSubmittingRsvp ? 0.6 : 1, transition: 'all 0.3s ease',
            }}
          >
            {isSubmittingRsvp ? 'Submitting...' : 'Submit RSVP'}
          </button>

          {/* Decorative stem */}
          <div className="flex justify-center mt-6">
            <svg width="200" height="30" viewBox="0 0 200 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 15 C14 8 20 8 18 15 C16 20 12 18 14 15" stroke="#C8A96A" strokeWidth="1" fill="none" strokeLinecap="round"/>
              <path d="M17 14 C35 14 55 14 95 14" stroke="#C8A96A" strokeWidth="1" fill="none" strokeLinecap="round"/>
              <rect x="97" y="12" width="4" height="4" rx="0.3" transform="rotate(45 99 14)" fill="#C8A96A"/>
              <path d="M103 14 C140 14 160 14 183 14" stroke="#C8A96A" strokeWidth="1" fill="none" strokeLinecap="round"/>
              <path d="M183 14 C185 8 192 9 190 15 C188 20 184 19 186 14" stroke="#C8A96A" strokeWidth="1" fill="none" strokeLinecap="round"/>
            </svg>
          </div>

        </form>
      </div>
    </FadeIn>
  </div>
</section>

{/* Toast notification — top right corner */}
{showToast && (
  <div
    style={{
      position: 'fixed',
      top: '24px',
      right: '24px',
      zIndex: 9999,
      backgroundColor: 'rgba(253, 251, 248, 0.97)',
      border: '1px solid rgba(200, 169, 106, 0.4)',
      borderRadius: '12px',
      padding: '16px 24px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
      maxWidth: '320px',
      animation: 'slideIn 0.4s ease forwards',
    }}
  >
    <style>{`
      @keyframes slideIn {
        from { opacity: 0; transform: translateX(20px); }
        to { opacity: 1; transform: translateX(0); }
      }
    `}</style>
    <p style={{ fontFamily: 'Ephesis, cursive', fontWeight: 400, fontSize: '1.4rem', color: '#1C1C1C', marginBottom: '4px' }}>
      Thank You!
    </p>
    <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300, fontSize: '0.85rem', color: '#3A3A3A', lineHeight: 1.5 }}>
      {toastAttending
        ? "Your RSVP has been received. We look forward to celebrating with you!"
        : "Thank you for letting us know. We'll miss you on our special day!"}
    </p>
  </div>
)}
        <Footer />
      </div>
    </div>
  );
}
