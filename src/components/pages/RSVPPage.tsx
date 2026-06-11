import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Label } from '@/components/ui/label';
import { RSVPs } from '@/entities';
import { useFonts } from '@/hooks/useFonts';
import { BaseCrudService } from '@/integrations';
import { Calendar, CheckCircle2 } from 'lucide-react';
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

const DiamondSeparator = () => (
  <div className="flex items-center justify-center gap-3 my-6">
    <div style={{ width: '60px', height: '1px', backgroundColor: '#C8A96A' }} />
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="0.5" width="6.36" height="6.36" rx="0.5" transform="rotate(45 5 0.5)" fill="#C8A96A"/>
    </svg>
    <div style={{ width: '60px', height: '1px', backgroundColor: '#C8A96A' }} />
  </div>
);

const DecorativeStem = () => (
  <div className="flex justify-center mt-6">
    <svg width="200" height="30" viewBox="0 0 200 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 15 C14 8 20 8 18 15 C16 20 12 18 14 15" stroke="#C8A96A" strokeWidth="1" fill="none" strokeLinecap="round"/>
      <path d="M17 14 C35 14 55 14 95 14" stroke="#C8A96A" strokeWidth="1" fill="none" strokeLinecap="round"/>
      <rect x="97" y="12" width="4" height="4" rx="0.3" transform="rotate(45 99 14)" fill="#C8A96A"/>
      <path d="M103 14 C140 14 160 14 183 14" stroke="#C8A96A" strokeWidth="1" fill="none" strokeLinecap="round"/>
      <path d="M183 14 C185 8 192 9 190 15 C188 20 184 19 186 14" stroke="#C8A96A" strokeWidth="1" fill="none" strokeLinecap="round"/>
    </svg>
  </div>
);

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
    // Full page wrapper — background image covers everything including behind the form
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage: `url('https://static.wixstatic.com/media/b5e630_962afd5611af40a0b1d4e6917aaabb81~mv2.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'scroll',
      }}
    >

      <div className="relative z-10">
        <Header />

        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <AnimatedElement>
              {/* Cursive "Kindly" above */}
              <p
                className="mb-2"
                style={{
                  fontFamily: 'Ephesis, cursive',
                  fontWeight: 400,
                  fontSize: '3rem',
                  color: '#C8A96A',
                  lineHeight: 1.2,
                }}
              >
                Kindly
              </p>

              {/* Inject this once inside your component return */}
<style>{`
  .rsvp-title {
    font-family: 'Cormorant Garamond', serif !important;
    font-weight: 600 !important;
    letter-spacing: 0.25em !important;
    text-transform: uppercase !important;
  }
