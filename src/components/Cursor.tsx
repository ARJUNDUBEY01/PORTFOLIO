'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Cursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      
      gsap.to(cursorDotRef.current, {
        x,
        y,
        duration: 0.1,
      });

      gsap.to(cursorOutlineRef.current, {
        x,
        y,
        duration: 0.5,
        ease: 'power3.out',
      });
    };

    const onMouseEnterLink = () => {
      gsap.to(cursorOutlineRef.current, {
        scale: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        duration: 0.3,
      });
    };

    const onMouseLeaveLink = () => {
      gsap.to(cursorOutlineRef.current, {
        scale: 1,
        backgroundColor: 'transparent',
        duration: 0.3,
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    
    const interactables = document.querySelectorAll('a, button, [data-interact]');
    interactables.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterLink);
      el.addEventListener('mouseleave', onMouseLeaveLink);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      interactables.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterLink);
        el.removeEventListener('mouseleave', onMouseLeaveLink);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[11000] -translate-x-1/2 -translate-y-1/2"
      />
      <div
        ref={cursorOutlineRef}
        className="fixed top-0 left-0 w-10 h-10 border border-white/50 rounded-full pointer-events-none z-[11000] -translate-x-1/2 -translate-y-1/2"
      />
    </>
  );
}
