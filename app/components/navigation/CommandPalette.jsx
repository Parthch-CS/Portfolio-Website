"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { Search, Terminal, FileText, User, LayoutGrid, Award, Mail } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const COMMANDS = [
  { id: "home", name: "Home", path: "/#", icon: Terminal, category: "Navigation" },
  { id: "about", name: "About", path: "/#about", icon: User, category: "Navigation" },
  { id: "projects", name: "Projects", path: "/#projects", icon: FileText, category: "Navigation" },
  { id: "writeups", name: "Blog", path: "/#writeups", icon: Terminal, category: "Navigation" },
  { id: "skills", name: "Skills", path: "/#skills", icon: LayoutGrid, category: "Navigation" },
  { id: "certs", name: "Certifications", path: "/#certifications", icon: Award, category: "Navigation" },
  { id: "contact", name: "Contact", path: "/#contact", icon: Mail, category: "Navigation" },
];

export default function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef(null);

  const fuse = new Fuse(COMMANDS, {
    keys: ["name", "category"],
    threshold: 0.3,
  });

  const results = query ? fuse.search(query).map((r) => r.item) : COMMANDS;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        isOpen ? onClose() : isOpen; // Wait, we can't toggle from here if it's managed by Navbar
        // But the navbar sets state. We rely on navbar to toggle it to true, we can only close it.
      }
      
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % results.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
      } else if (e.key === "Enter" && results[selectedIndex]) {
        e.preventDefault();
        router.push(results[selectedIndex].path);
        onClose();
        setQuery("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose, router]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    }
  }, [isOpen, query]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#0B0F14]/60 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="relative w-full max-w-lg bg-[#121821] border border-[#1E2731] shadow-2xl rounded-xl overflow-hidden glass-panel"
        >
          <div className="flex items-center px-4 py-3 border-b border-[#1E2731]">
            <Search className="w-5 h-5 text-[#8B99A8]" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search commands... (e.g. 'skills', 'about')"
              className="w-full bg-transparent border-none text-[#E6EDF3] placeholder-[#8B99A8] ml-3 focus:outline-none font-mono text-sm"
            />
            <span className="text-xs font-mono text-[#8B99A8] border border-[#1E2731] px-1.5 py-0.5 rounded">
              ESC
            </span>
          </div>

          <div className="max-h-72 overflow-y-auto py-2">
            {results.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm font-mono text-[#8B99A8]">
                No commands found.
              </div>
            ) : (
              results.map((cmd, index) => {
                const isSelected = index === selectedIndex;
                const Icon = cmd.icon;
                return (
                  <div
                    key={cmd.id}
                    onMouseEnter={() => setSelectedIndex(index)}
                    onClick={() => {
                      router.push(cmd.path);
                      onClose();
                      setQuery("");
                    }}
                    className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer font-mono text-sm transition-colors ${
                      isSelected ? "bg-[#1E2731] text-[#00E5FF]" : "text-[#8B99A8] hover:bg-[#1E2731]/50"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isSelected ? "text-[#00E5FF]" : "text-[#8B99A8]"}`} />
                    <span>{cmd.name}</span>
                    <span className="ml-auto text-xs opacity-50">{cmd.category}</span>
                  </div>
                );
              })
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
