/* eslint-disable react/no-unescaped-entities */
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';

import Link from 'next/link';
import { ArrowRight, Download, Mail } from 'lucide-react';
import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <div className="relative overflow-hidden min-h-screen flex items-center">
      {/* Background Glow */}
     
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Section */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-5xl font-bold text-white mb-6"
            >
              Md. Emamul Mursalin
            </motion.h1>

            <motion.div className="text-xl text-blue-200 mb-8">
              System Architecture Specialist | Web Developer | AI Innovator
            </motion.div>

            <motion.p className="text-gray-300 mb-8 text-lg">
              Crafting innovative solutions at the intersection of system architecture,
              web development, and artificial intelligence. Let's build something amazing together.
            </motion.p>

            <div className="flex flex-wrap gap-4">
              <Link href="#projects">
                <motion.button className="bg-blue-600 text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-blue-700 transition-colors">
                  View Projects <ArrowRight size={20} />
                </motion.button>
              </Link>

              <motion.a
                href="https://drive.google.com/uc?export=download&id=11rKY_BBFeHaj0FaorSERMRZL2ebiusCZ"
                download
                className="bg-transparent border-2 border-blue-400 text-blue-400 px-6 py-3 rounded-full flex items-center gap-2 hover:bg-blue-400/10 transition-colors"
              >
                Download Resume <Download size={20} />
              </motion.a>

              <Link href="/contact">
                <motion.button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-white/10 transition-colors">
                  Contact Me <Mail size={20} />
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Image & 3D Background */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative h-[500px] hidden lg:block"
          >
            <div className="absolute w-[300px] h-[600px] bg-blue-500 blur-[150px]  opacity-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"></div>
            {/* Profile Image */}
            <div className="relative w-[500px] ml-40 h-full">
              <Image
                src="https://i.ibb.co/R4SrmCZR/Untitled-design-4.png"
                alt="Profile"
                className="w-full h-full object-cover rounded-full shadow-2xl border-4 border-blue-500"
                width={500}
                height={500}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;