// WI-HPI
import FontManager from '@/components/FontManager';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { EventSchedule, GuestPhotos } from '@/entities';
import { useFonts } from '@/hooks/useFonts';
import { BaseCrudService } from '@/integrations';
import { motion } from 'framer-motion';
import { Calendar, Loader2, MapPin, MessageCircle, Phone } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// --- Animation Components ---

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

// --- Main Page Component ---

export default function HomePage() {
  const navigate = useNavigate();
  useFonts(); // Initialize font system

  // State
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [scheduleItems, setScheduleItems] = useState<EventSchedule[]>([]);
  const [photos, setPhotos] = useState<GuestPhotos[]>([]);
  const [isLoadingSchedule, setIsLoadingSchedule] = useState(true);
  const [isLoadingPhotos, setIsLoadingPhotos] = useState(true);

  // Countdown Logic
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

  // Data Fetching
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const result = await BaseCrudService.getAll<EventSchedule>('eventschedule');
        // Sort by start time if possible, assuming format allows simple string sort or they are pre-sorted
        const sorted = result.items.sort((a, b) => (a.startTime || '').localeCompare(b.startTime || ''));
        setScheduleItems(sorted);
      } catch (error) {
        console.error('Error fetching schedule:', error);
      } finally {
        setIsLoadingSchedule(false);
      }
    };
    fetchSchedule();
  }, []);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const result = await BaseCrudService.getAll<GuestPhotos>('guestphotos', {}, { limit: 8 });
        setPhotos(result.items);
      } catch (error) {
        console.error('Error fetching photos:', error);
      } finally {
        setIsLoadingPhotos(false);
      }
    };
    fetchPhotos();
  }, []);

  // Handlers
  const handleAddToCalendar = () => {
    const event = {
      title: 'Amali and Ashen Wedding',
      description: 'Join us to celebrate our wedding day!',
      start: '20251213T100000Z', // UTC time
      end: '20251213T183000Z'
    };
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&details=${encodeURIComponent(event.description)}&dates=${event.start}/${event.end}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-stone-50 font-paragraph text-stone-800 selection:bg-primary/20 selection:text-primary overflow-x-hidden">
      <Header />
      <FontManager />
      {/* 1. HERO SECTION */}
      <section id="home" className=" scroll-mt-24 relative h-screen min-h-[700px] w-full flex flex-col items-center justify-start pt-24 md:pt-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://wedding-invitation-68o0.onrender.com/Hero%20image.jpeg"
            alt="Dilum and Heshani"
            className="w-full h-full object-cover object-center"
          />
          {/* Gradient overlay to ensure text readability while keeping the image visible */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center px-4 w-full max-w-4xl">
          <FadeIn delay={0.2} direction="down">
            <Image
              src="https://wedding-invitation-68o0.onrender.com/DH.png"
              alt="DH Logo"
              className="w-16 h-16 md:w-20 md:h-20 mb-6 object-contain opacity-90"
            />
          </FadeIn>

          <FadeIn delay={0.4}>
            <h1
              className="text-6xl md:text-7xl lg:text-[130px] text-white mb-4 leading-tight font-pinyon-script"
             // style={{ fontFamily: "Ephesis, cursive", fontWeight: 400 }}
              data-editable="true"
              data-editable-type="heading"
              data-font-family="Ephesis, cursive"
              data-font-weight="400"
              data-font-size="6xl"
            >
              Amali & Ashen
            </h1>
          </FadeIn>

          <FadeIn delay={0.6}>
            <div className="flex flex-col items-center gap-2 mt-4 px-4 text-center">
              <p
                className="text-white/90 font-medium uppercase text-base sm:text-lg md:text-2xl lg:text-3xl font-fraunces"
              >
                SAVE THE DATE
              </p>

              <p
                className="text-white/90 uppercase text-xl sm:text-2xl md:text-3xl lg:text-4xl"
                style={{ letterSpacing: "0.10em" }}
              >
                27 | August | 2026
              </p>

    <div className="w-10 sm:w-12 md:w-14 h-px bg-primary/60 my-2" />
  </div>
</FadeIn>
        </div>
      </section>
      {/* 2. INVITATION & COUNTDOWN SECTION */}
      <section className="scroll-mt-24 py-24 bg-stone-50 relative">
        <div className="container mx-auto px-4 flex flex-col items-center">

          <FadeIn className="w-full max-w-md mx-auto mb-20">
            <Image
              src="https://wedding-invitation-68o0.onrender.com/fullinvitation.png"
              alt="Wedding Invitation Envelope"
              className="w-full h-auto drop-shadow-2xl hover:scale-[1.02] transition-transform duration-700"
            />
          </FadeIn>

          <FadeIn delay={0.2} className="text-center mb-12">
            <h2 className="font-heading text-4xl md:text-5xl text-stone-800 mb-8" style={{ fontFamily: "Ephesis, cursive", fontWeight: 400 }}>
              The Day is Coming!
            </h2>

            <div className="flex justify-center items-center gap-3 md:gap-6 text-stone-800">
              {[
                { value: countdown.days, label: 'Days' },
                { value: countdown.hours, label: 'Hours' },
                { value: countdown.minutes, label: 'Minutes' },
                { value: countdown.seconds, label: 'Seconds' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center w-16 md:w-24 bg-white/50 backdrop-blur-sm p-4 md:p-6 rounded-lg border border-stone-200/50 hover:bg-white/70 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <motion.span
                    key={`${index}-${item.value}`}
                    className="text-4xl md:text-6xl font-bold font-heading tracking-tighter text-primary"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {String(item.value).padStart(2, '0')}
                  </motion.span>
                  <span className="text-xs md:text-sm uppercase tracking-widest text-stone-500 mt-2 font-medium">
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.4} className="w-full max-w-5xl mt-12">
            <div className="relative aspect-[21/9] overflow-hidden rounded-sm">
              <Image
                src="https://wedding-invitation-68o0.onrender.com/countdownImage.jpg"
                alt="Couple on beach"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
              />
            </div>
          </FadeIn>
        </div>
      </section>
      {/* 3. TIMING / SCHEDULE SECTION */}
      <section id="schedule" className="scroll-mt-24 py-24 bg-stone-100 relative border-t border-stone-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <FadeIn className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl text-stone-800" style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
              Timing
            </h2>
          </FadeIn>

          <div className="relative min-h-[300px]">
            {isLoadingSchedule ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : scheduleItems.length > 0 ? (
              <div className="relative border-l border-stone-300 ml-4 md:ml-32 space-y-12 pb-8">
                {scheduleItems.map((item, index) => (
                  <FadeIn key={item._id || index} delay={index * 0.1} direction="left" className="relative pl-8 md:pl-16">
                    {/* Timeline Dot */}
                    <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_0_4px_rgba(134,61,36,0.1)]" />

                    {/* Time */}
                    <div className="md:absolute md:-left-36 md:top-0 md:w-28 md:text-right font-heading text-stone-900 font-semibold text-lg mb-2 md:mb-0">
                      {item.startTime}
                    </div>

                    {/* Content */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow duration-300">
                      <h3 className="font-heading text-xl text-stone-900 mb-2">{item.eventName}</h3>
                      {item.description && (
                        <p className="text-stone-500 text-sm leading-relaxed">{item.description}</p>
                      )}
                    </div>
                  </FadeIn>
                ))}
              </div>
            ) : (
              <div className="text-center text-stone-500 py-12">Schedule details will be announced soon.</div>
            )}
          </div>

          <FadeIn delay={0.4} className="mt-20 text-center">
            <p className="font-heading text-2xl text-stone-800 mb-8" style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
              Come join us and happily ever after!
            </p>
            <div className="relative aspect-[21/9] overflow-hidden rounded-sm max-w-5xl mx-auto">
              <Image
                src="https://wedding-invitation-68o0.onrender.com/timeline.jpg"
                alt="Couple with car"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
              />
            </div>
          </FadeIn>
        </div>
      </section>
      {/* 4. ADDRESS / VENUE SECTION */}
      <section id="venue" className="scroll-mt-24 py-24 bg-[#EBE9E4] relative overflow-hidden">
        {/* Subtle background texture/image */}
        <div className="absolute inset-0 opacity-20 mix-blend-multiply">
          <Image
            src="https://wedding-invitation-68o0.onrender.com/Elegant%20Event.png"
            alt="Texture"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <FadeIn className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl text-stone-800" style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
              Address
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Ceremony */}
            <FadeIn delay={0.2} direction="up" className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                <MapPin size={24} />
              </div>
              <h3 className="font-heading text-2xl text-stone-900 mb-4">Wedding Ceremony</h3>
              <p className="text-stone-600 mb-2">St. Mary&apos;s Church, Thudella, Ja ela</p>
              <p className="text-stone-600 font-medium mb-8">Time : 3.30PM</p>
              <Button
                onClick={() => window.open('https://maps.google.com/?q=St.+Mary\'s+Church+Thudella+Ja+ela', '_blank')}
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-white rounded-none px-8 py-6 tracking-widest uppercase text-xs transition-all duration-300"
              >
                Get Directions
              </Button>
            </FadeIn>

            {/* Reception */}
            <FadeIn delay={0.4} direction="up" className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                <MapPin size={24} />
              </div>
              <h3 className="font-heading text-2xl text-stone-900 mb-4">Reception</h3>
              <p className="text-stone-600 mb-2">Hotel Royal Ramesses, Adriana Ballroom, Seeduwa</p>
              <p className="text-stone-600 font-medium mb-8">Time : 7.00PM</p>
              <Button
                onClick={() => window.open('https://maps.google.com/?q=Hotel+Royal+Ramesses+Seeduwa', '_blank')}
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-white rounded-none px-8 py-6 tracking-widest uppercase text-xs transition-all duration-300"
              >
                Get Directions
              </Button>
            </FadeIn>
          </div>
        </div>
      </section>
      {/* 5. RSVP & CONTACT SECTION */}
      <section id="rsvp" className="scroll-mt-24 py-24 bg-stone-50 relative">
        <div className="container mx-auto px-4 flex flex-col items-center">

          {/* Dark RSVP Card */}
          <FadeIn className="w-full max-w-md bg-[#111111] text-white p-12 flex flex-col items-center text-center shadow-2xl mb-16 relative overflow-hidden group">
            <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-700">
              <Image
                src="https://wedding-invitation-68o0.onrender.com/Rsvp.jpeg"
                alt="RSVP Background"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative z-10 flex flex-col items-center w-full">
              <p className="text-xs tracking-[0.3em] text-stone-400 mb-8 uppercase">Dilum & Heshani</p>

              {/* Stylized RSVP Text */}
              <div className="relative w-full flex justify-center items-center my-8">
                <h2 className="text-7xl md:text-8xl font-heading font-light tracking-widest" style={{ fontFamily: "'Playfair Display', serif" }}>
                  RSVP
                </h2>
              </div>

              <p className="text-xs tracking-[0.2em] text-stone-400 mt-8 mb-2 uppercase">Kindly Respond By</p>
              <p className="text-2xl font-heading tracking-widest uppercase">Nov 30</p>

              <Button
                onClick={() => navigate('/rsvp')}
                className="mt-10 bg-white text-black hover:bg-stone-200 rounded-none px-10 py-6 tracking-widest uppercase text-xs transition-all duration-300 w-full"
              >
                RSVP Now
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} className="max-w-2xl text-center mb-16">
            <p className="text-stone-600 leading-relaxed text-lg">
              We would be honored by your presence on our special day. Please let us know if you&apos;ll be joining us!
            </p>
          </FadeIn>

          {/* Contact Columns */}
          <div className="grid md:grid-cols-2 gap-8 w-full max-w-3xl mb-16">
            <FadeIn delay={0.3} direction="up" className="bg-white p-8 border border-stone-200 text-center">
              <h3 className="font-heading text-xl text-stone-900 mb-6" style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
                Contact Heshani
              </h3>
              <div className="flex flex-col gap-3">
                <Button
                  onClick={() => window.open('https://wa.me/94764919991', '_blank')}
                  variant="outline"
                  className="w-full border-stone-300 text-stone-700 hover:bg-stone-50 rounded-none flex items-center justify-center gap-2"
                >
                  <MessageCircle size={16} />
                  WhatsApp
                </Button>
                <Button
                  onClick={() => window.open('tel:+94764919991', '_blank')}
                  variant="outline"
                  className="w-full border-stone-300 text-stone-700 hover:bg-stone-50 rounded-none flex items-center justify-center gap-2"
                >
                  <Phone size={16} />
                  Call
                </Button>
              </div>
            </FadeIn>

            <FadeIn delay={0.4} direction="up" className="bg-white p-8 border border-stone-200 text-center">
              <h3 className="font-heading text-xl text-stone-900 mb-6" style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
                Contact Dilum
              </h3>
              <div className="flex flex-col gap-3">
                <Button
                  onClick={() => window.open('https://wa.me/94775314997', '_blank')}
                  variant="outline"
                  className="w-full border-stone-300 text-stone-700 hover:bg-stone-50 rounded-none flex items-center justify-center gap-2"
                >
                  <MessageCircle size={16} />
                  WhatsApp
                </Button>
                <Button
                  onClick={() => window.open('tel:+94775314997', '_blank')}
                  variant="outline"
                  className="w-full border-stone-300 text-stone-700 hover:bg-stone-50 rounded-none flex items-center justify-center gap-2"
                >
                  <Phone size={16} />
                  Call
                </Button>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.5}>
            <Button
              onClick={handleAddToCalendar}
              className="bg-primary hover:bg-primary/90 text-white rounded-none px-8 py-6 tracking-widest uppercase text-xs transition-all duration-300 flex items-center gap-2"
            >
              <Calendar size={16} />
              Add to Calendar
            </Button>
          </FadeIn>
        </div>
      </section>
      {/* 6. GALLERY SECTION */}
      <section id="gallery" className="scroll-mt-24 py-24 bg-stone-100 border-t border-stone-200">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl text-stone-800" style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
              Our Journey Together
            </h2>
          </FadeIn>

          <div className="min-h-[400px] relative max-w-5xl mx-auto">
            {isLoadingPhotos ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : photos.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 auto-rows-[150px] md:auto-rows-[250px]">
                {/* Bento Grid Layout matching screenshot style */}
                {photos.map((photo, index) => {
                  // Create an asymmetric grid pattern
                  let spanClasses = "col-span-1 row-span-1";
                  if (index === 0) spanClasses = "col-span-1 row-span-2";
                  if (index === 1) spanClasses = "col-span-1 row-span-1";
                  if (index === 2) spanClasses = "col-span-2 row-span-2";
                  if (index === 3) spanClasses = "col-span-1 row-span-1";
                  if (index === 4) spanClasses = "col-span-1 row-span-2";
                  if (index === 5) spanClasses = "col-span-1 row-span-1";
                  if (index === 6) spanClasses = "col-span-2 row-span-1";

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
              <div className="text-center text-stone-500 py-12">Gallery coming soon.</div>
            )}
          </div>

          <FadeIn delay={0.4} className="mt-24 flex flex-col items-center text-center">
            <Image
              src="https://wedding-invitation-68o0.onrender.com/ovalshape.png"
              alt="Decorative"
              className="w-32 h-auto mb-8 opacity-60"
            />
            <h3 className="font-heading text-2xl text-stone-800 mb-8" style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
              Share Your Memories with us on our wedding day
            </h3>
            <Button
              onClick={() => navigate('/gallery')}
              className="bg-primary hover:bg-primary/90 text-white rounded-none px-10 py-6 tracking-widest uppercase text-xs transition-all duration-300"
            >
              Upload Photos
            </Button>
          </FadeIn>
        </div>
      </section>
      <Footer />
    </div>
  );
}
