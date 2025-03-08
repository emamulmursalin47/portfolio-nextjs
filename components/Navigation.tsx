"use client"

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Home, Briefcase, GraduationCap, Github, Linkedin, Menu, X } from 'lucide-react';
import { SiHyperskill } from 'react-icons/si';

// Define types for navigation items
interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export default function Navigation(): JSX.Element {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 50);
      
      // Determine which section is currently in view
      const sections = document.querySelectorAll<HTMLElement>('section[id]');
      let currentSection = 'home';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100; // Offset for navbar
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          const id = section.getAttribute('id');
          if (id) currentSection = id;
        }
      });
      
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items with their section ids and icons
  const navItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-4 h-4 inline-block mr-1" /> },
    { id: 'projects', label: 'Projects', icon: <Briefcase className="w-4 h-4 inline-block mr-1" /> },
    { id: 'education', label: 'Experience', icon: <GraduationCap className="w-4 h-4 inline-block mr-1" /> },
    { id: 'skills', label: 'Skills & Expertise', icon: <SiHyperskill className="w-4 h-4 inline-block mr-1" /> }
  ];

  const toggleMobileMenu = (): void => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const scrollToSection = (sectionId: string): void => {
    const section = document.getElementById(sectionId);
    if (section) {
      // Close mobile menu if open
      setMobileMenuOpen(false);
      
      // Scroll to section
      window.scrollTo({
        top: section.offsetTop - 80, // Adjust offset as needed
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled || mobileMenuOpen ? 'bg-background/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button 
            onClick={() => scrollToSection('home')}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <Code className="w-8 h-8 text-primary" />
            <span className="font-bold text-lg gradient-text">Portfolio</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`nav-link ${
                  activeSection === item.id ? 'text-primary font-medium border-b-2 border-primary' : 'text-foreground/70 hover:text-foreground'
                } transition-colors cursor-pointer`}
                id={`nav-${item.id}`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-foreground transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-foreground transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden flex items-center text-foreground/70 hover:text-foreground"
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background/95 backdrop-blur-sm border-t border-border/40"
          >
            <div className="px-4 pt-2 pb-4 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block py-2 px-3 rounded-md w-full text-left ${
                    activeSection === item.id
                      ? 'bg-primary/10 text-primary font-medium' 
                      : 'text-foreground/70 hover:bg-primary/5 hover:text-foreground'
                  } transition-colors`}
                  id={`mobile-nav-${item.id}`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}