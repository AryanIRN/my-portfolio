"use client";
import { motion } from "framer-motion";
import { CERTIFICATIONS } from "@/constants";
import { ShieldCheck, Calendar } from "lucide-react";

export const Credentials = () => {
  return (
    <section id="credentials" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        className="mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase text-white">
          Certificaten <span className="text-outline-white text-transparent">Roadmap</span>
        </h2>
        <div className="h-1 w-16 bg-blue-500 mt-4" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CERTIFICATIONS.map((cert, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: i * 0.1 }}
            className="group relative bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-colors overflow-hidden flex flex-col"
          >
            {/* Achtergrond glow op hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2 text-blue-400">
                  <ShieldCheck size={24} className="opacity-80" />
                  <span className="text-xs font-mono tracking-widest uppercase">{cert.phase}</span>
                </div>
                <span className={`flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase px-2 py-1 rounded-full border ${cert.status === 'ACTIEF' ? 'text-green-400 bg-green-500/10 border-green-500/20' : cert.status === 'DOEL' ? 'text-purple-400 bg-purple-500/10 border-purple-500/20' : 'text-blue-400 bg-blue-500/10 border-blue-500/20'}`}>
                  {cert.status === 'ACTIEF' && <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />}
                  {cert.status}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white leading-snug mb-2">
                {cert.name}
              </h3>

              <div className="flex items-center gap-2 text-blue-200/50 text-xs font-mono uppercase tracking-widest mb-6">
                <Calendar size={14} />
                {cert.date}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};