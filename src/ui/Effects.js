import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import LiquidGlass from 'liquid-glass-react';

export const DotGrid = () => (
  <div className="fixed inset-0 dot-grid pointer-events-none z-0" aria-hidden="true" />
);

export const DotDistortion = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let particles = [];
    let mouse = { x: width / 2, y: height / 2 };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      init();
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    class Particle {
      constructor(x, y) {
        this.baseX = x;
        this.baseY = y;
        this.x = x;
        this.y = y;
        this.size = 1.2;
        this.density = (Math.random() * 20) + 1;
      }
      draw() {
        ctx.fillStyle = 'rgba(78, 161, 255, 0.3)'; // Using accent color with opacity
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
      update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = 120;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if (distance < maxDistance) {
          this.x -= directionX;
          this.y -= directionY;
        } else {
          if (this.x !== this.baseX) {
            let dx = this.x - this.baseX;
            this.x -= dx / 15;
          }
          if (this.y !== this.baseY) {
            let dy = this.y - this.baseY;
            this.y -= dy / 15;
          }
        }
      }
    }

    function init() {
      particles = [];
      let spacing = 35;
      for (let y = 0; y < height; y += spacing) {
        for (let x = 0; x < width; x += spacing) {
          particles.push(new Particle(x, y));
        }
      }
    }

    let animationFrameId;
    function animate() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].draw();
        particles[i].update();
      }
      animationFrameId = requestAnimationFrame(animate);
    }

    init();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.8 }}
    />
  );
};

export const MeshGradient = () => (
  <div className="mesh-gradient" aria-hidden="true">
    <div className="mesh-blob mesh-blob-1" />
    <div className="mesh-blob mesh-blob-2" />
    <div className="mesh-blob mesh-blob-3" />
  </div>
);

export const NoiseTexture = () => (
  <div className="noise-overlay" aria-hidden="true" />
);

export const GlassCard = ({ children, className = '', hover = true, ...props }) => {
  const containerRef = useRef(null);
  return (
    <motion.div
      ref={containerRef}
      className={`glass-card relative p-6 rounded-2xl overflow-hidden ${className}`}
      {...props}
    >
      {/* Background Liquid Glass */}
      <div className="absolute inset-0 z-0 pointer-events-none rounded-2xl overflow-hidden">
        <LiquidGlass
          displacementScale={hover ? 16 : 4}
          blurAmount={0.08}
          saturation={140}
          aberrationIntensity={1.2}
          elasticity={0.15}
          cornerRadius={16}
          padding="0px"
          mouseContainer={containerRef}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100%',
            height: '100%'
          }}
        />
      </div>
      {/* Foreground Content */}
      <div className="relative z-10 w-full h-full text-text-primary text-left">
        {children}
      </div>
    </motion.div>
  );
};

export const GlassButton = ({ children, className = '', onClick, variant = 'primary', disabled = false, type = 'button', href, download, ...props }) => {
  const btnRef = useRef(null);
  const Tag = href ? 'a' : 'button';

  return (
    <Tag
      ref={btnRef}
      href={href}
      download={download}
      type={href ? undefined : type}
      disabled={href ? undefined : disabled}
      onClick={onClick}
      className={`glass-btn-${variant} relative inline-flex items-center justify-center px-8 py-3.5 rounded-full overflow-hidden text-sm font-semibold tracking-tight transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/40 ${disabled ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'} ${className}`}
      style={{ textDecoration: 'none' }}
      {...props}
    >
      {/* Background Liquid Glass */}
      <div className="absolute inset-0 z-0 pointer-events-none rounded-full overflow-hidden">
        <LiquidGlass
          displacementScale={disabled ? 0 : 12}
          blurAmount={0.05}
          saturation={150}
          aberrationIntensity={1.2}
          elasticity={disabled ? 0 : 0.15}
          cornerRadius={999}
          padding="0px"
          mouseContainer={btnRef}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100%',
            height: '100%'
          }}
        />
      </div>

      {/* Foreground Text */}
      <span className={`relative z-10 ${variant === 'primary' ? 'text-white' : 'text-text-secondary hover:text-text-primary transition-colors'}`}>
        {children}
      </span>
    </Tag>
  );
};

export const SectionDivider = () => (
  <div className="section-divider" />
);

export const MacBookMockup = ({ children, className = '' }) => (
  <div className={`device-macbook ${className}`}>
    <div className="device-macbook-topbar">
      <div className="device-macbook-dot" />
      <div className="device-macbook-dot" />
      <div className="device-macbook-dot" />
    </div>
    <div className="p-1">
      {children}
    </div>
  </div>
);

export const PhoneMockup = ({ children, className = '' }) => (
  <div className={`device-phone ${className}`}>
    <div className="device-phone-notch" />
    <div className="rounded-[20px] overflow-hidden">
      {children}
    </div>
  </div>
);

export const Trophy = () => (
  <div className="trophy">
    <div className="trophy-body" />
  </div>
);

export const Loader = () => (
  <div className="loader-container">
    <div className="flex flex-col items-center gap-8">
      <div className="loader-dots">
        <div className="loader-dot" />
        <div className="loader-dot" />
        <div className="loader-dot" />
      </div>
      <div className="text-text-secondary text-small font-medium tracking-widest uppercase">
        Loading
      </div>
    </div>
  </div>
);

export const ScrollProgress = ({ progress }) => (
  <div className="scroll-progress" style={{ width: `${progress}%` }} />
);
