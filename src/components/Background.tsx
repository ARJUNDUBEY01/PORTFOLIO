'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Background() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Floating background text parallax
    const bgText = document.querySelectorAll('.bg-parallax-text');
    bgText.forEach((text) => {
      gsap.to(text, {
        y: -150,
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      });
    });

    // Mouse interactive blobs
    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 60;
      const yPos = (clientY / window.innerHeight - 0.5) * 60;

      gsap.to('.ambient-blob', {
        x: xPos,
        y: yPos,
        duration: 2,
        ease: 'power2.out',
        stagger: 0.1,
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
      {/* Dynamic Blobs */}
      <div className="ambient-blob absolute top-[10%] left-[-10%] w-[50vw] h-[50vw] bg-accent/20 rounded-full blur-[120px]" />
      <div className="ambient-blob absolute bottom-[10%] right-[-10%] w-[40vw] h-[40vw] bg-purple-600/10 rounded-full blur-[100px]" />
      
      {/* Background Parallax Text */}
      <div className="bg-parallax-text absolute top-[15%] left-[5%] text-[20vw] font-black text-white/[0.02] whitespace-nowrap select-none">
        ENGINEER
      </div>
      <div className="bg-parallax-text absolute top-[120%] right-[5%] text-[20vw] font-black text-white/[0.02] whitespace-nowrap select-none">
        CREATIVE
      </div>
      <div className="bg-parallax-text absolute top-[250%] left-[10%] text-[20vw] font-black text-white/[0.02] whitespace-nowrap select-none">
        SOLUTIONS
      </div>
    </div>
  );
}
