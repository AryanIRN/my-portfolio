"use client";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { Database, ShieldAlert, Box, Network, Terminal, HardDrive, Code2, TerminalSquare, Save, Lock, AlertTriangle, Key, Activity } from "lucide-react";
import React, { useRef, useState } from "react";

const iconMap: Record<string, React.ReactNode> = {
  "Database": <Database size={20} />,
  "ShieldAlert": <ShieldAlert size={20} />,
  "Box": <Box size={20} />,
  "Network": <Network size={20} />,
  "Terminal": <Terminal size={20} />,
  "HardDrive": <HardDrive size={20} />,
  "Code2": <Code2 size={20} />,
  "TerminalSquare": <TerminalSquare size={20} />,
  "Save": <Save size={20} />,
  "Lock": <Lock size={20} />,
  "AlertTriangle": <AlertTriangle size={20} />,
  "Key": <Key size={20} />,
  "Activity": <Activity size={20} />
};

export const TECH_SKILLS = [
  { name: "Routers & Switches", icon: "Network", color: "text-blue-400" },
  { name: "Docker", icon: "Box", color: "text-cyan-400" },
  { name: "Kubernetes", icon: "Box", color: "text-blue-500" },
  { name: "Linux", icon: "Terminal", color: "text-yellow-500" },
  { name: "MS SQL Server", icon: "Database", color: "text-red-400" },
  { name: "S3 Storage", icon: "HardDrive", color: "text-orange-500" },
  { name: "Python", icon: "Code2", color: "text-blue-300" },
  { name: "PowerShell", icon: "TerminalSquare", color: "text-blue-600" },
  { name: "Enterprise Backup", icon: "Save", color: "text-green-500" },
  { name: "Zero Trust", icon: "ShieldAlert", color: "text-purple-500" },
  { name: "SecDevOps", icon: "Lock", color: "text-blue-400" },
  { name: "Risk Management", icon: "AlertTriangle", color: "text-yellow-600" },
  { name: "EKM & Encryption", icon: "Key", color: "text-amber-500" },
  { name: "High Availability", icon: "Activity", color: "text-green-400" }
];

type Skill = typeof TECH_SKILLS[number];

const CarouselRow = ({
  items,
  direction = 1,
  speed = 80,
}: {
  items: Skill[];
  direction?: 1 | -1;
  speed?: number;
}) => {
  const innerRef = useRef<HTMLDivElement>(null);
  const baseX = useMotionValue(0);
  const [paused, setPaused] = useState(false);
  const pauseTimer = useRef<NodeJS.Timeout | null>(null);

  // 4x dupliceren zodat we altijd genoeg content hebben voor naadloze wrap
  const duplicatedItems = [...items, ...items, ...items, ...items];

  useAnimationFrame((_t, delta) => {
    if (paused) return;
    const inner = innerRef.current;
    if (!inner) return;

    // Breedte van 1 "set" = totale breedte / 4 (want 4x gedupliceerd)
    const singleSetWidth = inner.scrollWidth / 4;
    const moveBy = (speed * delta) / 1000; // pixels per ms -> pixels per frame

    let next = baseX.get() + moveBy * -direction;

    // Seamless wrap: spring alleen terug per exacte setWidth, nooit een sprong zichtbaar
    if (direction === 1 && next <= -singleSetWidth) next += singleSetWidth;
    if (direction === -1 && next >= 0) next -= singleSetWidth;

    baseX.set(next);
  });

  const pauseFor2Seconds = () => {
    if (pauseTimer.current) clearTimeout(pauseTimer.current);
    setPaused(true);
    pauseTimer.current = setTimeout(() => setPaused(false), 2000);
  };

  const handleDragStart = () => {
    if (pauseTimer.current) clearTimeout(pauseTimer.current);
    setPaused(true);
  };

  return (
    <div
      className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing"
      onMouseEnter={() => {
        if (pauseTimer.current) clearTimeout(pauseTimer.current);
        setPaused(true);
      }}
      onMouseLeave={pauseFor2Seconds}
      onTouchStart={() => {
        if (pauseTimer.current) clearTimeout(pauseTimer.current);
        setPaused(true);
      }}
      onTouchEnd={pauseFor2Seconds}
    >
      <motion.div
        ref={innerRef}
        className="flex gap-6 items-center flex-nowrap w-max py-4"
        style={{ x: baseX }}
        drag="x"
        dragMomentum={false}
        dragConstraints={{ left: -10000, right: 10000 }}
        dragElastic={0}
        onDragStart={handleDragStart}
        onDrag={(_e, info) => {
          // Voeg de drag delta toe aan de x positie
          baseX.set(baseX.get() + info.delta.x);
        }}
        onDragEnd={pauseFor2Seconds}
      >
        {duplicatedItems.map((skill, idx) => (
          <div
            key={`${skill.name}-${idx}`}
            className="flex items-center gap-3 bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-4 hover:border-blue-500/50 hover:bg-white/5 transition-colors cursor-crosshair group/item select-none shrink-0"
          >
            <div className={`${skill.color} opacity-80 group-hover/item:opacity-100 transition-opacity`}>
              {iconMap[skill.icon]}
            </div>
            <span className="text-white font-mono text-sm tracking-widest uppercase">
              {skill.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export const TechStack = () => {
  const half = Math.ceil(TECH_SKILLS.length / 2);
  const row1 = TECH_SKILLS.slice(0, half);
  const row2 = TECH_SKILLS.slice(half);

  return (
    <section id="techstack" className="py-24 border-t border-white/5 relative overflow-hidden bg-black/50">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[200px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase text-white">
            Technologisch <span className="text-outline-white text-transparent">Arsenaal</span>
          </h2>
          <div className="h-1 w-16 bg-blue-500 mt-4" />
        </motion.div>
      </div>

      <div className="relative w-full flex flex-col gap-6">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />

        <CarouselRow items={row1} direction={1} speed={80} />
        <CarouselRow items={row2} direction={-1} speed={65} />
      </div>
    </section>
  );
};
