'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

const GREETINGS = [
  'Hello',
  'Namaste',
  'Hola',
  'Bonjour',
  'Ciao',
  'Konnichiwa',
  'Salaam',
  'Arjun Dubey'
];

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index === GREETINGS.length - 1) {
      setTimeout(() => {
        gsap.to('#loader-container', {
          y: '-100%',
          duration: 1,
          ease: 'power4.inOut',
          onComplete: () => onComplete(),
        });
      }, 1000);
      return;
    }

    const timer = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, 250);

    return () => clearTimeout(timer);
  }, [index, onComplete]);

  return (
    <div
      id="loader-container"
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black"
    >
      <AnimatePresence mode="wait">
        <motion.h1
          key={GREETINGS[index]}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="text-4xl md:text-7xl font-bold text-white uppercase tracking-tighter"
        >
          {GREETINGS[index]}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
}
