"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { EDUCATION } from "@/constants";
import { GraduationCap, BookOpen, Layers } from "lucide-react";
import React, { useEffect, useState } from "react";

// De veilige 3D Tilt Wrapper
const CardWrapper = ({ children }: { children: React.ReactNode }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

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
        style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
        className="h-full w-full"
      >
        {children}
      </div>
    </motion.div>
  );
};

export const Education = () => {
  return (
    <section id="education" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        className="mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase text-white">
          Academische <span className="text-outline-white text-transparent">Fundering</span>
        </h2>
        <div className="h-1 w-16 bg-blue-500 mt-4" />
      </motion.div>

      <div className="grid grid-cols-1 gap-12 perspective-1000">
        {EDUCATION.map((edu, i) => (
          <CardWrapper key={i}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }} // Tip: amount verlaagd naar 0.2 zodat hij op mobiel sneller in beeld komt
              transition={{ delay: i * 0.1 }}
              className="group relative bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 lg:p-12 overflow-hidden flex flex-col"
            >
              {/* Koptekst: Instituut & Opleiding */}
              <div
                style={{ transform: "translateZ(40px)" }}
                className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 border-b border-white/5 pb-8"
              >
                <div>
                  <div className="flex items-center gap-3 text-blue-400 mb-3">
                    <GraduationCap size={28} />
                    <span className="text-sm font-mono tracking-widest uppercase">{edu.institution}</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white leading-snug mb-2">
                    {edu.degree}
                  </h3>
                  <p className="text-xl text-gray-300 font-light">
                    {edu.specialization}
                  </p>
                </div>

                <div className="shrink-0">
                  <span className="inline-flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase px-3 py-1.5 rounded-full border text-green-400 bg-green-500/10 border-green-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    {edu.period}
                  </span>
                </div>
              </div>

              {/* Beschrijving & Tech Stack */}
              <div
                style={{ transform: "translateZ(30px)" }}
                className="mb-10"
              >
                <p className="text-gray-400 text-lg leading-relaxed mb-6 max-w-4xl">
                  {edu.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {edu.tech.map((t) => (
                    <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-gray-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Vakken / Modules Grid */}
              <div
                style={{ transform: "translateZ(50px)" }}
              >
                <h4 className="text-sm font-mono tracking-widest uppercase text-blue-500 mb-6 flex items-center gap-2">
                  <Layers size={16} /> Kernvakken
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {edu.courses.map((course, idx) => (
                    <div key={idx} className="bg-white/5 border border-white/5 p-6 rounded-2xl hover:bg-white/10 transition-colors">
                      <h5 className="text-white font-bold mb-3 flex items-start gap-3">
                        <BookOpen size={18} className="text-blue-400 shrink-0 mt-0.5" />
                        {course.name}
                      </h5>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {course.details}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </CardWrapper>
        ))}
      </div>
    </section>
  );
};