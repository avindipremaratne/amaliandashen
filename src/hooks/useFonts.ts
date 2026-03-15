import { useEffect } from 'react';
import { useFontStore } from '@/stores/fontStore';

export function useFonts() {
  const { fonts, setFonts } = useFontStore();

  useEffect(() => {
    // Apply fonts to CSS variables
    const root = document.documentElement;
    root.style.setProperty('--font-heading', fonts.headingFont);
    root.style.setProperty('--font-paragraph', fonts.paragraphFont);
    root.style.setProperty('--font-accent', fonts.accentFont);

    // Also update Tailwind font-family classes dynamically
    const style = document.getElementById('dynamic-fonts') || document.createElement('style');
    style.id = 'dynamic-fonts';
    style.textContent = `
      .font-heading {
        font-family: ${fonts.headingFont}, sans-serif !important;
      }
      .font-paragraph {
        font-family: ${fonts.paragraphFont}, sans-serif !important;
      }
      .font-accent {
        font-family: ${fonts.accentFont}, cursive !important;
      }
    `;
    if (!document.getElementById('dynamic-fonts')) {
      document.head.appendChild(style);
    }
  }, [fonts]);

  return { fonts, setFonts };
}
