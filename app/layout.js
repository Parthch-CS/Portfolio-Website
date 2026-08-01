import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import Navbar from "./components/navigation/Navbar";
import UptimeCounter from "./components/ui/UptimeCounter";
import MatrixBackground from "./components/ui/MatrixBackground";
import TerminalWidget from "./components/ui/TerminalWidget";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata = {
  title: "Operator Profile | SOC Dashboard",
  description: "Live Operations Center Portfolio — Cybersecurity & Dev",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="antialiased text-[#E6EDF3] bg-[#0B0F14] selection:bg-[#00E5FF] selection:text-black overflow-x-hidden">
        <MatrixBackground />
        <div className="crt-overlay" aria-hidden="true" />
        <div className="crt-bloom" aria-hidden="true" />
        
        <div className="relative z-10 min-h-screen flex flex-col pt-20 sm:pt-24">
          <Navbar />
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 pb-20">
            {children}
          </main>
          
          <footer className="mt-auto border-t border-[#1E2731] bg-[#0B0F14]/90 py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-xs font-mono text-[#8B99A8]">
              &copy; {new Date().getFullYear()} Parth Chouriha. Built with Next.js & React. All Rights Reserved.
            </div>
          </footer>
        </div>
        
        <TerminalWidget />
      </body>
    </html>
  );
}
