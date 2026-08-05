"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

const CSS = `
  @keyframes crt-flicker {
    0%,100%{opacity:1} 92%{opacity:1} 93%{opacity:.91} 94%{opacity:1} 96%{opacity:.95} 97%{opacity:1}
  }
  @keyframes tv-glow-breathe {
    0%,100%{box-shadow:0 0 12px rgba(0,229,255,.18)}
    50%    {box-shadow:0 0 24px rgba(0,229,255,.38)}
  }
  .crt-screen-anim { animation: crt-flicker 7s infinite; }
  .tv-breathe      { animation: tv-glow-breathe 3s ease-in-out infinite; }
`;

/* ── Scoped Matrix Rain canvas ────────────────────────────── */
function MatrixRain() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Japanese katakana + ASCII mix, matching global matrix style
    const CHARS = "アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF".split("");
    const FS = 12;
    let cols, drops, raf;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      cols  = Math.floor(canvas.width / FS);
      drops = Array(cols).fill(1);
    };

    const draw = () => {
      ctx.fillStyle = "rgba(11,15,20,0.12)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const bright = Math.random() > 0.97;
        ctx.fillStyle = bright
          ? "rgba(0,229,255,0.9)"   // accent flash
          : "rgba(0,229,255,0.22)"; // dim trailing
        ctx.font = `${FS}px monospace`;
        ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], i * FS, drops[i] * FS);

        if (drops[i] * FS > canvas.height && Math.random() > 0.97) drops[i] = 0;
        drops[i]++;
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0, display: "block" }}
      aria-hidden="true"
    />
  );
}

