import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "export",       // Exporteer als statische HTML
  images: {
    unoptimized: true,    // GitHub Pages kan Next.js image optimization niet draaien
  },
  // basePath: "/my-portfolio", // Zet dit aan als je repo NIET heet AryanIRN.github.io maar bijv. my-portfolio
};

export default nextConfig;
