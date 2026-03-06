"use client";
import { motion } from "framer-motion";
import { HeroBackground } from "../ui/HeroBackground";
import { useScramble } from "@/hooks/use-scramble";

export const Hero = () => {
  const { displayText: firstName, scramble: scrambleFirst } = useScramble("ARYAN");
  const { displayText: lastName, scramble: scrambleLast } = useScramble("IMANIPOUR");

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      <HeroBackground />
      
      <div className="container px-4 md:px-6 z-10 text-center select-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white uppercase italic leading-none">
            <span onMouseEnter={scrambleFirst} className="cursor-default inline-block">{firstName}</span> 
            <br />
            <span 
              onMouseEnter={scrambleLast}
              className="text-outline-white text-transparent cursor-default inline-block"
            >
              {lastName}
            </span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-6 text-gray-400 text-sm md:text-lg tracking-[0.3em] uppercase"
          >
            STATUS: SECURING_THE_DIGITAL_FRONTIER
          </motion.p>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[1px] h-12 bg-gradient-to-b from-white to-transparent"
      />
    </section>
  );
};