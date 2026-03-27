'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import Image from 'next/image';
import { Award, GraduationCap, ArrowUpRight, Sparkles, Code } from 'lucide-react';

const CERTIFICATES = [
  {
    title: 'ElectroSphere 2K26',
    issuer: 'TechX Club',
    date: 'January 2026',
    description: '1st Place Winner in Software Edition',
    icon: <Award className="text-white" size={24} />,
    image: '/certificates/cert1.jpg',
    color: 'from-blue-500/20 to-cyan-500/20',
    zDelta: 100,
    xPos: '10%',
    yPos: '20%',
    rotation: -5
  },
  {
    title: 'Data Analyst 101',
    issuer: 'Simplilearn / Microsoft',
    date: 'December 2025',
    description: 'Data Analyst 101 Course Completion',
    icon: <GraduationCap className="text-white" size={24} />,
    image: '/certificates/cert2.png',
    color: 'from-purple-500/20 to-pink-500/20',
    zDelta: -100,
    xPos: '60%',
    yPos: '15%',
    rotation: 8
  },
  {
    title: 'Prompt Engineering',
    issuer: 'Sololearn',
    date: 'March 2026',
    description: 'Course Certificate for Prompt Engineering',
    icon: <Sparkles className="text-white" size={24} />,
    image: '/certificates/cert3.png',
    color: 'from-indigo-500/20 to-blue-500/20',
    zDelta: 50,
    xPos: '25%',
    yPos: '55%',
    rotation: -10
  },
  {
    title: 'Web Development',
    issuer: 'Sololearn',
    date: 'December 2025',
    description: 'Course Certificate for Web Development',
    icon: <Code className="text-white" size={24} />,
    image: '/certificates/cert4.png',
    color: 'from-emerald-500/20 to-teal-500/20',
    zDelta: -50,
    xPos: '65%',
    yPos: '60%',
    rotation: 6
  }
];

export default function Certificates() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse position for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for mouse movement
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  // Scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    // Normalize mouse position from -1 to 1
    const x = (clientX / innerWidth) * 2 - 1;
    const y = (clientY / innerHeight) * 2 - 1;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      id="certificates" 
      className="relative min-h-[180vh] bg-black overflow-hidden pt-24 pb-12"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Abstract Background Glows */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/10 blur-[150px] rounded-full" 
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 blur-[150px] rounded-full" 
        />

        {/* 3D Perspective Container */}
        <div 
          className="relative w-full h-full flex items-center justify-center max-w-7xl mx-auto"
          style={{ perspective: '1200px' }}
        >
          {/* Main Title - stays mostly centered but has slight parallax */}
          <motion.div
            style={{
              x: useTransform(springX, [-1, 1], [-40, 40]),
              y: useTransform(springY, [-1, 1], [-40, 40]),
              opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]),
              scale: useTransform(scrollYProgress, [0, 0.5], [1, 0.9]),
            }}
            className="z-10 text-center pointer-events-none"
          >
            <h2 className="text-sm uppercase tracking-[0.8em] text-white/40 mb-4 font-medium">Achievements</h2>
            <h1 className="text-6xl md:text-8xl font-black text-white leading-tight uppercase select-none tracking-tighter">
              Honors &<br /><span className="text-accent italic">Certifications</span>
            </h1>
          </motion.div>

          {/* Floating Certificate Cards */}
          {CERTIFICATES.map((cert, i) => (
            <FloatingCertificate 
              key={i} 
              cert={cert} 
              mouseX={springX} 
              mouseY={springY} 
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>

      {/* Spacer for scroll depth */}
      <div className="h-[80vh]" />
    </section>
  );
}

function FloatingCertificate({ cert, mouseX, mouseY, scrollYProgress }: { 
  cert: any, 
  mouseX: any, 
  mouseY: any, 
  scrollYProgress: any
}) {
  // Parallax movement values based on mouse and project depth (zDelta)
  const x = useTransform(mouseX, [-1, 1], [cert.zDelta * -0.6, cert.zDelta * 0.6]);
  const y = useTransform(mouseY, [-1, 1], [cert.zDelta * -0.6, cert.zDelta * 0.6]);
  
  // Tilt effects
  const rotateGap = 20;
  const rotateX = useTransform(mouseY, [-1, 1], [rotateGap, -rotateGap]);
  const rotateY = useTransform(mouseX, [-1, 1], [-rotateGap, rotateGap]);

  // Scroll based movement - cards move at different speeds based on their Z position
  const scrollY = useTransform(
    scrollYProgress, 
    [0, 1], 
    [0, cert.zDelta * 3]
  );
  
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  // Local glow effect
  const localX = useSpring(useTransform(mouseX, [-1, 1], [100, 0]), { stiffness: 150, damping: 20 });
  const localY = useSpring(useTransform(mouseY, [-1, 1], [100, 0]), { stiffness: 150, damping: 20 });
  const background = useMotionTemplate`radial-gradient(circle at ${localX}% ${localY}%, rgba(255,255,255,0.4) 0%, transparent 60%)`;

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: cert.xPos,
        top: cert.yPos,
        x,
        y: scrollY,
        z: cert.zDelta,
        rotateX,
        rotateY,
        rotateZ: cert.rotation,
        opacity,
        transformStyle: 'preserve-3d',
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileHover={{ 
        scale: 1.1, 
        z: cert.zDelta + 100, 
        rotateZ: 0,
        transition: { duration: 0.4, ease: "easeOut" } 
      }}
      className="w-64 md:w-[400px] aspect-[4/3] group cursor-pointer will-change-transform"
    >
      <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-neutral-900/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <Image 
          src={cert.image} 
          alt={cert.title}
          fill
          className="object-cover opacity-40 group-hover:opacity-70 transition-all duration-700 group-hover:scale-110"
        />
        
        {/* Glow effect on hover using motion template */}
        <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 mix-blend-overlay transition-opacity duration-500 pointer-events-none" style={{ background }} />
        
        {/* Corner Indicator */}
        <div className="absolute top-4 right-4 text-white/40 group-hover:text-white transition-colors bg-black/40 backdrop-blur-md rounded-full p-2 border border-white/10 opacity-0 group-hover:opacity-100">
          <ArrowUpRight size={16} />
        </div>

        {/* Info Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/95 via-black/60 to-transparent translate-z-10 h-[60%]">
          <div className="flex items-center gap-3 mb-2 transform group-hover:-translate-y-1 transition-transform duration-300">
             <div className="p-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
               {cert.icon}
             </div>
             <div>
                <p className="text-accent text-[10px] uppercase tracking-widest font-bold">{cert.date}</p>
                <h3 className="text-lg md:text-xl font-bold text-white tracking-tight leading-tight">
                  {cert.title}
                </h3>
             </div>
          </div>
          <p className="text-[12px] text-white/60 mb-1 font-medium">{cert.issuer}</p>
          <p className="text-[10px] text-white/40 uppercase tracking-widest line-clamp-1">{cert.description}</p>
        </div>
      </div>
      
      {/* Floating shadow */}
      <div 
        className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[90%] h-6 bg-black/80 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity translate-z-[-1px]"
      />
      <div className={`absolute -inset-2 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-700 -z-10 rounded-[40px] pointer-events-none`} />
    </motion.div>
  );
}
