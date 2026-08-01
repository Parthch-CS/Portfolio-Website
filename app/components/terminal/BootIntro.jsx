"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_SEQUENCE = [
  { text: "Initialize boot sequence...", delay: 500 },
  { text: "Loading kernel modules... OK", delay: 1300 },
  { text: "Mounting encrypted volumes... OK", delay: 2100 },
  { text: "> whoami", delay: 2700, input: true },
  { text: "parth_chouriha (Clearance: B.Tech MIT)", delay: 2800 },
  { text: "> nmap -sV -p- portfolio.local", delay: 3600, input: true },
  { text: "Starting Nmap 7.93 ( https://nmap.org )", delay: 3800 },
  { text: "Discovered open port 80/tcp -> http", delay: 4100 },
  { text: "Discovered open port 443/tcp -> ssl/http", delay: 4200 },
  { text: "Service detection performed.", delay: 4600 },
  { text: "[OK] Access granted. Decrypting interface...", delay: 5500, success: true },
];

export default function BootIntro({ onComplete }) {
  const [lines, setLines] = useState([]);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Check if we've already shown the boot sequence this session
    const hasBooted = sessionStorage.getItem("hasBooted");
    if (hasBooted) {
      onComplete();
      return;
    }

    const timeouts = [];
    
    BOOT_SEQUENCE.forEach((item, index) => {
      const timeout = setTimeout(() => {
        setLines((prev) => [...prev, item]);
        
        // If this is the last line, finish up
        if (index === BOOT_SEQUENCE.length - 1) {
          setTimeout(() => {
            sessionStorage.setItem("hasBooted", "true");
            setIsDone(true);
            setTimeout(onComplete, 800); // Wait for fade out
          }, 1000);
        }
      }, item.delay);
      timeouts.push(timeout);
    });

    return () => timeouts.forEach(clearTimeout);
  }, [onComplete]);

  if (isDone) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0F14] p-6 sm:p-12"
      >
        <div className="w-full max-w-3xl h-[60vh] overflow-hidden flex flex-col font-mono text-sm sm:text-base">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`mb-2 ${line.input ? "text-[#00E5FF] font-bold" : ""} ${
                line.success ? "text-[#00FF88]" : "text-[#8B99A8]"
              }`}
            >
              <span className="mr-2">{!line.input && !line.success ? "[*]" : ""}</span>
              {line.text}
            </motion.div>
          ))}
          {!isDone && (
            <div className="mt-2 text-[#00E5FF]">
              <span className="typing-cursor"></span>
            </div>
          )}
        </div>

        <button
          onClick={() => {
            sessionStorage.setItem("hasBooted", "true");
            setIsDone(true);
            onComplete();
          }}
          className="absolute bottom-8 right-8 text-xs text-[#8B99A8] hover:text-[#00E5FF] border border-[#1E2731] px-4 py-2 rounded-sm uppercase tracking-widest transition-colors"
        >
          [ Skip ]
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
