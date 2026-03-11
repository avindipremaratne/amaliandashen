import { useState, useEffect, useRef } from 'react';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, CheckCircle2, X } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { GuestPhotos } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

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

export default function GalleryPage() {
  const [photos, setPhotos] = useState<GuestPhotos[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    uploaderName: '',
    caption: '',
    eventTag: ''
  });
  const [selectedImage, setSelectedImage] = useState<GuestPhotos | null>(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const result = await BaseCrudService.getAll<GuestPhotos>('guestphotos');
      setPhotos(result.items);
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await BaseCrudService.create<GuestPhotos>('guestphotos', {
        _id: crypto.randomUUID(),
        uploaderName: formData.uploaderName,
        caption: formData.caption,
        eventTag: formData.eventTag,
        photo: 'https://static.wixstatic.com/media/b5e630_6c5dd9e4d02a42f3980030a2e753f117~mv2.png?originWidth=768&originHeight=576',
        uploadDate: new Date().toISOString(),
        isApproved: true
      });
      
      setIsSubmitted(true);
      setFormData({
        uploaderName: '',
        caption: '',
        eventTag: ''
      });
      
      // Refresh photos
      fetchPhotos();
      
      setTimeout(() => {
        setIsSubmitted(false);
        setShowUploadForm(false);
      }, 3000);
    } catch (error) {
      console.error('Error uploading photo:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
        <div className="absolute inset-0 opacity-5">
          <Image 
            src="https://wedding-invitation-68o0.onrender.com/DSC_9528.jpg"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <AnimatedElement>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-foreground mb-6">
              Photo Gallery
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-link max-w-2xl mx-auto mb-8">
              Share your memories with us on our wedding day
            </p>
            <Button 
              onClick={() => setShowUploadForm(!showUploadForm)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto"
            >
              <Upload size={24} />
              Upload Photos
            </Button>
          </AnimatedElement>
        </div>
      </section>

      {/* Upload Form Modal */}
      {showUploadForm && (
        <section className="py-12 bg-gradient-to-b from-background to-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              {isSubmitted ? (
                <AnimatedElement>
                  <div className="bg-secondary/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-border shadow-lg text-center">
                    <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-6" />
                    <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">
                      Thank You!
                    </h2>
                    <p className="font-paragraph text-lg text-muted-foreground">
                      Your photo has been uploaded successfully!
                    </p>
                  </div>
                </AnimatedElement>
              ) : (
                <AnimatedElement>
                  <div className="bg-secondary/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-border shadow-lg relative">
                    <button
                      onClick={() => setShowUploadForm(false)}
                      className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X size={24} />
                    </button>
                    
                    <h2 className="font-heading text-3xl text-foreground mb-6 text-center">
                      Upload Your Photo
                    </h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <Label htmlFor="uploaderName" className="text-foreground font-paragraph text-base mb-2 block">
                          Your Name *
                        </Label>
                        <Input
                          id="uploaderName"
                          type="text"
                          required
                          value={formData.uploaderName}
                          onChange={(e) => setFormData({ ...formData, uploaderName: e.target.value })}
                          className="bg-background border-border text-foreground focus:border-primary rounded-lg"
                          placeholder="Enter your name"
                        />
                      </div>

                      <div>
                        <Label htmlFor="caption" className="text-foreground font-paragraph text-base mb-2 block">
                          Caption
                        </Label>
                        <Textarea
                          id="caption"
                          value={formData.caption}
                          onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                          className="bg-background border-border text-foreground focus:border-primary rounded-lg min-h-[100px]"
                          placeholder="Add a caption to your photo..."
                        />
                      </div>

                      <div>
                        <Label htmlFor="eventTag" className="text-foreground font-paragraph text-base mb-2 block">
                          Event Tag
                        </Label>
                        <Input
                          id="eventTag"
                          type="text"
                          value={formData.eventTag}
                          onChange={(e) => setFormData({ ...formData, eventTag: e.target.value })}
                          className="bg-background border-border text-foreground focus:border-primary rounded-lg"
                          placeholder="e.g., Ceremony, Reception, Dance"
                        />
                      </div>

                      <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors">
                        <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="font-paragraph text-muted-foreground mb-2">
                          Click to upload or drag and drop
                        </p>
                        <p className="font-paragraph text-sm text-muted-foreground">
                          PNG, JPG up to 10MB
                        </p>
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        {isSubmitting ? 'Uploading...' : 'Upload Photo'}
                      </Button>
                    </form>
                  </div>
                </AnimatedElement>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Photo Grid */}
      <section className="py-20 bg-gradient-to-b from-secondary/20 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto" style={{ minHeight: isLoading ? '400px' : 'auto' }}>
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <LoadingSpinner />
              </div>
            ) : !photos || photos.length === 0 ? (
              <div className="text-center py-20">
                <p className="font-paragraph text-xl text-muted-foreground mb-6">
                  No photos yet. Be the first to share your memories!
                </p>
                <Button 
                  onClick={() => setShowUploadForm(true)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto"
                >
                  <Upload size={24} />
                  Upload First Photo
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {photos.map((photo, index) => (
                  <AnimatedElement key={photo._id} delay={index * 50}>
                    <div 
                      onClick={() => setSelectedImage(photo)}
                      className="relative aspect-square overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer group"
                    >
                      <Image 
                        src={photo.photo || 'https://static.wixstatic.com/media/b5e630_3302f97e3e464beba610e23f269b9eb5~mv2.png?originWidth=1600&originHeight=896'}
                        alt={photo.caption || 'Wedding moment'}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        {photo.uploaderName && (
                          <p className="font-paragraph text-sm text-foreground font-semibold mb-1">
                            {photo.uploaderName}
                          </p>
                        )}
                        {photo.caption && (
                          <p className="font-paragraph text-sm text-muted-foreground line-clamp-2">
                            {photo.caption}
                          </p>
                        )}
                        {photo.eventTag && (
                          <span className="inline-block mt-2 px-3 py-1 bg-primary/20 text-primary text-xs rounded-full w-fit">
                            {photo.eventTag}
                          </span>
                        )}
                      </div>
                    </div>
                  </AnimatedElement>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-foreground hover:text-primary transition-colors"
          >
            <X size={32} />
          </button>
          
          <div className="max-w-4xl w-full">
            <Image 
              src={selectedImage.photo || 'https://static.wixstatic.com/media/b5e630_b9e4f70363bc43eb97f501cf6f508f1c~mv2.png?originWidth=1600&originHeight=896'}
              alt={selectedImage.caption || 'Wedding moment'}
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
            {(selectedImage.uploaderName || selectedImage.caption) && (
              <div className="mt-6 text-center">
                {selectedImage.uploaderName && (
                  <p className="font-paragraph text-lg text-foreground font-semibold mb-2">
                    {selectedImage.uploaderName}
                  </p>
                )}
                {selectedImage.caption && (
                  <p className="font-paragraph text-base text-muted-foreground">
                    {selectedImage.caption}
                  </p>
                )}
                {selectedImage.eventTag && (
                  <span className="inline-block mt-3 px-4 py-2 bg-primary/20 text-primary text-sm rounded-full">
                    {selectedImage.eventTag}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
