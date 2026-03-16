'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [shapes, setShapes] = useState<{ x: string, y: string, scale: number, duration: number }[]>([]);

  useEffect(() => {
    setIsMounted(true);
    // Populate shapes on client-side only to reconcile with server shell
    const newShapes = [...Array(20)].map(() => ({
      x: Math.random() * 100 + '%',
      y: Math.random() * 100 + '%',
      scale: Math.random() * 0.5 + 0.5,
      duration: Math.random() * 5 + 5
    }));
    setShapes(newShapes);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    let ctx = gsap.context(() => {
      gsap.to('.text-reveal span', {
        y: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'power4.out',
      });

      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
        opacity: 0,
        y: 100,
      });
    }, heroRef);

    return () => ctx.revert();
  }, [isMounted]);

  return (
    <section 
      ref={heroRef}
      className="relative h-screen flex flex-col items-center justify-center bg-black overflow-hidden"
    >
      <div className="absolute inset-0 opacity-20">
        {/* Render shapes consistently. Server will render empty array, client will fill it. */}
        {shapes.map((shape, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: shape.x, 
              y: shape.y,
              scale: shape.scale
            }}
            animate={{ 
              y: [null, '-20%', '20%'],
              x: [null, '10%', '-10%'],
            }}
            transition={{ 
              duration: shape.duration, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute w-2 h-2 bg-accent rounded-full blur-[2px]"
          />
        ))}
      </div>

      <div className="z-10 text-center">
        <h1 className="text-reveal giant-text mb-4">
          <span ref={title1Ref} className="inline-block transition-transform duration-1000">ARJUN DUBEY</span>
        </h1>
        <h1 className="text-reveal text-5xl md:text-8xl font-black text-white/50 mb-8">
          <span ref={title2Ref} className="inline-block transition-transform duration-1000">FULL STACK DEVELOPER</span>
        </h1>
        <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto font-light tracking-wide px-4">
          I build modern web applications, AI tools and scalable digital products.
        </p>
      </div>

      <div className="absolute bottom-10 animate-bounce">
        <div className="w-1 h-12 bg-gradient-to-b from-white to-transparent rounded-full" />
      </div>
    </section>
  );
}
