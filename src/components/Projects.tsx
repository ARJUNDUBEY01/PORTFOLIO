'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import Image from 'next/image';
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react';

interface Project {
  title: string;
  desc: string;
  tech: string[];
  image: string;
  github: string;
  live: string;
  bg: string;
  accent: string;
  icon: string;
  num: string;
}

const PROJECTS: Project[] = [
  {
    title: 'VOTING-APP',
    desc: 'A robust and modern voting application built with the MERN stack, offering secure and real-time polling capabilities.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express'],
    image: '/ui_dashboard_card_1773766220630.png',
    github: 'https://github.com/ARJUNDUBEY01/VOTING-APP.git',
    live: '#',
    bg: '#0f0f1a', 
    accent: '#e2b04a', 
    icon: '✦', 
    num: '01'
  },
  {
    title: 'BlindNav AI',
    desc: 'Assistive technology using computer vision to provide spatial awareness for visually impaired users.',
    tech: ['React Native', 'OpenCV', 'Firebase'],
    image: '/ui_project_preview_1773766248176.png',
    github: '#',
    live: '#',
    bg: '#0d1f2d', 
    accent: '#4af3e2', 
    icon: '◈', 
    num: '02'
  },
  {
    title: 'KaamSetu',
    desc: 'A socio-economic bridge connecting daily wage laborers with employment opportunities in real-time.',
    tech: ['Next.js', 'Node.js', 'MongoDB'],
    image: '/ui_analytics_card_1773766299017.png',
    github: '#',
    live: '#',
    bg: '#12132a', 
    accent: '#7aabff', 
    icon: '⬡', 
    num: '03'
  },
  {
    title: 'Prop Firm App',
    desc: 'A comprehensive financial dashboard for comparing proprietary trading firms rules and performance.',
    tech: ['React', 'Express', 'PostgreSQL'],
    image: '/ui_dashboard_card_1773766220630.png',
    github: '#',
    live: '#',
    bg: '#1a0d2e', 
    accent: '#cf80ff', 
    icon: '⊕', 
    num: '04'
  },
  {
    title: 'AI Trading',
    desc: 'Advanced market analytics engine utilizing neural networks for real-time trend detection.',
    tech: ['React', 'Python', 'TensorFlow'],
    image: '/ui_project_preview_1773766248176.png',
    github: '#',
    live: '#',
    bg: '#0d1f18', 
    accent: '#5ef0a0', 
    icon: '★', 
    num: '05'
  }
];

