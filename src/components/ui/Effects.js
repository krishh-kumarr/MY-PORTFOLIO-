import React, { useEffect, useRef } from 'react';

export const RacingLines = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createRacingLine = () => {
      const line = document.createElement('div');
      line.className = 'racing-line';
      line.style.left = Math.random() * 100 + '%';
      line.style.animationDuration = (Math.random() * 2 + 2) + 's';
      container.appendChild(line);

      setTimeout(() => {
        if (container.contains(line)) {
          container.removeChild(line);
        }
      }, 4000);
    };

    const interval = setInterval(createRacingLine, 200);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div ref={containerRef} className="racing-lines"></div>;
};

export const MatrixRain = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*()';
    
    const createColumn = () => {
      const column = document.createElement('div');
      column.className = 'matrix-column';
      column.style.left = Math.random() * 100 + '%';
      column.style.animationDuration = (Math.random() * 3 + 2) + 's';
      
      let text = '';
      for (let i = 0; i < 20; i++) {
        text += chars[Math.floor(Math.random() * chars.length)] + '<br>';
      }
      column.innerHTML = text;
      
      container.appendChild(column);

      setTimeout(() => {
        if (container.contains(column)) {
          container.removeChild(column);
        }
      }, 5000);
    };

    const interval = setInterval(createColumn, 150);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div ref={containerRef} className="matrix-rain opacity-10"></div>;
};

export const F1Card = ({ children, className = '', teamColor = 'redbull' }) => {
  return (
    <div className={`f1-card pro-card p-6 ${teamColor} ${className}`}>
      {children}
    </div>
  );
};

export const TechCard = ({ children, className = '', glow = false }) => {
  return (
    <div className={`tech-card pro-card p-6 ${glow ? 'tech-glow' : ''} ${className}`}>
      {children}
    </div>
  );
};

export const NeonText = ({ children, className = '', color = 'neon-green' }) => {
  return (
    <span className={`neon-text text-${color} ${className}`}>
      {children}
    </span>
  );
};

export const F1Button = ({ children, onClick, className = '' }) => {
  return (
    <button 
      className={`f1-button rounded-lg ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const SpeedLines = ({ trigger }) => {
  return trigger ? <div className="speed-lines"></div> : null;
};

export const GlowingBorder = ({ children, className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-bat-blue via-f1-blue to-bat-blue rounded-lg blur-sm opacity-75"></div>
      <div className="relative bg-bat-black rounded-lg p-1">
        {children}
      </div>
    </div>
  );
};
