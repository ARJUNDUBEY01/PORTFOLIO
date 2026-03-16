'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/dist/MotionPathPlugin';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

const SKILLS = [
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'Tailwind CSS', 'JavaScript', 'HTML / CSS']
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express.js', 'REST APIs', 'Spring Boot']
  },
  {
    category: 'Database',
    items: ['MongoDB', 'MySQL', 'Firebase', 'PostgreSQL']
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
          scrub: 1.5, // Smoother scrub
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

        // Sequence: Move ball to card -> Orbit card -> Show card content
        
        // 1. Move ball to card corner
        tl.to(ballRef.current, {
          opacity: 1,
          scale: 1.2,
          x: card.offsetLeft - 60,
          y: card.offsetTop + 40,
          duration: 1,
          ease: "power2.inOut"
        });

        // 2. Perform a "round motion" (orbital swoop) while card appears
        tl.to(ballRef.current, {
          motionPath: {
            path: [
              { x: card.offsetLeft - 60, y: card.offsetTop + 40 },
              { x: card.offsetLeft + 100, y: card.offsetTop - 20 },
              { x: card.offsetLeft + 200, y: card.offsetTop + 100 },
              { x: card.offsetLeft - 60, y: card.offsetTop + 40 }
            ],
            curviness: 2,
          },
          duration: 2,
          ease: "power1.inOut"
        }, "-=0.5");

        // 3. Reveal the card content
        tl.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: "power4.out"
        }, "<0.2");

        // Pause to appreciate each card
        tl.to({}, { duration: 0.8 });
      });

      // Exit animation for ball
      tl.to(ballRef.current, { opacity: 0, scale: 0, duration: 1 });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="skills" 
      className="relative min-h-screen bg-black flex flex-col justify-center py-40 px-4 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <h2 className="text-sm uppercase tracking-[0.8em] text-white/20 mb-28 text-center">Core Expertise</h2>
        
        {/* Animated Guided Ball */}
        <div 
          ref={ballRef}
          className="fixed top-0 left-0 w-10 h-10 bg-accent rounded-full blur-[2px] shadow-[0_0_30px_#6366f1] z-50 pointer-events-none"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
          {SKILLS.map((skill, idx) => (
            <div
              key={skill.category}
              ref={el => { cardsRef.current[idx] = el; }}
              className="glass p-20 rounded-[60px] flex flex-col items-start min-h-[550px] transition-all duration-700 hover:border-accent/40 group relative"
            >
              {/* Card Glow Effect */}
              <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[60px] blur-3xl pointer-events-none" />
              
              <h3 className="text-5xl font-black mb-14 text-white uppercase tracking-tighter group-hover:text-accent transition-colors">
                {skill.category}
              </h3>
              
              <div className="space-y-8 w-full relative z-10">
                {skill.items.map((item) => (
                  <div 
                    key={item}
                    className="text-3xl text-white/50 hover:text-white transition-all flex items-center gap-6 group/item cursor-default"
                  >
                    <div className="w-2 h-2 bg-accent/30 rounded-full group-hover/item:scale-150 group-hover/item:bg-accent transition-all duration-500 shadow-[0_0_10px_#6366f1]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
