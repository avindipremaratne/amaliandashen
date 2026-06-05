// WI-HPI
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { EventSchedule, GuestPhotos } from '@/entities';
import { useFonts } from '@/hooks/useFonts';
import { BaseCrudService } from '@/integrations';
import { motion } from 'framer-motion';
import { Church, Loader2, Wine } from 'lucide-react';
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

  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [scheduleItems, setScheduleItems] = useState<EventSchedule[]>([]);
  const [photos, setPhotos] = useState<GuestPhotos[]>([]);
  const [isLoadingSchedule, setIsLoadingSchedule] = useState(true);
  const [isLoadingPhotos, setIsLoadingPhotos] = useState(true);

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
    const fetchSchedule = async () => {
      try {
        const result = await BaseCrudService.getAll<EventSchedule>('eventschedule');
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

  return (
    <div
      className="min-h-screen font-paragraph text-stone-800 selection:bg-primary/20 selection:text-primary overflow-x-hidden"
    >
      {/* Fixed background image */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'url(https://static.wixstatic.com/media/b5e630_cd2aed73ea0c404f826bc9a96e467619~mv2.jpg))',
          backgroundPosition: 'top right',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
      />

      <div className="relative z-10">
        <Header />

        {/* 1. HERO SECTION */}
        <section id="home" className="scroll-mt-24 relative h-screen min-h-[700px] w-full flex flex-col items-center justify-start pt-24 md:pt-32 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://wedding-invitation-68o0.onrender.com/Hero%20image.jpeg"
              alt="Amali and Ashen"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-transparent" />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center px-4 w-full max-w-4xl">
            <FadeIn delay={0.4}>
              <h1
                className="text-6xl md:text-7xl lg:text-[130px] text-white mb-4 leading-tight font-normal"
                style={{ fontFamily: "Ephesis, cursive", fontWeight: 400 }}
              >
                Amali & Ashen
              </h1>
            </FadeIn>

            <FadeIn delay={0.6}>
              <div className="flex flex-col items-center gap-2 mt-4 px-4 text-center">
                <p className="text-white/90 font-light uppercase tracking-widest text-base sm:text-lg md:text-2xl lg:text-3xl font-paragraph">
                  Save the Date
                </p>
                <p
                  className="text-white/90 uppercase font-paragraph font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl"
                  style={{ letterSpacing: "0.10em" }}
                >
                  27 | August | 2026
                </p>
                <div className="w-10 sm:w-12 md:w-14 h-px my-2" style={{ backgroundColor: '#C8A96A' }} />
              </div>
            </FadeIn>
          </div>
        </section>

        {/* 2. INVITATION & COUNTDOWN SECTION */}
        <section className="scroll-mt-24 py-24 relative">
          <div className="container mx-auto px-4 flex flex-col items-center">

            <FadeIn className="w-full max-w-md mx-auto mb-20">
              <Image
                src="https://wedding-invitation-68o0.onrender.com/fullinvitation.png"
                alt="Wedding Invitation Envelope"
                className="w-full h-auto drop-shadow-2xl hover:scale-[1.02] transition-transform duration-700"
              />
            </FadeIn>

            <FadeIn delay={0.2} className="text-center mb-12">
              <h2 className="text-6xl md:text-8xl mb-8" style={{ fontFamily: "Ephesis, cursive", fontWeight: 400, color: '#1C1C1C' }}>
                The Day is Coming!
              </h2>

              <div className="flex justify-center items-center gap-6 md:gap-12">
                {[
                  { value: countdown.days, label: 'Days' },
                  { value: countdown.hours, label: 'Hours' },
                  { value: countdown.minutes, label: 'Minutes' },
                  { value: countdown.seconds, label: 'Seconds' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center w-20 md:w-28"
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
                    <span className="text-xs md:text-sm uppercase tracking-widest mt-3 font-medium" style={{ color: '#3A3A3A' }}>
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </FadeIn>

            {/* Gold divider */}
            <div className="w-24 h-px mx-auto mb-12" style={{ backgroundColor: '#C8A96A' }} />

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
        <section id="schedule" className="scroll-mt-24 py-24 relative border-t" style={{ borderColor: '#C8A96A33' }}>
          <div className="container mx-auto px-4 max-w-4xl">
            <FadeIn className="text-center mb-16">
              <h2 className="text-6xl md:text-8xl" style={{ fontFamily: "Ephesis, cursive", fontWeight: 400, color: '#1C1C1C' }}>
                Order of the Day
              </h2>
              <div className="w-16 h-px mx-auto mt-6" style={{ backgroundColor: '#C8A96A' }} />
            </FadeIn>

            <div className="relative min-h-[300px]">
              {isLoadingSchedule ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 animate-spin" style={{ color: '#C8A96A' }} />
                </div>
              ) : scheduleItems.length > 0 ? (
                <div className="relative border-l ml-4 md:ml-32 space-y-12 pb-8" style={{ borderColor: '#C8A96A66' }}>
                  {scheduleItems.map((item, index) => (
                    <FadeIn key={item._id || index} delay={index * 0.1} direction="left" className="relative pl-8 md:pl-16">
                      <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#C8A96A' }} />
                      <div className="md:absolute md:-left-36 md:top-0 md:w-28 md:text-right font-paragraph font-semibold text-base md:text-lg mb-2 md:mb-0 tracking-wide" style={{ color: '#1F2A44' }}>
                        {item.startTime}
                      </div>
                      <div className="p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow duration-300" style={{ backgroundColor: '#FCFAF7', borderColor: '#E8E3DC' }}>
                        <h3 className="font-paragraph text-lg md:text-xl font-semibold mb-2 tracking-wide" style={{ color: '#1C1C1C' }}>
                          {item.eventName}
                        </h3>
                        {item.description && (
                          <p className="font-paragraph text-sm md:text-base leading-relaxed font-normal" style={{ color: '#3A3A3A' }}>
                            {item.description}
                          </p>
                        )}
                      </div>
                    </FadeIn>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12" style={{ color: '#3A3A3A' }}>Schedule details will be announced soon.</div>
              )}
            </div>

            <FadeIn delay={0.4} className="mt-20 text-center">
              <p className="text-2xl md:text-4xl mb-4" style={{ fontFamily: "Ephesis, cursive", fontWeight: 400, color: '#1C1C1C' }}>
                Come join us and happily ever after!
              </p>
              <div className="w-16 h-px mx-auto mb-8" style={{ backgroundColor: '#C8A96A' }} />
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
        <section id="venue" className="scroll-mt-24 py-24 relative overflow-hidden border-t" style={{ backgroundColor: '#F0EDE8', borderColor: '#C8A96A33' }}>
          <div className="absolute inset-0 opacity-20 mix-blend-multiply">
            <Image
              src="https://wedding-invitation-68o0.onrender.com/Elegant%20Event.png"
              alt="Texture"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <FadeIn className="text-center mb-16">
              <h2 className="text-6xl md:text-8xl" style={{ fontFamily: "Ephesis, cursive", fontWeight: 400, color: '#1C1C1C' }}>
                The Venue
              </h2>
              <div className="w-16 h-px mx-auto mt-6" style={{ backgroundColor: '#C8A96A' }} />
            </FadeIn>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Ceremony */}
              <FadeIn delay={0.2} direction="up" className="h-full">
               <div className="flex flex-col items-center text-center rounded-xl p-8 md:p-12 border h-full justify-between hover:shadow-md transition-all duration-300" style={{ backgroundColor: '#FCFAF7', borderColor: '#C8A96A33' }}>
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: '#C8A96A20', color: '#C8A96A' }}>
                    <Church size={26} />
                  </div>
                  <p className="font-paragraph text-xs uppercase tracking-widest mb-2" style={{ color: '#C8A96A' }}>Wedding Ceremony</p>
                  <h3 className="font-paragraph font-semibold text-xl md:text-2xl mb-4 min-h-[4rem] flex items-center justify-center" style={{ color: '#1C1C1C' }}>
                    St. Thomas Aquinas Church
                  </h3>
                  <p className="font-paragraph text-base mb-1" style={{ color: '#3A3A3A' }}>Halifax</p>
                  <p className="font-paragraph text-base font-medium mb-8" style={{ color: '#3A3A3A' }}>3:30 PM</p>
                </div>
                <Button
                  onClick={() => window.open('https://maps.google.com/?q=St.+Thomas+Aquinas+Church+Halifax', '_blank')}
                  className="rounded-none px-8 py-6 tracking-widest uppercase text-xs transition-all duration-300 w-full text-white"
                  style={{ backgroundColor: '#1F2A44' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#C8A96A')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#1F2A44')}
                >
                  Get Directions
                </Button>
              </FadeIn>

              {/* Reception */}
              <FadeIn delay={0.4} direction="up" className="h-full">
                <div className="flex flex-col items-center text-center rounded-xl p-8 md:p-12 border h-full justify-between hover:shadow-md transition-all duration-300" style={{ backgroundColor: '#FCFAF7', borderColor: '#C8A96A33' }}>
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: '#C8A96A20', color: '#C8A96A' }}>
                    <Wine size={26} />
                  </div>
                  <p className="font-paragraph text-xs uppercase tracking-widest mb-2" style={{ color: '#C8A96A' }}>Reception</p>
                  <h3 className="font-paragraph font-semibold text-xl md:text-2xl mb-4 min-h-[4rem] flex items-center justify-center" style={{ color: '#1C1C1C' }}>
                    Le Rouge
                  </h3>
                  <p className="font-paragraph text-base mb-1" style={{ color: '#3A3A3A' }}>Beachville</p>
                  <p className="font-paragraph text-base font-medium mb-8" style={{ color: '#3A3A3A' }}>7:00 PM</p>
                </div>
                <Button
                  onClick={() => window.open('https://maps.google.com/?q=Le+Rouge+Beachville', '_blank')}
                  className="rounded-none px-8 py-6 tracking-widest uppercase text-xs transition-all duration-300 w-full text-white"
                  style={{ backgroundColor: '#1F2A44' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#C8A96A')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#1F2A44')}
                >
                  Get Directions
                </Button>
              </FadeIn>
            </div>

            <div className="md:hidden w-px h-12 mx-auto mt-2" style={{ backgroundColor: '#C8A96A33' }} />
          </div>
        </section>

        {/* 5. RSVP SECTION */}
        <section id="rsvp" className="scroll-mt-24 py-24 relative border-t" style={{ borderColor: '#C8A96A33' }}>
          <div className="container mx-auto px-4 flex flex-col items-center">

            <FadeIn className="text-center mb-12">
              <h2 className="text-6xl md:text-8xl mb-4" style={{ fontFamily: "Ephesis, cursive", fontWeight: 400, color: '#1C1C1C' }}>
                Join Us
              </h2>
              <div className="w-16 h-px mx-auto mb-6" style={{ backgroundColor: '#C8A96A' }} />
              <p className="font-paragraph text-lg max-w-2xl mx-auto" style={{ color: '#3A3A3A' }}>
                Will you join us as we become us?
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <Button
                onClick={() => navigate('/rsvp')}
                className="rounded-none px-12 py-6 tracking-widest uppercase text-sm font-paragraph transition-all duration-300 text-white"
                style={{ backgroundColor: '#1F2A44' }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#C8A96A')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#1F2A44')}
              >
                RSVP Now
              </Button>
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
              <div className="w-16 h-px mx-auto mt-2" style={{ backgroundColor: '#C8A96A' }} />
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
                <div className="text-center py-12" style={{ color: '#3A3A3A' }}>Gallery coming soon.</div>
              )}
            </div>

            <FadeIn delay={0.4} className="mt-24 flex flex-col items-center text-center">
              <p className="text-2xl mb-6" style={{ fontFamily: "Ephesis, cursive", fontWeight: 400, color: '#1C1C1C' }}>
                Share Your Memories with us on our wedding day
              </p>
              <div className="w-16 h-px mx-auto mb-8" style={{ backgroundColor: '#C8A96A' }} />
              <Button
                onClick={() => navigate('/gallery')}
                className="rounded-none px-10 py-6 tracking-widest uppercase text-xs transition-all duration-300 text-white"
                style={{ backgroundColor: '#1F2A44' }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#C8A96A')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#1F2A44')}
              >
                Upload Photos
              </Button>
            </FadeIn>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
