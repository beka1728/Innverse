export const fonts = {
  // Primary font family (default)
  primary: 'Poppins',
  
  // Secondary font for headings
  secondary: 'Playfair Display',
  
  // Monospace for code/data
  mono: 'Inter',
  
  // Font sizes based on 8px grid
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    '2xl': 32,
    '3xl': 48,
    '4xl': 64,
  },
  
  // Font weights
  weights: {
    light: '300' as const,
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  
  // Line heights
  lineHeights: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
    loose: 1.8,
  },
};