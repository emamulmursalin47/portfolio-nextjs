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
            <button
              onClick={() => setActiveTab('skills')}
              className={`w-full md:w-auto px-4 md:px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center ${
                activeTab === 'skills' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <FaCode className="mr-2" /> Skills
            </button>
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
            <button
              onClick={() => setActiveTab('github')}
              className={`w-full md:w-auto px-4 md:px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center ${
                activeTab === 'github' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <SiGithub className="mr-2" /> GitHub Stats
            </button>
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

        {activeTab === 'certifications' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            ref={certificationRef}
            className="bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-md rounded-xl p-4 md:p-8 border border-gray-800"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 flex items-center">
              <FaAward className="mr-3 text-yellow-400" /> Certifications & Achievements
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {certifications.map((cert, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-4 md:p-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-lg border border-gray-800 hover:border-blue-600 transition-all duration-300 cursor-pointer"
                 //@ts-ignore
                  onClick={() => setSelectedCertification && setSelectedCertification(cert)}

                >
                  <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-blue-600/30 flex items-center justify-center mb-3 md:mb-4">
                    {cert.icon}
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-white mb-1 md:mb-2">
                    {cert.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-400 mb-2">{cert.id}</p>
                  <div className="flex justify-between text-xs md:text-sm">
                    <span className="text-blue-400">{cert.date}</span>
                    <span className="text-gray-400">{cert.issuer}</span>
                  </div>
                </motion.div>
              ))}
            </div>
            
            
            <div className="mt-8 md:mt-12 p-4 md:p-6 bg-gradient-to-br from-gray-900/40 to-black/60 rounded-xl border border-gray-800">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 flex items-center">
                <MdCompareArrows className="mr-2 text-blue-400" /> Continuous Learning
              </h3>
              <p className="text-sm md:text-base text-gray-300 mb-4">
                I'm committed to ongoing professional development and staying current with industry trends and technologies.
                Currently exploring the following areas:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                <div className="p-3 md:p-4 bg-blue-900/20 rounded-lg flex items-center">
                  <div className="mr-3 text-blue-400">
                    <SiTensorflow className="text-xl md:text-2xl" />
                  </div>
                  <div>
                    <h4 className="text-sm md:text-base font-medium text-white">Advanced ML/AI</h4>
                    <p className="text-xs md:text-sm text-gray-400">Computer Vision & Neural Networks</p>
                  </div>
                </div>
                <div className="p-3 md:p-4 bg-green-900/20 rounded-lg flex items-center">
                  <div className="mr-3 text-green-400">
                    <SiReact className="text-xl md:text-2xl" />
                  </div>
                  <div>
                    <h4 className="text-sm md:text-base font-medium text-white">Advanced React</h4>
                    <p className="text-xs md:text-sm text-gray-400">Performance & Server Components</p>
                  </div>
                </div>
                <div className="p-3 md:p-4 bg-purple-900/20 rounded-lg flex items-center">
                  <div className="mr-3 text-purple-400">
                    <FaProjectDiagram className="text-xl md:text-2xl" />
                  </div>
                  <div>
                    <h4 className="text-sm md:text-base font-medium text-white">System Design</h4>
                    <p className="text-xs md:text-sm text-gray-400">Architecture & Microservices</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* GitHub Stats Content */}
        {activeTab === 'github' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-4"
            ref={githubStatsRef}
          >
            <div className="bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-md rounded-xl p-4 md:p-8 border border-gray-800">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 flex items-center">
                <SiGithub className="mr-3 text-xl md:text-2xl" /> GitHub Statistics
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-gradient-to-br from-gray-900/40 to-black/60 rounded-xl p-4 md:p-6 border border-gray-800"
                >
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-3 md:mb-4 flex items-center">
                    <FaCodeBranch className="mr-2 text-green-400" /> GitHub Commit Stats
                  </h3>
                  <div className="space-y-4">
                    <div className="w-full overflow-hidden">
                      <Image
                        src={`https://github-readme-stats.vercel.app/api?username=${githubUsername}&show_icons=true&hide_border=true&theme=dark&bg_color=00000000&title_color=3B82F6&icon_color=3B82F6&text_color=FFFFFF&hide=prs,issues`}
                        alt="GitHub Stats"
                        className="w-full"
                        width={500}
                        height={200}
                      />
                    </div>
                  </div>
                </motion.div>
                
                {/* <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="bg-gradient-to-br from-gray-900/40 to-black/60 rounded-xl p-4 md:p-6 border border-gray-800"
                >
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-3 md:mb-4 flex items-center">
                    <BiCodeAlt className="mr-2 text-blue-400" /> Most Used Languages
                  </h3>
                  <div className="space-y-4">
                    <div className="w-full overflow-hidden">
                      <Image
                        src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${githubUsername}&layout=compact&hide_border=true&theme=dark&bg_color=00000000&title_color=3B82F6&text_color=FFFFFF`}
                        alt="Top Languages"
                        className="w-full"
                        width={500}
                        height={200}
                      />
                    </div>
                  </div>
                </motion.div> */}
              </div>
              
              {/* Contribution Activity */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="bg-gradient-to-br from-gray-900/40 to-black/60 rounded-xl p-4 md:p-6 border border-gray-800"
              >
                <h3 className="text-lg md:text-xl font-semibold text-white mb-3 md:mb-4 flex items-center">
                  <BiGitPullRequest className="mr-2 text-blue-400" /> Contribution Activity
                </h3>
                <div className="w-full overflow-hidden">
                  <Image
                    src={`https://github-readme-activity-graph.vercel.app/graph?username=${githubUsername}&theme=react-dark&hide_border=true&bg_color=00000000`}
                    alt="Activity Graph"
                    className="w-full"
                    width={1000}
                    height={250}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Skills;