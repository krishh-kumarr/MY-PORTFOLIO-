"use client";
import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

export const FloatingDock = ({ items, className }) => {
  let mouseX = useMotionValue(Infinity);

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex items-end gap-3 p-3 bg-[#0D1117]/80 backdrop-blur-2xl border border-white/10 rounded-2xl mx-auto shadow-2xl"
      >
        {items.map((item) => (
          <DockIcon mouseX={mouseX} key={item.title} item={item} />
        ))}
      </motion.div>
    </div>
  );
};

const DockIcon = ({ mouseX, item }) => {
  let ref = useRef(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  let widthSync = useTransform(distance, [-150, 0, 150], [38, 56, 38]);
  let width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      className="relative flex flex-col items-center group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={item.onClick}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 2, x: "-50%" }}
            className="px-3 py-1.5 whitespace-nowrap bg-black border border-white/10 text-white text-xs font-medium rounded-lg absolute left-1/2 -translate-x-1/2 -top-12 z-50 shadow-xl"
          >
            {item.title}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        style={{ width, height: width }}
        className="rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-text-secondary hover:bg-white/10 hover:text-white transition-colors shadow-lg overflow-hidden"
      >
        <div className="w-1/2 h-1/2 flex items-center justify-center">
          {item.icon}
        </div>
      </motion.div>
      {item.active && (
        <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-accent shadow-[0_0_8px_rgba(78,161,255,0.8)]" />
      )}
    </div>
  );
};
