"use client";

import { useState, useEffect } from "react";

export default function UptimeCounter({ buildTime }) {
  const [uptime, setUptime] = useState("");

  useEffect(() => {
    // In a real scenario, buildTime would be injected during build.
    // We'll use a hardcoded past date for effect if none provided.
    const start = buildTime || new Date(Date.now() - 1000 * 60 * 60 * 24 * 3 - 4520000).getTime();

    const updateUptime = () => {
      const now = Date.now();
      const diff = now - start;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / 1000 / 60) % 60);
      const secs = Math.floor((diff / 1000) % 60);

      setUptime(`${days}d ${hours.toString().padStart(2, "0")}h ${mins.toString().padStart(2, "0")}m ${secs.toString().padStart(2, "0")}s`);
    };

    updateUptime();
    const interval = setInterval(updateUptime, 1000);
    return () => clearInterval(interval);
  }, [buildTime]);

  return <span>{uptime}</span>;
}
