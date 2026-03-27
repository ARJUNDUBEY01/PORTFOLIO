'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/dist/MotionPathPlugin';
import { motion } from 'framer-motion';
import { 
  SiReact, 
  SiNextdotjs, 
  SiTailwindcss, 
  SiJavascript, 
  SiHtml5, 
  SiCss,
  SiNodedotjs, 
  SiExpress, 
  SiSpringboot, 
  SiMongodb, 
  SiMysql, 
  SiFirebase, 
  SiPostgresql,
  SiPostman
} from 'react-icons/si';
import { Monitor, Server, Database as DatabaseIcon } from 'lucide-react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

const SKILLS = [
  {
    category: 'Frontend',
    description: 'User Interface & Experience',
    icon: <Monitor className="text-accent" size={32} />,
    color: 'from-blue-500/20 to-cyan-500/20',
    items: [
      { name: 'React', icon: <SiReact className="text-[#61DAFB]" size={24} />, type: 'Library' },
      { name: 'Next.js', icon: <SiNextdotjs className="text-white" size={24} />, type: 'Framework' },
      { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-[#06B6D4]" size={24} />, type: 'Styling' },
      { name: 'JavaScript', icon: <SiJavascript className="text-[#F7DF1E]" size={24} />, type: 'Language' },
      { name: 'HTML5 & CSS3', icon: <div className="flex gap-1"><SiHtml5 className="text-[#E34F26]" size={24} /><SiCss className="text-[#1572B6]" size={24} /></div>, type: 'Core' }
    ]
  },
  {
    category: 'Backend',
    description: 'Server & Logic Architecture',
    icon: <Server className="text-accent" size={32} />,
    color: 'from-purple-500/20 to-pink-500/20',
    items: [
      { name: 'Node.js', icon: <SiNodedotjs className="text-[#339933]" size={24} />, type: 'Runtime' },
      { name: 'Express.js', icon: <SiExpress className="text-white" size={24} />, type: 'Framework' },
      { name: 'REST APIs', icon: <SiPostman className="text-[#FF6C37]" size={24} />, type: 'Protocol' },
      { name: 'Spring Boot', icon: <SiSpringboot className="text-[#6DB33F]" size={24} />, type: 'Framework' }
    ]
  },
  {
    category: 'Database',
    description: 'Data Management & Storage',
    icon: <DatabaseIcon className="text-accent" size={32} />,
    color: 'from-emerald-500/20 to-teal-500/20',
    items: [
      { name: 'MongoDB', icon: <SiMongodb className="text-[#47A248]" size={24} />, type: 'NoSQL' },
      { name: 'MySQL', icon: <SiMysql className="text-[#4479A1]" size={24} />, type: 'SQL' },
      { name: 'Firebase', icon: <SiFirebase className="text-[#FFCA28]" size={24} />, type: 'BaaS' },
      { name: 'PostgreSQL', icon: <SiPostgresql className="text-[#4169E1]" size={24} />, type: 'SQL' }
    ]
  }
];

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%", 
          pin: true,
          scrub: 1.5,
          invalidateOnRefresh: true
        }
      });

      // Initial state
      gsap.set(ballRef.current, { opacity: 0, scale: 0 });
      cardsRef.current.forEach(card => {
        if (card) gsap.set(card, { opacity: 0, y: 50, scale: 0.95 });
      });

      // Animation Sequence
      SKILLS.forEach((_, idx) => {
        const card = cardsRef.current[idx];
        if (!card) return;
        
        // 1. Move ball to card
        tl.to(ballRef.current, {
          opacity: 1,
          scale: 1,
          x: card.offsetLeft - 40,
          y: card.offsetTop + 40,
          duration: 1,
          ease: "power2.inOut"
        });

        // 2. Orbital motion
        tl.to(ballRef.current, {
          motionPath: {
            path: [
              { x: card.offsetLeft - 40, y: card.offsetTop + 40 },
              { x: card.offsetLeft + 100, y: card.offsetTop - 20 },
              { x: card.offsetLeft + 200, y: card.offsetTop + 100 },
              { x: card.offsetLeft - 40, y: card.offsetTop + 40 }
            ],
            curviness: 2,
          },
          duration: 2,
          ease: "power1.inOut"
        }, "-=0.5");

        // 3. Reveal the card
        tl.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: "power4.out"
        }, "<0.2");

        tl.to({}, { duration: 0.8 });
      });

      tl.to(ballRef.current, { opacity: 0, scale: 0, duration: 1 });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="skills" 
      className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden pt-12 pb-32"
    >
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
          <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-500/20 blur-[150px] rounded-full" />
          <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-500/20 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10 px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm uppercase tracking-[0.8em] text-white/40 mb-4">Capabilities</h2>
          <h1 className="text-6xl md:text-7xl font-black text-white uppercase tracking-tighter">
            Core <span className="text-accent italic">Expertise</span>
          </h1>
        </div>

        {/* Animated Guided Ball */}
        <div 
          ref={ballRef}
          className="fixed top-0 left-0 w-8 h-8 bg-accent rounded-full blur-[2px] shadow-[0_0_30px_#6366f1] z-50 pointer-events-none"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative items-stretch">
          {SKILLS.map((skill, idx) => (
            <div
              key={skill.category}
              ref={el => { cardsRef.current[idx] = el; }}
              className="group relative h-full min-h-[500px] flex flex-col p-[2px] rounded-[32px] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative flex-1 bg-neutral-950 rounded-[31px] p-6 flex flex-col h-full border border-white/5 backdrop-blur-3xl shadow-2xl">
                <div className="mb-6">
                   <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:border-accent/40 group-hover:bg-accent/5 transition-all duration-500">
                        {skill.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white tracking-tight">{skill.category}</h3>
                        <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">{skill.description}</p>
                      </div>
                   </div>
                   <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent" />
                </div>

                <div className="flex-1 flex flex-col justify-center gap-3">
                  {skill.items.map((item) => (
                    <motion.div 
                      key={item.name}
                      whileHover={{ x: 8 }}
                      className="group/item flex items-center justify-between p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 relative overflow-hidden cursor-default"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative z-10 transform group-hover/item:scale-110 transition-transform duration-500 drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]">
                          {item.icon}
                        </div>
                        <div>
                          <p className="text-lg font-bold text-white/80 group-hover/item:text-white transition-colors tracking-tight">
                            {item.name}
                          </p>
                          <p className="text-[9px] uppercase tracking-widest text-white/20">{item.type}</p>
                        </div>
                      </div>
                      
                      <div className="opacity-0 group-hover/item:opacity-100 transition-opacity">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full shadow-[0_0_12px_#6366f1]" />
                      </div>

                      <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover/item:opacity-100 transition-opacity pointer-events-none" />
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center opacity-40">
                   <div className="flex gap-1">
                      {[1,2,3].map(i => <div key={i} className="w-1 h-1 bg-white rounded-full" />)}
                   </div>
                   <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Expert Level</span>
                </div>
              </div>

              <div className={`absolute -inset-2 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-40 blur-3xl transition-opacity duration-700 pointer-events-none`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
