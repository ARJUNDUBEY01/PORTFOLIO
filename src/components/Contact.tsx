'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Mail, Github, Linkedin, ArrowUpRight } from 'lucide-react';

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const magneticElements = document.querySelectorAll('.magnetic');
    
    magneticElements.forEach((el) => {
      const element = el as HTMLElement;
      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(element, {
          x: x * 0.3,
          y: y * 0.5,
          duration: 0.3,
        });
      });

      element.addEventListener('mouseleave', () => {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.3,
        });
      });
    });
  }, []);

  return (
    <section id="contact" className="py-32 px-4 bg-black min-h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="text-sm uppercase tracking-[0.5em] text-white/40 mb-12">Let's work together</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-end">
          <div>
            <a 
              href="mailto:arjundubey335@gmail.com" 
              className="group text-5xl md:text-8xl font-black text-white hover:text-white/50 transition-colors"
            >
              PROJECT? <br />
              SAY HELLO <ArrowUpRight className="inline group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-500" size={80} />
            </a>
          </div>

          <div className="flex flex-col gap-12">
            <div className="flex gap-8">
              <a 
                href="https://github.com/ARJUNDUBEY01" 
                target="_blank" 
                rel="noopener noreferrer"
                className="magnetic w-20 h-20 rounded-full glass flex items-center justify-center hover:bg-white hover:text-black transition-colors"
              >
                <Github />
              </a>
              <a 
                href="https://www.linkedin.com/in/arjun-dubey-65891239b/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="magnetic w-20 h-20 rounded-full glass flex items-center justify-center hover:bg-white hover:text-black transition-colors"
              >
                <Linkedin />
              </a>
              <a 
                href="mailto:arjundubey335@gmail.com" 
                className="magnetic w-20 h-20 rounded-full glass flex items-center justify-center hover:bg-white hover:text-black transition-colors"
              >
                <Mail />
              </a>
            </div>
            
            <p className="text-white/40 font-mono text-sm">
              © 2026 ARJUN DUBEY. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
