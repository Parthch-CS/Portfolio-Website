"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X, Image as ImageIcon } from "lucide-react";
import GlassPanel from "../ui/GlassPanel";
import SectionReveal from "../ui/SectionReveal";

function GithubIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
      <path d="M9 18c-4.51 2-5-2-7-2"/>
    </svg>
  );
}

const PROJECTS = [
  {
    id: "nova",
    shortName: "NOVA",
    fullName: "AI-IoT-IDS Enterprise Security Operations",
    date: "May 2026",
    category: "Network Security",
    severity: "CRITICAL",
    objective: "Design a real-time AI-powered IoT Intrusion Detection System with multi-channel alerts and interactive SOC dashboard.",
    method: "Utilized Random Forest classification on live packet capture. Built FastAPI REST/WebSocket engine and Next.js dark-themed SOC operations dashboard.",
    tools: ["Python", "FastAPI", "RandomForest", "Next.js", "WebSocket", "Scikit-Learn"],
    image: "/projects/nova.png",
    gallery: [
      { label: "SOC Overview", src: "/projects/nova-dashboard-overview.png", desc: "Main AI-IoT-IDS Security Operations Dashboard with real-time attack timeline & metrics." },
      { label: "Threat Map", src: "/projects/nova-geolocation-map.png", desc: "Threat Geolocation Center — Live mapping of global attacker IPs and target nodes." },
      { label: "Traffic Stream", src: "/projects/nova-traffic-map.png", desc: "Live Attack Traffic Streams — Real-time packet throughput & top source/destination IPs." },
      { label: "Threat Intel", src: "/projects/nova-threat-intel.png", desc: "Enriched Threat Intelligence with MITRE ATT&CK framework mapping & CVE references." },
      { label: "Security Alerts", src: "/projects/nova-alerts.png", desc: "Real-time incident logs, severity breakdown, and filterable security alert history." },
      { label: "Email Alert", src: "/projects/nova-email-alert.jpg", desc: "Automated Multi-Channel Email Dispatcher — High Severity Botnet intrusion alert notification." },
      { label: "SOC Report", src: "/projects/nova-report.png", desc: "Automated Security Operations Report — Attack type & severity distribution breakdown." },
      { label: "API Docs", src: "/projects/nova-api-docs.png", desc: "FastAPI REST API & WebSocket documentation (OpenAPI 3.1 Swagger interface)." },
      { label: "Attack Simulator", src: "/projects/nova-attack-simulator.png", desc: "CLI Attack Simulator script generating test network attack scenarios in real time." },
      { label: "Console Startup", src: "/projects/nova-soc-launch.png", desc: "Enterprise SOC Startup Console launching API server, capture loop & alert dispatchers." },
    ],
    github: "https://github.com/Parthch-CS/ai-iot-ids",
  },
  {
    id: "trap",
    shortName: "TRAP",
    fullName: "Threat Reconnaissance & Artificial Profiling",
    date: "Apr 2026",
    category: "Threat Intelligence",
    severity: "HIGH",
    objective: "Engineer a distributed honeypot architecture to capture and analyze attacker TTPs.",
    method: "Deployed scalable honeypots via Docker and Kubernetes. Implemented automated AI-driven attack classification and integrated the ELK stack for real-time visualization of IOCs and network trends.",
    tools: ["Python", "Docker", "Kubernetes", "ELK Stack"],
    image: "/projects/trap.png",
    github: "https://github.com/Parthch-CS/ai-honeypot-",
  },
  {
    id: "gate",
    shortName: "GATE",
    fullName: "Guaranteed Adaptive Throttling Engine",
    date: "Feb 2026",
    category: "Distributed Systems",
    severity: "HIGH",
    objective: "Protect API endpoints from volumetric Layer 7 DDoS attacks.",
    method: "Architected a high-performance engine in Go using Redis and Nginx. Developed a dynamic feedback loop for adaptive traffic regulation based on load analysis.",
    tools: ["Go", "Redis", "Nginx", "API Security"],
    image: "/projects/gate.png",
    github: "https://github.com/parthchouriha/gate",
  }
];

