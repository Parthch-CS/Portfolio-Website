"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X, ShieldAlert } from "lucide-react";
import CommandPalette from "./CommandPalette";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Scroll spy logic
      const sections = ["about", "projects", "writeups", "skills", "certifications", "contact"];
      let current = "home";
      
      const reversedSections = [...sections].reverse();
      for (const section of reversedSections) {
        const element = document.getElementById(section);
        // Trigger active state when section is 1/3 down the viewport
        if (element && window.scrollY >= (element.offsetTop - window.innerHeight / 3)) {
          current = section;
          break;
        }
      }
      setActiveSection(current);
    };
    
    // Initial check
    handleScroll();
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/#", id: "home" },
    { name: "About", path: "/#about", id: "about" },
    { name: "Projects", path: "/#projects", id: "projects" },
    { name: "Blog", path: "/#writeups", id: "writeups" },
    { name: "Skills", path: "/#skills", id: "skills" },
    { name: "Certs", path: "/#certifications", id: "certifications" },
    { name: "Contact", path: "/#contact", id: "contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0B0F14]/80 backdrop-blur-md border-b border-[#1E2731] py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group text-[#E6EDF3] hover:text-[#00E5FF] transition-colors"
          >
            <ShieldAlert className="w-6 h-6 text-[#00E5FF] group-hover:glitch-hover" />
            <span className="font-heading font-bold tracking-widest uppercase text-sm sm:text-base">
              PARTH CHOURIHA
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`text-xs uppercase font-mono tracking-wider transition-all hover:text-[#00E5FF] ${
                  activeSection === link.id ? "text-[#00E5FF] border-b border-[#00E5FF] pb-1 font-semibold" : "text-[#8B99A8]"
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Command Palette Trigger */}
            <button
              onClick={() => setIsPaletteOpen(true)}
              className="flex items-center gap-2 ml-4 px-3 py-1.5 rounded-sm bg-[#121821] border border-[#1E2731] text-xs text-[#8B99A8] hover:border-[#00E5FF] hover:text-[#E6EDF3] transition-all"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Cmd K</span>
            </button>
          </nav>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <button onClick={() => setIsPaletteOpen(true)} className="text-[#8B99A8]">
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#E6EDF3] p-1"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#0B0F14]/95 backdrop-blur-xl pt-24 px-6 md:hidden flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-lg uppercase font-heading tracking-widest ${
                activeSection === link.id ? "text-[#00E5FF] border-l-2 border-[#00E5FF] pl-2" : "text-[#E6EDF3]"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}

      {/* Command Palette Modal */}
      <CommandPalette isOpen={isPaletteOpen} onClose={() => setIsPaletteOpen(false)} />
    </>
  );
}
