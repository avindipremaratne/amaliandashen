import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FontSettings, useFontStore } from '@/stores/fontStore';
import { useState } from 'react';

const AVAILABLE_FONTS = [
  'Roboto',
  'Montserrat',
  'Luxurious Script',
  'Dancing Script',
  'Cinzel',
  'Fraunces',
];

export default function FontManager() {
  const { fonts, setFonts } = useFontStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleFontChange = (fontType: keyof FontSettings, newFont: string) => {
    setFonts({
      ...fonts,
      [fontType]: newFont,
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors font-paragraph"
        aria-label="Open font manager"
      >
        🎨 Fonts
      </button>
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-card border border-border rounded-lg p-4 w-64 shadow-lg">
          <h3 className="font-heading text-sm font-bold text-foreground mb-4">Font Settings</h3>

          <div className="space-y-4">
            <div>
              <label className="font-paragraph text-xs text-muted-foreground block mb-2">
                Heading Font
              </label>
              <Select value={fonts.headingFont} onValueChange={(value) => handleFontChange('headingFont', value)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {AVAILABLE_FONTS.map((font) => (
                    <SelectItem key={font} value={font}>
                      {font}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="font-paragraph text-xs text-muted-foreground block mb-2">
                Paragraph Font
              </label>
              <Select value={fonts.paragraphFont} onValueChange={(value) => handleFontChange('paragraphFont', value)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {AVAILABLE_FONTS.map((font) => (
                    <SelectItem key={font} value={font}>
                      {font}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="font-paragraph text-xs text-muted-foreground block mb-2">
                Accent Font
              </label>
              <Select value={fonts.accentFont} onValueChange={(value) => handleFontChange('accentFont', value)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {AVAILABLE_FONTS.map((font) => (
                    <SelectItem key={font} value={font}>
                      {font}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={() => setIsOpen(false)}
            className="w-full mt-4"
            variant="outline"
          >
            Close
          </Button>
        </div>
      )}
    </div>
  );
}
