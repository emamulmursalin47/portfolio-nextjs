'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GrCertificate } from 'react-icons/gr';
import { Badge } from '@/components/ui/badge';
import { X, Scroll } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const certifications = [
  {
    id: 1,
    name: 'HTML5/CSS3 Certification',
    issuer: 'W3Schools',
    date: '2023',
    credentialId: '666629fc...',
    skills: ['HTML5', 'CSS3', 'Responsive Design', 'Web Accessibility'],
    image: '/certificates/certificate-html.png', // Ensure this is inside the 'public/certificates/' folder
    description: 'This certification validates proficiency in HTML5 and CSS3.',
  },
  {
    id: 2,
    name: 'Scrum Fundamentals (SFC)',
    issuer: 'SCRUMstudy',
    date: '2022',
    credentialId: 'SFC92831...',
    skills: ['Agile', 'Scrum', 'Project Management', 'Sprint Planning'],
    image: '/certificates/certificate-scrum.png', // Ensure this is inside the 'public/certificates/' folder
    description: 'This certification demonstrates understanding of Agile principles and Scrum.',
  },
];

const Certifications = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const [selectedCert, setSelectedCert] = useState<any>(null);

  // Debugging: Check if modal opens
  useEffect(() => {
    console.log('Selected Certificate:', selectedCert);
  }, [selectedCert]);

  // Optimized GSAP Animation Setup
  useEffect(() => {
    cardRefs.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { x: index % 2 === 0 ? -50 : 50, opacity: 0, scale: 0.9 },
          { 
            x: 0, opacity: 1, scale: 1, duration: 0.8, 
            scrollTrigger: { 
              trigger: card, start: 'top bottom-=100', 
              end: 'top center', toggleActions: 'play none none reverse' 
            }
          }
        );
      }
    });

    gsap.to(scrollIndicatorRef.current, {
      y: 15, opacity: 0.6, repeat: -1, yoyo: true, duration: 1.5, ease: 'power1.inOut'
    });

    gsap.to(scrollIndicatorRef.current, {
      opacity: 0,
      scrollTrigger: { trigger: sectionRef.current, start: 'top center', end: 'center center', scrub: true }
    });

    document.body.style.overflow = selectedCert ? 'hidden' : 'unset';

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      document.body.style.overflow = 'unset';
    };
  }, [selectedCert]);

  // Correct way to store refs
  const addToCardRefs = useCallback((el: HTMLDivElement) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current = [...cardRefs.current, el];
    }
  }, []);

  return (
    <div ref={sectionRef} id="certifications" className="container mx-auto px-4 py-24 relative">
      {/* Section Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Professional Certifications</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">Showcasing certifications that validate my professional skills.</p>
        <div ref={scrollIndicatorRef} className="absolute left-1/2 transform -translate-x-1/2 bottom-4 flex flex-col items-center">
          <p className="text-blue-400 mb-2 text-sm">Scroll to explore</p>
          <Scroll className="text-blue-400 animate-bounce h-5 w-5" />
        </div>
      </motion.div>

      {/* Certification Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {certifications.map(cert => (
          <motion.div key={cert.id} ref={addToCardRefs} whileHover={{ scale: 1.03 }} className="bg-black/30 backdrop-blur-md p-6 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-blue-500/10 rounded-full">
                <GrCertificate className="h-8 w-8 text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white">{cert.name}</h3>
                <p className="text-blue-400 mt-1">{cert.issuer} - {cert.date}</p>
                <p className="text-gray-400 mt-2">Credential ID: {cert.credentialId}</p>
                <div className="mt-4 space-x-2">
                  {cert.skills.map(skill => <Badge key={skill} className="bg-blue-500/10 text-blue-300 border-blue-500/20">{skill}</Badge>)}
                </div>
                <div className="mt-4">
                  <Image 
                    src={cert.image} 
                    alt={`${cert.name} certificate`} 
                    width={500} 
                    height={300} 
                    className="w-full h-40 object-cover rounded-lg cursor-pointer" 
                    onClick={() => setSelectedCert(cert)} 
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div key={selectedCert?.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedCert(null)} className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-gray-900 border border-blue-500/30 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative">
                <Image src={selectedCert.image} alt={`${selectedCert.name} certificate`} width={800} height={500} className="w-full h-80 object-cover rounded-t-xl" />
                <button onClick={() => setSelectedCert(null)} className="absolute top-4 right-4 bg-black/50 p-2 rounded-full text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white">{selectedCert.name}</h2>
                <p className="text-blue-400 font-medium">{selectedCert.issuer} - {selectedCert.date}</p>
                <p className="text-gray-400 mt-2">Credential ID: {selectedCert.credentialId}</p>
                <p className="text-gray-300 mt-4">{selectedCert.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Certifications;
