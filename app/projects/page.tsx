/* eslint-disable @next/next/no-img-element */
"use client"

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

// Define TypeScript interfaces
interface ProjectTag {
  name: string;
  color?: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  demo: string;
}

const projects: Project[] = [
  {
    "id": "1",
    "title": "Online Donation Platform",
    "description": "A full-stack donation platform with real-time updates, secure payment gateway integration, and a responsive UI to facilitate seamless contributions.",
    "image": "https://res.cloudinary.com/dufs2ywc7/image/upload/v1741498920/Screenshot_2025-02-18_210952_qyagcc.png",
    "tags": ["React", "Node.js", "TypeScript", "TailwindCSS", "Payment Gateway Integration", "MongoDB", "ExpressJS", "Responsive Web Design"],
    "demo": "https://donation.atcacademy.online/"
  },
  {
    "id": "2",
    "title": "A Software Academy Website",
    "description": "An interactive and dynamic educational platform for ATC Soft Academy, providing course listings, enrollment features, and an intuitive UI/UX for students and instructors.",
    "image": "https://res.cloudinary.com/dufs2ywc7/image/upload/v1741498978/Screenshot_2025-02-18_211227_gdfd81.png",
    "tags": ["ReactJS", "MySQL", "TailwindCSS", "ExpressJS", "Framer Motion", "Node.js", "REST API"],
    "demo": "https://atcacademy.online/"
  },
  {
    "id": "3",
    "title": "Bajan Agro Farm",
    "description": "A modern farm management website for BAJAN Agro Farm, offering real-time inventory tracking, livestock management, and environmental monitoring for optimized operations.",
    "image": "https://res.cloudinary.com/dufs2ywc7/image/upload/v1741499029/Screenshot_2025-02-18_213645_pfoiob.png",
    "tags": ["ReactJS", "TailwindCSS", "Framer Motion", "NextJS", "Responsive Web Design"],
    "demo": "https://bajanagrofarm.vercel.app/"
  },
  {
    "id": "4",
    "title": "Cloth Processing System",
    "description": "A streamlined web application for managing cloth processing operations, including order tracking, inventory management, and automation for enhanced efficiency.",
    "image": "https://res.cloudinary.com/dufs2ywc7/image/upload/v1741499081/Screenshot_2025-02-18_214008_thcyhm.png",
    "tags": ["ReactJS", "TailwindCSS", "Framer Motion", "Node.js", "MongoDB", "ExpressJS"],
    "demo": "https://clothprocessingmanagement.vercel.app/"
  },
  {
    "id": "5",
    "title": "A Tech Company Portfolio",
    "description": "A sleek and modern portfolio website for a tech company, showcasing services, projects, and expertise with engaging animations and smooth navigation.",
    "image": "https://res.cloudinary.com/dufs2ywc7/image/upload/v1741499217/Screenshot_2025-02-18_214207_bva9f4.png",
    "tags": ["NextJS", "TailwindCSS", "Framer Motion", "GSAP", "React Three Fiber"],
    "demo": "https://arviontech.vercel.app/"
  },
  {
    "id": "6",
    "title": "Prize Bond Checker",
    "description": "A digital tool for checking prize bond results with a user-friendly interface, allowing users to verify winnings quickly and efficiently.",
    "image": "https://res.cloudinary.com/dufs2ywc7/image/upload/v1741499270/Screenshot_2025-02-11_174912_liwo9w.png",
    "tags": ["ReactJS", "TailwindCSS", "Framer Motion", "NextJS", "REST API Integration"],
    "demo": "https://prizebondchecker.vercel.app/"
  },
  
  {
    "id": "8",
    "title": "Probashi",
    "description": "A web platform designed to support expatriates, providing essential resources, community connections, and integration support for smoother transitions.",
    "image": "https://res.cloudinary.com/dufs2ywc7/image/upload/v1741499318/Screenshot_2025-02-18_213127_islqaq.png",
    "tags": ["ReactJS", "TailwindCSS", "Framer Motion", "NextJS", "MongoDB"],
    "github": "https://github.com/yourusername/probashi",
    "demo": "https://probashivi.netlify.app/"
  }
];

