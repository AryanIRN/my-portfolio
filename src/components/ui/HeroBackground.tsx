"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useEffect } from "react";

export const HeroBackground = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const springConfig = { damping: 30, stiffness: 200 };
  const dx = useSpring(mouseX, springConfig);
  const dy = useSpring(mouseY, springConfig);

  const background = useTransform(
    [dx, dy],
    ([x, y]) => `radial-gradient(450px circle at ${x}px ${y}px, rgba(255,255,255,0.08) 0%, transparent 80%), 
                 radial-gradient(150px circle at ${x}px ${y}px, rgba(255,255,255,0.15) 0%, transparent 100%)`
  );

  return (
    // FIXED zorgt dat het over je hele pagina blijft staan tijdens het scrollen
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black pointer-events-none">
      <div 
        className="absolute inset-0 opacity-[0.05]" 
        style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      
      <motion.div className="absolute inset-0 z-0" style={{ background }}>
        <div 
          className="absolute inset-0 opacity-40" 
          style={{
            backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </motion.div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
    </div>
  );
};