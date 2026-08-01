"use client";

import { useState } from "react";
import { AlertOctagon, Upload, Image as ImageIcon } from "lucide-react";
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
    fullName: "Network Observation & Vulnerability Analysis",
    date: "May 2026",
    category: "Network Security",
    severity: "CRITICAL",
    objective: "Design an anomaly-based IDS for resource-constrained IoT devices to detect malicious patterns.",
    method: "Utilized Random Forest classification on Bot-IoT datasets. Optimized model inference latency to <50ms for real-time edge threat prevention.",
    tools: ["Python", "TensorFlow", "Scikit-learn", "IoT"],
    image: "/projects/nova.png",
    github: "https://github.com/parthchouriha/nova",
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
    github: "https://github.com/parthchouriha/trap",
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
  const [customImages, setCustomImages] = useState({});

  const handleImageUpload = (projectId, event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomImages((prev) => ({ ...prev, [projectId]: url }));
    }
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
          const currentImage = customImages[c.id] || c.image;

          return (
            <SectionReveal key={c.shortName} delay={0.2 + index * 0.1}>
              <GlassPanel noPadding className="h-full flex flex-col relative group transition-all duration-300 hover:border-[#00E5FF] hover:shadow-[0_0_20px_rgba(0,229,255,0.1)] overflow-hidden">
                
                {/* Dashboard Image Box with Upload Action */}
                <div className="w-full h-48 md:h-56 relative overflow-hidden border-b border-[#1E2731] group/img">
                  {/* Overlay gradient for tech feel */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14] to-transparent opacity-80 z-10 pointer-events-none"></div>
                  <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,229,255,0.05)_3px,rgba(0,229,255,0.05)_3px)] z-10 pointer-events-none"></div>
                  
                  <img 
                    src={currentImage} 
                    alt={c.shortName} 
                    className="w-full h-full object-cover object-center group-hover/img:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Upload Overlay Button */}
                  <label className="absolute inset-0 bg-[#0B0F14]/70 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 z-30 flex flex-col items-center justify-center gap-2 cursor-pointer border-2 border-dashed border-[#00E5FF]/50 m-2 rounded-sm">
                    <Upload className="w-6 h-6 text-[#00E5FF] animate-bounce" />
                    <span className="font-mono text-xs text-[#E6EDF3] uppercase tracking-wider font-bold">Upload Custom Dashboard</span>
                    <span className="font-mono text-[10px] text-[#8B99A8]">Click to choose screenshot from device</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => handleImageUpload(c.id, e)} 
                    />
                  </label>
                </div>

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
    </div>
  );
}
