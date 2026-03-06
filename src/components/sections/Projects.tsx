"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { PROJECTS } from "@/constants";
import { ExternalLink } from "lucide-react";
import React, { useEffect, useState } from "react";

// De veilige 3D Tilt Wrapper
const ProjectCard = ({ children }: { children: React.ReactNode }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Checkt of het apparaat touch ondersteunt of geen hover heeft
    const checkTouch = () => {
      setIsTouchDevice(window.matchMedia("(hover: none) and (pointer: coarse)").matches);
    };

    checkTouch();
    window.addEventListener("resize", checkTouch);
    return () => window.removeEventListener("resize", checkTouch);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) return;
    x.set(0);
    y.set(0);
  };

  // Voorkom Next.js hydration errors: render een simpele div totdat de client geladen is
  if (!isMounted) {
    return (
      <div className="relative w-full rounded-3xl">
        <div className="h-full w-full">
          {children}
        </div>
      </div>
    );
  }

  // Als het een touch device (mobiel) is, render de platte versie zonder 3D
  if (isTouchDevice) {
    return (
      <div className="relative w-full rounded-3xl">
        <div className="h-full w-full">
          {children}
        </div>
      </div>
    );
  }

  // De originele 3D container voor desktop
  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative w-full rounded-3xl"
    >
      <div
        style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}
        className="h-full w-full"
      >
        {children}
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  return (
    <section id="work" className="py-32 px-6 max-w-7xl mx-auto overflow-visible overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        className="mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-white">
          Architectuur <span className="text-outline-white text-transparent">&</span> Implementaties
        </h2>
        <div className="h-1 w-20 bg-blue-500 mt-4" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 perspective-1000">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={i}>
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }} // Ook hier amount verlaagd voor sneller laden op mobiel
              transition={{ delay: i * 0.1 }}
              className="group relative block h-full"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-[#0a0a0a] border border-white/10 shadow-2xl">
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover w-full h-full opacity-30 group-hover:scale-105 transition-transform duration-700 group-hover:opacity-50"
                />

                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end bg-gradient-to-t from-black/95 via-black/80 to-transparent group-hover:from-[#050b14]/95 transition-colors duration-500">
                  <div
                    style={{ transform: "translateZ(50px)" }}
                    // 'flex-wrap' en 'gap-2' stonden hier al, wat goed is,
                    // maar op mobiel was het misschien net te krap.
                    className="flex flex-wrap items-center gap-2 mb-4"
                  >
                    {project.tech.map((t) => (
                      <span key={t} className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 backdrop-blur-md rounded-full text-[10px] font-bold tracking-widest uppercase text-blue-400 whitespace-nowrap">
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3
                    style={{ transform: "translateZ(60px)" }}
                    className="text-2xl md:text-3xl font-bold flex items-center gap-2 text-white leading-tight"
                  >
                    {project.title} <ExternalLink size={20} className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500 shrink-0" />
                  </h3>
                  <p
                    style={{ transform: "translateZ(40px)" }}
                    className="text-gray-400 mt-3 text-sm md:text-base leading-relaxed line-clamp-3"
                  >
                    {project.description}
                  </p>
                </div>
              </div>
            </motion.a>
          </ProjectCard>
        ))}
      </div>
    </section>
  );
};