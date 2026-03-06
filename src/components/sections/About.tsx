"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Terminal } from "../ui/Terminal";

export const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "start 0.3"],
  });

  const description = "Als Security Analist met een ambitie voor architectuur, focus ik op het bouwen van robuuste systemen. Ik combineer technische diepgang met een strategische blik op veiligheid.";
  const words = description.split(" ");

  return (
    <section ref={containerRef} id="about" className="py-40 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Tekst Kant */}
        <div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-8">
            Visie op <span className="text-outline-white text-transparent">Security</span>
          </h2>
          <div className="flex flex-wrap text-2xl md:text-3xl font-bold tracking-tighter leading-tight text-white/90">
            {words.map((word, i) => {
              const start = i / words.length;
              const end = start + 1 / words.length;
              return (
                <Word key={i} range={[start, end]} progress={scrollYProgress}>
                  {word}
                </Word>
              );
            })}
          </div>
        </div>

        {/* Console Kant (De Terminal) */}
        <div className="sticky top-32">
          <Terminal />
        </div>
      </div>
    </section>
  );
};

const Word = ({ children, range, progress }: any) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return <span className="mr-2 inline-block"><motion.span style={{ opacity }}>{children}</motion.span></span>;
};