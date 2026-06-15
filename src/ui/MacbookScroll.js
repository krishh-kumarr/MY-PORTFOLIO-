"use client";
import React, { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export const MacbookScroll = ({ titleComponent, images }) => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(scrollYProgress, [0, 0.4], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [isMobile ? 0.9 : 0.85, 1]);
  const translateY = useTransform(scrollYProgress, [0, 0.4], [isMobile ? 20 : 50, 0]);

  return (
    <div
      className="min-h-[50vh] md:h-[70rem] flex items-center justify-center relative p-2 md:p-10 mb-12 md:mb-40"
      ref={containerRef}
    >
      <div
        className="w-full relative"
        style={{ perspective: "1200px" }}
      >
        <div className="max-w-5xl mx-auto text-center z-10 relative mb-12">
          {titleComponent}
        </div>

        <motion.div
          style={{
            rotateX: rotate,
            scale,
            y: translateY,
          }}
          className="w-full max-w-5xl mx-auto relative flex flex-col items-center"
        >
          {/* MacBook Screen */}
          <div className="w-full bg-[#1A1A1A] border-[4px] md:border-[12px] border-[#1A1A1A] shadow-[0_20px_50px_rgba(0,0,0,0.7)] overflow-hidden rounded-[1rem] md:rounded-[1.5rem] p-1 md:p-2 relative aspect-[16/10] z-20">
            {/* Camera Hole */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 md:w-2 md:h-2 bg-black rounded-full z-30 shadow-inner"></div>

            {/* Screen Content */}
            <div className="w-full h-full bg-[#0D1117] overflow-hidden relative flex flex-col justify-center rounded-sm md:rounded-md border border-white/5 group">

              {/* Navigation Buttons (visible on hover) */}
              <button
                onClick={() => {
                  const container = document.getElementById("macbook-carousel");
                  if (container) container.scrollBy({ left: -300, behavior: 'smooth' });
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/80 text-white w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
              </button>

              <button
                onClick={() => {
                  const container = document.getElementById("macbook-carousel");
                  if (container) container.scrollBy({ left: 300, behavior: 'smooth' });
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/80 text-white w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
              </button>

              {/* Interactive Scrolling Container */}
              <div
                id="macbook-carousel"
                className="flex items-center w-full overflow-x-auto py-4 snap-x snap-mandatory no-scrollbar scroll-smooth"
              >
                <div className="flex gap-4 md:gap-8 px-4 w-max">
                  {images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`App screen mockup ${idx + 1}`}
                      className="h-[30vh] md:h-[50vh] w-auto object-contain rounded-md border border-white/10 shadow-2xl snap-center shrink-0 cursor-grab active:cursor-grabbing"
                    />
                  ))}
                </div>
              </div>

              {/* Inner Screen Gloss */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/[0.03] via-transparent to-transparent mix-blend-overlay z-10"></div>
            </div>
          </div>

          {/* MacBook Base (Keyboard Area) */}
          <div className="w-[110%] h-4 md:h-8 bg-gradient-to-b from-[#2A2A2A] to-[#1A1A1A] rounded-b-[1rem] md:rounded-b-[2rem] shadow-2xl relative z-10 -mt-1 md:-mt-2 flex justify-center">
            <div className="w-[15%] h-1 md:h-2 bg-[#111] rounded-b-md mt-0"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