`}</style>

{/* Then on the h1 */}
<h1
  className="rsvp-title mb-0"
  style={{
    fontSize: 'clamp(4rem, 12vw, 8rem)',
    color: '#1C1C1C',
    lineHeight: 1,
  }}
>
  RSVP
</h1>

              {/* Diamond separator */}
              <DiamondSeparator />

              {/* Subheading */}
              <p
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 400,
                  fontSize: '0.78rem',
                  letterSpacing: '0.22em',
                  color: '#3A3A3A',
                  textTransform: 'uppercase',
                  lineHeight: 1.8,
                }}
              >
                WE CAN&apos;T WAIT TO CELEBRATE<br />THIS SPECIAL DAY WITH YOU.
              </p>
            </AnimatedElement>
          </div>
        </section>

        {/* RSVP Form — no wrapping section background, card floats over page bg */}
        <div className="pb-20 px-4">
          <div className="max-w-2xl mx-auto">
            {isSubmitted ? (
              <AnimatedElement>
                <div
                  className="rounded-2xl p-8 md:p-12 text-center"
                  style={{
                    backgroundColor: 'rgba(253, 251, 248, 0.88)',
                    border: '1px solid rgba(200, 169, 106, 0.35)',
                    boxShadow: '0 8px 48px rgba(0, 0, 0, 0.08)',
                    backdropFilter: 'blur(6px)',
                  }}
                >
                  <DiamondSeparator />
                  <CheckCircle2 className="w-16 h-16 mx-auto mb-6" style={{ color: '#C8A96A' }} />
                  <h2
                    className="mb-4"
                    style={{ fontFamily: 'Ephesis, cursive', fontWeight: 400, fontSize: '3rem', color: '#1C1C1C' }}
                  >
                    Thank You!
                  </h2>
                  <p
                    className="mb-8"
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: 400,
                      fontSize: '0.95rem',
                      color: '#3A3A3A',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {submittedAttending
                      ? "Your RSVP has been received. We look forward to celebrating with you!"
                      : "Thank you for letting us know. We'll miss you on our special day!"}
                  </p>
                  {submittedAttending && (
                    <button
                      onClick={() => {
                        const event = {
                          title: 'Amali and Ashen Wedding',
                          description: 'Join us to celebrate our wedding day!',
                          start: '20260827T153000Z',
                          end: '20260827T230000Z',
                        };
                        const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&details=${encodeURIComponent(event.description)}&dates=${event.start}/${event.end}`;
                        window.open(url, '_blank');
                      }}
                      style={{
                        backgroundColor: '#1F2A44',
                        color: '#FFFFFF',
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: 500,
                        fontSize: '0.78rem',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        padding: '14px 36px',
                        borderRadius: '999px',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <Calendar size={16} />
                      Add to Calendar
                    </button>
                  )}
                  <DecorativeStem />
                </div>
              </AnimatedElement>
            ) : (
              <AnimatedElement>
                <div
                  className="rounded-2xl p-8 md:p-12"
                  style={{
                    backgroundColor: 'rgba(253, 251, 248, 0.88)',
                    border: '1px solid rgba(200, 169, 106, 0.35)',
                    boxShadow: '0 8px 48px rgba(0, 0, 0, 0.08)',
                    backdropFilter: 'blur(6px)',
                  }}
                >
                  <DiamondSeparator />

                  {/* Kindly reply by */}
                  <div className="text-center mb-8">
                    <p
                      style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: 400,
                        fontSize: '0.75rem',
                        letterSpacing: '0.22em',
                        color: '#3A3A3A',
                        textTransform: 'uppercase',
                        marginBottom: '4px',
                      }}
                    >
                      Kindly Reply By
                    </p>
                    <p
                      style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: 300,
                        fontSize: '1.5rem',
                        letterSpacing: '0.25em',
                        color: '#C8A96A',
                      }}
                    >
                      27 . 07 . 2026
                    </p>
                  </div>

                  <div className="space-y-6">

                    {/* Full Name */}
                    <div>
                      <Label
                        htmlFor="guestName"
                        style={{
                          fontFamily: 'Montserrat, sans-serif',
                          fontWeight: 600,
                          fontSize: '0.72rem',
                          letterSpacing: '0.18em',
                          color: '#1C1C1C',
                          textTransform: 'uppercase',
                          display: 'block',
                          marginBottom: '8px',
                        }}
                      >
                        Full Name *
                      </Label>
                      <input
                        id="guestName"
                        type="text"
                        required
                        value={formData.guestName}
                        onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                        placeholder="e.g. John Doe"
                        style={{
                          width: '100%',
                          backgroundColor: 'transparent',
                          border: 'none',
                          borderBottom: '1px solid #C8A96A',
                          outline: 'none',
                          fontFamily: 'Montserrat, sans-serif',
                          fontWeight: 300,
                          fontSize: '0.95rem',
                          color: '#3A3A3A',
                          padding: '8px 0',
                        }}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <Label
                        htmlFor="emailAddress"
                        style={{
                          fontFamily: 'Montserrat, sans-serif',
                          fontWeight: 600,
                          fontSize: '0.72rem',
                          letterSpacing: '0.18em',
                          color: '#1C1C1C',
                          textTransform: 'uppercase',
                          display: 'block',
                          marginBottom: '8px',
                        }}
                      >
                        Email Address *
                      </Label>
                      <input
                        id="emailAddress"
                        type="email"
                        required
                        value={formData.emailAddress}
                        onChange={(e) => setFormData({ ...formData, emailAddress: e.target.value })}
                        placeholder="e.g. johndoe@email.com"
                        style={{
                          width: '100%',
                          backgroundColor: 'transparent',
                          border: 'none',
                          borderBottom: '1px solid #C8A96A',
                          outline: 'none',
                          fontFamily: 'Montserrat, sans-serif',
                          fontWeight: 300,
                          fontSize: '0.95rem',
                          color: '#3A3A3A',
                          padding: '8px 0',
                        }}
                      />
                    </div>

                    {/* Attending */}
                    <div>
                      <Label
                        style={{
                          fontFamily: 'Montserrat, sans-serif',
                          fontWeight: 600,
                          fontSize: '0.72rem',
                          letterSpacing: '0.18em',
                          color: '#1C1C1C',
                          textTransform: 'uppercase',
                          display: 'block',
                          marginBottom: '12px',
                        }}
                      >
                        Will you be attending? *
                      </Label>
                      <div className="flex flex-col gap-3">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, isAttending: true })}
                          style={{
                            width: '100%',
                            padding: '14px 24px',
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: 500,
                            fontSize: '0.78rem',
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            borderRadius: '999px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            backgroundColor: formData.isAttending ? '#1F2A44' : 'transparent',
                            color: formData.isAttending ? '#FFFFFF' : '#1C1C1C',
                            border: `1px solid ${formData.isAttending ? '#1F2A44' : '#3A3A3A'}`,
                          }}
                        >
                          Accept With Pleasure
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, isAttending: false })}
                          style={{
                            width: '100%',
                            padding: '14px 24px',
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: 500,
                            fontSize: '0.78rem',
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            borderRadius: '999px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            backgroundColor: !formData.isAttending ? '#1F2A44' : 'transparent',
                            color: !formData.isAttending ? '#FFFFFF' : '#1C1C1C',
                            border: `1px solid ${!formData.isAttending ? '#1F2A44' : '#3A3A3A'}`,
                          }}
                        >
                          Regretfully Decline
                        </button>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <Label
                        htmlFor="message"
                        style={{
                          fontFamily: 'Montserrat, sans-serif',
                          fontWeight: 600,
                          fontSize: '0.72rem',
                          letterSpacing: '0.18em',
                          color: '#1C1C1C',
                          textTransform: 'uppercase',
                          display: 'block',
                          marginBottom: '8px',
                        }}
                      >
                        Message for the Couple (optional)
                      </Label>
                      <textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Write us a few words..."
                        style={{
                          width: '100%',
                          backgroundColor: 'transparent',
                          border: 'none',
                          borderBottom: '1px solid #C8A96A',
                          outline: 'none',
                          fontFamily: 'Montserrat, sans-serif',
                          fontWeight: 300,
                          fontSize: '0.95rem',
                          color: '#3A3A3A',
                          padding: '8px 0',
                          minHeight: '80px',
                          resize: 'none',
                        }}
                      />
                    </div>

                    {/* Error */}
                    {error && (
                      <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.85rem', color: '#c0392b' }}>
                        {error}
                      </p>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      onClick={handleSubmit}
                      style={{
                        width: '100%',
                        backgroundColor: '#1F2A44',
                        color: '#FFFFFF',
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: 500,
                        fontSize: '0.78rem',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        padding: '16px 24px',
                        borderRadius: '999px',
                        border: 'none',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        opacity: isSubmitting ? 0.6 : 1,
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
                    </button>

                    <DecorativeStem />
                  </div>
                </div>
              </AnimatedElement>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
