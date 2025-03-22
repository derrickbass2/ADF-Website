// src/styles/theme.ts
export const ADFTheme = {
    colors: {
      primary: '#1E3A8A',
      secondary: '#4F94DB',
      accent: '#45B7D1',
      background: {
        light: '#f4f6f8',
        dark: '#0F2042'
      },
      text: {
        primary: '#212121',
        secondary: '#757575',
        inverse: '#FFFFFF'
      }
    },
    typography: {
      fontFamily: {
        primary: "'Inter', sans-serif",
        secondary: "'Roboto Mono', monospace"
      },
      sizes: {
        heading1: '2.5rem',
        heading2: '2rem',
        body: '1rem'
      }
    },
    spacing: {
      xs: '0.5rem',
      sm: '1rem',
      md: '1.5rem',
      lg: '2rem',
      xl: '3rem'
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
      round: '50%'
    },
    transitions: {
      standard: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    }
  };