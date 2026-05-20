import { useState } from 'react';
import { useInView } from './hooks';
import { S } from './shared';


export default function Contact() {
  const [ref, inView] = useInView(0.1);
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Honeypot field check
    const formData = new FormData(e.target);
    if (formData.get('_honey')) return; // Silently drop spam submissions

    const name = formData.get('Name').trim();
    const email = formData.get('Email').trim();
    const message = formData.get('Message').trim();

    // Basic Input Validation / Sanitization
    if (!name || !email || !message) {
      setStatus('error');
      setErrorMsg('Please fill out all fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      // FormSubmit AJAX API
      const response = await fetch('https://formsubmit.co/ajax/arjundubey335@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Name: name,
          Email: email,
          Message: message,
          _subject: `New Portfolio Message from ${name}!`,
          _template: "box"
        })
      });

      if (response.ok) {
        setStatus('success');
        e.target.reset();
        // Return to normal state after 4 seconds
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        throw new Error('Failed to send');
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg('Failed to send message. Please try again later.');
    }
  };

  return (
    <section id="contact" className="py-20 px-5 md:py-[120px] md:px-[52px]" style={{ minHeight: "100vh", background: "#0f0f0f", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif", position: "relative", overflow: "hidden", padding: undefined }}>
      <div ref={ref} className="w-full" style={{ textAlign: "center", maxWidth: 700, position: "relative", zIndex: 2, opacity: inView ? 1 : 0, transform: inView ? "scale(1)" : "scale(0.9)", transition: "all 0.9s ease" }}>
        <p style={{ color: "#e63c2f", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>Let's Work Together</p>
        <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(56px,9vw,120px)", color: "#fff", lineHeight: 0.9, marginBottom: 24 }}>Got a project<br /><span style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.35)", color: "transparent" }}>in mind?</span></h2>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 16, lineHeight: 1.8, fontWeight: 300, marginBottom: 48 }}>I'm always open to new opportunities. Whether it's a startup, an enterprise project, or just a great idea — let's build something amazing together.</p>
        <div style={{ marginTop: 40, marginBottom: 56 }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16, textAlign: "left" }}>
            {/* Honeypot field for spam bots */}
            <input type="text" name="_honey" style={{ display: "none" }} tabIndex="-1" autoComplete="off" />
            
            <input type="text" name="Name" placeholder="Your Name" required disabled={status === 'loading'} style={{ width: "100%", padding: "16px 20px", borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 15, outline: "none", opacity: status === 'loading' ? 0.6 : 1 }} />
            <input type="email" name="Email" placeholder="Your Email Address" required disabled={status === 'loading'} style={{ width: "100%", padding: "16px 20px", borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 15, outline: "none", opacity: status === 'loading' ? 0.6 : 1 }} />
            <textarea name="Message" placeholder="How can I help you?" rows={4} required disabled={status === 'loading'} style={{ width: "100%", padding: "16px 20px", borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 15, outline: "none", resize: "vertical", opacity: status === 'loading' ? 0.6 : 1 }}></textarea>
            
            <button type="submit" disabled={status === 'loading' || status === 'success'} style={{ ...S.cta, width: "100%", padding: "20px", fontSize: 15, border: "none", cursor: (status === 'loading' || status === 'success') ? "default" : "pointer", fontWeight: 500, opacity: status === 'loading' ? 0.7 : 1, transition: "all 0.3s ease" }}>
              {status === 'loading' ? 'Sending...' : status === 'success' ? 'Message Sent! ✓' : 'Send Message ↗'}
            </button>

            {/* Status Messages */}
            {status === 'error' && <p style={{ color: "#e63c2f", fontSize: 14, textAlign: "center", margin: 0 }}>{errorMsg}</p>}
            {status === 'success' && <p style={{ color: "#10b981", fontSize: 14, textAlign: "center", margin: 0 }}>Thanks! Your message has been routed to my inbox.</p>}
          </form>
        </div>
        <div style={{ display: "flex", gap: "24px 32px", justifyContent: "center", flexWrap: "wrap", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 40 }}>
          {[
          { name: "LinkedIn", url: "https://www.linkedin.com/in/arjun-dubey-65891239b/" },
          { name: "GitHub", url: "https://github.com/ARJUNDUBEY01" },
          { name: "LeetCode", url: "https://leetcode.com/u/ArjunDubey034/" },
          { name: "Twitter / X", url: "https://x.com/ArjunDubey01" },
          { name: "Resume", url: "/resume.pdf" },
          { name: "Email Me", url: "mailto:arjundubey335@gmail.com" }].
          map((s) =>
          <a key={s.name} href={s.url} target="_blank" rel="noreferrer" style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, textDecoration: "none", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 500 }}>
              {s.name}
            </a>
          )}
        </div>
      </div>
    </section>);

}