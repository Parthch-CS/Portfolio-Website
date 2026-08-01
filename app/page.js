"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Shield, Server, Activity, Database, Key, Terminal, FileText, Send, Award, Skull, AlertOctagon, HelpCircle, X } from "lucide-react";
import BootIntro from "./components/terminal/BootIntro";
import ThreatTicker from "./components/ui/ThreatTicker";
import DecryptText from "./components/ui/DecryptText";
import GlassPanel from "./components/ui/GlassPanel";
import SectionReveal from "./components/ui/SectionReveal";

// Import all sections
import AboutSection from "./components/sections/AboutSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import WriteupsSection from "./components/sections/WriteupsSection";
import SkillsSection from "./components/sections/SkillsSection";
import CertsSection from "./components/sections/CertsSection";
import ContactSection from "./components/sections/ContactSection";

const TITLES = [
  "Cybersecurity Enthusiast",
  "Network Security",
  "Ethical Hacking",
  "Data Protection"
];

export default function Home() {
  const [bootComplete, setBootComplete] = useState(false);
  const [titleIndex, setTitleIndex] = useState(0);
  const [simActive, setSimActive] = useState(false);
  const [simLogs, setSimLogs] = useState([]);
  const [simStatus, setSimStatus] = useState("idle"); // idle, running, finished

  useEffect(() => {
    // If the boot sequence was already completed this session, skip it entirely
    const hasBooted = sessionStorage.getItem("hasBooted");
    if (hasBooted) {
      setBootComplete(true);
    }
  }, []);

  // Title Rotation Loop
  useEffect(() => {
    if (!bootComplete) return;
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % TITLES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [bootComplete]);

  // Intrusion Test Simulation Runner
  const runIntrusionTest = () => {
    setSimActive(true);
    setSimStatus("running");
    setSimLogs([]);

    const logSteps = [
      { text: "[+] Initializing intrusion sequence on localhost:3000...", delay: 200 },
      { text: "[*] Performing ARP scan on network segment 192.168.1.0/24...", delay: 700 },
      { text: "[+] Found target device at 192.168.1.45 (Mit-Bangalore-Node)", delay: 1200 },
      { text: "[*] Port scanning target nodes...", delay: 1800 },
      { text: "    - Port 22 (SSH)   : OPEN", delay: 2200 },
      { text: "    - Port 80 (HTTP)  : OPEN", delay: 2500 },
      { text: "    - Port 443 (HTTPS): OPEN", delay: 2700 },
      { text: "[*] Launching CVE vulnerability analysis...", delay: 3400 },
      { text: "[!] Alert: Dynamic Rate Limiter detected (Adaptive Throttling Engine)", delay: 4100 },
      { text: "[*] Attempting buffer overflow payload injection (SSH Service)...", delay: 4800 },
      { text: "[-] Exploit failed: Connection actively reset by gateway firewall.", delay: 5500 },
      { text: "[+] Intrusion Test Complete. System reports: SECURE / UNCOMPROMISED.", delay: 6200 }
    ];

    logSteps.forEach((step) => {
      setTimeout(() => {
        setSimLogs((prev) => [...prev, step.text]);
        if (step.text.startsWith("[+] Intrusion Test Complete")) {
          setSimStatus("finished");
        }
      }, step.delay);
    });
  };

  return (
    <>
      {!bootComplete && (
        <BootIntro onComplete={() => setBootComplete(true)} />
      )}
      
      {/* Hide the dashboard content until boot finishes to avoid flashes */}
      <div className={`transition-opacity duration-1000 ${bootComplete ? "opacity-100" : "opacity-0"}`}>
        
        {/* Threat Ticker */}
        <div className="mb-10 -mx-4 sm:-mx-6 md:-mx-12 xl:-mx-24 overflow-hidden">
          <ThreatTicker />
        </div>

        {/* Hero Section */}
        <SectionReveal delay={0.2}>
          <div className="mb-16 flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Bio info */}
            <div className="flex-1">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold mb-4 glitch-hover text-[#E6EDF3] uppercase tracking-tight">
                Parth Chouriha
              </h1>
              
              {/* Dynamic cycling typewriter role */}
              <div className="text-xl sm:text-2xl text-[#8B99A8] font-mono h-8 flex items-center gap-2 mb-6">
                <span className="text-[#00E5FF] font-bold">&gt;</span> 
                <DecryptText 
                  key={titleIndex}
                  text={TITLES[titleIndex]} 
                  speed={30} 
                  delay={100} 
                  className="text-[#00E5FF] font-semibold border-r-2 border-[#00E5FF] pr-1 animate-pulse" 
                />
              </div>
              
              <p className="max-w-2xl text-sm leading-relaxed text-[#8B99A8] border-l-2 border-[#1E2731] pl-4 mb-8">
                Final-year B.Tech Cybersecurity student at Manipal Institute of Technology, Bengaluru. Specializing in secure system design, AI-driven threat intelligence, network forensics, and web application security auditing. Welcome to my personal dashboard.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <a 
                  href="/resume.pdf" 
                  download 
                  className="flex items-center gap-2 px-5 py-3 bg-[#00E5FF] hover:bg-[#00E5FF]/85 text-black font-bold font-heading uppercase text-xs tracking-wider transition-all rounded-sm shadow-[0_0_15px_rgba(0,229,255,0.2)] hover:shadow-[0_0_25px_rgba(0,229,255,0.4)]"
                >
                  <FileText className="w-4 h-4" /> Download Resume
                </a>
                <a 
                  href="#contact" 
                  className="flex items-center gap-2 px-5 py-3 bg-transparent border border-[#1E2731] hover:border-[#00E5FF]/70 text-[#E6EDF3] hover:text-[#00E5FF] font-bold font-heading uppercase text-xs tracking-wider transition-all rounded-sm"
                >
                  <Send className="w-4 h-4" /> Secure Channel
                </a>
              </div>
            </div>

            {/* Quick Status & Stats Panel */}
            <div className="w-full lg:w-96 shrink-0">
              {/* Stats Counters */}
              <GlassPanel className="p-5">
                <h3 className="font-mono text-[10px] text-[#8B99A8] uppercase tracking-wider mb-4 border-b border-[#1E2731] pb-2">
                  System Telemetry
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-[#0B0F14] border border-[#1E2731] rounded-sm text-center">
                    <div className="text-xl font-heading font-black text-[#00E5FF]">3+</div>
                    <div className="text-[10px] font-mono text-[#8B99A8] uppercase mt-1">Credentials</div>
                  </div>
                  <div className="p-3 bg-[#0B0F14] border border-[#1E2731] rounded-sm text-center">
                    <div className="text-xl font-heading font-black text-[#00E5FF]">6+</div>
                    <div className="text-[10px] font-mono text-[#8B99A8] uppercase mt-1">Tools</div>
                  </div>
                  <div className="p-3 bg-[#0B0F14] border border-[#1E2731] rounded-sm text-center">
                    <div className="text-xl font-heading font-black text-[#00E5FF]">3</div>
                    <div className="text-[10px] font-mono text-[#8B99A8] uppercase mt-1">Core Projects</div>
                  </div>
                  <div className="p-3 bg-[#0B0F14] border border-[#1E2731] rounded-sm text-center">
                    <div className="text-xl font-heading font-black text-[#00E5FF]">B.Tech</div>
                    <div className="text-[10px] font-mono text-[#8B99A8] uppercase mt-1">Academics</div>
                  </div>
                </div>
              </GlassPanel>
            </div>
          </div>
        </SectionReveal>

        {/* Intrusion Simulation Modal overlay */}
        {simActive && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-[#0B0F14] border border-[#FFB800] rounded-sm shadow-[0_0_30px_rgba(255,184,0,0.15)] overflow-hidden font-mono">
              {/* Header */}
              <div className="bg-[#121821] border-b border-[#1E2731] px-4 py-2.5 flex items-center justify-between">
                <span className="text-[#FFB800] text-xs font-bold flex items-center gap-1.5">
                  <Terminal className="w-4 h-4" /> INTRUSION_TEST_SEQUENCE.SH
                </span>
                <button 
                  onClick={() => setSimActive(false)} 
                  className="p-1 text-[#8B99A8] hover:text-[#FFB800] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Console log viewport */}
              <div className="p-4 h-64 overflow-y-auto bg-[#05080A] text-xs space-y-1.5 scrollbar-thin scrollbar-thumb-[#1E2731]">
                {simLogs.map((log, index) => {
                  let colorClass = "text-[#8B99A8]";
                  if (log.startsWith("[+]")) colorClass = "text-[#00FF88] font-bold";
                  if (log.startsWith("[-]")) colorClass = "text-[#FF3B3B] font-bold";
                  if (log.startsWith("[!]")) colorClass = "text-[#FFB800] font-bold";

                  return (
                    <div key={index} className={colorClass}>
                      {log}
                    </div>
                  );
                })}
                {simStatus === "running" && (
                  <div className="text-[#00E5FF] animate-pulse flex items-center gap-1">
                    <span>[*] Running diagnostics...</span>
                    <span className="w-1.5 h-3.5 bg-[#00E5FF] inline-block animate-pulse" />
                  </div>
                )}
              </div>

              {/* Actions Footer */}
              <div className="bg-[#121821] border-t border-[#1E2731] p-3 flex justify-end gap-3">
                <button
                  disabled={simStatus === "running"}
                  onClick={runIntrusionTest}
                  className="px-3 py-1.5 bg-[#FFB800]/10 hover:bg-[#FFB800]/25 text-[#FFB800] border border-[#FFB800]/30 rounded-sm text-xs transition-colors"
                >
                  Re-Run Scan
                </button>
                <button
                  onClick={() => setSimActive(false)}
                  className="px-3 py-1.5 bg-[#1E2731] hover:bg-[#1E2731]/80 text-[#E6EDF3] border border-[#1E2731] rounded-sm text-xs transition-colors"
                >
                  Close Console
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard Grid */}
        <SectionReveal delay={0.4}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
            {/* Operator Profile Tile */}
            <a href="#about" className="group">
              <GlassPanel className="h-full flex flex-col group-hover:border-[#00E5FF]/50 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-[#1E2731] rounded-sm group-hover:bg-[#00E5FF]/10 transition-colors">
                    <UserIcon className="w-5 h-5 text-[#E6EDF3] group-hover:text-[#00E5FF]" />
                  </div>
                  <h2 className="font-heading uppercase tracking-widest text-sm">About Me</h2>
                </div>
                <p className="text-xs text-[#8B99A8] mt-auto">Background, academic profile, and technical competencies.</p>
              </GlassPanel>
            </a>

            {/* Case Files Tile */}
            <a href="#projects" className="group">
              <GlassPanel className="h-full flex flex-col group-hover:border-[#00E5FF]/50 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-[#1E2731] rounded-sm group-hover:bg-[#00E5FF]/10 transition-colors">
                    <Database className="w-5 h-5 text-[#E6EDF3] group-hover:text-[#00E5FF]" />
                  </div>
                  <h2 className="font-heading uppercase tracking-widest text-sm">Projects</h2>
                </div>
                <p className="text-xs text-[#8B99A8] mt-auto">Security engineering projects, tools, and system breakdowns.</p>
              </GlassPanel>
            </a>

            {/* CTF Logs Tile */}
            <a href="#writeups" className="group">
              <GlassPanel className="h-full flex flex-col group-hover:border-[#00E5FF]/50 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-[#1E2731] rounded-sm group-hover:bg-[#00E5FF]/10 transition-colors">
                    <Terminal className="w-5 h-5 text-[#E6EDF3] group-hover:text-[#00E5FF]" />
                  </div>
                  <h2 className="font-heading uppercase tracking-widest text-sm">Blog</h2>
                </div>
                <p className="text-xs text-[#8B99A8] mt-auto">Technical writeups, CTF solutions, and security research.</p>
              </GlassPanel>
            </a>

            {/* Skills Matrix Tile */}
            <a href="#skills" className="group">
              <GlassPanel className="h-full flex flex-col group-hover:border-[#00E5FF]/50 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-[#1E2731] rounded-sm group-hover:bg-[#00E5FF]/10 transition-colors">
                    <Activity className="w-5 h-5 text-[#E6EDF3] group-hover:text-[#00E5FF]" />
                  </div>
                  <h2 className="font-heading uppercase tracking-widest text-sm">Skills</h2>
                </div>
                <p className="text-xs text-[#8B99A8] mt-auto">Technical proficiencies, security tools, and core frameworks.</p>
              </GlassPanel>
            </a>

            {/* Certifications Tile */}
            <a href="#certifications" className="group">
              <GlassPanel className="h-full flex flex-col group-hover:border-[#00E5FF]/50 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-[#1E2731] rounded-sm group-hover:bg-[#00E5FF]/10 transition-colors">
                    <AwardIcon className="w-5 h-5 text-[#E6EDF3] group-hover:text-[#00E5FF]" />
                  </div>
                  <h2 className="font-heading uppercase tracking-widest text-sm">Certifications</h2>
                </div>
                <p className="text-xs text-[#8B99A8] mt-auto">Industry credentials, certifications, and active training.</p>
              </GlassPanel>
            </a>

            {/* Secure Channel Tile */}
            <a href="#contact" className="group">
              <GlassPanel className="h-full flex flex-col group-hover:border-[#00E5FF]/50 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-[#1E2731] rounded-sm group-hover:bg-[#00E5FF]/10 transition-colors">
                    <Key className="w-5 h-5 text-[#E6EDF3] group-hover:text-[#00E5FF]" />
                  </div>
                  <h2 className="font-heading uppercase tracking-widest text-sm">Contact</h2>
                </div>
                <p className="text-xs text-[#8B99A8] mt-auto">Professional channels, direct email, and social profiles.</p>
              </GlassPanel>
            </a>
          </div>
        </SectionReveal>

        {/* Stacked Sections for SPA Scroll */}
        <div className="space-y-32 md:space-y-48 pb-20">
          <section id="about" className="scroll-mt-32">
            <AboutSection />
          </section>
          
          <section id="projects" className="scroll-mt-32">
            <ProjectsSection />
          </section>
          
          <section id="writeups" className="scroll-mt-32">
            <WriteupsSection />
          </section>
          
          <section id="skills" className="scroll-mt-32">
            <SkillsSection />
          </section>
          
          <section id="certifications" className="scroll-mt-32">
            <CertsSection />
          </section>
          
          <section id="contact" className="scroll-mt-32">
            <ContactSection />
          </section>
        </div>

      </div>
    </>
  );
}

// Temporary icon fallbacks since User and Award are used from Lucide above but imported differently
function UserIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  );
}
function AwardIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
  );
}
