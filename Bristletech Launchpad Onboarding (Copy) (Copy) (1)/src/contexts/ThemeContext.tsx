import { createContext, useContext, useState, ReactNode } from 'react';

export type ThemeMode = 'fire' | 'ice' | 'dual' | 'default';

interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  dark: string;
  smokey: string;
  glow: string;
}

interface Theme {
  mode: ThemeMode;
  colors: ThemeColors;
  isDualMode: boolean;
}

// STRICT RRR COLOR PALETTES
const themes: Record<ThemeMode, ThemeColors> = {
  fire: {
    primary: '#FF3A4A',
    secondary: '#B1122C',
    accent: '#FF5E63',
    dark: '#3A0A12',
    smokey: '#1A0508',
    glow: '#FF9AA6',
  },
  ice: {
    primary: '#00A9FF',
    secondary: '#4AD4FF',
    accent: '#B3E7FF',
    dark: '#001F4D',
    smokey: '#030B16',
    glow: '#4AD4FF',
  },
  dual: {
    // Dual mode uses both palettes
    primary: '#FF3A4A', // Red primary
    secondary: '#00A9FF', // Blue primary
    accent: '#FF5E63', // Red accent
    dark: '#1A0A12',
    smokey: '#050A15',
    glow: '#4AD4FF', // Blue glow
  },
  default: {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    accent: '#ec4899',
    dark: '#1e293b',
    smokey: '#0f172a',
    glow: '#60a5fa',
  },
};

interface ThemeContextType {
  theme: Theme;
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('dual');

  const setThemeMode = (newMode: ThemeMode) => {
    setMode(newMode);
  };

  const theme: Theme = {
    mode,
    colors: themes[mode],
    isDualMode: mode === 'dual',
  };

  const value = { theme, setThemeMode };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
