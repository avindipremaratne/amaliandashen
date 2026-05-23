import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RSVPs } from '@/entities';
import { useFonts } from '@/hooks/useFonts';
import { BaseCrudService } from '@/integrations';
import { CheckCircle2, MessageCircle, Phone } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

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
      style={{ opacity: 0, transform: 'translateY(2rem)' }}
    >
      <style>{`.is-visible { opacity: 1 !important; transform: translateY(0) !important; }`}</style>
      {children}
    </div>
  );
};

export default function RSVPPage() {
  const [formData, setFormData] = useState({
    guestName: '',
    emailAddress: '',
    isAttending: true,
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedAttending, setSubmittedAttending] = useState(true);
  const [error, setError] = useState('');
  useFonts();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await BaseCrudService.create<RSVPs>('rsvps', {
        _id: crypto.randomUUID(),
        guestName: formData.guestName,
        emailAddress: formData.emailAddress,
        isAttending: formData.isAttending,
        attendingStatus: formData.isAttending ? 'Yes' : 'No',
        message: formData.message,
      });
      setSubmittedAttending(formData.isAttending);
      setIsSubmitted(true);
      setFormData({ guestName: '', emailAddress: '', isAttending: true, message: '' });
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <Header />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://wedding-invitation-68o0.onrender.com/Rsvp.jpeg"
            alt="RSVP Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-stone-100/80 via-stone-50/60 to-stone-50" />

        <div className="relative z-10 container mx-auto px-4 text-center">
          <AnimatedElement>
            <h1
              className="text-6xl md:text-8xl text-stone-800 mb-6"
              style={{ fontFamily: "Ephesis, cursive", fontWeight: 400 }}
            >
              RSVP
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-stone-500 max-w-2xl mx-auto">
              We would be honored by your presence on our special day. Please let us know if you&apos;ll be joining us!
            </p>
          </AnimatedElement>
        </div>
      </section>

      {/* RSVP Form Section */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {isSubmitted ? (
              <AnimatedElement>
                <div className="bg-white rounded-2xl p-8 md:p-12 border border-stone-200 shadow-sm text-center">
                  <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-6" />
                  <h2
                    className="text-4xl md:text-5xl text-stone-800 mb-4"
                    style={{ fontFamily: "Ephesis, cursive", fontWeight: 400 }}
                  >
                    Thank You!
                  </h2>
                  <p className="font-paragraph text-lg text-stone-500">
                    {submittedAttending
                      ? "Your RSVP has been received. We look forward to celebrating with you!"
                      : "Thank you for letting us know. We'll miss you on our special day!"}
                  </p>
                </div>
              </AnimatedElement>
            ) : (
              <AnimatedElement>
                <div className="bg-white rounded-2xl p-8 md:p-12 border border-stone-200 shadow-sm">
                  <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Full Name */}
                    <div>
                      <Label htmlFor="guestName" className="text-stone-700 font-paragraph text-sm uppercase tracking-widest mb-2 block">
                        Full Name *
                      </Label>
                      <Input
                        id="guestName"
                        type="text"
                        required
                        value={formData.guestName}
                        onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                        className="bg-stone-50 border-stone-200 text-stone-800 focus:border-primary rounded-none font-paragraph"
                        placeholder="Enter your full name"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <Label htmlFor="emailAddress" className="text-stone-700 font-paragraph text-sm uppercase tracking-widest mb-2 block">
                        Email Address *
                      </Label>
                      <Input
                        id="emailAddress"
                        type="email"
                        required
                        value={formData.emailAddress}
                        onChange={(e) => setFormData({ ...formData, emailAddress: e.target.value })}
                        className="bg-stone-50 border-stone-200 text-stone-800 focus:border-primary rounded-none font-paragraph"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    {/* Attending */}
                    <div>
                      <Label className="text-stone-700 font-paragraph text-sm uppercase tracking-widest mb-3 block">
                        Will you be attending? *
                      </Label>
                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, isAttending: true })}
                          className={`flex-1 py-3 px-6 font-paragraph text-sm uppercase tracking-widest transition-all duration-300 ${
                            formData.isAttending
                              ? 'bg-primary text-white'
                              : 'bg-stone-50 border border-stone-200 text-stone-500 hover:border-primary'
                          }`}
                        >
                          Yes, I&apos;ll be there
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, isAttending: false })}
                          className={`flex-1 py-3 px-6 font-paragraph text-sm uppercase tracking-widest transition-all duration-300 ${
                            !formData.isAttending
                              ? 'bg-primary text-white'
                              : 'bg-stone-50 border border-stone-200 text-stone-500 hover:border-primary'
                          }`}
                        >
                          Sorry, can&apos;t make it
                        </button>
                      </div>
                    </div>

                    {/* Error message */}
                    {error && (
                      <p className="font-paragraph text-sm text-red-500">{error}</p>
                    )}

                    {/* Submit */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-base font-paragraph rounded-none tracking-widest uppercase shadow-sm hover:shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
      <section className="py-20 bg-stone-100">
        <div className="container mx-auto px-4">
          <AnimatedElement>
            <h2
              className="text-5xl md:text-6xl text-center text-stone-800 mb-4"
              style={{ fontFamily: "Ephesis, cursive", fontWeight: 400 }}
            >
              Questions?
            </h2>
            <p className="font-paragraph text-center text-stone-500 mb-12 max-w-2xl mx-auto">
              Feel free to reach out to us if you have any questions about the wedding
            </p>
          </AnimatedElement>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <AnimatedElement delay={200}>
              <div className="bg-white rounded-xl p-8 border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="font-paragraph font-semibold text-xl text-stone-900 mb-6 text-center">Contact Amali</h3>
                <div className="flex flex-col gap-4">
                  <Button
                    onClick={() => window.open('https://wa.me/94764919991', '_blank')}
                    className="w-full bg-primary hover:bg-primary/90 text-white rounded-none tracking-widest uppercase text-xs font-paragraph flex items-center justify-center gap-2 py-6"
                  >
                    <MessageCircle size={18} />
                    WhatsApp
                  </Button>
                  <Button
                    onClick={() => window.open('tel:+94764919991', '_blank')}
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-white rounded-none tracking-widest uppercase text-xs font-paragraph flex items-center justify-center gap-2 py-6"
                  >
                    <Phone size={18} />
                    Call
                  </Button>
                </div>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={400}>
              <div className="bg-white rounded-xl p-8 border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="font-paragraph font-semibold text-xl text-stone-900 mb-6 text-center">Contact Ashen</h3>
                <div className="flex flex-col gap-4">
                  <Button
                    onClick={() => window.open('https://wa.me/94775314997', '_blank')}
                    className="w-full bg-primary hover:bg-primary/90 text-white rounded-none tracking-widest uppercase text-xs font-paragraph flex items-center justify-center gap-2 py-6"
                  >
                    <MessageCircle size={18} />
                    WhatsApp
                  </Button>
                  <Button
                    onClick={() => window.open('tel:+94775314997', '_blank')}
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-white rounded-none tracking-widest uppercase text-xs font-paragraph flex items-center justify-center gap-2 py-6"
                  >
                    <Phone size={18} />
                    Call
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
