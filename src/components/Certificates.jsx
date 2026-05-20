import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const certs = [
  { src: "/certificates/cert1.png" },
  { src: "/certificates/cert2.png" },
  { src: "/certificates/cert3.png" },
  { src: "/certificates/cert4.png" },
  { src: "/certificates/cert5.png" },
  { src: "/certificates/cert6.png" },
  { src: "/certificates/cert7.png" }
];

const TiltCard = ({ src, index }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out the mouse movements
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  // Map mouse position to 3D rotation angles
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);
  
  // Map mouse position to a cool shiny glare effect
  const glareOpacity = useTransform(x, [-0.5, 0.5], [0, 0.5]);
  const glareX = useTransform(x, [-0.5, 0.5], ["-100%", "100%"]);
  const glareY = useTransform(y, [-0.5, 0.5], ["-100%", "100%"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative w-full max-w-sm mx-auto rounded-xl cursor-pointer"
    >
      {/* Glare Reflection */}
      <div 
        className="absolute inset-0 rounded-xl z-10 pointer-events-none overflow-hidden"
        style={{ transform: "translateZ(1px)" }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent"
          style={{
            opacity: glareOpacity,
            x: glareX,
            y: glareY,
            scale: 2,
            rotate: "45deg",
          }}
        />
      </div>
      
      {/* Certificate Image - pop it forward slightly in 3D space */}
      <a href={src} target="_blank" rel="noopener noreferrer" className="block relative z-0" style={{ transform: "translateZ(50px)" }}>
        <img 
          src={src} 
          alt={`Certificate ${index + 1}`} 
          className="w-full h-auto rounded-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] object-cover" 
        />
      </a>
    </motion.div>
  );
};

export default function Certificates() {
  return (
    <section id="certificates" className="relative py-24 md:py-40 bg-[#080808] font-['DM_Sans',sans-serif] overflow-hidden flex flex-col items-center">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[radial-gradient(circle,rgba(230,60,47,0.08)_0%,rgba(0,0,0,0)_70%)] blur-[80px] z-0 pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#e63c2f] text-sm md:text-base tracking-[0.2em] uppercase font-bold mb-4"
          >
            Continuous Learning
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-['Bebas_Neue',cursive] text-6xl md:text-[8vw] lg:text-9xl text-white m-0 leading-none drop-shadow-2xl"
          >
            CERTIFICATES
          </motion.h2>
        </div>

        {/* 3D Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 md:gap-14" style={{ perspective: "1500px" }}>
          {certs.map((cert, i) => (
            <TiltCard key={i} src={cert.src} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}