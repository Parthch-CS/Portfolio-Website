"use client";

import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

export default function DecryptText({ text, speed = 50, delay = 0, className = "" }) {
  const [displayText, setDisplayText] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let timeout;
    let iterations = 0;
    const totalIterations = text.length;

    const startDecryption = () => {
      const interval = setInterval(() => {
        setDisplayText((prev) => {
          let scrambled = text
            .split("")
            .map((char, i) => {
              if (char === " ") return " ";
              if (i < iterations) return text[i];
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("");
          return scrambled;
        });

        if (iterations >= totalIterations) {
          clearInterval(interval);
          setDisplayText(text);
        }
        
        iterations += 1/3; // Slow down the reveal
      }, speed);

      return () => clearInterval(interval);
    };

    timeout = setTimeout(startDecryption, delay);
    return () => clearTimeout(timeout);
  }, [isInView, text, speed, delay]);

  return (
    <span ref={ref} className={className}>
      {displayText || text.replace(/./g, "\u00A0")}
    </span>
  );
}
