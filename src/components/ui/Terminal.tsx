"use client";
import { motion } from "framer-motion";

export const Terminal = () => {
  const commands = [
    "imanipour@security:~$ nmap -sV target_infrastructure",
    "Scanning for vulnerabilities...",
    "Critical assets identified: 42",
    "Applying Zero Trust Architecture...",
    "Status: PROTECTED",
  ];

  return (
    <div className="bg-neutral-900/50 border border-white/10 rounded-lg p-4 font-mono text-sm md:text-base text-green-500 shadow-2xl">
      <div className="flex gap-2 mb-4 border-b border-white/5 pb-2">
        <div className="w-3 h-3 rounded-full bg-red-500/50" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
        <div className="w-3 h-3 rounded-full bg-green-500/50" />
      </div>
      <div className="space-y-2">
        {commands.map((cmd, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.4 }}
          >
            <span className="text-white/30 mr-2">{">"}</span> {cmd}
          </motion.p>
        ))}
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-2 h-4 bg-green-500 ml-1 translate-y-1"
        />
      </div>
    </div>
  );
};