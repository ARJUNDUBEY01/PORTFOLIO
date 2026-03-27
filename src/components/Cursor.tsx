'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      
      gsap.to(cursorRef.current, {
        x,
        y,
        duration: 0.15,
        ease: 'power2.out',
      });
    };

    const onMouseEnterInteract = (e: any) => {
      const isClonesCard = e.currentTarget.closest('.clones-card');
      
      gsap.to(cursorRef.current, {
        width: 44,
        height: 44,
        backgroundColor: isClonesCard ? '#c8ff00' : 'rgba(255, 255, 255, 0.8)',
        duration: 0.3,
      });
    };

    const onMouseLeaveInteract = () => {
      gsap.to(cursorRef.current, {
        width: 10,
        height: 10,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        duration: 0.3,
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    
    const refreshInteractables = () => {
      const interactables = document.querySelectorAll('a, button, .group, [data-interact]');
      interactables.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterInteract);
        el.removeEventListener('mouseleave', onMouseLeaveInteract);
        el.addEventListener('mouseenter', onMouseEnterInteract);
        el.addEventListener('mouseleave', onMouseLeaveInteract);
      });
    };

    refreshInteractables();
    
    // Mutation observer to handle dynamically loaded content
    const observer = new MutationObserver(refreshInteractables);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-[10px] h-[10px] bg-white rounded-full pointer-events-none z-[11000] -translate-x-1/2 -translate-y-1/2 mix-blend-difference will-change-transform"
    />
  );
}
