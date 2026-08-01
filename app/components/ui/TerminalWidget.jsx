"use client";

import { useState } from "react";
import { Terminal } from "lucide-react";
import RetroTerminal from "./RetroTerminal";

export default function TerminalWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 bg-[#121821] border border-[#1E2731] p-3 rounded-full text-[#8B99A8] hover:text-[#00E5FF] hover:border-[#00E5FF] shadow-lg transition-all ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        aria-label="Open Terminal"
      >
        <Terminal className="w-5 h-5" />
      </button>

      <RetroTerminal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
