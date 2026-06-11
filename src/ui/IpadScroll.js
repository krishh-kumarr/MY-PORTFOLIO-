"use client";
import React, { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export const IpadScroll = ({ titleComponent, images }) => {
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
          className="w-full max-w-5xl mx-auto bg-[#1A1A1A] border-[4px] md:border-[12px] border-[#2A2A2A] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden rounded-[1.5rem] md:rounded-[3rem] p-2 md:p-4 flex justify-center items-center relative aspect-[14/10] md:aspect-[16/10]"
        >
          {/* iPad Camera Hole */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-black rounded-full hidden md:block z-20 shadow-inner"></div>
          
          {/* Screen Content */}
          <div className="w-full h-full bg-[#0D1117] rounded-[1rem] md:rounded-[1.5rem] overflow-hidden relative border border-white/10 flex flex-col justify-center">
            
            {/* Auto Scrolling Marquee */}
            <div className="flex items-center w-full bg-accent/[0.01] overflow-hidden py-4">
              <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  duration: 25,
                  ease: "linear",
                  repeat: Infinity,
                }}
                className="flex gap-4 md:gap-8 px-4 w-max"
              >
                {/* We double the images list for seamless looping */}
                {[...images, ...images].map((img, idx) => (
                  <img 
                    key={idx} 
                    src={img} 
                    alt="App screen mockup" 
                    className="h-[30vh] md:h-[50vh] w-auto object-contain rounded-xl md:rounded-2xl border border-white/10 shadow-2xl" 
                  />
                ))}
              </motion.div>
            </div>
            
            {/* Inner Screen Gloss */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/[0.03] via-transparent to-transparent mix-blend-overlay z-10"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
