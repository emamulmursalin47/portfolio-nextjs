"use client"

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { GrCertificate } from 'react-icons/gr';
import { Badge } from '@/components/ui/badge';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Scroll } from 'lucide-react';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const certifications = [
  {
    id: 1,
    name: "HTML5/CSS3 Certification",
    issuer: "W3Schools",
    date: "2023",
    credentialId: "666629fc...",
    skills: ["HTML5", "CSS3", "Responsive Design", "Web Accessibility"],
    image: "/certificate-html.png" // Replace with actual image path
  },
  {
    id: 2,
    name: "Scrum Fundamentals (SFC)",
    issuer: "SCRUMstudy",
    date: "2022",
    credentialId: "SFC92831...",
    skills: ["Agile", "Scrum", "Project Management", "Sprint Planning"],
    image: "/certificate-scrum.png" // Replace with actual image path
  },
  {
    id: 3,
    name: "Adobe Illustrator Certification",
    issuer: "Adobe",
    date: "2023",
    credentialId: "64554302...",
    skills: ["Vector Graphics", "Logo Design", "Typography", "Digital Illustration"],
    image: "/certificate-illustrator.png" // Replace with actual image path
  },
  {
    id: 4,
    name: "Python for Data Science",
    issuer: "DataCamp",
    date: "2023",
    credentialId: "DC87654...",
    skills: ["Python", "Data Analysis", "Pandas", "NumPy", "Visualization"],
    image: "/certificate-python.png" // Replace with actual image path
  }
];

const Certifications = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const scrollIndicatorRef = useRef(null);

  useEffect(() => {
    // Animation for the certificates
    cardRefs.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          x: index % 2 === 0 ? -50 : 50,
          opacity: 0,
          scale: 0.9
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
            end: "top center",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Animate scroll indicator
    gsap.to(scrollIndicatorRef.current, {
      y: 15,
      opacity: 0.6,
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: "power1.inOut"
    });

    // Hide scroll indicator when scrolled down
    gsap.to(scrollIndicatorRef.current, {
      opacity: 0,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "center center",
        scrub: true
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
//@ts-ignore
  const addToCardRefs = (el) => {
    //@ts-ignore
    if (el && !cardRefs.current.includes(el)) {
        //@ts-ignore
      cardRefs.current.push(el);
    }
  };

  return (
    <div 
      ref={sectionRef} 
      id="certifications" 
      className="container mx-auto px-4 py-24 relative"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl font-bold text-white mb-4">Professional Certifications</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Professional qualifications that demonstrate expertise and continuous learning in various domains
        </p>
        
        {/* Scroll indicator */}
        <div 
          ref={scrollIndicatorRef}
          className="absolute left-1/2 transform -translate-x-1/2 bottom-4 flex flex-col items-center mt-12"
        >
          <p className="text-blue-400 mb-2 text-sm">Scroll to explore</p>
          <Scroll className="text-blue-400 animate-bounce h-5 w-5" />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.id}
            ref={addToCardRefs}
            whileHover={{ 
              scale: 1.03, 
              boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)" 
            }}
            className="bg-black/30 backdrop-blur-md p-6 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300"
          >
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-blue-500/10 rounded-full">
                <GrCertificate className="h-8 w-8 text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white">{cert.name}</h3>
                <div className="flex justify-between mt-1">
                  <p className="text-blue-400">{cert.issuer}</p>
                  <p className="text-gray-500">{cert.date}</p>
                </div>
                <p className="text-gray-400 mt-2">Credential ID: {cert.credentialId}</p>
                
                <div className="mt-4 space-x-2 space-y-2">
                  {cert.skills.map((skill) => (
                    <Badge 
                      key={skill} 
                      variant="outline"
                      className="bg-blue-500/10 text-blue-300 border-blue-500/20"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
                
                <div className="mt-4 flex justify-end">
                  <button className="text-blue-400 hover:text-blue-300 text-sm flex items-center">
                    View Certificate
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Certifications;