import React, { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export const ContainerScroll = ({ titleComponent, children }) => {
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

  const rotate = useTransform(scrollYProgress, [0, 0.5], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [isMobile ? 0.9 : 0.85, 1]);
  const translateY = useTransform(scrollYProgress, [0, 0.5], [isMobile ? 20 : 50, 0]);

  return (
    <div
      className="h-[50vh] md:h-[70vh] flex items-center justify-center relative p-2 md:p-10 mb-20"
      ref={containerRef}
    >
      <div
        className="w-full relative"
        style={{
          perspective: "1200px",
        }}
      >
        <div className="max-w-5xl mx-auto text-center z-10 relative mb-8">
          {titleComponent}
        </div>
        <motion.div
          style={{
            rotateX: rotate,
            scale,
            y: translateY,
          }}
          className="max-w-5xl mx-auto bg-[#07111F] border border-white/[0.08] shadow-2xl overflow-hidden rounded-[2rem] md:rounded-[3rem] p-4 flex justify-center items-center"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};
