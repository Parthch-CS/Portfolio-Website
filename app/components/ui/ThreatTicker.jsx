"use client";

import { useState, useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

// Stub data for CVEs
const MOCK_CVES = [
  { id: "CVE-2026-10294", severity: "CRITICAL", desc: "Remote Code Execution in Enterprise VPN" },
  { id: "CVE-2026-11482", severity: "HIGH", desc: "Authentication Bypass in Cloud Auth Agent" },
  { id: "CVE-2026-09211", severity: "MEDIUM", desc: "Information Disclosure in IoT Firmware" },
];

export default function ThreatTicker() {
  const [cves, setCves] = useState([]);

  useEffect(() => {
    // In a real app, fetch from NVD API here. Stubbing for now.
    setCves(MOCK_CVES);
  }, []);

  if (!cves.length) return null;

  return (
    <div className="w-full bg-[#121821] border-y border-[#1E2731] overflow-hidden py-1.5 flex items-center">
      <div className="px-4 bg-[#00E5FF] text-black text-xs font-bold font-heading uppercase tracking-widest flex items-center gap-2 h-full z-10 shrink-0">
        <AlertTriangle className="w-3.5 h-3.5" />
        Live Threats
      </div>
      <div className="flex-1 overflow-hidden relative">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="whitespace-nowrap flex items-center gap-8 px-4 text-xs font-mono"
        >
          {/* Duplicate the array to create a seamless looping effect */}
          {[...cves, ...cves, ...cves].map((cve, i) => (
            <div key={i} className="flex items-center gap-2">
              <span
                className={`${
                  cve.severity === "CRITICAL"
                    ? "text-[#FF3B3B]"
                    : cve.severity === "HIGH"
                    ? "text-[#FFB800]"
                    : "text-[#00E5FF]"
                } font-bold`}
              >
                [{cve.id}]
              </span>
              <span className="text-[#8B99A8]">{cve.desc}</span>
              <span className="mx-4 text-[#1E2731]">/</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
