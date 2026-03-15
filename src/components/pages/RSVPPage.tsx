import { useState, useEffect, useRef } from 'react';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle2, Phone, MessageCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { RSVPs } from '@/entities';
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

export default function RSVPPage() {
  const [formData, setFormData] = useState({
    guestName: '',
    emailAddress: '',
    isAttending: true,
    numberOfGuests: 1,
    dietaryRestrictions: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  useFonts(); // Initialize font system

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await BaseCrudService.create<RSVPs>('rsvps', {
        _id: crypto.randomUUID(),
        guestName: formData.guestName,
        emailAddress: formData.emailAddress,
        isAttending: formData.isAttending,
        numberOfGuests: formData.numberOfGuests,
        dietaryRestrictions: formData.dietaryRestrictions
      });
      
      setIsSubmitted(true);
      setFormData({
        guestName: '',
        emailAddress: '',
        isAttending: true,
        numberOfGuests: 1,
        dietaryRestrictions: ''
      });
    } catch (error) {
      console.error('Error submitting RSVP:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image 
            src="https://wedding-invitation-68o0.onrender.com/Rsvp.jpeg"
            alt="RSVP Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <AnimatedElement>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-foreground mb-6">
              RSVP
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-link max-w-2xl mx-auto">
              We would be honored by your presence on our special day. Please let us know if you&apos;ll be joining us!
            </p>
          </AnimatedElement>
        </div>
      </section>

      {/* RSVP Form Section */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {isSubmitted ? (
              <AnimatedElement>
                <div className="bg-secondary/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-border shadow-lg text-center">
                  <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-6" />
                  <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">
                    Thank You!
                  </h2>
                  <p className="font-paragraph text-lg text-muted-foreground mb-8">
                    Your RSVP has been received. We look forward to celebrating with you!
                  </p>
                  <Button 
                    onClick={() => setIsSubmitted(false)}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-full hover:scale-105 transition-all duration-300"
                  >
                    Submit Another RSVP
                  </Button>
                </div>
              </AnimatedElement>
            ) : (
              <AnimatedElement>
                <div className="bg-secondary/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-border shadow-lg">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="guestName" className="text-foreground font-paragraph text-base mb-2 block">
                        Full Name *
                      </Label>
                      <Input
                        id="guestName"
                        type="text"
                        required
                        value={formData.guestName}
                        onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                        className="bg-background border-border text-foreground focus:border-primary rounded-lg"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="emailAddress" className="text-foreground font-paragraph text-base mb-2 block">
                        Email Address *
                      </Label>
                      <Input
                        id="emailAddress"
                        type="email"
                        required
                        value={formData.emailAddress}
                        onChange={(e) => setFormData({ ...formData, emailAddress: e.target.value })}
                        className="bg-background border-border text-foreground focus:border-primary rounded-lg"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <Label className="text-foreground font-paragraph text-base mb-3 block">
                        Will you be attending? *
                      </Label>
                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, isAttending: true })}
                          className={`flex-1 py-3 px-6 rounded-lg font-paragraph transition-all duration-300 ${
                            formData.isAttending
                              ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                              : 'bg-background border border-border text-muted-foreground hover:border-primary'
                          }`}
                        >
                          Yes, I&apos;ll be there
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, isAttending: false })}
                          className={`flex-1 py-3 px-6 rounded-lg font-paragraph transition-all duration-300 ${
                            !formData.isAttending
                              ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                              : 'bg-background border border-border text-muted-foreground hover:border-primary'
                          }`}
                        >
                          Sorry, can&apos;t make it
                        </button>
                      </div>
                    </div>

                    {formData.isAttending && (
                      <>
                        <div>
                          <Label htmlFor="numberOfGuests" className="text-foreground font-paragraph text-base mb-2 block">
                            Number of Guests *
                          </Label>
                          <Input
                            id="numberOfGuests"
                            type="number"
                            min="1"
                            max="10"
                            required
                            value={formData.numberOfGuests}
                            onChange={(e) => setFormData({ ...formData, numberOfGuests: parseInt(e.target.value) || 1 })}
                            className="bg-background border-border text-foreground focus:border-primary rounded-lg"
                          />
                        </div>

                        <div>
                          <Label htmlFor="dietaryRestrictions" className="text-foreground font-paragraph text-base mb-2 block">
                            Dietary Restrictions or Special Requests
                          </Label>
                          <Textarea
                            id="dietaryRestrictions"
                            value={formData.dietaryRestrictions}
                            onChange={(e) => setFormData({ ...formData, dietaryRestrictions: e.target.value })}
                            className="bg-background border-border text-foreground focus:border-primary rounded-lg min-h-[100px]"
                            placeholder="Please let us know if you have any dietary restrictions or special requests..."
                          />
                        </div>
                      </>
                    )}

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
                    </Button>
                  </form>
                </div>
              </AnimatedElement>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-b from-secondary/20 to-background">
        <div className="container mx-auto px-4">
          <AnimatedElement>
            <h2 className="font-heading text-3xl md:text-4xl text-center text-foreground mb-4">
              Questions?
            </h2>
            <p className="font-paragraph text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Feel free to reach out to us if you have any questions about the wedding
            </p>
          </AnimatedElement>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <AnimatedElement delay={200}>
              <div className="bg-secondary/50 backdrop-blur-sm rounded-2xl p-8 border border-border shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                <h3 className="font-heading text-2xl text-primary mb-6 text-center">
                  Contact Heshani
                </h3>
                <div className="flex flex-col gap-4">
                  <Button 
                    onClick={() => window.open('https://wa.me/94764919991', '_blank')}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={20} />
                    WhatsApp: 076-4919991
                  </Button>
                  <Button 
                    onClick={() => window.open('tel:+94764919991', '_blank')}
                    className="w-full bg-background hover:bg-background/80 text-foreground border border-border rounded-full hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Phone size={20} />
                    Call: 076-4919991
                  </Button>
                </div>
              </div>
            </AnimatedElement>
            
            <AnimatedElement delay={400}>
              <div className="bg-secondary/50 backdrop-blur-sm rounded-2xl p-8 border border-border shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                <h3 className="font-heading text-2xl text-primary mb-6 text-center">
                  Contact Dilum
                </h3>
                <div className="flex flex-col gap-4">
                  <Button 
                    onClick={() => window.open('https://wa.me/94775314997', '_blank')}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={20} />
                    WhatsApp: 077-5314997
                  </Button>
                  <Button 
                    onClick={() => window.open('tel:+94775314997', '_blank')}
                    className="w-full bg-background hover:bg-background/80 text-foreground border border-border rounded-full hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Phone size={20} />
                    Call: 077-5314997
                  </Button>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