export default function Projects() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"]
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setActiveIndex(Math.round(latest * (PROJECTS.length - 1)));
  });

  // Calculate track x movement: from 0vw to -400vw
  const trackX = useTransform(
    scrollYProgress, 
    [0, 1], 
    ["0vw", `-${(PROJECTS.length - 1) * 100}vw`]
  );

  // Fade out the scroll hint shortly after starting to scroll
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.03], [1, 0]);

  return (
    <section ref={wrapperRef} id="work" className="relative h-[600vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden text-white font-sans">
        
        {/* Global Heading */}
        <div className="absolute top-10 left-10 md:left-16 z-50 pointer-events-none mix-blend-difference">
          <h2 className="text-sm md:text-xl uppercase tracking-[0.4em] font-black text-white/90">
            SELECTED PROJECTS
          </h2>
        </div>

        {/* The horizontal track */}
        <motion.div 
          style={{ x: trackX }} 
          className="flex h-screen w-[500vw] will-change-transform"
        >
          {PROJECTS.map((project, index) => {
            const isActive = index === activeIndex;

            return (
              <div 
                key={project.num}
                className="relative w-[100vw] h-screen flex shrink-0 items-center justify-center overflow-hidden"
                style={{ backgroundColor: project.bg }}
              >
                {/* Large Translucent Blob Background Decoration */}
                <div 
                  className="absolute rounded-full blur-[80px] pointer-events-none transition-transform duration-1000 ease-out"
                  style={{
                    width: '60vw',
                    height: '60vw',
                    backgroundColor: project.accent,
                    opacity: 0.13,
                    top: index % 2 === 0 ? '-10%' : 'auto',
                    bottom: index % 2 !== 0 ? '-10%' : 'auto',
                    left: index % 2 !== 0 ? '-10%' : 'auto',
                    right: index % 2 === 0 ? '-10%' : 'auto',
                    transform: isActive ? 'scale(1)' : 'scale(1.5)',
                  }}
                />

                {/* Content Layout */}
                <div
                  className={`
                    relative z-10 flex flex-col items-center justify-center text-center w-full max-w-5xl px-6
                    transition-all duration-[800ms] ease-out delay-100
                    ${isActive ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-10 scale-[0.97]'}
                  `}
                >
                  <div className="w-[52px] h-[52px] rounded-full border border-white/20 flex items-center justify-center text-xl mb-6 shadow-xl backdrop-blur-sm">
                    {project.icon}
                  </div>
                  
                  <h1 
                    className="font-bold mb-2 tracking-tighter"
                    style={{ 
                      fontSize: 'clamp(5rem, 14vw, 10rem)', 
                      color: project.accent,
                      lineHeight: 0.9 
                    }}
                  >
                    {project.num}
                  </h1>
                  
                  <h2 
                    className="font-light uppercase mb-6 tracking-[0.15em] drop-shadow-lg"
                    style={{ fontSize: 'clamp(1.2rem, 2.8vw, 2.2rem)' }}
                  >
                    {project.title}
                  </h2>
                  
                  <p 
                    className="font-normal text-white/60 mb-10 max-w-xl text-center leading-relaxed"
                    style={{ fontSize: 'clamp(0.8rem, 1.4vw, 0.95rem)' }}
                  >
                    {project.desc}
                  </p>

                  {/* Portfolio Additions: Tech Stack & Preview Image */}
                  <div className="flex flex-wrap items-center justify-center gap-2 mb-10 opacity-70">
                    {project.tech.map(t => (
                      <span key={t} className="text-[10px] md:text-xs uppercase tracking-widest px-4 py-2 border border-white/10 rounded-full bg-white/5 backdrop-blur-md">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Project Image Box embedded stylishly below the text */}
                  <div className="relative w-full max-w-2xl aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                    <Image src={project.image} alt={project.title} fill className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    
                    {/* Action Links */}
                    <div className="absolute bottom-4 right-4 flex gap-3">
                      <a href={project.github} target="_blank" rel="noreferrer" className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-colors text-white border border-white/10">
                        <Github size={18} />
                      </a>
                      <a href={project.live} target="_blank" rel="noreferrer" className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-colors text-white border border-white/10">
                        <ExternalLink size={18} />
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </motion.div>

        {/* UI Overlays */}

        {/* Progress bar */}
        <motion.div 
          className="absolute bottom-0 left-0 h-[2.5px] z-50 origin-left"
          style={{ 
            width: '100%',
            backgroundColor: PROJECTS[activeIndex]?.accent || '#e2b04a',
            scaleX: scrollYProgress,
            transition: 'background-color 0.5s ease'
          }}
        />

        {/* Scroll hint */}
        <motion.div 
          style={{ opacity: scrollHintOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-50 pointer-events-none"
        >
          <span className="text-[10px] tracking-widest uppercase text-white/50 font-bold">Scroll</span>
          <motion.div 
            animate={{ y: [0, 8, 0] }} 
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-3 h-3 border-r-2 border-b-2 border-white/50 rotate-45 transform"
          />
        </motion.div>

        {/* Dot navigation */}
        <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
          {PROJECTS.map((_, i) => (
            <div 
              key={i} 
              className={`w-2 h-2 rounded-full transition-all duration-500 shadow-xl border border-white/20`}
              style={{
                backgroundColor: i === activeIndex ? PROJECTS[i].accent : 'rgba(255,255,255,0.1)',
                transform: i === activeIndex ? 'scale(1.55)' : 'scale(1)',
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
