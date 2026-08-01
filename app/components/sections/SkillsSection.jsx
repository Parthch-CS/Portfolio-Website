"use client";

import { Code2, Cpu, ShieldCheck, Terminal, Layers } from "lucide-react";
import GlassPanel from "../ui/GlassPanel";
import SectionReveal from "../ui/SectionReveal";

const LANGUAGES = [
  "Python", "C / C++", "Java", "Bash / Shell", "SQL"
];

const FRAMEWORKS = [
  "Docker", "Kubernetes", "TensorFlow", "React.js", "Next.js", "Node.js"
];

const DOMAINS = [
  "Vulnerability Assessment (VAPT)", 
  "Threat Intelligence & Honeypots", 
  "Network Security & Packet Analysis", 
  "Secure System Design & Cryptography", 
  "Digital Forensics & Incident Response (DFIR)", 
  "OWASP Top 10 Web Security"
];

const TOOLS_PLATFORMS = [
  { name: "Nmap", img: "/tools/nmap.png", detail: "Network discovery, port scanning & OS fingerprinting.", link: "https://nmap.org" },
  { name: "Wireshark", img: "/tools/wireshark.png", detail: "Deep packet inspection & pcap traffic analysis.", link: "https://www.wireshark.org" },
  { name: "Burp Suite", img: "/tools/burpsuite.png", detail: "Web vulnerability scanning & HTTP request interception.", link: "https://portswigger.net/burp" },
  { name: "Linux / Kali Linux", img: "/tools/linux.png", detail: "Offensive security OS environment & secure kernel administration.", link: "https://www.kali.org" },
  { name: "Suricata IDS", img: "/tools/suricata.png", detail: "Network intrusion detection & real-time threat prevention.", link: "https://suricata.io" },
  { name: "ELK Stack", img: "/tools/elastic.png", detail: "SIEM log analysis, Kibana dashboards & IOC tracking.", link: "https://www.elastic.co/elastic-stack" },
];

export default function SkillsMatrix() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Symmetric Section Heading */}
      <SectionReveal delay={0.1}>
        <div className="flex items-center justify-between gap-3 mb-8 border-b border-[#1E2731] pb-4">
          <h1 className="text-3xl sm:text-4xl font-heading font-black uppercase tracking-wider text-[#E6EDF3] border-l-4 border-[#00E5FF] pl-3">
            Skills & Tech Stack
          </h1>
        </div>
      </SectionReveal>

      {/* Top 3 Compact Boxes for Languages, Frameworks & Domains */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Languages Box */}
        <SectionReveal delay={0.2}>
          <GlassPanel className="p-5 h-full">
            <div className="flex items-center gap-2 mb-3 border-b border-[#1E2731] pb-2">
              <Code2 className="w-4 h-4 text-[#00E5FF]" />
              <h2 className="font-heading text-sm uppercase text-[#E6EDF3] tracking-wider font-bold">
                Languages
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {LANGUAGES.map((tech) => (
                <span 
                  key={tech} 
                  className="px-2.5 py-1 bg-[#0B0F14] border border-[#1E2731] hover:border-[#00E5FF]/60 text-xs font-mono text-[#E6EDF3] hover:text-[#00E5FF] transition-all rounded-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </GlassPanel>
        </SectionReveal>

        {/* Frameworks Box */}
        <SectionReveal delay={0.25}>
          <GlassPanel className="p-5 h-full">
            <div className="flex items-center gap-2 mb-3 border-b border-[#1E2731] pb-2">
              <Cpu className="w-4 h-4 text-[#00E5FF]" />
              <h2 className="font-heading text-sm uppercase text-[#E6EDF3] tracking-wider font-bold">
                Frameworks & Tools
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {FRAMEWORKS.map((tech) => (
                <span 
                  key={tech} 
                  className="px-2.5 py-1 bg-[#0B0F14] border border-[#1E2731] hover:border-[#00E5FF]/60 text-xs font-mono text-[#E6EDF3] hover:text-[#00E5FF] transition-all rounded-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </GlassPanel>
        </SectionReveal>

        {/* Domains & Specializations Box */}
        <SectionReveal delay={0.3}>
          <GlassPanel className="p-5 h-full">
            <div className="flex items-center gap-2 mb-3 border-b border-[#1E2731] pb-2">
              <Layers className="w-4 h-4 text-[#00E5FF]" />
              <h2 className="font-heading text-sm uppercase text-[#E6EDF3] tracking-wider font-bold">
                Cybersecurity Domains
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {DOMAINS.map((domain) => (
                <span 
                  key={domain} 
                  className="px-2.5 py-1 bg-[#0B0F14] border border-[#1E2731] hover:border-[#00E5FF]/60 text-xs font-mono text-[#E6EDF3] hover:text-[#00E5FF] transition-all rounded-sm"
                >
                  {domain}
                </span>
              ))}
            </div>
          </GlassPanel>
        </SectionReveal>
      </div>

      {/* Main Tools & Platforms Grid with Original Logos */}
      <SectionReveal delay={0.4}>
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between border-b border-[#1E2731] pb-2">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#00E5FF]" />
              <h2 className="font-heading text-base uppercase text-[#E6EDF3] tracking-wider font-bold">
                Tools & Platforms (Official Toolsets)
              </h2>
            </div>
            <span className="text-[10px] font-mono text-[#8B99A8] uppercase">
              {TOOLS_PLATFORMS.length} Active Tools
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOOLS_PLATFORMS.map((tool) => (
              <GlassPanel 
                key={tool.name} 
                className="transition-all duration-300 hover:border-[#00E5FF]/60 hover:shadow-[0_0_15px_rgba(0,229,255,0.15)]"
              >
                {/* Large Tool Logo Box */}
                <div className="w-full h-36 bg-white border border-[#1E2731] rounded-sm overflow-hidden mb-4 relative flex items-center justify-center p-6 group/img">
                  <img 
                    src={tool.img} 
                    alt={tool.name} 
                    className="max-w-full max-h-full object-contain group-hover/img:scale-105 transition-transform duration-500"
                  />
                  {/* CRT scanline overlay */}
                  <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,229,255,0.03)_3px,rgba(0,229,255,0.03)_3px)] pointer-events-none z-10" />
                </div>

                {/* Card Info */}
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="text-lg font-heading font-bold text-[#E6EDF3] group-hover:text-[#00E5FF] transition-colors">{tool.name}</div>
                </div>

                <div className="text-xs font-mono text-[#8B99A8] leading-relaxed min-h-[38px]">{tool.detail}</div>
              </GlassPanel>
            ))}
          </div>
        </div>
      </SectionReveal>
    </div>
  );
}
