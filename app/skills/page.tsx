/* eslint-disable react/no-unescaped-entities */
"use client"
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { 
  SiNextdotjs, SiReact, SiJavascript, SiTailwindcss, SiBootstrap,
  SiPhp, SiMysql, SiPython, SiNodedotjs, 
  SiGithub, SiC, SiCplusplus, SiFirebase, SiLinux,
  SiTensorflow, SiJira, SiZendesk, SiMiro,
} from 'react-icons/si';
import { MdOutlineDesignServices, MdStars, MdCompareArrows } from 'react-icons/md';
import { GrCertificate } from 'react-icons/gr';
import { BiCodeAlt, BiGitPullRequest } from 'react-icons/bi';
import { FaProjectDiagram, FaCode, FaCodeBranch, FaAward } from 'react-icons/fa';
import { DiJava } from 'react-icons/di';
import Image from 'next/image';
import { AiOutlineClose } from 'react-icons/ai';
import GitHubStats from '@/components/GitHubStats';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const skillsRefs = useRef([]);
  const progressRefs = useRef([]);
  const certificationRef = useRef(null);
  const toolsRef = useRef(null);
  const githubStatsRef = useRef(null);
  const [activeTab, setActiveTab] = useState('skills');
  const [isMobile, setIsMobile] = useState(false);
  const [selectedCertification, setSelectedCertification] = useState(null);

  const githubUsername = 'emamulmursalin47';

  //@ts-ignore
  const getSkillIcon = (skillName) => {
    const iconMap = {
      'NextJS': <SiNextdotjs className="inline-block mr-2 text-lg" />,
      'ReactJS': <SiReact className="inline-block mr-2 text-lg text-blue-400" />,
      'JavaScript': <SiJavascript className="inline-block mr-2 text-lg text-yellow-400" />,
      'TailwindCSS': <SiTailwindcss className="inline-block mr-2 text-lg text-cyan-400" />,
      'ShadCN': <MdOutlineDesignServices className="inline-block mr-2 text-lg text-purple-400" />,
      'Bootstrap': <SiBootstrap className="inline-block mr-2 text-lg text-purple-500" />,
      'PHP': <SiPhp className="inline-block mr-2 text-lg text-indigo-400" />,
      'MySQL': <SiMysql className="inline-block mr-2 text-lg text-blue-500" />,
      'Python': <SiPython className="inline-block mr-2 text-lg text-green-400" />,
      'Node.js': <SiNodedotjs className="inline-block mr-2 text-lg text-green-500" />,
      'Scrum (SFC)': <GrCertificate className="inline-block mr-2 text-lg text-amber-400" />,
      'Jira': <SiJira className="inline-block mr-2 text-lg text-blue-500" />,
      'ZenDesk': <SiZendesk className="inline-block mr-2 text-lg text-teal-400" />,
      'Miro': <SiMiro className="inline-block mr-2 text-lg text-yellow-500" />,
      'Github': <SiGithub className="inline-block mr-2 text-lg text-gray-400" />,
      'C': <SiC className="inline-block mr-2 text-lg text-blue-400" />,
      'C++': <SiCplusplus className="inline-block mr-2 text-lg text-blue-500" />,
      'Java': <DiJava className="inline-block mr-2 text-lg text-red-400" />,
      'Firebase': <SiFirebase className="inline-block mr-2 text-lg text-yellow-500" />,
      'Linux': <SiLinux className="inline-block mr-2 text-lg text-yellow-400" />,
      'YOLOv4': <BiCodeAlt className="inline-block mr-2 text-lg text-red-500" />,
      'DeepSort': <BiCodeAlt className="inline-block mr-2 text-lg text-blue-500" />,
      'Object Detection': <FaProjectDiagram className="inline-block mr-2 text-lg text-green-400" />,
      'TensorFlow': <SiTensorflow className="inline-block mr-2 text-lg text-orange-400" />,
    };
    //@ts-ignore
    return iconMap[skillName] || <BiCodeAlt className="inline-block mr-2 text-lg" />;
  };

  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: <SiReact className="mr-2 text-xl text-blue-400" />,
      skills: [
        { name: 'NextJS', level: 70 },
        { name: 'ReactJS', level: 85 },
        { name: 'JavaScript', level: 90 },
        { name: 'TailwindCSS', level: 85 },
        { name: 'ShadCN', level: 80 },
        { name: 'Bootstrap', level: 85 },
      ],
    },
    {
      title: 'Backend Development',
      icon: <SiNodedotjs className="mr-2 text-xl text-green-500" />,
      skills: [
        { name: 'PHP', level: 80 },
        { name: 'MySQL', level: 85 },
        { name: 'Python', level: 75 },
        { name: 'Node.js', level: 70 },
      ],
    },
    {
      title: 'Tools',
      icon: <MdStars className="mr-2 text-xl text-yellow-400" />,
      skills: [
        { name: 'Scrum (SFC)', level: 70 },
        { name: 'Jira', level: 70 },
        { name: 'ZenDesk', level: 95 },
        { name: 'Miro', level: 95 },
      ],
    },
    {
      title: 'Comfortable',
      icon: <FaCode className="mr-2 text-xl text-purple-400" />,
      skills: [
        { name: 'Github', level: 70 },
        { name: 'C', level: 70 },
        { name: 'C++', level: 90 },
        { name: 'Java', level: 60 },
        { name: 'Firebase', level: 95 },
        { name: 'Linux', level: 75 },
      ],
    },
    {
      title: 'AI/ML',
      icon: <SiTensorflow className="mr-2 text-xl text-orange-400" />,
      skills: [
        { name: 'YOLOv4', level: 80 },
        { name: 'DeepSort', level: 75 },
        { name: 'Object Detection', level: 85 },
        { name: 'TensorFlow', level: 70 },
      ],
    },
  ];

  const certifications = [
    {
      title: 'HTML5/CSS3 Certification',
      id: '666629fc...',
      icon: <GrCertificate className="mr-2 text-lg" />,
      date: 'April 2022',
      issuer: 'Sololearn',
      image: '',
      outcomes: [
        'Mastered responsive web design principles',
        'Developed complex layouts using CSS Grid/Flexbox',
        'Implemented modern CSS animations',
        'Achieved top 5% in final assessments'
      ],
      skills: ['Semantic HTML', 'CSS Variables', 'Media Queries', 'Flexbox']
    },
    {
      title: 'Scrum Fundamentals (SFC)',
      id: '1058764',
      icon: <GrCertificate className="mr-2 text-lg" />,
      date: 'June 2023',
      issuer: 'SCRUMstudy',
      image: 'https://res.cloudinary.com/dufs2ywc7/image/upload/v1741503607/Screenshot_2025-03-09_125937_gh1huq.png'
    },
    {
      title: 'Leadership & Management Mastery',
      id: '64554302...',
      icon: <GrCertificate className="mr-2 text-lg" />,
      date: 'September 2021',
      issuer: 'Adobe',
      image: 'https://res.cloudinary.com/dufs2ywc7/image/upload/v1741503859/Screenshot_2025-03-09_130349_ek1uvk.png'
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    skillsRefs.current = [];
    progressRefs.current = [];

    if (!isMobile) {
      skillsRefs.current.forEach((ref, index) => {
        gsap.fromTo(
          ref,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: ref,
              start: 'top center+=100',
              end: 'top center-=100',
              scrub: 1,
              toggleActions: 'play reverse play reverse'
            }
          }
        );
      });

      progressRefs.current.forEach((ref) => {
        //@ts-ignore
        const width = ref?.getAttribute('data-width');
        gsap.fromTo(
          ref,
          { width: '0%' },
          {
            width: `${width}%`,
            duration: 1.5,
            scrollTrigger: {
              trigger: ref,
              start: 'top center+=150',
              end: 'top center',
              scrub: 1,
              toggleActions: 'play reverse play reverse'
            }
          }
        );
      });

      if (certificationRef.current) {
        gsap.fromTo(
          certificationRef.current,
          { x: -100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            scrollTrigger: {
              trigger: certificationRef.current,
              start: 'top center+=100',
              end: 'top center-=100',
              scrub: 1,
              toggleActions: 'play reverse play reverse'
            }
          }
        );
      }

      if (githubStatsRef.current) {
        gsap.fromTo(
          githubStatsRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            scrollTrigger: {
              trigger: githubStatsRef.current,
              start: 'top center+=100',
              end: 'top center-=100',
              scrub: 1,
              toggleActions: 'play reverse play reverse'
            }
          }
        );
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [activeTab, isMobile]);

  //@ts-ignore
  const addToSkillsRefs = (el) => {
    //@ts-ignore
    if (el && !skillsRefs.current.includes(el)) {
      //@ts-ignore
      skillsRefs.current.push(el);
    }
  };

  //@ts-ignore
  const addToProgressRefs = (el) => {
    //@ts-ignore
    if (el && !progressRefs.current.includes(el)) {
      //@ts-ignore
      progressRefs.current.push(el);
    }
  };
 
 
  
  return (
    
    <div className="container mx-auto px-4 py-16 md:py-24" id="skills">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">Skills & Expertise</h1>
        <p className="text-gray-300 text-center mb-8 md:mb-12 max-w-3xl mx-auto text-sm md:text-base">
          Leveraging modern technologies and frameworks to build efficient, scalable, and beautiful applications
        </p>

        <div className="flex justify-center mb-8 md:mb-12 px-2">
          <div className="flex flex-wrap md:flex-nowrap w-full md:w-auto justify-center space-y-2 md:space-y-0 md:space-x-2 bg-black/50 backdrop-blur-md p-1 rounded-lg">
            {/* <button
              onClick={() => setActiveTab('skills')}
              className={`w-full md:w-auto px-4 md:px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center ${
                activeTab === 'skills' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <FaCode className="mr-2" /> Skills
            </button> */}
            {/* <button
              onClick={() => setActiveTab('certifications')}
              className={`w-full md:w-auto px-4 md:px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center ${
                activeTab === 'certifications' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <FaAward className="mr-2" /> Certifications
            </button> */}
            {/* <button
              onClick={() => setActiveTab('github')}
              className={`w-full md:w-auto px-4 md:px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center ${
                activeTab === 'github' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <SiGithub className="mr-2" /> GitHub Stats
            </button> */}
          </div>
        </div>

        {activeTab === 'skills' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                ref={addToSkillsRefs}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                className="bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-md rounded-xl p-4 md:p-6 border border-gray-800 hover:border-blue-800 transition-all duration-300 shadow-xl hover:shadow-blue-900/20"
              >
                <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 flex items-center">
                  {category.icon} {category.title}
                </h2>
                <div className="space-y-4 md:space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm md:text-base text-gray-300 flex items-center truncate mr-2">
                          {getSkillIcon(skill.name)} {skill.name}
                        </span>
                        <span className="text-sm md:text-base text-blue-400 whitespace-nowrap">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 md:h-2 bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          ref={addToProgressRefs}
                          data-width={skill.level}
                          initial={{ width: "0%" }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: 0.2 + skillIndex * 0.1 }}
                          className={`h-full rounded-full ${
                            skill.level > 80 
                              ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                              : skill.level > 70 
                                ? 'bg-gradient-to-r from-green-500 to-blue-500'
                                : 'bg-gradient-to-r from-yellow-500 to-green-500'
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        
      </motion.div>
    </div>
  );
};

export default Skills;