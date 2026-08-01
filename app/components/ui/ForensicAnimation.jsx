"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ForensicAnimation() {
  const [glitch, setGlitch] = useState(false);

  // Trigger random glitches
  useEffect(() => {
    const triggerGlitch = () => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150); // Glitch lasts 150ms
      
      // Schedule next glitch
      const nextTime = Math.random() * 4000 + 1000;
      setTimeout(triggerGlitch, nextTime);
    };
    
    const initialTimer = setTimeout(triggerGlitch, 2000);
    return () => clearTimeout(initialTimer);
  }, []);

  return (
    <div className="relative w-full aspect-square md:aspect-[4/3] bg-[#05080A] rounded-sm overflow-hidden border border-[#1E2731] flex items-center justify-center">
      {/* CRT Scanline Overlay */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,229,255,0.05)_3px,rgba(0,229,255,0.05)_3px)] pointer-events-none z-20"></div>

      {/* Blinking REC indicator */}
      <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
        <motion.div 
          animate={{ opacity: [1, 0, 1] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-2 h-2 rounded-full bg-[#FF3B3B]"
        />
        <span className="text-[#FF3B3B] font-mono text-[10px] tracking-widest font-bold">REC</span>
      </div>

      {/* Target coordinates */}
      <div className="absolute bottom-4 left-4 font-mono text-[10px] text-[#00E5FF] opacity-70 z-20">
        <p>LAT: 47.6062 N</p>
        <p>LNG: 122.3321 W</p>
        <p className="mt-1">FREQ: 144.300 MHz</p>
      </div>

      {/* Glitch Container */}
      <motion.div 
        animate={glitch ? { x: [-2, 2, -2, 0], y: [1, -1, 1, 0], filter: ["hue-rotate(90deg)", "hue-rotate(0deg)"] } : {}}
        transition={{ duration: 0.15 }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* Outer Rotating Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="absolute w-[80%] h-[80%] rounded-full border border-dashed border-[#1E2731] opacity-50"
        />

        {/* Inner Scanning Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
          className="absolute w-[50%] h-[50%] rounded-full border-t-2 border-r-2 border-[#00E5FF] opacity-70"
        />

        {/* Core Element (e.g., a wireframe cube or diamond) */}
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="relative w-24 h-24 flex items-center justify-center"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#00FF88] fill-transparent stroke-1">
            <motion.polygon 
              points="50,10 90,50 50,90 10,50" 
              animate={glitch ? { stroke: "#FF3B3B" } : { stroke: "#00FF88" }}
            />
            <line x1="50" y1="10" x2="50" y2="90" className="stroke-[#00E5FF] opacity-50" />
            <line x1="10" y1="50" x2="90" y2="50" className="stroke-[#00E5FF] opacity-50" />
          </svg>
          
          {/* Core glitch shadow */}
          {glitch && (
            <svg viewBox="0 0 100 100" className="absolute top-0 left-0 w-full h-full stroke-[#00E5FF] fill-transparent stroke-1 -translate-x-1 translate-y-1 opacity-70">
              <polygon points="50,10 90,50 50,90 10,50" />
            </svg>
          )}
        </motion.div>

        {/* Crosshairs */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
          <div className="w-full h-px bg-[#00E5FF]"></div>
          <div className="absolute h-full w-px bg-[#00E5FF]"></div>
        </div>
      </motion.div>

      {/* Overlay vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_50%,#05080A_100%)] pointer-events-none z-10"></div>
    </div>
  );
}
