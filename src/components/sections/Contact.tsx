"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Copy, CheckCircle2 } from "lucide-react";

export const Contact = () => {
  const [time, setTime] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString("nl-NL", { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("aryanimanipours@gmail.com"); // Verander naar jouw echte mail
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-20 px-6 border-t border-white/10 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">

          <div>
            {/* Status aangepast naar oranje en 'At Capacity' */}
            <p className="text-amber-500 font-mono text-sm tracking-[0.3em] uppercase mb-6 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              Status: At Capacity // Currently Deployed
            </p>
            <h2 className="text-7xl md:text-[10rem] font-black tracking-tighter leading-none uppercase">
              Secure <br /> <span className="text-outline-white text-transparent">Channel</span>
            </h2>
          </div>

          <div className="flex flex-col gap-4 w-full lg:w-auto">
            {/* Strakke knop: 
              - whileTap={scale: 0.95} zorgt voor een klik-effect
              - hover effecten blijven werken, maar hij vliegt niet meer weg
            */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={copyEmail}
              className="group w-full lg:w-auto relative px-8 py-5 bg-[#0a0a0a] border border-white/10 text-white rounded-2xl font-mono text-sm uppercase tracking-widest overflow-hidden hover:border-blue-500/50 transition-colors"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                {copied ? <CheckCircle2 size={18} className="text-blue-400" /> : <Copy size={18} />}
                {copied ? "ADDRESS SECURED" : "COPY_EMAIL_ADDRESS"}
              </span>

              {/* Animatie voor de achtergrondkleur van de knop */}
              <motion.div
                className="absolute inset-0 bg-blue-600/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"
              />
            </motion.button>

            {/* Aangepaste waarschuwing (zonder PGP) */}
            <p className="text-gray-500 text-xs font-mono text-center lg:text-right mt-2">
              Note: Expect delayed response times due to current deployment.
            </p>
          </div>
        </div>

        <div className="mt-32 flex flex-col md:flex-row justify-between pt-8 border-t border-white/5 text-gray-500 text-xs font-mono tracking-widest uppercase">
          <div className="flex flex-col md:flex-row gap-10">
            <div>
              <p className="mb-2 opacity-40">Location_Node</p>
              <p className="text-white">NL // {time}</p>
            </div>
            <div>
              <p className="mb-2 opacity-40">Encrypted_Comms</p>
              <div className="flex gap-6">
                <a href="https://www.linkedin.com/in/aryan-imanipour-951763213" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors">LinkedIn</a>
              </div>
            </div>
          </div>
          <p className="mt-10 md:mt-0 opacity-40">SYS.VER 1.0.0 // © 2026 IMANIPOUR</p>
        </div>
      </div>
    </section>
  );
};