"use client";

import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import GlassPanel from "../ui/GlassPanel";
import SectionReveal from "../ui/SectionReveal";
import { useState } from "react";

function GithubIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 5 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
      <path d="M9 18c-4.51 2-5-2-7-2"/>
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect width="4" height="12" x="2" y="9"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle, sending, sent

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    
    setTimeout(() => {
      setStatus("sent");
      setTimeout(() => {
        setFormData({ name: "", email: "", message: "" });
        setStatus("idle");
      }, 3000);
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <SectionReveal delay={0.1}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8 border-b border-[#1E2731] pb-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-heading font-black uppercase tracking-wider text-[#E6EDF3] border-l-4 border-[#00E5FF] pl-3 mb-2">
              Contact Me
            </h1>
            <p className="text-xs font-mono text-[#8B99A8] mt-1">
              Have a security inquiry, project proposal, or collaboration opportunity? Reach out via direct message or social channels.
            </p>
          </div>
        </div>
      </SectionReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Col - Contact Details & Social Logos */}
        <div className="space-y-6 flex flex-col justify-between">
          <SectionReveal delay={0.2}>
            <GlassPanel className="space-y-6">
              <h2 className="font-mono text-xs text-[#00E5FF] uppercase tracking-widest border-b border-[#1E2731] pb-3">
                Contact Information
              </h2>

              {/* Email Card */}
              <a 
                href="mailto:parthchouriha.cybersec@gmail.com" 
                className="flex items-start gap-4 p-4 bg-[#0B0F14] border border-[#1E2731] hover:border-[#00E5FF] rounded-sm group transition-all"
              >
                <div className="p-2.5 bg-[#121821] border border-[#1E2731] group-hover:border-[#00E5FF]/50 rounded-sm text-[#00E5FF] group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#8B99A8] uppercase tracking-wider mb-1">Email Address</div>
                  <div className="font-mono text-xs sm:text-sm text-[#E6EDF3] group-hover:text-[#00E5FF] transition-colors break-all">
                    parthchouriha.cybersec@gmail.com
                  </div>
                </div>
              </a>

              {/* Phone Card */}
              <a 
                href="tel:+919111441179" 
                className="flex items-start gap-4 p-4 bg-[#0B0F14] border border-[#1E2731] hover:border-[#00E5FF] rounded-sm group transition-all"
              >
                <div className="p-2.5 bg-[#121821] border border-[#1E2731] group-hover:border-[#00E5FF]/50 rounded-sm text-[#00E5FF] group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#8B99A8] uppercase tracking-wider mb-1">Phone Number</div>
                  <div className="font-mono text-xs sm:text-sm text-[#E6EDF3] group-hover:text-[#00E5FF] transition-colors">
                    +91 9111441179
                  </div>
                </div>
              </a>

              {/* Location Card */}
              <div className="flex items-start gap-4 p-4 bg-[#0B0F14] border border-[#1E2731] rounded-sm">
                <div className="p-2.5 bg-[#121821] border border-[#1E2731] rounded-sm text-[#00E5FF]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#8B99A8] uppercase tracking-wider mb-1">Location</div>
                  <div className="font-mono text-xs sm:text-sm text-[#E6EDF3]">
                    Bangalore, India
                  </div>
                </div>
              </div>

              {/* Social Platforms (Only Logo) */}
              <div className="pt-2">
                <div className="text-[10px] font-mono text-[#8B99A8] uppercase tracking-widest mb-3">
                  Social Channels
                </div>
                <div className="flex items-center gap-4">
                  {/* GitHub Logo Button */}
                  <a 
                    href="https://github.com/Parthch-CS" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    title="GitHub Profile"
                    className="p-3 bg-[#0B0F14] border border-[#1E2731] hover:border-[#00E5FF] text-[#8B99A8] hover:text-[#00E5FF] hover:bg-[#00E5FF]/10 rounded-sm transition-all group"
                  >
                    <GithubIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  </a>

                  {/* LinkedIn Logo Button */}
                  <a 
                    href="https://www.linkedin.com/in/parthchouriha" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    title="LinkedIn Profile"
                    className="p-3 bg-[#0B0F14] border border-[#1E2731] hover:border-[#00E5FF] text-[#8B99A8] hover:text-[#00E5FF] hover:bg-[#00E5FF]/10 rounded-sm transition-all group"
                  >
                    <LinkedinIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  </a>
                </div>
              </div>
            </GlassPanel>
          </SectionReveal>
        </div>

        {/* Right Col - Professional Message Form */}
        <SectionReveal delay={0.3}>
          <GlassPanel className="h-full">
            <h2 className="font-mono text-xs text-[#00E5FF] uppercase tracking-widest border-b border-[#1E2731] pb-3 mb-6">
              Send a Message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-5 font-mono text-sm">
              <div>
                <label className="block text-[#8B99A8] mb-2 text-xs uppercase">Your Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-[#0B0F14] border border-[#1E2731] focus:border-[#00E5FF] p-3 text-[#E6EDF3] focus:outline-none rounded-sm transition-colors" 
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-[#8B99A8] mb-2 text-xs uppercase">Your Email</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-[#0B0F14] border border-[#1E2731] focus:border-[#00E5FF] p-3 text-[#E6EDF3] focus:outline-none rounded-sm transition-colors" 
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-[#8B99A8] mb-2 text-xs uppercase">Message</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-[#0B0F14] border border-[#1E2731] focus:border-[#00E5FF] p-3 text-[#E6EDF3] focus:outline-none resize-none rounded-sm transition-colors" 
                  placeholder="Write your message here..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={status !== "idle"}
                className={`w-full py-3 flex items-center justify-center gap-2 uppercase tracking-widest font-bold font-heading rounded-sm transition-all ${
                  status === "idle" ? "bg-[#00E5FF] text-black hover:bg-[#00E5FF]/80" :
                  status === "sending" ? "bg-[#FFB800] text-black cursor-wait" :
                  "bg-[#00FF88] text-black cursor-default"
                }`}
              >
                {status === "idle" && <><Send className="w-4 h-4" /> Send Message</>}
                {status === "sending" && <span>Sending Message...</span>}
                {status === "sent" && <>MESSAGE SENT SUCCESSFULLY!</>}
              </button>
            </form>
          </GlassPanel>
        </SectionReveal>

      </div>
    </div>
  );
}
