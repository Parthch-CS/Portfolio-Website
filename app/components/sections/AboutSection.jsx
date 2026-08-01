"use client";

import SectionReveal from "../ui/SectionReveal";
import { CheckCircle2, User } from "lucide-react";

export default function About() {
  return (
    <div className="max-w-5xl mx-auto">
      <SectionReveal delay={0.1}>
        <div className="flex items-center justify-between gap-3 mb-8 border-b border-[#1E2731] pb-4">
          <h1 className="text-3xl sm:text-4xl font-heading font-black uppercase tracking-wider text-[#E6EDF3] border-l-4 border-[#00E5FF] pl-3">
            About Me
          </h1>
        </div>
      </SectionReveal>

      <SectionReveal delay={0.3}>
        <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-stretch">
          
          {/* Left Pane: Photo */}
          <div className="w-full md:w-5/12 flex-shrink-0 flex items-start">
            <div className="w-full relative overflow-hidden rounded-md border border-[#1E2731]">
              <img 
                src="/profile.jpg" 
                alt="Parth Chouriha" 
                className="w-full h-auto object-cover" 
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%230B0F14'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%238B99A8' font-family='monospace' font-size='5'%3EMissing /profile.jpg%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>
          </div>

          {/* Right Pane: Details */}
          <div className="w-full md:w-7/12 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-[#E6EDF3] uppercase leading-[1.1] md:leading-[0.95] tracking-tight mb-8">
              PROFESSIONAL<br />SUMMARY
            </h1>
            
            <div className="space-y-6 text-[#8B99A8] font-mono text-sm leading-relaxed mb-12">
              <p>
                I am a final-year B.Tech student in Computer Science and Engineering with a specialization in Cybersecurity at Manipal Institute of Technology, Bengaluru. I possess a strong foundation in network security, secure system design, and vulnerability assessment.
              </p>
              <p>
                My academic and practical experience includes working with modern cryptographic protocols, analyzing network forensics, and implementing both defensive and offensive security strategies to ensure robust system architectures. I am passionate about solving complex security challenges and continuously expanding my technical skill set.
              </p>
            </div>

            {/* Core Competencies */}
            <div className="mt-auto">
              <h3 className="text-[#E6EDF3] uppercase tracking-widest text-xs font-bold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#6B5AED] rounded-full inline-block"></span>
                Core Competencies
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Penetration Testing",
                  "Network Forensics",
                  "Malware Analysis",
                  "Cryptography",
                  "Secure System Design",
                  "Vulnerability Assessment"
                ].map((skill, index) => (
                  <div key={index} className="flex items-center gap-2 text-[#8B99A8] font-mono text-xs">
                    <CheckCircle2 className="w-4 h-4 text-[#6B5AED]" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </SectionReveal>
    </div>
  );
}
