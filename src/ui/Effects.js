import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const RacingLines = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createRacingLine = () => {
      const line = document.createElement('div');
      line.className = 'absolute w-0.5 h-20 bg-gradient-to-b from-transparent via-red-500 to-transparent';
      line.style.left = Math.random() * 100 + '%';
      line.style.top = '-100px';
      line.style.animationDuration = (Math.random() * 2 + 2) + 's';
      line.style.animation = 'fall linear forwards';
      
      const style = document.createElement('style');
      if (!document.head.querySelector('#racing-lines-animation')) {
        style.id = 'racing-lines-animation';
        style.textContent = `
          @keyframes fall {
            to { transform: translateY(calc(100vh + 100px)); }
          }
        `;
        document.head.appendChild(style);
      }
      
      container.appendChild(line);

      setTimeout(() => {
        if (container.contains(line)) {
          container.removeChild(line);
        }
      }, 4000);
    };

    const interval = setInterval(createRacingLine, 300);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0"></div>;
};

export const MatrixRain = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*()';
    
    const createColumn = () => {
      const column = document.createElement('div');
      column.className = 'absolute text-green-400 text-xs opacity-30 pointer-events-none';
      column.style.left = Math.random() * 100 + '%';
      column.style.top = '-100px';
      column.style.fontFamily = 'monospace';
      
      let text = '';
      for (let i = 0; i < 20; i++) {
        text += chars[Math.floor(Math.random() * chars.length)] + '<br>';
      }
      column.innerHTML = text;
      
      column.style.animation = 'matrix-fall 3s linear forwards';
      
      const style = document.createElement('style');
      if (!document.head.querySelector('#matrix-animation')) {
        style.id = 'matrix-animation';
        style.textContent = `
          @keyframes matrix-fall {
            to { transform: translateY(calc(100vh + 100px)); }
          }
        `;
        document.head.appendChild(style);
      }
      
      container.appendChild(column);

      setTimeout(() => {
        if (container.contains(column)) {
          container.removeChild(column);
        }
      }, 3000);
    };

    const interval = setInterval(createColumn, 150);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0"></div>;
};

export const F1Card = ({ children, className = "", onClick }) => (
  <motion.div
    className={`bg-gradient-to-br from-gray-900 to-gray-800 border border-red-500/30 rounded-lg p-6 backdrop-blur-sm hover:border-red-500/60 transition-all duration-300 ${className}`}
    whileHover={{ 
      y: -5,
      boxShadow: "0 10px 30px rgba(255, 0, 0, 0.3)"
    }}
    onClick={onClick}
  >
    {children}
  </motion.div>
);

export const TechCard = ({ children, className = "", glow = false }) => (
  <motion.div
    className={`bg-gray-900/90 backdrop-blur-sm border border-bat-blue/30 rounded-lg p-6 ${glow ? 'shadow-bat-blue/20 shadow-lg' : ''} ${className}`}
    whileHover={{ 
      borderColor: "rgba(30, 144, 255, 0.6)",
      boxShadow: glow ? "0 0 20px rgba(0, 255, 255, 0.3)" : undefined
    }}
  >
    {children}
  </motion.div>
);

export const NeonText = ({ children, color = "cyan", className = "" }) => {
  const colorClasses = {
    cyan: "text-cyan-400",
    red: "text-red-500", 
    orange: "text-orange-500",
    green: "text-green-400",
    'f1-red': "text-red-500",
    'f1-orange': "text-orange-500",
    'neon-cyan': "text-cyan-400",
    'neon-green': "text-green-400"
  };

  return (
    <span 
      className={`${colorClasses[color] || colorClasses.cyan} ${className}`}
      style={{
        textShadow: `0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor`
      }}
    >
      {children}
    </span>
  );
};

export const RacingStripes = ({ className = "" }) => (
  <div className={`absolute inset-0 pointer-events-none ${className}`}>
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
  </div>
);

export const SpeedLines = ({ className = "" }) => (
  <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-20 h-0.5 bg-gradient-to-r from-transparent to-red-500"
        style={{
          top: `${20 + i * 15}%`,
          right: "-100px"
        }}
        animate={{
          x: [0, -300]
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          delay: i * 0.2,
          ease: "linear"
        }}
      />
    ))}
  </div>
);

export const GlowingBorder = ({ children, className = "" }) => (
  <div className={`relative ${className}`}>
    <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-cyan-500 rounded-lg blur opacity-30"></div>
    <div className="relative bg-gray-900 rounded-lg p-4">
      {children}
    </div>
  </div>
);

export const F1Button = ({ children, onClick, className = "", variant = "primary" }) => {
  const variants = {
    primary: "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600",
    secondary: "bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600",
    outline: "border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
  };

  return (
    <motion.button
      className={`px-6 py-3 rounded-lg font-bold text-white transition-all duration-300 ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

export const ProgressBar = ({ value, max = 100, className = "" }) => (
  <div className={`w-full bg-gray-800 rounded-full h-3 ${className}`}>
    <motion.div
      className="h-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
      initial={{ width: 0 }}
      animate={{ width: `${(value / max) * 100}%` }}
      transition={{ duration: 1, ease: "easeOut" }}
    />
  </div>
);

export const HexagonCard = ({ children, className = "" }) => (
  <div className={`relative ${className}`}>
    <div 
      className="bg-gradient-to-br from-gray-900 to-gray-800 border border-cyan-500/30 p-6"
      style={{
        clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)"
      }}
    >
      {children}
    </div>
  </div>
);
