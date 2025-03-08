/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

import GitHubStats from "@/components/GitHubStats";
// import Scene from "@/components/3d/Scene";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import HeroSection from "@/components/hero-section";
import Projects from "./projects/page";
import Skills from "./skills/page";
import Experience from "./education/page";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef(null);

  useEffect(() => {
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
      <section className="hero-gradient min-h-screen flex items-center justify-center relative overflow-hidden">
     

        <HeroSection/>
        
      </section>

      {/* <section className="stats-section section-padding bg-gradient-to-b from-background to-accent/20">
        <div className="max-w-7xl mx-auto">
          <motion.h2 className="text-3xl font-bold mb-8 text-center gradient-text">
            GitHub Activity
          </motion.h2>
          <GitHubStats />
        </div>
      </section> */}
      <Experience/>
        <Skills/>
        
        <Projects/>
    </div>
  );
}