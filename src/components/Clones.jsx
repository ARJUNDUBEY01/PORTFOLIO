'use client';
import { motion } from 'framer-motion';

// A single row that infinitely marquees horizontally
const Row = ({ items, reverse = false }) => {
  return (
    <div style={{ display: 'flex', overflow: 'hidden', whiteSpace: 'nowrap', width: '100%', marginBottom: 32 }}>
      <motion.div
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        // Linear transition makes it a continuous conveyor belt without stops
        transition={{ ease: "linear", duration: 35, repeat: Infinity }}
        style={{ display: 'flex', gap: 32, paddingLeft: 32 }}>
        
        {/* We duplicate the items 3 times so the loop never runs out of content mid-screen */}
        {[...items, ...items, ...items].map((item, i) =>
        <div key={i} className="min-w-[85vw] md:min-w-[420px]" style={{ height: 280, borderRadius: 24, overflow: "hidden", position: "relative", border: "1px solid rgba(255,255,255,0.05)", background: "#111", flexShrink: 0 }}>
            <img
            src={item.img}
            alt={item.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.5 }} />
          
            {/* Gradient overlay so text is highly readable */}
            <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", padding: 32, background: "linear-gradient(transparent, rgba(0,0,0,0.95))" }}>
               <h4 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 36, color: "#fff", margin: 0, letterSpacing: "1px" }}>{item.title}</h4>
               <p style={{ color: "#e63c2f", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500 }}>{item.type}</p>
            </div>
          </div>
        )}
      </motion.div>
    </div>);

};

export default function Clones() {
  // First Row of Clones
  const row1 = [
  { title: "JBL Audio Store", type: "E-Commerce UI Clone", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80" },
  { title: "Tesla Dashboard", type: "React Web App Clone", img: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80" },
  { title: "Netflix UI", type: "Streaming Clone", img: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&q=80" },
  { title: "Apple Vision Pro", type: "3D Landing Page Clone", img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80" }];


  // Second Row of Clones
  const row2 = [
  { title: "Armani Exchange", type: "Luxury Fashion Clone", img: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80" },
  { title: "Spotify Player", type: "Music Streaming Clone", img: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80" },
  { title: "Airbnb Booking", type: "Travel Clone", img: "https://images.unsplash.com/photo-1493225457124-a1a2a5f56468?w=800&q=80" },
  { title: "Nike SNKRS", type: "E-Commerce Clone", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80" }];


  return (
    <section id="clones" className="py-20 md:py-[120px] bg-[#0f0f0f] overflow-hidden">
      
      {/* Header section */}
      <div className="max-w-[1280px] mx-auto px-5 md:px-[52px] mb-10 md:mb-20">
        <p style={{ color: "#e63c2f", fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>Replicating Greatness</p>
        <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(60px,8vw,100px)", color: "#fff", lineHeight: 0.9, margin: 0 }}>
          Pixel-Perfect <span style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)", color: "transparent" }}>Clones</span>
        </h2>
      </div>

      {/* Infinite scrolling rows */}
      <div style={{ width: "100%" }}>
        <Row items={row1} reverse={false} /> {/* Scrolls Right to Left */}
        <Row items={row2} reverse={true} />  {/* Scrolls Left to Right */}
      </div>

    </section>);

}