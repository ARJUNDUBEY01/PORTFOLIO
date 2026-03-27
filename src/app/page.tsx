'use client';

import { useState, useEffect } from 'react';
import SmoothScroll from '@/components/SmoothScroll';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Certificates from '@/components/Certificates';
import Contact from '@/components/Contact';
import Loader from '@/components/Loader';
import Cursor from '@/components/Cursor';
import Background from '@/components/Background';
import Navbar from '@/components/Navbar';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Force scroll to top on refresh to show intro animation
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative min-h-screen">
      <Navbar />
      <div className="noise" />
      <Background />
      <Cursor />
      
      {/* Isolate conditional rendering in a dedicated container */}
      <div id="status-layer">
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </div>
      
      {/* Stable container for main site content */}
      <div id="content-layer">
        <SmoothScroll>
          <div className={loading ? 'opacity-0' : 'opacity-100 transition-opacity duration-1000'}>
            <Hero />
            <About />
            <Projects />
            <Certificates />
            <Skills />
            <Contact />
          </div>
        </SmoothScroll>
      </div>
    </main>
  );
}
