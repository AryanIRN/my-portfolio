"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { PROJECTS } from "@/constants";
import { ExternalLink } from "lucide-react";
import React from "react";

// De 3D Tilt Wrapper
const ProjectCard = ({ children }: { children: React.ReactNode }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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
    x.set(0);
    y.set(0);
  };

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
        {/* Titel aangepast voor een sterkere, professionele uitstraling */}
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
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: i * 0.1 }}
              className="group relative block h-full"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-[#0a0a0a] border border-white/10 shadow-2xl">
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover w-full h-full opacity-30 group-hover:scale-105 transition-transform duration-700 group-hover:opacity-50"
                />

                {/* Overlay content met een subtiele blauwe gloed op hover */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end bg-gradient-to-t from-black/95 via-black/80 to-transparent group-hover:from-[#050b14]/95 transition-colors duration-500">
                  <div
                    style={{ transform: "translateZ(50px)" }}
                    className="flex flex-wrap gap-2 mb-4"
                  >
                    {project.tech.map((t) => (
                      <span key={t} className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 backdrop-blur-md rounded-full text-[10px] font-bold tracking-widest uppercase text-blue-400">
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