import { useFontStore } from '@/stores/fontStore';
import { useEffect } from 'react';

export function useFonts() {
  const { fonts, setFonts } = useFontStore();

  useEffect(() => {
    // Load Google Fonts if not already present
    if (!document.getElementById('google-fonts')) {
      const link = document.createElement('link');
      link.id = 'google-fonts';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Ephesis&family=Cormorant+Garamond:wght@600&display=swap';
      document.head.appendChild(link);
    }

    // Apply fonts to CSS variables
    const root = document.documentElement;
    root.style.setProperty('--font-heading', fonts.headingFont);
    root.style.setProperty('--font-paragraph', fonts.paragraphFont);
    root.style.setProperty('--font-accent', fonts.accentFont);
    root.style.setProperty('--font-countdown', fonts.countdownFont);

    // Also update Tailwind font-family classes dynamically
    const style = document.getElementById('dynamic-fonts') || document.createElement('style');
    style.id = 'dynamic-fonts';
    style.textContent = `
      .font-heading {
        font-family: ${fonts.headingFont}, cursive !important;
        font-weight: 400 !important;
      }
      .font-paragraph {
        font-family: ${fonts.paragraphFont}, sans-serif !important;
      }
      .font-accent {
        font-family: ${fonts.accentFont}, cursive !important;
      }
      .font-countdown {
        font-family: ${fonts.countdownFont}, serif !important;
        font-weight: 600 !important;
      }
    `;
    if (!document.getElementById('dynamic-fonts')) {
      document.head.appendChild(style);
    }
  }, [fonts]);

  return { fonts, setFonts };
}
