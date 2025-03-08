"use client"

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectCard from '@/components/ProjectCard';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce platform with real-time inventory management",
    technologies: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "Stripe"],
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com"
  },
  {
    id: 2,
    title: "AI Chat Application",
    description: "Real-time chat application with AI-powered responses and voice recognition",
    technologies: ["React", "Node.js", "OpenAI", "WebSocket", "TensorFlow.js"],
    image: "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?q=80&w=1000",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com"
  },
  {
    id: 3,
    title: "Task Management System",
    description: "Collaborative task management with real-time updates and analytics",
    technologies: ["Vue.js", "Firebase", "Tailwind CSS", "Chart.js", "PWA"],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com"
  },
  {
    id: 4,
    title: "3D Portfolio Visualizer",
    description: "Interactive 3D visualization of project statistics and contributions",
    technologies: ["Three.js", "React Three Fiber", "GSAP", "WebGL", "TypeScript"],
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=1000",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com"
  }
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".project-grid", {
        opacity: 0,
        y: 100,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".project-grid",
          start: "top bottom-=100",
          end: "top center",
          toggleActions: "play none none reverse"
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen pt-20 pb-20" id='projects'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4 gradient-text">
            Featured Projects
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore my latest work showcasing innovative solutions and technical expertise
          </p>
        </motion.div>

        <div className="project-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}