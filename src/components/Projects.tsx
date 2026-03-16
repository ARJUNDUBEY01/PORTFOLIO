'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';

const PROJECTS = [
  {
    title: 'BlindNav AI',
    desc: 'Assistive technology using computer vision to provide spatial awareness for visually impaired users.',
    tech: ['React Native', 'OpenCV', 'Firebase'],
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000',
  },
  {
    title: 'KaamSetu',
    desc: 'A socio-economic bridge connecting daily wage laborers with employment opportunities in real-time.',
    tech: ['Next.js', 'Node.js', 'MongoDB'],
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1000',
  },
  {
    title: 'Prop Firm App',
    desc: 'A comprehensive financial dashboard for comparing proprietary trading firms rules and performance.',
    tech: ['React', 'Express', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1611974717482-48a0026a0a75?auto=format&fit=crop&q=80&w=1000',
  },
  {
    title: 'AI Trading',
    desc: 'Advanced market analytics engine utilizing neural networks for real-time trend detection.',
    tech: ['React', 'Python', 'TensorFlow'],
    image: 'https://images.unsplash.com/photo-1535320903710-d993d3d77d29?auto=format&fit=crop&q=80&w=1000',
  }
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    let ctx = gsap.context(() => {
      const scrollWidth = containerRef.current!.scrollWidth;
      const windowWidth = window.innerWidth;
      const amountToScroll = scrollWidth - windowWidth;

      gsap.to(containerRef.current, {
        x: -amountToScroll,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${amountToScroll}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });

      // Internal Image Shift Parallax
      const cards = gsap.utils.toArray('.project-image-parallax');
      cards.forEach((img: any) => {
        gsap.to(img, {
          y: '10%',
          ease: 'none',
          scrollTrigger: {
            trigger: img.parentElement,
            start: 'left right',
            end: 'right left',
            scrub: true,
            // Synchronize with the horizontal move
            containerAnimation: gsap.to(containerRef.current, { x: -amountToScroll, ease: "none" })
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="bg-black relative z-10">
      <div className="h-screen flex items-center overflow-hidden">
        <div ref={containerRef} className="flex gap-20 px-[10vw]">
          <div className="flex-shrink-0 w-[50vw] flex flex-col justify-center">
            <h2 className="text-sm uppercase tracking-[0.5em] text-white/40 mb-8">Selected Works</h2>
            <h1 className="text-8xl font-black text-white leading-none uppercase">
              CINEMATIC<br />WORKS
            </h1>
          </div>
          
          {PROJECTS.map((project, i) => (
            <div 
              key={i} 
              className="flex-shrink-0 w-[70vw] md:w-[60vw] group"
            >
              <div className="relative aspect-video overflow-hidden rounded-3xl bg-neutral-900 border border-white/10 group-hover:border-white/20 transition-colors">
                <div className="absolute -top-[10%] left-0 w-full h-[120%] project-image-parallax">
                  <Image 
                    src={project.image} 
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-75 group-hover:brightness-100"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
                
                <div className="absolute bottom-10 left-10 p-0 text-white">
                  <h3 className="text-4xl font-bold mb-4">{project.title}</h3>
                  <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-6 py-2 bg-white text-black rounded-full font-bold text-sm hover:bg-white/80 transition-colors">
                      <ExternalLink size={16} /> Live Demo
                    </button>
                    <button className="flex items-center gap-2 px-6 py-2 bg-white/10 text-white rounded-full font-bold text-sm border border-white/20 hover:bg-white/20 transition-colors">
                      <Github size={16} /> Code
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                 <p className="text-xl text-white/50 max-w-xl line-clamp-2">{project.desc}</p>
                 <div className="flex gap-3 mt-4">
                    {project.tech.map(t => (
                      <span key={t} className="text-xs uppercase tracking-widest text-accent font-bold">{t}</span>
                    ))}
                 </div>
              </div>
            </div>
          ))}
          
          <div className="flex-shrink-0 w-[20vw]" />
        </div>
      </div>
    </div>
  );
}
