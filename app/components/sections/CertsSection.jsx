"use client";

import { useState } from "react";
import { Award, ExternalLink, ShieldCheck } from "lucide-react";
import GlassPanel from "../ui/GlassPanel";
import SectionReveal from "../ui/SectionReveal";

const CERTS = [
  { 
    id: "Google Cybersecurity", 
    name: "Google Cybersecurity Professional Certificate", 
    status: "COMPLETED", 
    date: "Jul 2026", 
    issuer: "Google / Coursera",
    credentialId: "BB72MUXPUGV1",
    credentialUrl: "https://coursera.org/verify/professional-cert/BB72MUXPUGV1",
    pdf: "/certs/google-cybersecurity.pdf",
    image: "/certs/google-cybersecurity.png"
  },
  { 
    id: "Applied Ethical Hacking", 
    name: "Cyber Security and Applied Ethical Hacking", 
    status: "COMPLETED", 
    date: "Jul 2026", 
    issuer: "Infosys Springboard",
    credentialId: "verify.onwingspan.com",
    credentialUrl: "https://verify.onwingspan.com",
    pdf: "/certs/infosys-ethical-hacking.pdf",
    image: "/certs/infosys-ethical-hacking.png"
  },
  { 
    id: "Cloud Fundamentals", 
    name: "Cloud Computing Fundamentals", 
    status: "COMPLETED", 
    date: "Mar 2026", 
    issuer: "IBM SkillsBuild",
    credentialId: "d75ea9b7-797d-4d03-af25-e34fb20dda24",
    credentialUrl: "https://www.credly.com/badges/d75ea9b7-797d-4d03-af25-e34fb20dda24",
    pdf: "/certs/cloud-computing-fundamentals.pdf",
    image: "/certs/cloud-computing-fundamentals.png"
  },
  { 
    id: "Linux on IBM LinuxONE", 
    name: "Linux on IBM LinuxONE Intermediate", 
    status: "COMPLETED", 
    date: "Oct 2025", 
    issuer: "IBM",
    credentialId: "f1372735-e93a-4612-8984-0f2412ec464d",
    credentialUrl: "https://www.credly.com/badges/f1372735-e93a-4612-8984-0f2412ec464d",
    pdf: "/certs/linux-on-ibm-linuxone.pdf",
    image: "/certs/linux-on-ibm-linuxone.png"
  },
];

function CertCard({ cert }) {

  return (
    <GlassPanel className="transition-all duration-300 hover:border-[#00E5FF]/60 hover:shadow-[0_0_15px_rgba(0,229,255,0.15)]">
      {/* Small Certificate Direct Image Box */}
      <a href={cert.pdf} target="_blank" rel="noreferrer" className="block w-full h-44 bg-[#05080A] border border-[#1E2731] rounded-sm overflow-hidden mb-4 relative group/img cursor-pointer">
        <img 
          src={cert.image} 
          alt={cert.name} 
          className="w-full h-full object-cover object-top group-hover/img:scale-105 transition-transform duration-500"
        />
        {/* Hover zoom overlay indicator */}
        <div className="absolute inset-0 bg-[#0B0F14]/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center font-mono text-xs text-[#00E5FF] gap-1 font-bold z-20">
          Open Full Document &rarr;
        </div>
        {/* CRT scanline overlay */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,229,255,0.03)_3px,rgba(0,229,255,0.03)_3px)] pointer-events-none z-10" />
      </a>

      {/* Card Info */}
      <div className="flex items-start justify-between gap-2 mb-1">
        <div className="text-lg font-heading text-[#E6EDF3]">{cert.id}</div>
        <span className="px-2 py-0.5 bg-[#00E5FF]/10 text-[#00E5FF] text-[10px] font-mono border border-[#00E5FF]/30 rounded-sm flex items-center gap-1 flex-shrink-0">
          <ShieldCheck className="w-3 h-3" /> VERIFIED
        </span>
      </div>

      <div className="text-xs text-[#8B99A8] mb-4 leading-relaxed">{cert.name}</div>

      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#1E2731]">
        <div className="text-[10px] font-mono text-[#8B99A8] bg-[#1E2731] px-2 py-1 uppercase">
          {cert.issuer}
        </div>
        <div className="flex items-center gap-2">
          <a
            href={cert.pdf}
            target="_blank"
            rel="noreferrer"
            className="text-[11px] font-mono text-[#8B99A8] hover:text-[#00E5FF] transition-colors"
          >
            PDF →
          </a>
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-[11px] font-mono text-[#00E5FF] hover:underline px-2 py-1 bg-[#00E5FF]/10 rounded-sm border border-[#00E5FF]/30 transition-all"
          >
            <ExternalLink className="w-3 h-3" /> Verify
          </a>
        </div>
      </div>
    </GlassPanel>
  );
}

export default function Certifications() {
  return (
    <div className="max-w-5xl mx-auto">
      <SectionReveal delay={0.1}>
        <div className="flex items-center justify-between gap-3 mb-8 border-b border-[#1E2731] pb-4">
          <h1 className="text-3xl sm:text-4xl font-heading font-black uppercase tracking-wider text-[#E6EDF3] border-l-4 border-[#00E5FF] pl-3">
            Certifications
          </h1>
        </div>
      </SectionReveal>

      <div className="relative">
        {/* Vertical Timeline Line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-[#1E2731] md:-translate-x-1/2"></div>

        <div className="space-y-12">
          {CERTS.map((cert, index) => {
            const isEven = index % 2 === 0;

            return (
              <SectionReveal key={cert.id} delay={0.2 + index * 0.1}>
                <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between group">
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full -translate-x-1/2 translate-y-6 md:translate-y-0 z-10 bg-[#00E5FF] shadow-[0_0_10px_rgba(0,229,255,0.8)]"></div>

                  {/* Left Side (date on opposite side on desktop) */}
                  <div className={`hidden md:flex flex-col w-[calc(50%-2rem)] ${isEven ? "items-end pr-8" : "order-2 items-start pl-8"}`}>
                    <div className="font-mono text-sm text-[#8B99A8]">{cert.date}</div>
                    <div className="text-xs mt-1 uppercase font-bold tracking-widest text-[#00E5FF]">
                      COMPLETED
                    </div>
                    <div className="text-[10px] font-mono text-[#8B99A8] mt-1">ID: {cert.credentialId.slice(0, 12)}...</div>
                  </div>

                  {/* Card Side */}
                  <div className={`w-full pl-16 md:pl-0 md:w-[calc(50%-2rem)] ${isEven ? "md:order-2 md:pl-8" : "md:pr-8"}`}>
                    <SectionReveal delay={0.3 + index * 0.1}>
                      <CertCard cert={cert} />
                    </SectionReveal>
                  </div>

                </div>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
