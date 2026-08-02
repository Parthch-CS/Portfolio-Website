"use client";

import { useEffect, useRef } from "react";

export default function MatrixBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*アイウエオカキクケコ".split("");
    const fontSize = 14;
    let drops = [];
    let rafId;

    const resize = () => {
      // Preserve existing drops as much as possible to avoid blank columns
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      const cols = Math.floor(canvas.width / fontSize);
      // Extend or shrink drops array without resetting existing columns
      while (drops.length < cols) drops.push(Math.random() * -50);
      drops = drops.slice(0, cols);
    };

    const draw = () => {
      // Fade trail: lower opacity = longer tail
      ctx.fillStyle = "rgba(11,15,20,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const bright = Math.random() > 0.98;
        ctx.fillStyle = bright ? "rgba(0,229,255,0.9)" : "rgba(0,229,255,0.22)";
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        // Reset drop to top with random delay once it exits the screen
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      rafId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    rafId = requestAnimationFrame(draw);

    // Handle page visibility: pause when tab is hidden, resume when visible
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
      } else {
        rafId = requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-20"
      aria-hidden="true"
    />
  );
}
