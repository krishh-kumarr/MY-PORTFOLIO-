module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#07111F',
        'surface': '#0D1728',
        'glass': 'rgba(255,255,255,0.05)',
        'glass-border': 'rgba(255,255,255,0.08)',
        'glass-hover': 'rgba(255,255,255,0.12)',
        'text-primary': '#F8FAFC',
        'text-secondary': '#94A3B8',
        'text-tertiary': '#64748B',
        'accent': '#4EA1FF',
        'accent-hover': '#78B8FF',
        'accent-muted': 'rgba(78,161,255,0.15)',
        'success': '#22C55E',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(3rem, 6vw, 6rem)', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '700' }],
        'section': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.15', letterSpacing: '-0.025em', fontWeight: '700' }],
        'subtitle': ['clamp(1.125rem, 2vw, 1.5rem)', { lineHeight: '1.4', fontWeight: '500' }],
        'body': ['1.125rem', { lineHeight: '1.7' }],
        'small': ['0.875rem', { lineHeight: '1.5' }],
        'xs': ['0.75rem', { lineHeight: '1.5' }],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'float-slow': 'float 8s ease-in-out 1s infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'glass-lg': '0 16px 48px rgba(0, 0, 0, 0.4)',
        'accent': '0 0 20px rgba(78, 161, 255, 0.15)',
        'accent-lg': '0 0 40px rgba(78, 161, 255, 0.2)',
      },
    },
  },
  plugins: [],
}