export default function Projects() {
  const [activeSlide, setActiveSlide] = useState({ nova: 0 });
  const [lightbox, setLightbox] = useState(null); // { project, index }

  const handlePrev = (projectId, total) => {
    setActiveSlide((prev) => ({
      ...prev,
      [projectId]: ((prev[projectId] || 0) - 1 + total) % total,
    }));
  };

  const handleNext = (projectId, total) => {
    setActiveSlide((prev) => ({
      ...prev,
      [projectId]: ((prev[projectId] || 0) + 1) % total,
    }));
  };

  return (
    <div className="max-w-5xl mx-auto">
      <SectionReveal delay={0.1}>
        <div className="flex items-center justify-between gap-3 mb-8 border-b border-[#1E2731] pb-4">
          <h1 className="text-3xl sm:text-4xl font-heading font-black uppercase tracking-wider text-[#E6EDF3] border-l-4 border-[#00E5FF] pl-3">
            Projects
          </h1>
        </div>
      </SectionReveal>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {PROJECTS.map((c, index) => {
          const gallery = c.gallery || [{ label: "Dashboard", src: c.image, desc: c.fullName }];
          const currentIdx = activeSlide[c.id] || 0;
          const currentSlide = gallery[currentIdx] || gallery[0];

          return (
            <SectionReveal key={c.shortName} delay={0.2 + index * 0.1}>
              <GlassPanel noPadding className="h-full flex flex-col relative group transition-all duration-300 hover:border-[#00E5FF] hover:shadow-[0_0_20px_rgba(0,229,255,0.1)] overflow-hidden">
                
                {/* Dashboard Image Box with Slide Controls */}
                <div className="w-full h-48 md:h-56 relative overflow-hidden border-b border-[#1E2731] group/img bg-[#05080A]">
                  {/* Overlay gradient for tech feel */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14] via-transparent to-black/40 opacity-70 z-10 pointer-events-none"></div>
                  <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,229,255,0.04)_3px,rgba(0,229,255,0.04)_3px)] z-10 pointer-events-none"></div>
                  
                  <img 
                    src={currentSlide.src} 
                    alt={currentSlide.label} 
                    className="w-full h-full object-cover object-center transition-all duration-500 ease-out cursor-pointer"
                    onClick={() => setLightbox({ project: c, index: currentIdx })}
                  />

                  {/* Top-Right Lightbox Zoom Button */}
                  <button
                    onClick={() => setLightbox({ project: c, index: currentIdx })}
                    className="absolute top-2.5 right-2.5 z-30 p-1.5 bg-[#0B0F14]/80 border border-[#00E5FF]/40 text-[#00E5FF] hover:bg-[#00E5FF] hover:text-black rounded-sm transition-all shadow-md"
                    title="Fullscreen Preview"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>

                  {/* Left & Right Slide Navigation Arrows (Visible on Hover/Touch if gallery > 1) */}
                  {gallery.length > 1 && (
                    <>
                      <button
                        onClick={() => handlePrev(c.id, gallery.length)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-30 p-1.5 bg-[#0B0F14]/85 border border-[#1E2731] hover:border-[#00E5FF] text-[#E6EDF3] hover:text-[#00E5FF] rounded-sm transition-all"
                        title="Previous Screenshot"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleNext(c.id, gallery.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-30 p-1.5 bg-[#0B0F14]/85 border border-[#1E2731] hover:border-[#00E5FF] text-[#E6EDF3] hover:text-[#00E5FF] rounded-sm transition-all"
                        title="Next Screenshot"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>

                      {/* Slide Indicator Badge */}
                      <div className="absolute bottom-2.5 left-2.5 z-20 px-2 py-0.5 bg-[#0B0F14]/90 border border-[#00E5FF]/30 text-[9px] font-mono text-[#00E5FF] rounded-sm flex items-center gap-1.5">
                        <span className="font-bold">{currentIdx + 1} / {gallery.length}</span>
                        <span className="text-[#8B99A8]">•</span>
                        <span className="truncate max-w-[140px] text-[#E6EDF3]">{currentSlide.label}</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Screenshot Gallery Category Pills */}
                {gallery.length > 1 && (
                  <div className="bg-[#070A0E] px-3 py-2 border-b border-[#1E2731] flex items-center gap-1.5 overflow-x-auto scrollbar-none z-20">
                    <span className="text-[9px] font-mono uppercase text-[#8B99A8] mr-1 flex-shrink-0 flex items-center gap-1">
                      <ImageIcon className="w-3 h-3 text-[#00E5FF]" /> Views:
                    </span>
                    {gallery.map((g, idx) => {
                      const isActive = currentIdx === idx;
                      return (
                        <button
                          key={g.label}
                          onClick={() => setActiveSlide((prev) => ({ ...prev, [c.id]: idx }))}
                          className={`px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider rounded-sm transition-all flex-shrink-0 border ${
                            isActive
                              ? "bg-[#00E5FF]/20 text-[#00E5FF] border-[#00E5FF] font-bold"
                              : "bg-[#121821] text-[#8B99A8] border-[#1E2731] hover:text-[#E6EDF3] hover:border-[#00E5FF]/40"
                          }`}
                        >
                          {g.label}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Report Header */}
                <div className="bg-[#121821] border-b border-[#1E2731] px-6 py-4 flex flex-col gap-4 z-20 relative">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex flex-col gap-1">
                      <h2 className="font-heading text-xl uppercase text-[#00E5FF] font-bold tracking-widest">{c.shortName}</h2>
                      <span className="font-mono text-xs text-[#E6EDF3] opacity-80">{c.fullName}</span>
                    </div>
                    <a href={c.github} target="_blank" rel="noreferrer" className="p-2 bg-[#1E2731] rounded-sm text-[#8B99A8] hover:text-[#00E5FF] hover:bg-[#00E5FF]/10 transition-colors flex-shrink-0" title="View Source on GitHub">
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                    <span className="px-2 py-1 bg-[#1E2731] text-[#8B99A8]">{c.category}</span>
                    <span className={`px-2 py-1 font-bold ${
                      c.severity === "CRITICAL" ? "bg-[#FF3B3B]/20 text-[#FF3B3B]" : "bg-[#FFB800]/20 text-[#FFB800]"
                    }`}>
                      {c.severity}
                    </span>
                    <span className="text-[#8B99A8]">{c.date}</span>
                  </div>
                </div>

                {/* Report Body */}
                <div className="p-6 font-mono text-xs space-y-4 relative z-20 bg-[#0B0F14]/90 backdrop-blur-sm flex-1 flex flex-col">
                  <div className="flex flex-col gap-1 group-hover:text-[#E6EDF3] transition-colors">
                    <div className="text-[#8B99A8] uppercase text-[10px] tracking-widest">Objective</div>
                    <div className="text-[#E6EDF3] leading-relaxed">{c.objective}</div>
                  </div>
                  
                  <div className="flex flex-col gap-1 group-hover:text-[#E6EDF3] transition-colors">
                    <div className="text-[#8B99A8] uppercase text-[10px] tracking-widest">Method</div>
                    <div className="text-[#E6EDF3] leading-relaxed">{c.method}</div>
                  </div>
                  
                  <div className="flex flex-col gap-2 mt-auto pt-4 border-t border-[#1E2731]">
                    <div className="text-[#8B99A8] uppercase text-[10px] tracking-widest">Tools Utilized</div>
                    <div className="flex flex-wrap gap-2">
                      {c.tools.map(t => (
                        <span key={t} className="px-2 py-1 border border-[#1E2731] bg-[#05080A] text-[#00E5FF] text-[10px] transition-colors group-hover:border-[#00E5FF]/50 group-hover:bg-[#00E5FF]/10">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassPanel>
            </SectionReveal>
          );
        })}
      </div>

      {/* Fullscreen Lightbox Modal for High-Res Screenshot Slider */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-8 animate-fadeIn">
          {/* Lightbox Header */}
          <div className="w-full max-w-6xl flex items-center justify-between border-b border-[#1E2731] pb-3 mb-3 font-mono">
            <div className="flex items-center gap-3">
              <span className="text-[#00E5FF] font-bold text-sm sm:text-base font-heading">
                [{lightbox.project.shortName}] {lightbox.project.gallery[lightbox.index].label}
              </span>
              <span className="text-xs text-[#8B99A8] px-2 py-0.5 bg-[#121821] border border-[#1E2731] rounded-sm">
                {lightbox.index + 1} of {lightbox.project.gallery.length}
              </span>
            </div>
            <button
              onClick={() => setLightbox(null)}
              className="p-1.5 bg-[#121821] hover:bg-[#FF3B3B]/20 text-[#8B99A8] hover:text-[#FF3B3B] border border-[#1E2731] hover:border-[#FF3B3B]/40 rounded-sm transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Lightbox Image View with Side Slide Arrows */}
          <div className="relative w-full max-w-6xl flex-1 flex items-center justify-center overflow-hidden my-2 group">
            <img
              src={lightbox.project.gallery[lightbox.index].src}
              alt={lightbox.project.gallery[lightbox.index].label}
              className="max-w-full max-h-[75vh] object-contain rounded-sm border border-[#1E2731] shadow-[0_0_40px_rgba(0,229,255,0.15)]"
            />

            {/* Slider Previous Button */}
            <button
              onClick={() =>
                setLightbox((prev) => ({
                  ...prev,
                  index: (prev.index - 1 + prev.project.gallery.length) % prev.project.gallery.length,
                }))
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-[#0B0F14]/90 border border-[#00E5FF]/40 text-[#00E5FF] hover:bg-[#00E5FF] hover:text-black rounded-sm transition-all shadow-xl"
              title="Previous Photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Slider Next Button */}
            <button
              onClick={() =>
                setLightbox((prev) => ({
                  ...prev,
                  index: (prev.index + 1) % prev.project.gallery.length,
                }))
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-[#0B0F14]/90 border border-[#00E5FF]/40 text-[#00E5FF] hover:bg-[#00E5FF] hover:text-black rounded-sm transition-all shadow-xl"
              title="Next Photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Lightbox Description & Thumbnail Bar */}
          <div className="w-full max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-[#1E2731] font-mono text-xs text-[#8B99A8]">
            <div className="text-center sm:text-left text-[#E6EDF3] max-w-xl">
              {lightbox.project.gallery[lightbox.index].desc}
            </div>

            {/* Thumbnail Strip */}
            <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1">
              {lightbox.project.gallery.map((g, idx) => (
                <button
                  key={g.label}
                  onClick={() => setLightbox((prev) => ({ ...prev, index: idx }))}
                  className={`w-14 h-9 rounded-sm overflow-hidden border transition-all flex-shrink-0 ${
                    lightbox.index === idx
                      ? "border-[#00E5FF] ring-2 ring-[#00E5FF]/30 scale-105"
                      : "border-[#1E2731] opacity-50 hover:opacity-100"
                  }`}
                >
                  <img src={g.src} alt={g.label} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
