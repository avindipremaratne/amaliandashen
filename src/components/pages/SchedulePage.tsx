import { useState, useEffect, useRef } from 'react';
import { Image } from '@/components/ui/image';
import { Clock, MapPin } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { EventSchedule } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useFonts } from '@/hooks/useFonts';

// Animated reveal component
const AnimatedElement: React.FC<{children: React.ReactNode; className?: string; delay?: number}> = ({ children, className, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          el.classList.add('is-visible');
        }, delay);
        observer.unobserve(el);
      }
    }, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return (
    <div 
      ref={ref} 
      className={`${className || ''} opacity-0 translate-y-8 transition-all duration-700 ease-out`}
      style={{
        opacity: 0,
        transform: 'translateY(2rem)'
      }}
    >
      <style>{`
        .is-visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
      {children}
    </div>
  );
};

export default function SchedulePage() {
  const [scheduleItems, setScheduleItems] = useState<EventSchedule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useFonts(); // Initialize font system

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const result = await BaseCrudService.getAll<EventSchedule>('eventschedule');
        setScheduleItems(result.items);
      } catch (error) {
        console.error('Error fetching schedule:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSchedule();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
        <div className="absolute inset-0 opacity-5">
          <Image 
            src="https://wedding-invitation-68o0.onrender.com/timeline.jpg"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <AnimatedElement>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-foreground mb-6">
              Wedding Schedule
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-link max-w-2xl mx-auto">
              Join us for a day filled with love, laughter, and unforgettable moments
            </p>
          </AnimatedElement>
        </div>
      </section>

      {/* Schedule Timeline */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto" style={{ minHeight: isLoading ? '400px' : 'auto' }}>
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <LoadingSpinner />
              </div>
            ) : !scheduleItems || scheduleItems.length === 0 ? (
              <div className="text-center py-20">
                <p className="font-paragraph text-xl text-muted-foreground">
                  Schedule details coming soon...
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {scheduleItems.map((item, index) => (
                  <AnimatedElement key={item._id} delay={index * 100}>
                    <div className="relative">
                      {/* Timeline connector */}
                      {index !== scheduleItems.length - 1 && (
                        <div className="absolute left-8 md:left-12 top-20 bottom-0 w-0.5 bg-gradient-to-b from-primary to-transparent" />
                      )}
                      
                      <div className="bg-secondary/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-border shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                        <div className="flex flex-col md:flex-row gap-6">
                          {/* Time Badge */}
                          <div className="flex items-center gap-3 md:w-40 flex-shrink-0">
                            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                              <Clock className="text-primary" size={24} />
                            </div>
                            <div>
                              <div className="font-heading text-2xl md:text-3xl text-primary">
                                {item.startTime}
                              </div>
                              {item.endTime && (
                                <div className="font-paragraph text-sm text-muted-foreground">
                                  to {item.endTime}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* Event Details */}
                          <div className="flex-1">
                            <h3 className="font-heading text-2xl md:text-3xl text-foreground mb-3">
                              {item.eventName}
                            </h3>
                            {item.description && (
                              <p className="font-paragraph text-base md:text-lg text-muted-foreground mb-3 leading-relaxed">
                                {item.description}
                              </p>
                            )}
                            {item.location && (
                              <div className="flex items-start gap-2 text-link">
                                <MapPin size={20} className="flex-shrink-0 mt-1" />
                                <span className="font-paragraph text-sm md:text-base">{item.location}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </AnimatedElement>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Decorative Image Section */}
      <section className="py-20 bg-gradient-to-b from-secondary/20 to-background">
        <div className="container mx-auto px-4">
          <AnimatedElement>
            <div className="max-w-4xl mx-auto">
              <Image 
                src="https://wedding-invitation-68o0.onrender.com/timeline.jpg"
                alt="Wedding Timeline"
                className="w-full rounded-2xl shadow-2xl hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </AnimatedElement>
          
          <AnimatedElement delay={200}>
            <div className="text-center mt-12">
              <p className="font-heading text-2xl md:text-3xl text-link">
                Come join us and happily ever after!
              </p>
            </div>
          </AnimatedElement>
        </div>
      </section>

      <Footer />
    </div>
  );
}
