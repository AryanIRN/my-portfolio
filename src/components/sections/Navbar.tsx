"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/constants";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <nav className="fixed top-6 inset-x-0 z-[50] flex justify-center px-4 md:px-0 pointer-events-none">

      <div className="w-full max-w-sm md:max-w-max relative pointer-events-auto">

        {/* De 'Pil' */}
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "flex items-center justify-between gap-6 md:gap-10 w-full",
            "bg-[#050505]/70 backdrop-blur-2xl border border-white/10 px-5 py-3 md:px-2 md:py-2 md:pr-2 md:pl-6 rounded-full",
            "shadow-[0_0_30px_rgba(0,0,0,0.4)]"
          )}
        >
          {/* Logo / Name */}
          <a href="/" className="text-white font-black tracking-tighter text-lg relative z-10 group">
            IMN<span className="text-blue-500/50 group-hover:text-blue-400 transition-colors">.</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors duration-200"
              >
                {hoveredIndex === index && (
                  <motion.span
                    layoutId="nav-hover-pill"
                    className="absolute inset-0 -z-10 bg-white/10 rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            ))}
          </div>

          {/* Mobiel Menu Toggle */}
          <button
            className="md:hidden text-white relative z-10 p-1 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </motion.div>

        {/* Mobile Menu Overlay - Clean en zonder dubbele contact knop */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, filter: "blur(10px)", scale: 0.95 }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
              exit={{ opacity: 0, y: -10, filter: "blur(10px)", scale: 0.95, transition: { duration: 0.2 } }}
              className="absolute top-full left-0 right-0 mt-3 bg-[#0a0a0a]/95 backdrop-blur-3xl border border-white/10 rounded-3xl p-6 flex flex-col gap-2 md:hidden shadow-2xl overflow-hidden origin-top"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-xl font-bold transition-colors py-3 border-b border-white/5 last:border-none",
                    link.name === "Contact"
                      ? "text-blue-400 hover:text-blue-300" // Maak de Contact link iets specialer in de lijst
                      : "text-white/70 hover:text-white"
                  )}
                >
                  {link.name}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </nav>
  );
};