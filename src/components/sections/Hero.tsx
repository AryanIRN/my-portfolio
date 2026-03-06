"use client";
import { motion } from "framer-motion";
import { HeroBackground } from "../ui/HeroBackground";
import { useScramble } from "@/hooks/use-scramble";
import { Download } from "lucide-react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

export const Hero = () => {
  const { displayText: firstName, scramble: scrambleFirst } = useScramble("ARYAN");
  const { displayText: lastName, scramble: scrambleLast } = useScramble("IMANIPOUR");

  const downloadPDF = async () => {
    // Zoek nu naar beide pagina's
    const page1 = document.getElementById("cv-page-1");
    const page2 = document.getElementById("cv-page-2");

    if (!page1 || !page2) {
      console.error("CV elementen niet gevonden! Zorg dat PrintableCV.tsx goed is geüpdatet.");
      return;
    }

    try {
      console.log("PDF genereren gestart...");

      // Maak ze héél even zichtbaar
      page1.parentElement!.style.opacity = "1";

      const imageOptions = {
        quality: 1.0,
        pixelRatio: 2, // 2 = HD kwaliteit
        backgroundColor: '#ffffff'
      };

      // Maak screenshots van beide pagina's
      const dataUrl1 = await toPng(page1, imageOptions);
      const dataUrl2 = await toPng(page2, imageOptions);

      // Verberg ze direct weer
      page1.parentElement!.style.opacity = "0";

      // Maak een A4 PDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Plak Pagina 1
      pdf.addImage(dataUrl1, "PNG", 0, 0, pdfWidth, pdfHeight);

      // Voeg een nieuwe pagina toe en plak Pagina 2
      pdf.addPage();
      pdf.addImage(dataUrl2, "PNG", 0, 0, pdfWidth, pdfHeight);

      // Sla op
      pdf.save("Aryan_Imanipour_CV.pdf");

      console.log("PDF succesvol gedownload!");
    } catch (error) {
      console.error("Er ging iets mis met het genereren van de PDF:", error);
      if (page1 && page1.parentElement) page1.parentElement.style.opacity = "0";
    }
  };

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      <HeroBackground />

      <div className="container px-4 md:px-6 z-10 text-center select-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter text-white uppercase italic leading-none w-full break-words">
            <span onMouseEnter={scrambleFirst} className="cursor-default inline-block">{firstName}</span>
            <br />
            <span
              onMouseEnter={scrambleLast}
              className="text-outline-white text-transparent cursor-default inline-block max-w-[90vw] overflow-hidden text-ellipsis"
            >
              {lastName}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-6 text-gray-400 text-sm md:text-lg tracking-[0.3em] uppercase mb-8"
          >
            STATUS: SECURING_THE_DIGITAL_FRONTIER
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            onClick={downloadPDF}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/50 rounded-full text-white font-mono uppercase tracking-widest text-sm transition-all overflow-hidden cursor-pointer"
          >
            <div className="absolute inset-0 bg-blue-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative z-10">Download Resume</span>
            <Download size={18} className="relative z-10 text-blue-400 group-hover:-translate-y-1 transition-transform duration-300" />
          </motion.button>
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