export default function Projects(): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const openProjectModal = (project: Project): void => {
    setSelectedProject(project);
    setCurrentIndex(projects.findIndex(p => p.id === project.id));
    setModalOpen(true);
  };

  const navigateProject = useCallback((direction: number): void => {
    const newIndex = (currentIndex + direction + projects.length) % projects.length;
    setCurrentIndex(newIndex);
    setSelectedProject(projects[newIndex]);
  });

  // Image preloading for smoother experience
  useEffect(() => {
    const preloadImages = async (): Promise<void> => {
      const imagePromises = projects.map((project) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.src = project.image;
          img.onload = () => resolve();
          img.onerror = () => resolve(); // Still resolve even on error to avoid blocking
        });
      });
      
      await Promise.all(imagePromises);
      setIsLoading(false);
    };
    
    preloadImages();
  }, []);

  // 3D card hover effect with GSAP
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>('.project-card');
    
    const handleCardHover = (e: MouseEvent): void => {
      const card = e.currentTarget as HTMLElement;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const xPercent = (x / rect.width - 0.5) * 20;
      const yPercent = (y / rect.height - 0.5) * 20;
      
      gsap.to(card, {
        rotationY: xPercent,
        rotationX: -yPercent,
        duration: 0.4,
        ease: "power2.out",
        transformPerspective: 1000,
        transformStyle: "preserve-3d"
      });
      
      // Add subtle shadow movement
      const cardContent = card.querySelector<HTMLElement>('.card-content');
      if (cardContent) {
        gsap.to(cardContent, {
          boxShadow: `${-xPercent}px ${-yPercent}px 20px rgba(0, 0, 0, 0.2)`,
          duration: 0.4
        });
      }
    };
    
    const resetCardPosition = (e: MouseEvent): void => {
      const card = e.currentTarget as HTMLElement;
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.7)"
      });
      
      const cardContent = card.querySelector<HTMLElement>('.card-content');
      if (cardContent) {
        gsap.to(cardContent, {
          boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
          duration: 0.7
        });
      }
    };

    cards.forEach(card => {
      card.addEventListener('mousemove', handleCardHover as EventListener);
      card.addEventListener('mouseleave', resetCardPosition as EventListener);
    });

    return () => {
      cards.forEach(card => {
        card.removeEventListener('mousemove', handleCardHover as EventListener);
        card.removeEventListener('mouseleave', resetCardPosition as EventListener);
      });
    };
  }, [isLoading]); // Only run after images are loaded

  // Optimized zipper animation with staggered reveal
  useEffect(() => {
    if (isLoading || !containerRef.current) return;
    
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.project-card');
      
      // Use a single timeline with staggered animations for better performance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".project-grid",
          start: "top bottom-=100",
          end: "center center",
          toggleActions: "play none none none",
          scrub: 0.5
        }
      });
      
      // Group cards by column position
      const leftCards: HTMLElement[] = [];
      const middleCards: HTMLElement[] = [];
      const rightCards: HTMLElement[] = [];
      
      cards.forEach((card, index) => {
        const colPosition = index % 3; // For 3 columns layout
        if (colPosition === 0) leftCards.push(card);
        else if (colPosition === 1) middleCards.push(card);
        else rightCards.push(card);
      });
      
      // Add left column animations
      tl.from(leftCards, {
        x: -100,
        y: 50,
        opacity: 0,
        rotationZ: -5,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        clearProps: "all"
      }, 0);
      
      // Add right column animations
      tl.from(rightCards, {
        x: 100,
        y: 50,
        opacity: 0,
        rotationZ: 5,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        clearProps: "all"
      }, 0);
      
      // Add middle column animations with delay
      tl.from(middleCards, {
        y: 70,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        clearProps: "all"
      }, 0.2);
      
      // Parallax effect for the heading - more subtle
      gsap.to(".section-heading", {
        y: -20,
        ease: "none",
        scrollTrigger: {
          trigger: "#projects",
          start: "top center",
          end: "bottom top",
          scrub: true
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isLoading]);

  // Custom 3D modal variants for framer-motion with improved physics
  const modalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      rotateX: 30,
      transformPerspective: 1200,
      y: 50
    },
    visible: { 
      opacity: 1,
      scale: 1,
      rotateX: 0,
      y: 0,
      transition: { 
        type: "spring",
        damping: 15,
        stiffness: 100,
        duration: 0.5
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      rotateX: -20,
      y: 30,
      transition: {
        duration: 0.4
      }
    }
  };

  // Handler for keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (!modalOpen) return;
      
      if (e.key === 'ArrowLeft') {
        navigateProject(-1);
      } else if (e.key === 'ArrowRight') {
        navigateProject(1);
      } else if (e.key === 'Escape') {
        setModalOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalOpen, navigateProject]);

  // Loading state for better UX
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-muted rounded-md mb-4"></div>
          <div className="h-4 w-96 bg-muted rounded-md"></div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen py-20 overflow-hidden bg-gradient-to-b from-background to-background/70" id="projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16 section-heading"
        >
          <h1 className="text-5xl font-bold mb-4 gradient-text relative inline-block">
            Featured Projects
            {/* <span className="absolute -z-10 w-full h-2 bg-primary/20 bottom-2 left-0 rounded-full"></span> */}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
            Explore my latest work showcasing innovative solutions and technical expertise
          </p>
        </motion.div>

        <div className="project-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className="project-card transform-gpu"
              onClick={() => openProjectModal(project)}
              role="button"
              tabIndex={0}
              aria-label={`View details for ${project.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  openProjectModal(project);
                }
              }}
            >
              <motion.div
                initial={{ opacity: 1 }} 
                whileHover={{ 
                  scale: 1.03,
                  transition: { duration: 0.3 }
                }}
                className="card-content relative rounded-xl overflow-hidden bg-card border border-border h-full cursor-pointer shadow-lg"
              >
                <div className="h-48 relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={`Preview of ${project.title}`} 
                    className="w-full h-full object-cover transition-all duration-700 hover:scale-110"
                    loading={index < 6 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 tracking-tight">{project.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag, i) => (
                      <span 
                        key={i} 
                        className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-2 py-1 rounded-full bg-secondary/20 text-secondary text-xs">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                  <motion.div 
                    className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"
                    whileHover={{ scale: 1.2, backgroundColor: "rgba(var(--primary), 0.2)" }}
                  >
                    <ChevronRight className="w-4 h-4 text-primary" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {modalOpen && selectedProject && (
          <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogContent className="max-w-4xl w-full bg-card p-0 overflow-hidden border-none">
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={modalVariants}
                className="relative rounded-xl"
              >
                <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden">
                  <motion.img 
                    src={selectedProject.image} 
                    alt={`Detailed view of ${selectedProject.title}`} 
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.1, filter: "blur(8px)" }}
                    animate={{ 
                      scale: 1,
                      filter: "blur(0px)",
                      transition: { duration: 0.6, delay: 0.1 }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                  
                  <motion.button 
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground border border-border z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateProject(-1);
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Previous project"
                  >
                    <ChevronLeft size={20} />
                  </motion.button>
                  
                  <motion.button 
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground border border-border z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateProject(1);
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Next project"
                  >
                    <ChevronRight size={20} />
                  </motion.button>
                </div>
                
                <div className="p-6 sm:p-8">
                  <DialogHeader>
                    <DialogTitle className="text-3xl font-bold">{selectedProject.title}</DialogTitle>
                  </DialogHeader>
                  
                  <div className="mt-6 space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      <h3 className="text-lg font-medium mb-2 text-foreground/80">Description</h3>
                      <p className="text-muted-foreground">{selectedProject.description}</p>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <h3 className="text-lg font-medium mb-2 text-foreground/80">Technologies</h3>
                      <motion.div 
                        className="flex flex-wrap gap-2"
                      >
                        {selectedProject.tags.map((tag, i) => (
                          <motion.span 
                            key={i} 
                            className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.4 + (i * 0.05) }}
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </motion.div>
                    </motion.div>
                    
                    <motion.div 
                      className="flex flex-wrap gap-4 pt-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      <motion.a 
                        href={selectedProject.demo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
                        whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(var(--primary), 0.3)" }}
                        whileTap={{ scale: 0.98 }}
                        aria-label={`View live demo of ${selectedProject.title}`}
                      >
                        <ExternalLink size={16} />
                        View Live Demo
                      </motion.a>
                      {selectedProject.github && (
                        <motion.a 
                          href={selectedProject.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="px-5 py-2.5 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors flex items-center gap-2"
                          whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(var(--secondary), 0.2)" }}
                          whileTap={{ scale: 0.98 }}
                          aria-label={`View source code for ${selectedProject.title}`}
                        >
                          <Github size={16} />
                          View Source Code
                        </motion.a>
                      )}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}