/* ── Main Component ───────────────────────────────────────── */
export default function VisitorTerminal() {
  const [data, setData]               = useState(null);
  const [status, setStatus]           = useState("loading");
  const [showCursor, setShowCursor]   = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [voiceFired, setVoiceFired]   = useState(false);
  const cityRef   = useRef("unknown");

  /* ── speech ── */
  const speak = useCallback((city) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    
    // robotic ai narration phrasing
    const phrase = city && city !== "unknown"
      ? `Welcome to the world of internet. Connection traced to ${city}.`
      : `Welcome to the world of internet.`;

    const utt = new SpeechSynthesisUtterance(phrase);
    utt.rate = 0.85; 
    utt.pitch = 0.65; // lower pitch for a mechanical/robotic voice
    utt.volume = 0.9;
    
    const deep = window.speechSynthesis.getVoices()
      .find(v => /male|david|mark|daniel/i.test(v.name) && /en/i.test(v.lang));
    if (deep) utt.voice = deep;
    window.speechSynthesis.speak(utt);
  }, []);

  /* ── cursor blink ── */
  useEffect(() => {
    const id = setInterval(() => setShowCursor(c => !c), 530);
    return () => clearInterval(id);
  }, []);

  /* ── IP fetch via our own server-side route (/api/geoip) ── */
  /* This bypasses CSP restrictions (same-origin) and CORS issues entirely */
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch("/api/geoip");
        if (!res.ok) throw new Error("api-fail");
        const d = await res.json();
        if (!active) return;
        cityRef.current = d.city ?? "unknown";
        setData({
          ip:      d.ip      ?? "—",
          city:    d.city    ?? "—",
          country: d.country ?? "—",
          isp:     d.isp     ?? "—",
        });
        setStatus("done");
      } catch {
        if (active) setStatus("failed");
      }
    })();
    return () => { active = false; };
  }, []);

  /* ── voice after data ready ── */
  useEffect(() => {
    if (status === "done" && audioEnabled && !voiceFired) {
      speak(cityRef.current);
      setVoiceFired(true);
    }
  }, [status, audioEnabled, voiceFired, speak]);

  const toggleAudio = () => {
    if (!audioEnabled) {
      setAudioEnabled(true);
      if (status === "done" && !voiceFired) { speak(cityRef.current); setVoiceFired(true); }
    } else {
      setAudioEnabled(false);
      window.speechSynthesis?.cancel();
    }
  };

  return (
    <div
      className="relative w-full overflow-visible select-none"
      style={{
        height: "420px",
      }}
    >
      <style>{CSS}</style>

      {/* ── Background Layer Group (Faded with radial mask to blend edges) ── */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 0,
          maskImage: "radial-gradient(circle at 50% 45%, black 40%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 45%, black 40%, transparent 75%)"
        }}
      >
        {/* Scoped Matrix Rain */}
        <MatrixRain />

        {/* Hacker Image wrapper */}
        <div className="absolute inset-0" style={{ zIndex: 1 }}>
          <Image
            src="/images/hacker_theme_final.png"
            alt="Anonymous hacker"
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center 5%",
              mixBlendMode: "screen",
            }}
            priority
          />
          {/* Soft edge vignette to dissolve into site background */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute", inset: 0, zIndex: 2,
              boxShadow: "inset 0 0 40px 20px #0B0F14",
              pointerEvents: "none",
            }}
          />
          {/* Bottom gradient: make hacker fade into terminal area */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute", inset: 0, zIndex: 2,
              background: "linear-gradient(to bottom, transparent 40%, rgba(11,15,20,0.45) 68%, rgba(11,15,20,0.92) 100%)",
              pointerEvents: "none",
            }}
          />
        </div>
      </div>

      {/* ── Layer 2: CRT TV terminal floating in front (Fully visible & sharp) ── */}
      <div
        style={{
          zIndex: 3,
          position: "absolute",
          bottom: "18px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(92%, 265px)",
        }}
      >
        {/* TV outer bezel */}
        <div
          className="tv-breathe"
          style={{
            background: "linear-gradient(160deg,#1e2530 0%,#0f131a 60%,#080b0f 100%)",
            borderRadius: "12px",
            border: "2px solid rgba(0,229,255,0.45)", // Brighter, sharper bezel border
            padding: "7px 8px 6px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.8), 0 0 0 1px #0d1017",
          }}
        >
          {/* Bezel strip */}
          <div className="flex items-center justify-between mb-1.5 px-0.5">
            <div className="flex items-center gap-1">
              {["#ff4444","#ffb800","#00ff88"].map(c => (
                <span key={c} style={{ width:"4px", height:"4px", borderRadius:"50%", background:c, display:"inline-block" }} />
              ))}
            </div>
            <span
              onClick={toggleAudio}
              className="cursor-pointer transition-colors hover:text-[#00E5FF] font-mono text-[8px] font-bold"
              style={{
                letterSpacing: ".08em",
                color: audioEnabled ? "#00FF88" : "#8B99A8",
              }}
            >
              {audioEnabled ? "🔊 AUDIO: ON" : "🔇 AUDIO: OFF"}
            </span>
          </div>

          {/* CRT Screen */}
          <div
            className="relative overflow-hidden"
            style={{
              background: "#020703",
              borderRadius: "6px",
              padding: "10px 12px",
              minHeight: "72px",
              boxShadow: "inset 0 0 25px rgba(0,0,0,0.85)", // reduced black vignette for high contrast
            }}
          >
            {/* Scanlines */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-10"
              style={{
                backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.2) 2px,rgba(0,0,0,0.2) 4px)",
                borderRadius: "6px",
              }}
            />

            {/* Content */}
            <div className="crt-screen-anim font-mono text-[10.5px] leading-relaxed space-y-1 relative z-0">
              {status === "loading" && (
                <div style={{ color:"#00FF66", textShadow:"0 0 6px rgba(0,255,102,0.6)" }}>
                  <span style={{ marginRight:"4px" }}>[*]</span>TRACING UPLINK...
                </div>
              )}
              {status === "failed" && (
                <div style={{ color:"#ff4444", textShadow:"0 0 6px rgba(255,68,68,0.6)" }}>
                  <span style={{ marginRight:"4px" }}>[!]</span>TRACE FAILED
                </div>
              )}
              {status === "done" && data && (
                <div style={{ color:"#00FF66", textShadow:"0 0 6px rgba(0,255,102,0.5)" }}>
                  {[
                    { k:"IP ", v: data.ip },
                    { k:"LOC", v: `${data.city}, ${data.country}` },
                    { k:"ISP", v: data.isp },
                  ].map(({ k, v }) => (
                    <div key={k} className="flex gap-2">
                      <span style={{ color:"#00E5FF", minWidth:"28px", fontWeight: "bold" }}>{k}:</span>
                      <span style={{ fontWeight:600, fontSize:"10.5px", color: "#00FF88" }}>{v}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Cursor */}
              <span style={{
                display:"inline-block", width:"6px", height:"11px",
                background: showCursor ? "#00FF66" : "transparent",
                boxShadow: showCursor ? "0 0 6px rgba(0,255,102,0.8)" : "none",
                verticalAlign:"bottom", marginLeft:"2px", borderRadius:"1px",
              }} />
            </div>
          </div>
        </div>

        {/* TV stand */}
        <div style={{
          margin:"0 auto", width:"50%", height:"4px",
          background:"linear-gradient(to bottom,#1a1f28,#0d1017)",
          borderRadius:"0 0 3px 3px",
        }} />
      </div>
    </div>
  );
}
