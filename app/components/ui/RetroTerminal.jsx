"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Square } from "lucide-react";

export default function RetroTerminal({ isOpen, onClose }) {
  const [history, setHistory] = useState([
    "Type 'help' to see available commands.",
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const endRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const newHistory = [...history, `C:\\> ${input}`];

    switch (cmd) {
      case "help":
        newHistory.push(
          "Commands:",
          "  whoami   - Display current user info",
          "  clear    - Clear terminal",
          "  contact  - Get communication secure channel",
          "  exit     - Close this terminal"
        );
        break;
      case "whoami":
        newHistory.push("guest@soc-dashboard (clearance level: standard)");
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      case "contact":
        newHistory.push("Navigating to secure channel...");
        window.location.href = "/contact";
        break;
      case "exit":
        onClose();
        setInput("");
        return;
      default:
        newHistory.push(`'${cmd}' is not recognized as an internal or external command.`);
    }

    setHistory(newHistory);
    setInput("");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        drag
        dragMomentum={false}
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 50 }}
        className="fixed bottom-24 right-6 w-80 sm:w-96 shadow-2xl z-50 flex flex-col overflow-hidden"
        style={{ touchAction: "none" }}
      >
        {/* Windows 98 Style Header */}
        <div className="bg-gradient-to-r from-[#000080] to-[#1084d0] text-white px-2 py-1 flex justify-between items-center cursor-move border-t-2 border-l-2 border-r-2 border-t-[#ffffff] border-l-[#ffffff] border-r-[#000000] border-b-2 border-b-[#000000]">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#c0c0c0] border border-[#808080] shadow-[inset_1px_1px_#ffffff]"></div>
            <span className="font-sans text-xs font-bold truncate">Command Prompt</span>
          </div>
          <div className="flex items-center gap-1">
            <button className="bg-[#c0c0c0] text-black w-4 h-4 flex items-center justify-center border-t border-l border-[#ffffff] border-b border-r border-[#000000] active:border-t-[#000000] active:border-l-[#000000] active:border-b-[#ffffff] active:border-r-[#ffffff]">
              <Minus className="w-3 h-3" />
            </button>
            <button className="bg-[#c0c0c0] text-black w-4 h-4 flex items-center justify-center border-t border-l border-[#ffffff] border-b border-r border-[#000000] active:border-t-[#000000] active:border-l-[#000000] active:border-b-[#ffffff] active:border-r-[#ffffff]">
              <Square className="w-2.5 h-2.5" />
            </button>
            <button 
              onClick={onClose}
              className="bg-[#c0c0c0] text-black w-4 h-4 flex items-center justify-center border-t border-l border-[#ffffff] border-b border-r border-[#000000] active:border-t-[#000000] active:border-l-[#000000] active:border-b-[#ffffff] active:border-r-[#ffffff]"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div 
          className="bg-black text-[#c0c0c0] font-mono text-xs p-2 h-64 overflow-y-auto border-l-2 border-b-2 border-r-2 border-l-[#808080] border-b-[#ffffff] border-r-[#ffffff]"
          onClick={() => inputRef.current?.focus()}
        >
          <div className="mb-4">
            Microsoft(R) Windows DOS<br/>
            (C)Copyright Microsoft Corp 1990-2001.
          </div>
          
          {history.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap">{line}</div>
          ))}
          
          <form onSubmit={handleCommand} className="flex">
            <span className="mr-1">C:\&gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent text-[#c0c0c0] outline-none"
              spellCheck={false}
              autoComplete="off"
            />
          </form>
          <div ref={endRef} />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
