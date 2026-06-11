import React, { useRef, useEffect } from 'react';

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

export const GlassCard = ({ children, className = '', hover = true, ...props }) => (
  <div
    className={`${hover ? 'glass-card' : 'glass-card-strong'} ${className}`}
    {...props}
  >
    {children}
  </div>
);

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
