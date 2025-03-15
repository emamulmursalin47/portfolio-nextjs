/* eslint-disable react/no-unescaped-entities */
"use client";
import { useEffect, useRef, type JSX } from "react";
// import Scene from "@/components/3d/Scene";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from "@/components/hero-section";
import Projects from "./projects/page";
import Skills from "./skills/page";
import Experience from "./education/page";
import Contact from "./contact/page";

gsap.registerPlugin(ScrollTrigger);

export default function Home(): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure containerRef.current exists before creating a GSAP context
    if (!containerRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.from(".hero-content", {
        opacity: 0,
        y: 100,
        duration: 1.5,
        ease: "power3.out",
      });

      gsap.from(".stats-section", {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: ".stats-section",
          start: "top center+=100",
          end: "bottom center",
          toggleActions: "play none none reverse",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen">
      {/* Hero Section */}
      <section id="home" className="min-h-screen pt-8">
        <HeroSection />
      </section>
      
      {/* Education/Experience Section */}
      <section id="education" className="min-h-screen py-8">
        <Experience />
      </section>
      
      {/* Skills Section */}
      <section id="skills" className="min-h-screen py-8">
        <Skills />
      </section>
      
      {/* Projects Section */}
      <section id="projects" className="min-h-screen py-8">
        <Projects />
      </section>
      <section id="contact" className="min-h-screen py-8">
        <Contact />
      </section>
    </div>
  );
}