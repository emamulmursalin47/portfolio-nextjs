"use client"

import { useEffect, useRef, useState, type JSX } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, GraduationCap, Award, ChevronDown, MousePointer, ExternalLink, Download, Calendar, Building } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Container from '@/components/Container';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Define TypeScript interfaces
interface Achievement {
  title: string;
  company: string;
  location: string;
  category: 'work' | 'education';
  period: string;
  description: string;
  achievements: string[];
  skills: string[];
  icon: JSX.Element;
}

interface LeadershipRole {
  title: string;
  organization: string;
  period: string;
  description: string;
  achievements: string[];
  icon: JSX.Element;
}

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const timelineProgressRef = useRef<HTMLDivElement>(null);
  const experienceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const leadershipRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const [showScrollGuide, setShowScrollGuide] = useState(true);
  const [activeExperience, setActiveExperience] = useState<number | null>(null);
  const [filterCategory, setFilterCategory] = useState<'all' | 'work' | 'education'>('all');

  const experiences: Achievement[] = [
    {
      title: 'System Architecture Specialist',
      company: 'ATC Tech Ltd',
      location: 'Remote',
      category: 'work',
      period: '2025 - Present',
      description: 'Leading system architecture design and implementation for enterprise solutions.',
      achievements: [
        'Designed and implemented scalable, high-performance IT system architectures to meet business needs.',
        'Developed system models, workflows, and integration strategies to optimize infrastructure efficiency.',
        'Led the evaluation and adoption of emerging technologies to enhance system security and reliability.',
        'Conducted performance analysis and troubleshooting to identify and resolve system bottlenecks.',
        'Collaborated with cross-functional teams to design and integrate complex IT solutions.',
        'Provided technical leadership and mentorship to developers and IT teams on architecture best practices.'
      ],
      skills: ['System Architecture', 'Enterprise Solutions', 'Technical Leadership', 'Infrastructure Design'],
      icon: <Briefcase className="w-6 h-6" />,
    },
    {
      title: 'Sr. Executive Officer',
      company: 'ATC Tech Ltd',
      location: 'Dhaka, Bangladesh',
      category: 'work',
      period: '2024 - 2025',
      description: 'Managed technical operations and development projects.',
      achievements: [
        'Developed and maintained websites using HTML, CSS, JavaScript, React.js PHP, and MySQL.',
        'Implemented responsive design to ensure websites are mobile-friendly. ',
        'Collaborated with senior developers to troubleshoot and resolve technical issues',
        'Provided Technical Support and training to clients and team members.'
      ],
      skills: ['React.js', 'PHP', 'MySQL', 'Responsive Design', 'Technical Support'],
      icon: <Briefcase className="w-6 h-6" />,
    },
    {
      title: 'Technical Content Writer',
      company: 'Team Wright',
      location: 'Remote',
      category: 'work',
      period: '2020 - 2023',
      description: 'Created technical documentation and tutorials for developers.',
      achievements: [
        'Published 100+ technical articles',
        'Increased readership by 200%',
        'Developed style guide',
      ],
      skills: ['Technical Writing', 'Documentation', 'Content Strategy', 'SEO'],
      icon: <Briefcase className="w-6 h-6" />,
    },
    {
      title: 'B.Sc. in ICE',
      company: 'BAUET',
      location: 'Qadirabad, Bangladesh',
      category: 'education',
      period: '2020 - 2024',
      description: 'Bachelor of Science in Information & Communication Engineering',
      achievements: [
        'CGPA: 3.35/4.00',
        'Thesis: Implementation of a Secure IoT Framework for Smart Campus Solutions',
        'Participated in multiple technical competitions and hackathons',
        'Received academic excellence award in 2022'
      ],
      skills: ['Information Engineering', 'Communication Systems', 'Network Security', 'Programming'],
      icon: <GraduationCap className="w-6 h-6" />,
    },
  ];

  const leadership: LeadershipRole[] = [
    {
      title: 'Organizing Secretary',
      organization: 'BAUET ICT Club',
      period: '2023',
      description: 'Led organization of technical events and workshops.',
      achievements: [
        'Organized annual tech fest with 500+ participants',
        'Coordinated 10+ workshops on emerging technologies',
        'Managed a team of 15 volunteers'
      ],
      icon: <Award className="w-6 h-6" />,
    },
    {
      title: 'Event Management Officer',
      organization: 'Hult Prize BAUET',
      period: '2022 - 2023',
      description: 'Coordinated international entrepreneurship competition events.',
      achievements: [
        'Successfully organized campus-wide Hult Prize competition',
        'Mentored 12 teams through the competition process',
        'Secured sponsorships worth $2,000'
      ],
      icon: <Award className="w-6 h-6" />,
    },
    {
      title: 'Joint Secretary',
      organization: 'BAUET Career Club',
      period: '2022 - 2023',
      description: 'Facilitated career development initiatives for students.',
      achievements: [
        'Organized 5 career workshops with industry professionals',
        'Created resume database for graduating students',
        'Established partnerships with 7 local companies'
      ],
      icon: <Award className="w-6 h-6" />,
    },
  ];

  useEffect(() => {
    // Reset refs on component mount
    experienceRefs.current = [];
    leadershipRefs.current = [];
    
    // Show scroll guide popup initially
    const timer = setTimeout(() => {
      setShowScrollGuide(false);
    }, 5000);

    // Animate scroll indicator
    if (scrollIndicatorRef.current) {
      gsap.to(scrollIndicatorRef.current, {
        y: 15,
        opacity: 0.8,
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
          scrub: true,
          onEnter: () => setShowScrollGuide(false)
        }
      });
    }

    // Filter experiences based on category
    const filteredExperiences = filterCategory === 'all' 
      ? experiences 
      : experiences.filter(exp => exp.category === filterCategory);

    // Timeline progress animation with improved glow effect
    if (timelineProgressRef.current && timelineRef.current) {
      gsap.fromTo(
        timelineProgressRef.current,
        { 
          height: '0%',
          opacity: 0.5
        },
        {
          height: () => {
            if (!timelineRef.current) return '100%';
            
            // Calculate the position of the last timeline dot
            const timelineHeight = timelineRef.current.offsetHeight;
            const dots = document.querySelectorAll('.timeline-dot');
            const lastDot = dots[filteredExperiences.length - 1];
            
            if (!lastDot) return '100%';
            
            // Get the position of the last dot relative to the timeline
            const lastDotRect = lastDot.getBoundingClientRect();
            const timelineRect = timelineRef.current.getBoundingClientRect();
            //@ts-ignore
            const relativePosition = (lastDotRect.top - timelineRect.top) + (lastDot.offsetHeight / 2);
            
            // Convert to percentage (with a small buffer to avoid overflow)
            return Math.min(((relativePosition / timelineHeight) * 100), 98) + '%';
          },
          opacity: 1,
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: 0.5,
          }
        }
      );
    }

    // Pulse animation for timeline dots when they come into view
    document.querySelectorAll('.timeline-dot').forEach((dot, index) => {
      gsap.fromTo(
        dot,
        { scale: 0.8, opacity: 0.5 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: dot,
            start: 'top center+=50',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Parallax effect for timeline items
    experienceRefs.current.forEach((item, index) => {
      if (!item) return;
      
      const direction = index % 2 === 0 ? -100 : 100;
      
      gsap.fromTo(
        item,
        {
          x: direction,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: item,
            start: 'top center+=100',
            end: 'top center-=100',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Staggered animation for leadership items
    leadershipRefs.current.forEach((item, index) => {
      if (!item) return;
      
      gsap.fromTo(
        item,
        {
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: item,
            start: 'top center+=100',
            end: 'top center-=100',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      clearTimeout(timer);
    };
  }, [filterCategory]); // Re-run when filter changes

  // Add to refs safely
  const addToExperienceRefs = (el: HTMLDivElement | null) => {
    if (el && !experienceRefs.current.includes(el)) {
      experienceRefs.current.push(el);
    }
  };
  
  const addToLeadershipRefs = (el: HTMLDivElement | null) => {
    if (el && !leadershipRefs.current.includes(el)) {
      leadershipRefs.current.push(el);
    }
  };

  // Filter experiences based on category
  const filteredExperiences = filterCategory === 'all' 
    ? experiences 
    : experiences.filter(exp => exp.category === filterCategory);

  return (
    <Container>
      <div 
      ref={sectionRef} 
      className="mx-auto px-4 py-32 relative" 
      id="experience"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16 text-center"
      >
        <h1 className="text-4xl font-bold text-white mb-4">Experience & Education</h1>
        <p className="text-gray-400 max-w-2xl mx-auto mb-8">
          Professional journey and educational background that shaped my career
        </p>

        {/* Filter tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <button 
            onClick={() => setFilterCategory('all')}
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
              filterCategory === 'all' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            All
          </button>
          <button 
            onClick={() => setFilterCategory('work')}
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
              filterCategory === 'work' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <span className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Work
            </span>
          </button>
          <button 
            onClick={() => setFilterCategory('education')}
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
              filterCategory === 'education' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <span className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              Education
            </span>
          </button>
        </div>
        
        {/* Scroll indicator with improved visibility */}
         {/* Scroll indicator in top right corner */}
      {/*  */}
      </motion.div>

      {/* Scroll Guide Popup */}
      

      {/* Experience details modal */}
      <AnimatePresence>
  {activeExperience !== null && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={() => setActiveExperience(null)}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-gray-900 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-auto border border-blue-500/20"
        onClick={(e) => e.stopPropagation()}
        style={{ 
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch', // For better scrolling on Safari
        }}
        onWheel={(e) => {
          // Prevent the wheel event from being passed to parent elements
          e.stopPropagation();
        }}
      >
        <div className="p-6 border-b border-gray-800 sticky top-0 bg-gray-900 z-10">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {experiences[activeExperience].title}
              </h3>
              <div className="flex items-center gap-2 text-blue-400 mb-1">
                <Building className="w-4 h-4" />
                <span>{experiences[activeExperience].company}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <Calendar className="w-4 h-4" />
                <span>{experiences[activeExperience].period}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <ExternalLink className="w-4 h-4" />
                <span>{experiences[activeExperience].location}</span>
              </div>
            </div>
            <button 
              onClick={() => setActiveExperience(null)}
              className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-800 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-white mb-3">Overview</h4>
            <p className="text-gray-300">{experiences[activeExperience].description}</p>
          </div>
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-white mb-3">Key Achievements</h4>
            <ul className="space-y-3">
              {experiences[activeExperience].achievements.map((achievement, i) => (
                <li key={i} className="text-gray-300 flex items-start gap-3">
                  <div className="min-w-2 h-2 bg-blue-500 rounded-full mt-2" />
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {experiences[activeExperience].skills.map((skill, i) => (
                <span 
                  key={i} 
                  className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-sm border border-blue-500/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            {/* <button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download Certificate
            </button> */}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

      <div className="relative">
        {/* Timeline container with improved visuals */}
        <div 
          ref={timelineRef}
          className="absolute left-0 md:left-1/2 h-full  bg-blue-500/20 transform -translate-x-1/2" 
        />
        
        {/* Progress line that animates when scrolling - improved with glow effect */}
        <div 
          ref={timelineProgressRef}
          className="absolute left-0 md:left-1/2 w-1 bg-blue-500 transform -translate-x-1/2 z-10 rounded-full" 
          style={{ 
            height: '0%',  
            top: 0, 
            boxShadow: '0 0 10px rgba(59, 130, 246, 0.7)',
            background: 'linear-gradient(180deg, #3b82f6 0%, #60a5fa 100%)'
          }}
        />

        {/* Experience items */}
        <div className="space-y-16">
          {filteredExperiences.length > 0 ? (
            filteredExperiences.map((exp, index) => (
              <div
                key={index}
                ref={addToExperienceRefs}
                className={`flex flex-col md:flex-row gap-8 relative ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1" />
                <div className="relative flex items-center justify-center z-20">
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center timeline-dot transition-all duration-300 hover:scale-110"
                       style={{ boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)' }}>
                    {exp.icon}
                  </div>
                  
                  {/* Year indicator with improved styling */}
                  <div 
                    className={`absolute whitespace-nowrap font-medium text-sm text-blue-400 bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm ${
                      index % 2 === 0 ? 'md:left-16' : 'md:right-16'
                    } top-1/2 transform -translate-y-1/2`}
                  >
                    {exp.period}
                  </div>
                </div>
                <div className="flex-1">
                  <motion.div 
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 0 25px rgba(59, 130, 246, 0.1)"
                    }}
                    className="bg-black/30 backdrop-blur-md p-6 rounded-xl border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer group"
                    style={{
                      boxShadow: "0 0 20px rgba(30, 64, 175, 0.05)",
                    }}
                    onClick={() => setActiveExperience(experiences.findIndex(e => e.title === exp.title))}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{exp.title}</h3>
                      <div className="p-1 bg-blue-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink className="w-4 h-4 text-blue-400" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-blue-400 mb-2">
                      <Building className="w-4 h-4" />
                      <span>{exp.company}</span>
                    </div>
                    <p className="text-gray-300 mb-4">{exp.description}</p>
                    
                    {/* Preview of achievements */}
                    <div className="space-y-2">
                      {exp.achievements.slice(0, 2).map((achievement, i) => (
                        <div key={i} className="text-gray-400 flex items-start gap-2">
                          <div className="min-w-1.5 h-1.5 bg-blue-500 rounded-full mt-2" />
                          <span>{achievement}</span>
                        </div>
                      ))}
                      {exp.achievements.length > 2 && (
                        <p className="text-blue-500 text-sm mt-2">
                          + {exp.achievements.length - 2} more achievements
                        </p>
                      )}
                    </div>
                    
                    {/* Skills tags */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {exp.skills.slice(0, 3).map((skill, i) => (
                        <span 
                          key={i} 
                          className="bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                      {exp.skills.length > 3 && (
                        <span className="text-gray-500 text-xs flex items-center">
                          +{exp.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </motion.div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center py-16">
              <div className="text-center p-8 bg-black/30 backdrop-blur-md rounded-xl border border-blue-500/10">
                <p className="text-gray-400 mb-4">No experiences found in this category.</p>
                <button 
                  onClick={() => setFilterCategory('all')}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-all duration-300"
                >
                  View all experiences
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Leadership section with improved animations */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-white mb-10 text-center">Leadership Roles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((role, index) => (
              <motion.div
                key={index}
                ref={addToLeadershipRefs}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 0 25px rgba(59, 130, 246, 0.15)"
                }}
                className="bg-black/30 backdrop-blur-md p-6 rounded-xl border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                    {role.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{role.title}</h3>
                    <p className="text-blue-400">{role.organization}</p>
                  </div>
                </div>
                <p className="text-gray-400 mb-2">{role.period}</p>
                <p className="text-gray-300 mb-4">{role.description}</p>
                
                {/* Leadership achievements */}
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-white mb-2">Key Accomplishments:</h4>
                  <ul className="space-y-2">
                    {role.achievements.map((achievement, i) => (
                      <li key={i} className="text-gray-400 flex items-start gap-2 text-sm">
                        <div className="min-w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </Container>
  );
};

export default Experience;