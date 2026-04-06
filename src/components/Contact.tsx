'use client';
import { useInView } from './hooks';
import { S } from './shared';


export default function Contact() {
  const [ref, inView] = useInView(0.1);
  return (
    <section id="contact" className="py-20 px-5 md:py-[120px] md:px-[52px]" style={{ minHeight: "100vh", background: "#0f0f0f", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif", position: "relative", overflow: "hidden", padding: undefined }}>
      <div ref={ref} className="w-full" style={{ textAlign: "center", maxWidth: 700, position: "relative", zIndex: 2, opacity: inView?1:0, transform: inView?"scale(1)":"scale(0.9)", transition: "all 0.9s ease" }}>
        <p style={{ color: "#e63c2f", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>Let's Work Together</p>
        <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(56px,9vw,120px)", color: "#fff", lineHeight: 0.9, marginBottom: 24 }}>Got a project<br/><span style={{ WebkitTextStroke:"1.5px rgba(255,255,255,0.35)", color:"transparent" }}>in mind?</span></h2>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 16, lineHeight: 1.8, fontWeight: 300, marginBottom: 48 }}>I'm always open to new opportunities. Whether it's a startup, an enterprise project, or just a great idea — let's build something amazing together.</p>
        <div style={{ marginTop: 40, marginBottom: 56 }}>
          <form action="https://formsubmit.co/arjundubey335@gmail.com" method="POST" style={{ display: "flex", flexDirection: "column", gap: 16, textAlign: "left" }}>
            <input type="hidden" name="_subject" value="New Message From Portfolio!" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="text" name="Name" placeholder="Your Name" required style={{ width: "100%", padding: "16px 20px", borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 15, outline: "none" }} />
            <input type="email" name="Email" placeholder="Your Email Address" required style={{ width: "100%", padding: "16px 20px", borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 15, outline: "none" }} />
            <textarea name="Message" placeholder="How can I help you?" rows={4} required style={{ width: "100%", padding: "16px 20px", borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 15, outline: "none", resize: "vertical" }}></textarea>
            <button type="submit" style={{ ...S.cta, width: "100%", padding: "20px", fontSize: 15, border: "none", cursor: "pointer", fontWeight: 500 } as any}>Send Message ↗</button>
          </form>
        </div>
        <div style={{ display: "flex", gap: "24px 32px", justifyContent: "center", flexWrap: "wrap", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 40 }}>
          {[
            { name: "LinkedIn", url: "https://www.linkedin.com/in/arjun-dubey-65891239b/" },
            { name: "GitHub", url: "https://github.com/ARJUNDUBEY01" },
            { name: "LeetCode", url: "https://leetcode.com/u/ArjunDubey034/" },
            { name: "Twitter / X", url: "https://x.com/ArjunDubey01" },
            { name: "Resume", url: "/resume.pdf" },
            { name: "Email Me", url: "mailto:arjundubey335@gmail.com" }
          ].map(s => (
            <a key={s.name} href={s.url} target="_blank" rel="noreferrer" style={{color:"rgba(255,255,255,0.4)",fontSize:13,textDecoration:"none",letterSpacing:"0.06em",textTransform:"uppercase",fontWeight:500}}>
              {s.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}