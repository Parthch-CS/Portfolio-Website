"use client";

import { FileCode2 } from "lucide-react";
import SectionReveal from "../ui/SectionReveal";

const LOGS = [
  {
    id: "LOG-001",
    timestamp: "2026-07-10T14:22:00Z",
    type: "CTF",
    title: "HackTheBox - Cybernetics (Insane)",
    tags: ["Active Directory", "Reverse Engineering", "Privilege Escalation"],
    summary: "Exploited a custom service to gain initial foothold, followed by pivoting through a complex AD forest. Bypassed modern EDR solutions using custom syscalls.",
  },
  {
    id: "LOG-002",
    timestamp: "2026-06-25T09:15:30Z",
    type: "HOMELAB",
    title: "Building a Proxmox Threat Hunting Range",
    tags: ["Proxmox", "Wazuh", "Security Onion", "pfSense"],
    summary: "Deployed a virtualized enterprise network simulating a hybrid cloud environment. Integrated Wazuh SIEM and Security Onion for full packet capture and EDR telemetry.",
  },
  {
    id: "LOG-003",
    timestamp: "2026-05-02T11:45:12Z",
    type: "RESEARCH",
    title: "Analysis of Rust-based Ransomware",
    tags: ["Malware Analysis", "Ghidra", "Rust"],
    summary: "Reverse engineered a new ransomware strain written in Rust. Identified a flaw in the cryptographic implementation allowing for key recovery without paying the ransom.",
  }
];

export default function Writeups() {
  return (
    <div className="max-w-5xl mx-auto">
      <SectionReveal delay={0.1}>
        <div className="flex items-center justify-between gap-3 mb-8 border-b border-[#1E2731] pb-4">
          <h1 className="text-3xl sm:text-4xl font-heading font-black uppercase tracking-wider text-[#E6EDF3] border-l-4 border-[#00E5FF] pl-3">
            Blog & Writeups
          </h1>
        </div>
      </SectionReveal>

      <div className="space-y-6 font-mono text-sm relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#1E2731] before:to-transparent">
        {LOGS.map((log, index) => (
          <SectionReveal key={log.id} delay={0.2 + index * 0.1}>
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              
              {/* Timeline dot */}
              <div className="flex items-center justify-center w-5 h-5 rounded-full border border-[#00E5FF] bg-[#0B0F14] text-[#00E5FF] shadow-[0_0_10px_rgba(0,229,255,0.5)] z-10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <div className="w-1.5 h-1.5 bg-[#00E5FF] rounded-full"></div>
              </div>

              {/* Content Card */}
              <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] bg-[#121821]/80 backdrop-blur-sm border border-[#1E2731] p-5 rounded-sm hover:border-[#00E5FF]/50 transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3 border-b border-[#1E2731] pb-2">
                  <span className="text-[#00E5FF] text-xs">[{log.timestamp}]</span>
                  <span className={`text-[10px] px-2 py-0.5 border ${
                    log.type === 'CTF' ? 'border-[#FFB800] text-[#FFB800]' : 
                    log.type === 'HOMELAB' ? 'border-[#00FF88] text-[#00FF88]' : 
                    'border-[#00E5FF] text-[#00E5FF]'
                  }`}>
                    {log.type}
                  </span>
                </div>
                
                <h3 className="text-base font-heading text-[#E6EDF3] mb-3">{log.title}</h3>
                <p className="text-[#8B99A8] text-xs leading-relaxed mb-4">
                  {log.summary}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {log.tags.map(tag => (
                    <span key={tag} className="text-[10px] bg-[#0B0F14] text-[#8B99A8] px-1.5 py-0.5">
                      #{tag.replace(/\s+/g, '')}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </SectionReveal>
        ))}
      </div>
    </div>
  );
}
