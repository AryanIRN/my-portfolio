import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: 'export',     // Dit is de magie voor GitHub Pages
  images: {
    unoptimized: true, // GitHub Pages kan je plaatjes niet on-the-fly verkleinen
  },
};

export default nextConfig;