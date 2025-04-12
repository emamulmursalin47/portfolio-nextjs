"use client"

import { useState, useEffect, type JSX } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Home, Briefcase, GraduationCap, Github, Linkedin, Menu, X, Contact } from 'lucide-react';
import { SiHyperskill } from 'react-icons/si';
import Container from './Container';

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
      
      const sections = document.querySelectorAll<HTMLElement>('section[id]');
      let currentSection = 'home';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 64; // Match nav height
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

  const navItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-4 h-4 inline-block mr-1" /> },
    { id: 'education', label: 'Experience', icon: <GraduationCap className="w-4 h-4 inline-block mr-1" /> },
    { id: 'skills', label: 'Skills & Expertise', icon: <SiHyperskill className="w-4 h-4 inline-block mr-1" /> },
    { id: 'projects', label: 'Projects', icon: <Briefcase className="w-4 h-4 inline-block mr-1" /> },
    { id: 'contact', label: 'Contact', icon: <Contact className="w-4 h-4 inline-block mr-1" /> }
  ];

  const toggleMobileMenu = (): void => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const scrollToSection = (sectionId: string): void => {
    const section = document.getElementById(sectionId);
    if (section) {
      setMobileMenuOpen(false);
      window.scrollTo({
        top: section.offsetTop - 64, // Match nav height
        behavior: 'smooth'
      });
    }
  };

  return (
    <div  className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled || mobileMenuOpen ? 'bg-background/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
    }`}>
 <Container>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
       
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={() => scrollToSection('home')}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <Code className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              <span className="font-bold text-base md:text-lg gradient-text">Mursalin</span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {navItems.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-2 rounded-md text-sm md:text-base ${
                    activeSection === item.id 
                      ? 'text-primary font-medium bg-primary/10' 
                      : 'text-foreground/70 hover:text-foreground hover:bg-primary/5'
                  } transition-colors`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-2 md:space-x-4">
              <a
                href="https://github.com/emamulmursalin47"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-foreground/70 hover:text-foreground transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/mdemamulmursalin/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-foreground/70 hover:text-foreground transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              
              <button 
                className="md:hidden flex items-center text-foreground/70 hover:text-foreground p-2"
                onClick={toggleMobileMenu}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-background/95 backdrop-blur-sm border-t border-border/40"
            >
              <div className="px-4 pt-2 pb-4 space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block py-3 px-4 rounded-md w-full text-left text-sm ${
                      activeSection === item.id
                        ? 'bg-primary/10 text-primary font-medium' 
                        : 'text-foreground/70 hover:bg-primary/5 hover:text-foreground'
                    } transition-colors`}
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
    </Container>
    </div>
   
  );
}