"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Code, Home, Briefcase, GraduationCap, Github, Linkedin } from 'lucide-react';
import { SiHyperskill, SiSkillshare } from 'react-icons/si';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Code className="w-8 h-8 text-primary" />
            <span className="font-bold text-lg gradient-text">Portfolio</span>
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className="nav-link">
              <Home className="w-4 h-4 inline-block mr-1" />
              Home
            </Link>
            <Link href="/projects" className="nav-link">
              <Briefcase className="w-4 h-4 inline-block mr-1" />
              Projects
            </Link>
            <Link href="/education" className="nav-link">
              <GraduationCap className="w-4 h-4 inline-block mr-1" />
            Experience
            </Link>
            <Link href="/skills" className="nav-link">
              <SiHyperskill className="w-4 h-4 inline-block mr-1" />
             Skills
            </Link>
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
          </div>
        </div>
      </div>
    </motion.nav>
  );
}