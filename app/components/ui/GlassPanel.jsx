"use client";

export default function GlassPanel({ children, className = "", noPadding = false }) {
  return (
    <div
      className={`glass-panel rounded-md border border-[#1E2731] bg-[#121821]/90 shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[#00E5FF]/80 hover:shadow-[0_0_25px_rgba(0,229,255,0.2)] ${
        noPadding ? "" : "p-6"
      } ${className}`}
    >
      <div className="h-full">
        {children}
      </div>
    </div>
  );
}
