'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Using an array of words to ensure clean mapping
  const wordsArray = "I am a passionate Full Stack Developer who loves building modern web applications, AI tools and scalable digital products. I enjoy working with cutting-edge technologies and creating clean, performant, and user-focused digital experiences.".split(" ");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    let ctx = gsap.context(() => {
      // 1. Text Reveal Animation (Grey to White)
      const words = gsap.utils.toArray('.about-word');
      
      gsap.to(words, {
        color: "white",
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 90%",
          scrub: 1,
        }
      });

      // 2. Section Entrance
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMounted]);

  return (
    <section 
      ref={sectionRef} 
      id="about" 
      className="py-32 px-6 md:px-20 bg-black min-h-screen flex items-center justify-center"
    >
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-20 items-center">
        
        {/* Left Side: Text Content */}
        <div className="flex flex-col items-start w-full text-left order-2 md:order-1">
          <h2 className="text-sm uppercase tracking-[0.5em] text-white/20 mb-10">Who I am</h2>
          
          <div className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-relaxed text-white/20">
            {wordsArray.map((word, i) => (
              <span key={i} className="about-word">
                {word}{" "}
              </span>
            ))}
          </div>
        </div>

        {/* Right Side: Profile Picture with Hover Reveal Effect */}
        <div className="flex justify-center md:justify-end order-1 md:order-2">
          <div 
            className="group relative w-48 h-48 md:w-64 md:h-64 cursor-none"
          >
            {/* Hover Hint / Frame */}
            <div className="absolute inset-0 border-2 border-dashed border-white/20 rounded-full flex items-center justify-center group-hover:border-accent group-hover:border-solid transition-all duration-700 bg-white/[0.02]">
               <span className="text-[10px] uppercase tracking-[0.3em] text-white/60 group-hover:opacity-0 transition-opacity">Hover to Reveal</span>
            </div>

            {/* Inner Image Container (Reveals on Hover) */}
            <div 
              ref={imageRef} 
              className="absolute inset-0 w-full h-full overflow-hidden rounded-full glass opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-1000 ease-out shadow-[0_0_50px_rgba(99,102,241,0.2)]"
            >
              {isMounted && (
                <Image 
                  src="/arjun-clean.png" 
                  alt="Arjun Dubey"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  priority
                />
              )}
            </div>

            {/* Accent Ring */}
            <div className="absolute -inset-2 border border-accent/20 rounded-full scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-1000 pointer-events-none" />
          </div>
        </div>

      </div>
    </section>
  );
}
