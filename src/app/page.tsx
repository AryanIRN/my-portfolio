import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Education } from "@/components/sections/Education";
import { TechStack } from "@/components/sections/TechStack";
import { Credentials } from "@/components/sections/Credentials";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";
import { CustomCursor } from "@/components/ui/CustomCursor";

export default function Home() {
  return (
    <main className="relative noise">
      <CustomCursor />

      <Hero />
      <About />
      <Education />
      <TechStack />
      <Credentials />
      <Projects />
      <Contact />
    </main>
  );
}