import { create } from 'zustand';

export interface FontSettings {
  headingFont: string;
  paragraphFont: string;
  accentFont: string;
  countdownFont: string;  // added
}

const DEFAULT_FONTS: FontSettings = {
  headingFont: 'Ephesis',
  paragraphFont: 'Montserrat',
  accentFont: 'Luxurious Script',
  countdownFont: 'Montserrat',  // added
};

interface FontStore {
  fonts: FontSettings;
  setFonts: (fonts: FontSettings) => void;
  resetFonts: () => void;
}

export const useFontStore = create<FontStore>((set) => ({
  fonts: DEFAULT_FONTS,
  setFonts: (fonts) => set({ fonts }),
  resetFonts: () => set({ fonts: DEFAULT_FONTS }),
}));
