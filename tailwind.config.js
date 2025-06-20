module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'racing-red': '#3B5998', // changed to Facebook blue
        'tech-silver': '#C0C0C0',
        'dark-graphite': '#000000',
        'racing-orange': '#4A86E8', // changed to a calm blue
        'tech-blue': '#0073CF', // calmer blue
        'racing-green': '#00D2BE',
        'tech-purple': '#6A5ACD', // softer slate blue
        'accent-green': '#2E8B57', // sea green instead of neon
        'accent-cyan': '#20B2AA', // light sea green
        'accent-pink': '#9370DB', // medium purple instead of hot pink
        'dark-bg': '#0a0a0a',
        'dark-secondary': '#1a1a1a',
        'dark-tertiary': '#2a2a2a',
        // Cool calm colors
        'bat-black': '#1A1A1A',
        'bat-gray': '#2D2D2D',
        'bat-blue': '#1E90FF',
        'bat-yellow': '#87CEEB', // sky blue instead of yellow
        'f1-red': '#4682B4', // steel blue instead of red
        'f1-orange': '#5F9EA0', // cadet blue instead of orange
        'f1-blue': '#4169E1', // royal blue
        'f1-silver': '#C0C0C0',
        'f1-purple': '#7B68EE', // medium slate blue
        'neon-cyan': '#40E0D0', // turquoise instead of neon cyan
        'neon-green': '#3CB371', // medium sea green instead of neon green
      },
      fontFamily: {
        'primary': ['Orbitron', 'monospace'],
        'secondary': ['Exo 2', 'sans-serif'],
        'text': ['Rajdhani', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
        'fade-in': 'fadeIn 1s ease-in',
        'slide-up': 'slideUp 0.8s ease-out',
        'zoom-in': 'zoomIn 0.6s ease-out',
        'f1-speed': 'f1Speed 0.3s ease-out',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px currentColor' },
          '100%': { boxShadow: '0 0 20px currentColor, 0 0 30px currentColor' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        zoomIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        f1Speed: {
          '0%': { transform: 'translateX(-100px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      backgroundImage: {
        'f1-gradient': 'linear-gradient(135deg, #4682B4, #5F9EA0, #4169E1)',
        'dark-gradient': 'linear-gradient(135deg, #0a0a0a, #1a1a1a, #2a2a2a)',
        'neon-gradient': 'linear-gradient(135deg, #3CB371, #40E0D0, #6A5ACD)',
        'bat-gradient': 'linear-gradient(135deg, #1A1A1A, #2D2D2D, #1E90FF)',
        'tech-gradient': 'linear-gradient(135deg, #1A1A1A, #2D2D2D, #87CEEB)',
        'racing-gradient': 'linear-gradient(135deg, #4682B4, #4169E1, #C0C0C0)',
      },
      boxShadow: {
        'neon': '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor',
        'f1': '0 10px 25px rgba(255, 30, 0, 0.3)',
        'tech': '0 10px 25px rgba(0, 0, 0, 0.5)',
        'bat': '0 5px 15px rgba(30, 144, 255, 0.3)',
        'racing': '0 5px 15px rgba(255, 135, 0, 0.4)',
      },
    },
  },
  plugins: [],
}
